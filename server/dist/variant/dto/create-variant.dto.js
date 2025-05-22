"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVariantDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const variant_entity_1 = require("../entities/variant.entity");
class CreateVariantDto extends (0, mapped_types_1.PartialType)(variant_entity_1.Variant) {
}
exports.CreateVariantDto = CreateVariantDto;
//# sourceMappingURL=create-variant.dto.js.map