import { HttpStatus } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { Image } from './../image/entities/image.entity';
import { Variant } from './../variant/entities/variant.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductService {
    private productRepo;
    private imageRepo;
    private variantRepo;
    constructor(productRepo: Repository<Product>, imageRepo: Repository<Image>, variantRepo: Repository<Variant>);
    topSelling(): Promise<any[]>;
    findAllForAdmin(options: IPaginationOptions, name: string): Promise<Pagination<Product>>;
    findAllForUser(options: IPaginationOptions, name: string): Promise<Pagination<Product>>;
    findNew(options: IPaginationOptions): Promise<Pagination<Product>>;
    findPopular(options: IPaginationOptions): Promise<Pagination<Product>>;
    findAll(): Promise<Product[]>;
    findByIds(ids: number[]): Promise<Product[]>;
    findById(id: number): Promise<Product>;
    findBySlugForUser(slug: string): Promise<Product>;
    findByCategoryForUser(slug: string): Promise<Product[]>;
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
        statusCode: HttpStatus;
        message: string;
    }>;
    count(): Promise<number>;
}
