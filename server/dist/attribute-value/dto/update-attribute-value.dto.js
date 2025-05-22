"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAttributeValueDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_attribute_value_dto_1 = require("./create-attribute-value.dto");
class UpdateAttributeValueDto extends (0, mapped_types_1.PartialType)(create_attribute_value_dto_1.CreateAttributeValueDto) {
}
exports.UpdateAttributeValueDto = UpdateAttributeValueDto;
//# sourceMappingURL=update-attribute-value.dto.js.map