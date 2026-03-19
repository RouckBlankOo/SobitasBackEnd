import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { FaqsService } from './faqs.service';
import { CreateFaqDto, UpdateFaqDto } from './dto/faqs.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('faqs')
@Controller('faqs')
export class FaqsController {
    constructor(private readonly faqsService: FaqsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all FAQs' })
    async findAll() {
        const faqs = await this.faqsService.findAll();
        return {
            message: 'FAQs fetched successfully',
            data: faqs,
        };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get FAQ by ID' })
    async findOne(@Param('id') id: string) {
        const faq = await this.faqsService.findOne(id);
        return {
            message: 'FAQ fetched successfully',
            data: faq,
        };
    }

    @Post()
    @UseGuards(JwtAuthGuard, AdminGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Create new FAQ (Admin only)' })
    async create(@Body() createFaqDto: CreateFaqDto) {
        const faq = await this.faqsService.create(createFaqDto);
        return {
            message: 'FAQ created successfully',
            data: faq,
        };
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, AdminGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Update FAQ (Admin only)' })
    async update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
        const faq = await this.faqsService.update(id, updateFaqDto);
        return {
            message: 'FAQ updated successfully',
            data: faq,
        };
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, AdminGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Delete FAQ (Admin only)' })
    async remove(@Param('id') id: string) {
        await this.faqsService.remove(id);
        return { message: 'FAQ deleted successfully' };
    }
}
