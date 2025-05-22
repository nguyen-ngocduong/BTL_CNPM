import { Request, Response } from 'express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getOrderList(body: any, page?: number, limit?: number, type?: number): Promise<Pagination<Order>>;
    create(createOrderDto: CreateOrderDto): Promise<CreateOrderDto & Order>;
    createZaloPayOrder(order: any): Promise<any>;
    zaloPayCallback(req: Request, res: Response): Promise<void>;
    checkOrderUser(data: any): Promise<Order>;
    findOne(id: number): Promise<Order>;
}
export declare class OrderAdminController {
    private readonly orderService;
    constructor(orderService: OrderService);
    salesStatistic(year?: string): Promise<any[]>;
    overview(): Promise<any[]>;
    totalRevenue(): Promise<any>;
    totalOrder(): Promise<number>;
    findAll(page?: number, limit?: number, name?: string): Promise<Pagination<Order>>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<{
        fullName?: string;
        phone?: number;
        address?: string;
        note?: string;
        shippingCost?: number;
        totalPrice?: number;
        paymentMethod?: string;
        user?: {
            id: number;
        };
        orderItems?: {
            orderId: number;
            variantId: number;
            orderedPrice: number;
            orderedQuantity: number;
        }[];
        id: number;
    } & Order>;
    updateOrderStatus(id: number, updateOrderStatusDto: UpdateOrderStatusDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
