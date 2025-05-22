"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crypto_1 = require("crypto");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const rxjs_1 = require("rxjs");
const typeorm_2 = require("typeorm");
const orderStatus_enum_1 = require("./../enums/orderStatus.enum");
const order_entity_1 = require("./entities/order.entity");
const orderItem_entity_1 = require("./entities/orderItem.entity");
let OrderService = class OrderService {
    constructor(ordersRepo, orderItemsRepo, httpService) {
        this.ordersRepo = ordersRepo;
        this.orderItemsRepo = orderItemsRepo;
        this.httpService = httpService;
    }
    async create(createOrderDto) {
        const { orderItems } = createOrderDto;
        const order = await this.ordersRepo.save(createOrderDto);
        const newOrderItems = orderItems.map((o) => (Object.assign(Object.assign({}, o), { orderId: order.id })));
        await this.orderItemsRepo.save(newOrderItems);
        return order;
    }
    async update(id, updateOrderDto) {
        const exist = await this.ordersRepo.findOneBy({ id });
        if (!exist) {
            throw new common_1.NotFoundException('Order not found.');
        }
        const { orderItems } = updateOrderDto;
        await this.orderItemsRepo.save(orderItems);
        return this.ordersRepo.save(Object.assign({ id }, updateOrderDto));
    }
    async updateOrderStatus(id, updateOrderStatus) {
        const exist = await this.ordersRepo.findOneBy({ id });
        if (!exist) {
            throw new common_1.NotFoundException('Order not found.');
        }
        return this.ordersRepo.update(id, Object.assign({}, updateOrderStatus));
    }
    async findAll(options, name) {
        return (0, nestjs_typeorm_paginate_1.paginate)(this.ordersRepo, options, {
            where: [
                {
                    id: (0, typeorm_2.Raw)((alias) => `CAST(${alias} as char(20)) Like '%${name}%'`),
                },
                {
                    fullName: (0, typeorm_2.Like)(`%${name}%`),
                },
                {
                    user: {
                        username: (0, typeorm_2.Like)(`%${name}%`),
                    },
                },
            ],
            relations: {
                orderItems: true,
                user: true,
            },
            order: {
                updatedDate: 'DESC',
            },
        });
    }
    async findUserOrders(options, type, userId) {
        let orderStatus = null;
        switch (type) {
            case 1:
                orderStatus = orderStatus_enum_1.OrderStatus.Processing;
                break;
            case 2:
                orderStatus = orderStatus_enum_1.OrderStatus.Delivering;
                break;
            case 3:
                orderStatus = orderStatus_enum_1.OrderStatus.Delivered;
                break;
            case 4:
                orderStatus = orderStatus_enum_1.OrderStatus.Cancel;
                break;
            case 5:
                orderStatus = orderStatus_enum_1.OrderStatus.Return;
                break;
            case 6:
                orderStatus = orderStatus_enum_1.OrderStatus.Refund;
                break;
        }
        return (0, nestjs_typeorm_paginate_1.paginate)(this.ordersRepo, options, {
            where: {
                user: {
                    id: userId,
                },
                orderStatus,
            },
            relations: {
                orderItems: {
                    variant: {
                        product: true,
                        attributeValues: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        const exist = await this.ordersRepo.findOne({
            where: { id },
            relations: {
                user: true,
                orderItems: {
                    variant: {
                        product: {
                            images: true,
                        },
                        attributeValues: true,
                    },
                },
            },
        });
        if (!exist) {
            throw new common_1.NotFoundException('Order not found.');
        }
        delete exist.user.password;
        return exist;
    }
    async remove(id) {
        const exist = await this.ordersRepo.findOneBy({ id });
        if (!exist) {
            throw new common_1.NotFoundException('Order not found.');
        }
        return this.ordersRepo.delete({ id }).then(() => ({
            statusCode: common_1.HttpStatus.OK,
            message: 'Delete success',
        }));
    }
    async calculateTotalRevenue() {
        return await this.ordersRepo
            .createQueryBuilder('order')
            .select('SUM(order.totalPrice)', 'totalRevenue')
            .where('order.isPaid = true')
            .getRawOne();
    }
    async salesStatistic(year) {
        return this.ordersRepo
            .createQueryBuilder('order')
            .select('paymentMethod', 'method')
            .addSelect('MONTH(paidDate)', 'month')
            .addSelect('SUM(totalPrice)', 'total')
            .where(`isPaid = true and paidDate IS NOT NULL and YEAR(paidDate) = ${year}`)
            .groupBy('paymentMethod, MONTH(paidDate)')
            .getRawMany();
    }
    async count() {
        return await this.ordersRepo.count();
    }
    async overview() {
        return await this.ordersRepo
            .createQueryBuilder('order')
            .select('orderStatus')
            .addSelect('COUNT(order.id)', 'total')
            .groupBy('orderStatus')
            .getRawMany();
    }
    async createZaloPayOrder(order) {
        const yy = new Date().getFullYear().toString().slice(-2);
        const mm = String(new Date(Date.now()).getMonth() + 1).padStart(2, '0');
        const dd = String(new Date(Date.now()).getUTCDate()).padStart(2, '0');
        const items = order.orderItems.map((o) => {
            var _a;
            let attributes = '';
            for (const [i, at] of o.variant.attributeValues.entries()) {
                attributes += i === 0 ? ' - ' : ', ';
                attributes += `${at.value}`;
            }
            const itemname = ((_a = o.variant.product) === null || _a === void 0 ? void 0 : _a.name) + attributes;
            return {
                itemid: o.id,
                itemname,
                itemprice: o.orderedPrice,
                itemquantity: o.orderedQuantity,
            };
        });
        const server_uri = process.env.NODE_ENV === 'development'
            ? 'https://57c4-101-99-32-135.ap.ngrok.io'
            : process.env.SERVER;
        const callback_url = `${server_uri}/order/zalopay/callback`;
        const params = {
            app_id: 2553,
            app_user: order.fullName,
            app_trans_id: `${yy}${mm}${dd}_${order.id}_${Date.now()}`,
            embed_data: JSON.stringify({
                redirecturl: `${process.env.CLIENT}/order/${order.id}`,
                orderId: order.id,
            }),
            amount: 50000,
            item: JSON.stringify(items),
            app_time: Date.now(),
            bank_code: 'zalopayapp',
            phone: order.phone.toString(),
            address: order.address,
            description: `Thanh toán đơn hàng ${order.id}`,
            mac: '',
            callback_url,
        };
        const data = params.app_id +
            '|' +
            params.app_trans_id +
            '|' +
            params.app_user +
            '|' +
            params.amount +
            '|' +
            params.app_time +
            '|' +
            params.embed_data +
            '|' +
            params.item;
        const key1 = process.env.ZALO_KEY1;
        const mac = (0, crypto_1.createHmac)('sha256', key1).update(data).digest('hex');
        params.mac = mac;
        try {
            return (await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://sb-openapi.zalopay.vn/v2/create', Object.assign({}, params)))).data;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('ZaloPay Error');
        }
    }
    async checkOrderUser(data) {
        const exist = await this.ordersRepo.findOne({
            where: { id: data.orderId, user: { id: data.userId } },
        });
        if (!exist) {
            throw new common_1.NotFoundException('Not found.');
        }
        return exist;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(orderItem_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        axios_1.HttpService])
], OrderService);
//# sourceMappingURL=order.service.js.map