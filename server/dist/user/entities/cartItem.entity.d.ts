import { User } from './user.entity';
import { Product } from './../../product/entities/product.entity';
export declare class CartItem {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    user: User;
    product: Product;
}
