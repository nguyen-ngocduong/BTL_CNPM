import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
export declare class AttributeAdminController {
    private readonly attributeService;
    constructor(attributeService: AttributeService);
    create(createAttributeDto: CreateAttributeDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    findAll(): Promise<import("./entities/attribute.entity").Attribute[]>;
    findOne(id: number): Promise<import("./entities/attribute.entity").Attribute>;
    update(id: number, updateAttributeDto: UpdateAttributeDto): Promise<void | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    remove(id: number): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
