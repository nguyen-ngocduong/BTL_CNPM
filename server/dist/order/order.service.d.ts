import { HttpService } from '@nestjs/axios';
import { HttpStatus } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderItem.entity';
export declare class OrderService {
    private ordersRepo;
    private orderItemsRepo;
    private readonly httpService;
    constructor(ordersRepo: Repository<Order>, orderItemsRepo: Repository<OrderItem>, httpService: HttpService);
    create(createOrderDto: CreateOrderDto): Promise<CreateOrderDto & Order>;
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
    updateOrderStatus(id: number, updateOrderStatus: UpdateOrderStatusDto): Promise<import("typeorm").UpdateResult>;
    findAll(options: IPaginationOptions, name: string): Promise<Pagination<Order>>;
    findUserOrders(options: IPaginationOptions, type: number, userId: number): Promise<Pagination<Order>>;
    findOne(id: number): Promise<Order>;
    remove(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    calculateTotalRevenue(): Promise<any>;
    salesStatistic(year: string): Promise<any[]>;
    count(): Promise<number>;
    overview(): Promise<any[]>;
    createZaloPayOrder(order: any): Promise<any>;
    checkOrderUser(data: any): Promise<Order>;
}
