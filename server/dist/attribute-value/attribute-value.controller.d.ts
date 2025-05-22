import { AttributeValueService } from './attribute-value.service';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';
export declare class AttributeValueController {
    private readonly attributeValueService;
    constructor(attributeValueService: AttributeValueService);
    create(createAttributeValueDto: CreateAttributeValueDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    findAll(): Promise<import("./entities/attribute-value.entity").AttributeValue[]>;
    findOne(id: string): Promise<import("./entities/attribute-value.entity").AttributeValue>;
    update(id: string, updateAttributeValueDto: UpdateAttributeValueDto): Promise<void | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    remove(id: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
export declare class AttributeValueAdminController {
    private readonly attributeValueService;
    constructor(attributeValueService: AttributeValueService);
    create(createAttributeValueDto: CreateAttributeValueDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    findAll(): Promise<import("./entities/attribute-value.entity").AttributeValue[]>;
    findOne(id: string): Promise<import("./entities/attribute-value.entity").AttributeValue>;
    update(id: string, updateAttributeValueDto: UpdateAttributeValueDto): Promise<void | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    remove(id: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
