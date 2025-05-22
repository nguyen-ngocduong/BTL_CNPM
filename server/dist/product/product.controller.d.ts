import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAllForUser(page: number, limit: number, name?: string): Promise<Pagination<Product>>;
    findAllByIds(ids: number[]): Promise<Product[]>;
    findNew(page?: number, limit?: number): Promise<Pagination<Product, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    findPopular(page?: number, limit?: number): Promise<Pagination<Product, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    findBySlug(slug: string): Promise<Product>;
    findProductByCategory(slug: string): Promise<Product[]>;
}
export declare class ProductAdminController {
    private readonly productService;
    constructor(productService: ProductService);
    topSelling(): Promise<any[]>;
    totalProduct(): Promise<number>;
    findAllForAdmin(page?: number, limit?: number, name?: string): Promise<Pagination<Product>>;
    findOne(id: number): Promise<Product>;
    create(createProductDto: CreateProductDto): Promise<{
        name: string;
        slug: string;
        description: string;
        images: {
            id: number;
            publicId: string;
            url: string;
        }[];
        variants: {
            id: number;
            price: number;
            quantity: number;
            attributeValues: {
                id: number;
            }[];
        }[];
        isNew: boolean;
        isActive: boolean;
        isPopular: boolean;
        category: {
            id: number;
        };
        attributeValues: {
            id: number;
        }[];
    } & Product>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        name?: string;
        slug?: string;
        description?: string;
        images?: {
            id: number;
            publicId: string;
            url: string;
        }[];
        variants?: {
            id: number;
            price: number;
            quantity: number;
            attributeValues: {
                id: number;
            }[];
        }[];
        isNew?: boolean;
        isActive?: boolean;
        isPopular?: boolean;
        category?: {
            id: number;
        };
        attributeValues?: {
            id: number;
        }[];
        id: number;
    } & Product>;
    remove(id: number): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
