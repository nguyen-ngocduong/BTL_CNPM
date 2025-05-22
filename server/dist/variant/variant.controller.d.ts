import { VariantService } from './variant.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
export declare class VariantController {
    private readonly variantService;
    constructor(variantService: VariantService);
    findAllByIds(ids: number[]): Promise<import("./entities/variant.entity").Variant[]>;
    create(createVariantDto: CreateVariantDto): Promise<import("./entities/variant.entity").Variant>;
    findAll(): Promise<import("./entities/variant.entity").Variant[]>;
    findOne(id: string): Promise<import("./entities/variant.entity").Variant>;
    update(id: string, updateVariantDto: UpdateVariantDto): Promise<import("./entities/variant.entity").Variant>;
    remove(id: string): Promise<void>;
}
