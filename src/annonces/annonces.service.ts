import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
import { Annonce, AnnonceDocument } from './schemas/annonce.schema';

@Injectable()
export class AnnoncesService {
    constructor(@InjectModel(Annonce.name) private annonceModel: Model<AnnonceDocument>) { }

    async create(createAnnonceDto: CreateAnnonceDto): Promise<Annonce> {
        const createdAnnonce = new this.annonceModel(createAnnonceDto);
        return createdAnnonce.save();
    }

    async findAll(): Promise<Annonce[]> {
        return this.annonceModel.find().sort({ createdAt: -1 }).exec();
    }

    async findOne(id: string): Promise<Annonce> {
        const annonce = await this.annonceModel.findById(id).exec();
        if (!annonce) {
            throw new NotFoundException(`Annonce with ID ${id} not found`);
        }
        return annonce;
    }

    async update(id: string, updateAnnonceDto: UpdateAnnonceDto): Promise<Annonce> {
        const updatedAnnonce = await this.annonceModel.findByIdAndUpdate(id, updateAnnonceDto, { new: true }).exec();
        if (!updatedAnnonce) {
            throw new NotFoundException(`Annonce with ID ${id} not found`);
        }
        return updatedAnnonce;
    }

    async remove(id: string): Promise<Annonce> {
        const deletedAnnonce = await this.annonceModel.findByIdAndDelete(id).exec();
        if (!deletedAnnonce) {
            throw new NotFoundException(`Annonce with ID ${id} not found`);
        }
        return deletedAnnonce;
    }
}
