import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pack, PackDocument } from './schemas/pack.schema';
import { Brand } from '../brands/schemas/brand.schema';
import { CreatePackDto } from './dto/create-pack.dto';
import { UpdatePackDto } from './dto/update-pack.dto';

@Injectable()
export class PacksService {
  constructor(
    @InjectModel(Pack.name) private packModel: Model<PackDocument>,
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
  ) {}

  async findAll(): Promise<Pack[]> {
    return this.packModel.find().sort({ createdAt: -1 }).lean().exec();
  }

  async findOne(id: string): Promise<Pack> {
    const pack = await this.packModel.findById(id).lean().exec();
    if (!pack) {
      throw new NotFoundException(`Pack with ID ${id} not found`);
    }
    return pack;
  }

  async findBySlug(slug: string): Promise<Pack> {
    const pack = await this.packModel.findOne({ slug }).lean().exec();
    if (!pack) {
      throw new NotFoundException(`Pack with slug "${slug}" not found`);
    }
    return pack;
  }

  async create(createPackDto: CreatePackDto): Promise<Pack> {
    if (!createPackDto.slug && createPackDto.designation_fr) {
      createPackDto.slug = this.slugify(createPackDto.designation_fr);
    }
    if (!createPackDto.designation) {
      createPackDto.designation = createPackDto.designation_fr;
    }
    if (!createPackDto.pack) {
      createPackDto.pack = '1';
    }
    const created = new this.packModel(createPackDto);
    return created.save();
  }

  async update(id: string, updatePackDto: UpdatePackDto): Promise<Pack> {
    const updated = await this.packModel
      .findByIdAndUpdate(id, { $set: updatePackDto }, { new: true })
      .lean()
      .exec();
    if (!updated) {
      throw new NotFoundException(`Pack with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.packModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Pack with ID ${id} not found`);
    }
    return { message: 'Pack deleted successfully' };
  }

  async bulkDelete(ids: string[]): Promise<{ message: string; deletedCount: number }> {
    const result = await this.packModel.deleteMany({ _id: { $in: ids } }).exec();
    return { message: `Deleted ${result.deletedCount} packs`, deletedCount: result.deletedCount };
  }

  async getFeatured(limit: number = 6): Promise<any[]> {
    const packs = await this.packModel
      .find({ publier: '1' })
      .sort({ best_seller: -1, createdAt: -1 })
      .limit(limit)
      .lean()
      .exec();

    // Populate brand info for packs that have brand_id
    const brandIds = packs
      .map((p) => p.brand_id)
      .filter((id) => id);

    if (brandIds.length === 0) return packs;

    const brands = await this.brandModel
      .find({ _id: { $in: brandIds } })
      .lean()
      .exec();

    const brandMap = new Map(brands.map((b: any) => [b._id.toString(), b]));

    return packs.map((pack) => {
      if (pack.brand_id) {
        const brand = brandMap.get(pack.brand_id.toString());
        if (brand) {
          return { ...pack, brand: { _id: brand._id, designation_fr: (brand as any).designation_fr, logo: (brand as any).logo } };
        }
      }
      return pack;
    });
  }

  async getPublished(): Promise<Pack[]> {
    return this.packModel
      .find({ publier: '1' })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  async count(): Promise<number> {
    return this.packModel.countDocuments().exec();
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  async autoAssignBrands(): Promise<{ updated: number; details: string[] }> {
    // Name-based mapping: pack name keyword → brand designation_fr
    const packBrandHints: Record<string, string> = {
      'warriors': 'WARRIOR SUPPLEMENTS',
      'animal': 'Universal Nutrition',
      'galvanize': 'GALVANIZE CHROME',
      'scenit': 'SCENIT NUTRITION',
      'big ramy': 'BIG RAMY LABS',
      'levrone': 'KEVIN LEVRONE',
      'olimp': 'OLIMP SPORT NUTRITION',
      'biotech': 'BIOTECH USA',
      'muscletech': 'MUSCLETECH',
      'mutant': 'MUTANT',
      'real': 'Real Pharm',
      'dymatize': 'DYMATIZE',
      'nutrex': 'NUTREX RESEARCH',
      'optimum': 'Optimum Nutrition',
      'bsn': 'BSN SUPPLEMENTS',
      'scitec': 'SCITEC NUTRITION',
      'applied': 'APPLIED NUTRITION',
    };

    const brands = await this.brandModel.find().lean().exec();
    const brandByName = new Map(brands.map((b: any) => [b.designation_fr?.toUpperCase(), b]));

    const packsWithoutBrand = await this.packModel
      .find({ $or: [{ brand_id: '' }, { brand_id: null }, { brand_id: { $exists: false } }] })
      .lean()
      .exec();

    const details: string[] = [];
    let updated = 0;

    for (const pack of packsWithoutBrand) {
      const nameLower = pack.designation_fr?.toLowerCase() || '';
      let matchedBrand: any = null;

      // Try name-based hints
      for (const [keyword, brandName] of Object.entries(packBrandHints)) {
        if (nameLower.includes(keyword)) {
          matchedBrand = brandByName.get(brandName.toUpperCase());
          break;
        }
      }

      // Fallback: pick a random brand
      if (!matchedBrand && brands.length > 0) {
        matchedBrand = brands[Math.floor(Math.random() * brands.length)];
      }

      if (matchedBrand) {
        await this.packModel.updateOne(
          { _id: (pack as any)._id },
          { $set: { brand_id: (matchedBrand as any)._id.toString() } },
        );
        details.push(`${pack.designation_fr} → ${(matchedBrand as any).designation_fr}`);
        updated++;
      }
    }

    return { updated, details };
  }
}
