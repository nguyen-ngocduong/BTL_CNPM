import { Product } from 'src/product/entities/product.entity';
export declare class Comment {
    id: number;
    content: string;
    product: Product;
    createdAt: Date;
}
