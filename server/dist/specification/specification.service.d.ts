import { Repository } from 'typeorm';
import { Specification } from './entities/specification.entity';
import { CreateSpecificationDto } from './dto/create-specification.dto';
import { UpdateSpecificationDto } from './dto/update-specification.dto';
import { Product } from 'src/product/entities/product.entity';
export declare class SpecificationService {
    private readonly specificationRepository;
    private readonly productRepository;
    constructor(specificationRepository: Repository<Specification>, productRepository: Repository<Product>);
    create(createSpecificationDto: CreateSpecificationDto): Promise<Specification>;
    findAll(): Promise<Specification[]>;
    findByProductId(productId: number): Promise<Specification[]>;
    findOne(id: number): Promise<Specification>;
    update(id: number, updateSpecificationDto: UpdateSpecificationDto): Promise<Specification>;
    remove(id: number): Promise<void>;
}
