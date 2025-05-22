import { Repository } from 'typeorm';
import { Variant } from './entities/variant.entity';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
export declare class VariantService {
    private variantRepo;
    constructor(variantRepo: Repository<Variant>);
    findByIds(ids: number[]): Promise<Variant[]>;
    create(createVariantDto: CreateVariantDto): Promise<Variant>;
    findAll(): Promise<Variant[]>;
    findOne(id: number): Promise<Variant>;
    update(id: number, updateVariantDto: UpdateVariantDto): Promise<Variant>;
    remove(id: number): Promise<void>;
}
