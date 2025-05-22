import { Role } from './../../enums/role.enum';
import { Order } from './../../order/entities/order.entity';
import { CartItem } from './cartItem.entity';
export declare class User {
    id: number;
    fullName: string;
    phone: string;
    address: string;
    username: string;
    password: string;
    roles: Role[];
    orders: Order[];
    cartItems: CartItem[];
    createdDate: Date;
    updatedDate: Date;
}
