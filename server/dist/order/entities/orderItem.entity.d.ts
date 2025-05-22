import { Variant } from './../../variant/entities/variant.entity';
import { Order } from './order.entity';
export declare class OrderItem {
    id: number;
    orderId: number;
    variantId: number;
    orderedPrice: number;
    orderedQuantity: number;
    order: Order;
    variant: Variant;
}
