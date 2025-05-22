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
exports.VariantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const variant_entity_1 = require("./entities/variant.entity");
let VariantService = class VariantService {
    constructor(variantRepo) {
        this.variantRepo = variantRepo;
    }
    async findByIds(ids) {
        return await this.variantRepo.find({
            where: {
                id: (0, typeorm_2.In)(ids),
                product: {
                    isActive: true,
                },
            },
            relations: {
                product: {
                    images: true,
                },
                attributeValues: true,
            },
        });
    }
    async create(createVariantDto) {
        const newVariant = this.variantRepo.create(createVariantDto);
        return await this.variantRepo.save(newVariant);
    }
    async findAll() {
        return await this.variantRepo.find({
            relations: {
                product: true,
                attributeValues: true,
            },
        });
    }
    async findOne(id) {
        const variant = await this.variantRepo.findOne({
            where: { id },
            relations: {
                product: true,
                attributeValues: true,
            },
        });
        if (!variant) {
            throw new common_1.NotFoundException(`Variant with ID ${id} not found`);
        }
        return variant;
    }
    async update(id, updateVariantDto) {
        const variant = await this.variantRepo.preload(Object.assign({ id }, updateVariantDto));
        if (!variant) {
            throw new common_1.NotFoundException(`Variant with ID ${id} not found`);
        }
        return await this.variantRepo.save(variant);
    }
    async remove(id) {
        const result = await this.variantRepo.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Variant with ID ${id} not found`);
        }
    }
};
exports.VariantService = VariantService;
exports.VariantService = VariantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(variant_entity_1.Variant)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VariantService);
//# sourceMappingURL=variant.service.js.map