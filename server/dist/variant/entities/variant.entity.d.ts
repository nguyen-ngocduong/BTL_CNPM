import { AttributeValue } from './../../attribute-value/entities/attribute-value.entity';
import { OrderItem } from './../../order/entities/orderItem.entity';
import { Product } from './../../product/entities/product.entity';
export declare class Variant {
    id: number;
    price: number;
    quantity: number;
    product: Product;
    attributeValues: AttributeValue[];
    orderItems: OrderItem[];
}
