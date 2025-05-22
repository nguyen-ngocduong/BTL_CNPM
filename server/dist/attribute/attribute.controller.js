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
exports.AttributeAdminController = void 0;
const common_1 = require("@nestjs/common");
const role_decorator_1 = require("../decorator/role.decorator");
const access_token_guard_1 = require("./../auth/access-token.guard");
const role_enum_1 = require("./../enums/role.enum");
const roles_guard_1 = require("./../guards/roles.guard");
const attribute_service_1 = require("./attribute.service");
const create_attribute_dto_1 = require("./dto/create-attribute.dto");
const update_attribute_dto_1 = require("./dto/update-attribute.dto");
let AttributeAdminController = class AttributeAdminController {
    constructor(attributeService) {
        this.attributeService = attributeService;
    }
    create(createAttributeDto) {
        return this.attributeService.create(createAttributeDto);
    }
    findAll() {
        return this.attributeService.findAll();
    }
    findOne(id) {
        return this.attributeService.findOne(id);
    }
    update(id, updateAttributeDto) {
        return this.attributeService.update(id, updateAttributeDto);
    }
    remove(id) {
        return this.attributeService.remove(id);
    }
};
exports.AttributeAdminController = AttributeAdminController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attribute_dto_1.CreateAttributeDto]),
    __metadata("design:returntype", void 0)
], AttributeAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AttributeAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AttributeAdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_attribute_dto_1.UpdateAttributeDto]),
    __metadata("design:returntype", void 0)
], AttributeAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AttributeAdminController.prototype, "remove", null);
exports.AttributeAdminController = AttributeAdminController = __decorate([
    (0, common_1.Controller)('admin/attribute'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Manager),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [attribute_service_1.AttributeService])
], AttributeAdminController);
//# sourceMappingURL=attribute.controller.js.map