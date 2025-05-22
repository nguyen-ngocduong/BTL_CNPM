import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Variant } from './../variant/entities/variant.entity';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';
import { AttributeValue } from './entities/attribute-value.entity';
export declare class AttributeValueService {
    private attributeValuesRepository;
    private variantRepo;
    constructor(attributeValuesRepository: Repository<AttributeValue>, variantRepo: Repository<Variant>);
    create(createAttributeValueDto: CreateAttributeValueDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    findAll(): Promise<AttributeValue[]>;
    findOne(id: number): Promise<AttributeValue>;
    update(id: number, updateAttributeValueDto: UpdateAttributeValueDto): Promise<void | {
        statusCode: HttpStatus;
        message: string;
    }>;
    remove(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
