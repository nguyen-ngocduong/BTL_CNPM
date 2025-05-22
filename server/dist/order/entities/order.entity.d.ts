import { OrderStatus } from '../../enums/orderStatus.enum';
import { User } from './../../user/entities/user.entity';
import { OrderItem } from './orderItem.entity';
export declare class Order {
    id: number;
    fullName: string;
    phone: number;
    address: string;
    note: string;
    shippingCost: number;
    orderStatus: OrderStatus;
    totalPrice: number;
    paymentMethod: string;
    isPaid: boolean;
    user: User;
    orderItems: OrderItem[];
    paidDate: Date;
    createdDate: Date;
    updatedDate: Date;
}
