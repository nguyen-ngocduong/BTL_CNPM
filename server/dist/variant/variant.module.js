"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const variant_entity_1 = require("./entities/variant.entity");
const variant_controller_1 = require("./variant.controller");
const variant_service_1 = require("./variant.service");
let VariantModule = class VariantModule {
};
exports.VariantModule = VariantModule;
exports.VariantModule = VariantModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([variant_entity_1.Variant])],
        controllers: [variant_controller_1.VariantController],
        providers: [variant_service_1.VariantService],
        exports: [variant_service_1.VariantService],
    })
], VariantModule);
//# sourceMappingURL=variant.module.js.map