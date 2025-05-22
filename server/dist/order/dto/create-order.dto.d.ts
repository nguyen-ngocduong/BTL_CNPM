declare class UserDto {
    id: number;
}
declare class OrderItemDto {
    orderId: number;
    variantId: number;
    orderedPrice: number;
    orderedQuantity: number;
}
export declare class CreateOrderDto {
    fullName: string;
    phone: number;
    address: string;
    note: string;
    shippingCost: number;
    totalPrice: number;
    paymentMethod: string;
    user: UserDto;
    orderItems: OrderItemDto[];
}
export {};
