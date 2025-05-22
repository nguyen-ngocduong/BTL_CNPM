"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeValueModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const attribute_module_1 = require("../attribute/attribute.module");
const variant_entity_1 = require("./../variant/entities/variant.entity");
const attribute_value_controller_1 = require("./attribute-value.controller");
const attribute_value_service_1 = require("./attribute-value.service");
const attribute_value_entity_1 = require("./entities/attribute-value.entity");
let AttributeValueModule = class AttributeValueModule {
};
exports.AttributeValueModule = AttributeValueModule;
exports.AttributeValueModule = AttributeValueModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([attribute_value_entity_1.AttributeValue, variant_entity_1.Variant]),
            attribute_module_1.AttributeModule,
        ],
        controllers: [attribute_value_controller_1.AttributeValueAdminController],
        providers: [attribute_value_service_1.AttributeValueService],
        exports: [attribute_value_service_1.AttributeValueService],
    })
], AttributeValueModule);
//# sourceMappingURL=attribute-value.module.js.map