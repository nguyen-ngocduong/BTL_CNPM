import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Attribute } from './entities/attribute.entity';
export declare class AttributeService {
    private attributesRepository;
    constructor(attributesRepository: Repository<Attribute>);
    create(createAttributeDto: CreateAttributeDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    findAll(): Promise<Attribute[]>;
    findOne(id: number): Promise<Attribute>;
    update(id: number, updateAttributeDto: UpdateAttributeDto): Promise<void | {
        statusCode: HttpStatus;
        message: string;
    }>;
    remove(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
