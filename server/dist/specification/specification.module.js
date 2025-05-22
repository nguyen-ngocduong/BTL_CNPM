"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const specification_entity_1 = require("./entities/specification.entity");
const specification_service_1 = require("./specification.service");
const specification_controller_1 = require("./specification.controller");
const product_entity_1 = require("../product/entities/product.entity");
let SpecificationModule = class SpecificationModule {
};
exports.SpecificationModule = SpecificationModule;
exports.SpecificationModule = SpecificationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([specification_entity_1.Specification, product_entity_1.Product])],
        controllers: [specification_controller_1.SpecificationController],
        providers: [specification_service_1.SpecificationService],
        exports: [specification_service_1.SpecificationService],
    })
], SpecificationModule);
//# sourceMappingURL=specification.module.js.map