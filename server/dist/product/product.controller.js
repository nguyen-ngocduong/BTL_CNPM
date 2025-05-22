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
exports.ProductAdminController = exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const role_decorator_1 = require("../decorator/role.decorator");
const access_token_guard_1 = require("./../auth/access-token.guard");
const role_enum_1 = require("./../enums/role.enum");
const roles_guard_1 = require("./../guards/roles.guard");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async findAllForUser(page, limit, name = '') {
        limit = limit > 100 ? 100 : limit;
        return this.productService.findAllForUser({
            page,
            limit,
            route: `${process.env.SERVER}/product`,
        }, name);
    }
    async findAllByIds(ids) {
        return this.productService.findByIds(ids);
    }
    async findNew(page = 1, limit = 4) {
        limit = limit > 100 ? 100 : limit;
        return this.productService.findNew({
            page,
            limit,
            route: `${process.env.SERVER}/product/new`,
        });
    }
    async findPopular(page = 1, limit = 4) {
        limit = limit > 100 ? 100 : limit;
        return this.productService.findPopular({
            page,
            limit,
            route: `${process.env.SERVER}/product/popular`,
        });
    }
    findBySlug(slug) {
        return this.productService.findBySlugForUser(slug);
    }
    findProductByCategory(slug) {
        return this.productService.findByCategoryForUser(slug);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAllForUser", null);
__decorate([
    (0, common_1.Post)('cart-items'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAllByIds", null);
__decorate([
    (0, common_1.Get)('new'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(4), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findNew", null);
__decorate([
    (0, common_1.Get)('popular'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(4), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findPopular", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Get)('/category/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findProductByCategory", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
let ProductAdminController = class ProductAdminController {
    constructor(productService) {
        this.productService = productService;
    }
    async topSelling() {
        return this.productService.topSelling();
    }
    async totalProduct() {
        return this.productService.count();
    }
    async findAllForAdmin(page = 1, limit = 10, name = '') {
        limit = limit > 100 ? 100 : limit;
        return this.productService.findAllForAdmin({
            page,
            limit,
            route: `${process.env.SERVER}/admin/product`,
        }, name);
    }
    findOne(id) {
        return this.productService.findById(id);
    }
    create(createProductDto) {
        return this.productService.create(createProductDto);
    }
    update(id, updateProductDto) {
        return this.productService.update(id, updateProductDto);
    }
    remove(id) {
        return this.productService.remove(id);
    }
};
exports.ProductAdminController = ProductAdminController;
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Manager, role_enum_1.Role.Employee),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('top-selling'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductAdminController.prototype, "topSelling", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Manager, role_enum_1.Role.Employee),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('total-product'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductAdminController.prototype, "totalProduct", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Manager, role_enum_1.Role.Employee),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductAdminController.prototype, "findAllForAdmin", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Manager, role_enum_1.Role.Employee),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductAdminController.prototype, "findOne", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Manager),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductAdminController.prototype, "create", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Manager),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductAdminController.prototype, "update", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Manager),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductAdminController.prototype, "remove", null);
exports.ProductAdminController = ProductAdminController = __decorate([
    (0, common_1.Controller)('admin/product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductAdminController);
//# sourceMappingURL=product.controller.js.map