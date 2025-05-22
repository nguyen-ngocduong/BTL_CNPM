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
exports.SpecificationController = void 0;
const common_1 = require("@nestjs/common");
const specification_service_1 = require("./specification.service");
const create_specification_dto_1 = require("./dto/create-specification.dto");
const update_specification_dto_1 = require("./dto/update-specification.dto");
let SpecificationController = class SpecificationController {
    constructor(specificationService) {
        this.specificationService = specificationService;
    }
    create(createSpecificationDto) {
        return this.specificationService.create(createSpecificationDto);
    }
    findAll() {
        return this.specificationService.findAll();
    }
    findOne(id) {
        console.log('Received ID:', id);
        return this.specificationService.findOne(parseInt(id, 10));
    }
    update(id, updateSpecificationDto) {
        return this.specificationService.update(id, updateSpecificationDto);
    }
    remove(id) {
        return this.specificationService.remove(id);
    }
    async getSpecificationsByProduct(productId) {
        return this.specificationService.findByProductId(Number(productId));
    }
};
exports.SpecificationController = SpecificationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_specification_dto_1.CreateSpecificationDto]),
    __metadata("design:returntype", void 0)
], SpecificationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('thong-ke/me'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SpecificationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpecificationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_specification_dto_1.UpdateSpecificationDto]),
    __metadata("design:returntype", void 0)
], SpecificationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SpecificationController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('product/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SpecificationController.prototype, "getSpecificationsByProduct", null);
exports.SpecificationController = SpecificationController = __decorate([
    (0, common_1.Controller)('specifications'),
    __metadata("design:paramtypes", [specification_service_1.SpecificationService])
], SpecificationController);
//# sourceMappingURL=specification.controller.js.map