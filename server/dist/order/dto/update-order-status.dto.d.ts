import { OrderStatus } from './../../enums/orderStatus.enum';
export declare class UpdateOrderStatusDto {
    orderStatus: OrderStatus;
    isPaid: boolean;
    paidDate: string;
}
