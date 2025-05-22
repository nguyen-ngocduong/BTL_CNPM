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
exports.VariantController = void 0;
const common_1 = require("@nestjs/common");
const variant_service_1 = require("./variant.service");
const create_variant_dto_1 = require("./dto/create-variant.dto");
const update_variant_dto_1 = require("./dto/update-variant.dto");
let VariantController = class VariantController {
    constructor(variantService) {
        this.variantService = variantService;
    }
    async findAllByIds(ids) {
        return this.variantService.findByIds(ids);
    }
    create(createVariantDto) {
        return this.variantService.create(createVariantDto);
    }
    findAll() {
        return this.variantService.findAll();
    }
    findOne(id) {
        return this.variantService.findOne(+id);
    }
    update(id, updateVariantDto) {
        return this.variantService.update(+id, updateVariantDto);
    }
    remove(id) {
        return this.variantService.remove(+id);
    }
};
exports.VariantController = VariantController;
__decorate([
    (0, common_1.Post)('active'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], VariantController.prototype, "findAllByIds", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_variant_dto_1.CreateVariantDto]),
    __metadata("design:returntype", void 0)
], VariantController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('find/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VariantController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('find/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VariantController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_variant_dto_1.UpdateVariantDto]),
    __metadata("design:returntype", void 0)
], VariantController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VariantController.prototype, "remove", null);
exports.VariantController = VariantController = __decorate([
    (0, common_1.Controller)('variant'),
    __metadata("design:paramtypes", [variant_service_1.VariantService])
], VariantController);
//# sourceMappingURL=variant.controller.js.map