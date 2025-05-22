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
exports.AttributeValueAdminController = exports.AttributeValueController = void 0;
const roles_guard_1 = require("./../guards/roles.guard");
const access_token_guard_1 = require("./../auth/access-token.guard");
const role_enum_1 = require("./../enums/role.enum");
const common_1 = require("@nestjs/common");
const role_decorator_1 = require("../decorator/role.decorator");
const attribute_value_service_1 = require("./attribute-value.service");
const create_attribute_value_dto_1 = require("./dto/create-attribute-value.dto");
const update_attribute_value_dto_1 = require("./dto/update-attribute-value.dto");
let AttributeValueController = class AttributeValueController {
    constructor(attributeValueService) {
        this.attributeValueService = attributeValueService;
    }
    create(createAttributeValueDto) {
        return this.attributeValueService.create(createAttributeValueDto);
    }
    findAll() {
        return this.attributeValueService.findAll();
    }
    findOne(id) {
        return this.attributeValueService.findOne(+id);
    }
    update(id, updateAttributeValueDto) {
        return this.attributeValueService.update(+id, updateAttributeValueDto);
    }
    remove(id) {
        return this.attributeValueService.remove(+id);
    }
};
exports.AttributeValueController = AttributeValueController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attribute_value_dto_1.CreateAttributeValueDto]),
    __metadata("design:returntype", void 0)
], AttributeValueController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AttributeValueController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttributeValueController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attribute_value_dto_1.UpdateAttributeValueDto]),
    __metadata("design:returntype", void 0)
], AttributeValueController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttributeValueController.prototype, "remove", null);
exports.AttributeValueController = AttributeValueController = __decorate([
    (0, common_1.Controller)('attribute-value'),
    __metadata("design:paramtypes", [attribute_value_service_1.AttributeValueService])
], AttributeValueController);
let AttributeValueAdminController = class AttributeValueAdminController {
    constructor(attributeValueService) {
        this.attributeValueService = attributeValueService;
    }
    create(createAttributeValueDto) {
        return this.attributeValueService.create(createAttributeValueDto);
    }
    findAll() {
        return this.attributeValueService.findAll();
    }
    findOne(id) {
        return this.attributeValueService.findOne(+id);
    }
    update(id, updateAttributeValueDto) {
        return this.attributeValueService.update(+id, updateAttributeValueDto);
    }
    remove(id) {
        return this.attributeValueService.remove(+id);
    }
};
exports.AttributeValueAdminController = AttributeValueAdminController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attribute_value_dto_1.CreateAttributeValueDto]),
    __metadata("design:returntype", void 0)
], AttributeValueAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AttributeValueAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttributeValueAdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attribute_value_dto_1.UpdateAttributeValueDto]),
    __metadata("design:returntype", void 0)
], AttributeValueAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttributeValueAdminController.prototype, "remove", null);
exports.AttributeValueAdminController = AttributeValueAdminController = __decorate([
    (0, common_1.Controller)('admin/attribute-value'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Manager),
    (0, common_1.UseGuards)(access_token_guard_1.AccessTokenGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [attribute_value_service_1.AttributeValueService])
], AttributeValueAdminController);
//# sourceMappingURL=attribute-value.controller.js.map