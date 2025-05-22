import { Product } from './../../product/entities/product.entity';
export declare class Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    isActive: boolean;
    products: Product[];
}
