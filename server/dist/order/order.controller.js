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
exports.OrderAdminController = exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const role_decorator_1 = require("../decorator/role.decorator");
const access_token_guard_1 = require("./../auth/access-token.guard");
const role_enum_1 = require("./../enums/role.enum");
const roles_guard_1 = require("./../guards/roles.guard");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_status_dto_1 = require("./dto/update-order-status.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const order_service_1 = require("./order.service");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    getOrderList(body, page = 1, limit = 10, type = 0) {
        limit = limit > 100 ? 100 : limit;
        const userId = body.userId;
        return this.orderService.findUserOrders({
            page,
            limit,
            route: `${process.env.SERVER}/order/list`,
        }, type, userId);
    }
    create(createOrderDto) {
        return this.orderService.create(createOrderDto);
    }
    createZaloPayOrder(order) {
        return this.orderService.createZaloPayOrder(order);
    }
    async zaloPayCallback(req, res) {
        const result = {};
        const key2 = process.env.ZALO_KEY2;
        try {
            const dataStr = req.body.data;
            const reqMac = req.body.mac;
            const mac = (0, crypto_1.createHmac)('sha256', key2).update(dataStr).digest('hex');
            if (reqMac !== mac) {
                result.returncode = -1;
                result.returnmessage = 'mac not equal';
            }
            else {
                const dataJson = JSON.parse(dataStr);
                const orderId = JSON.parse(dataJson['embed_data']).orderId;
                const orderUpdate = new update_order_status_dto_1.UpdateOrderStatusDto();
                orderUpdate.isPaid = true;
                orderUpdate.paidDate = new Date().toISOString();
                await this.orderService.updateOrderStatus(orderId, orderUpdate);
                result.returncode = 1;
                result.returnmessage = 'success';
            }
        }
        catch (ex) {
            result.returncode = 0;
            result.returnmessage = ex.message;
        }
        res.json(result);
    }
    checkOrderUser(data) {
        return this.orderService.checkOrderUser(data);
    }
    findOne(id) {
        return this.orderService.findOne(id);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Manager, role_enum_1.Role.Employee),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('list'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('type', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderList", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Manager, role_enum_1.Role.Employee),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "create", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Manager, role_enum_1.Role.Employee),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('zalopay/create-order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "createZaloPayOrder", null);
__decorate([
    (0, common_1.Post)('zalopay/callback'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "zaloPayCallback", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Manager, role_enum_1.Role.Employee),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('check-order-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "checkOrderUser", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Manager, role_enum_1.Role.Employee),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findOne", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
let OrderAdminController = class OrderAdminController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async salesStatistic(year = new Date().getFullYear().toString()) {
        return this.orderService.salesStatistic(year);
    }
    async overview() {
        return this.orderService.overview();
    }
    async totalRevenue() {
        return this.orderService.calculateTotalRevenue();
    }
    async totalOrder() {
        return this.orderService.count();
    }
    async findAll(page = 1, limit = 10, name = '') {
        limit = limit > 100 ? 100 : limit;
        return this.orderService.findAll({
            page,
            limit,
            route: `${process.env.SERVER}/admin/order`,
        }, name);
    }
    update(id, updateOrderDto) {
        return this.orderService.update(id, updateOrderDto);
    }
    updateOrderStatus(id, updateOrderStatusDto) {
        return this.orderService.updateOrderStatus(id, updateOrderStatusDto);
    }
    remove(id) {
        return this.orderService.remove(id);
    }
};
exports.OrderAdminController = OrderAdminController;
__decorate([
    (0, common_1.Get)('sales-statistic'),
    __param(0, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderAdminController.prototype, "salesStatistic", null);
__decorate([
    (0, common_1.Get)('overview'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderAdminController.prototype, "overview", null);
__decorate([
    (0, common_1.Get)('total-revenue'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderAdminController.prototype, "totalRevenue", null);
__decorate([
    (0, common_1.Get)('total-order'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderAdminController.prototype, "totalOrder", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", void 0)
], OrderAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('update-status/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_order_status_dto_1.UpdateOrderStatusDto]),
    __metadata("design:returntype", void 0)
], OrderAdminController.prototype, "updateOrderStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderAdminController.prototype, "remove", null);
exports.OrderAdminController = OrderAdminController = __decorate([
    (0, common_1.Controller)('admin/order'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Manager, role_enum_1.Role.Employee),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderAdminController);
//# sourceMappingURL=order.controller.js.map