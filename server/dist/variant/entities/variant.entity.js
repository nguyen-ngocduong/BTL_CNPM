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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variant = void 0;
const typeorm_1 = require("typeorm");
const attribute_value_entity_1 = require("./../../attribute-value/entities/attribute-value.entity");
const orderItem_entity_1 = require("./../../order/entities/orderItem.entity");
const product_entity_1 = require("./../../product/entities/product.entity");
let Variant = class Variant {
};
exports.Variant = Variant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Variant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Variant.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Variant.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.variants, {
        cascade: true,
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    }),
    __metadata("design:type", product_entity_1.Product)
], Variant.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => attribute_value_entity_1.AttributeValue),
    (0, typeorm_1.JoinTable)({
        name: 'variant_attribute_value',
    }),
    __metadata("design:type", Array)
], Variant.prototype, "attributeValues", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderItem_entity_1.OrderItem, (orderItem) => orderItem.variant),
    __metadata("design:type", Array)
], Variant.prototype, "orderItems", void 0);
exports.Variant = Variant = __decorate([
    (0, typeorm_1.Entity)()
], Variant);
//# sourceMappingURL=variant.entity.js.map