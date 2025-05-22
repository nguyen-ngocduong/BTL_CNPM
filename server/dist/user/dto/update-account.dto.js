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
exports.UpdateAccountDto = void 0;
const class_validator_1 = require("class-validator");
const role_enum_1 = require("./../../enums/role.enum");
const regex_1 = require("./../../libs/regex");
class UpdateAccountDto {
}
exports.UpdateAccountDto = UpdateAccountDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(6, 32),
    (0, class_validator_1.Matches)(regex_1.usernameRegex, {
        message: 'Username must contains at least 6 letter, no space, no special letters',
    }),
    __metadata("design:type", String)
], UpdateAccountDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(6, 32),
    (0, class_validator_1.Matches)(regex_1.passwordRegex, {
        message: 'Password must contains at least 1 number and uppercase letter',
    }),
    __metadata("design:type", String)
], UpdateAccountDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(role_enum_1.Role, { each: true }),
    __metadata("design:type", Array)
], UpdateAccountDto.prototype, "roles", void 0);
//# sourceMappingURL=update-account.dto.js.map