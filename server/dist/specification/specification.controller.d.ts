import { SpecificationService } from './specification.service';
import { CreateSpecificationDto } from './dto/create-specification.dto';
import { UpdateSpecificationDto } from './dto/update-specification.dto';
export declare class SpecificationController {
    private readonly specificationService;
    constructor(specificationService: SpecificationService);
    create(createSpecificationDto: CreateSpecificationDto): Promise<import("./entities/specification.entity").Specification>;
    findAll(): Promise<import("./entities/specification.entity").Specification[]>;
    findOne(id: string): Promise<import("./entities/specification.entity").Specification>;
    update(id: number, updateSpecificationDto: UpdateSpecificationDto): Promise<import("./entities/specification.entity").Specification>;
    remove(id: number): Promise<void>;
    getSpecificationsByProduct(productId: number): Promise<import("./entities/specification.entity").Specification[]>;
}
