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
exports.SpecificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const specification_entity_1 = require("./entities/specification.entity");
const product_entity_1 = require("../product/entities/product.entity");
let SpecificationService = class SpecificationService {
    constructor(specificationRepository, productRepository) {
        this.specificationRepository = specificationRepository;
        this.productRepository = productRepository;
    }
    async create(createSpecificationDto) {
        const newSpec = this.specificationRepository.create(createSpecificationDto);
        return this.specificationRepository.save(newSpec);
    }
    async findAll() {
        return this.specificationRepository.find();
    }
    async findByProductId(productId) {
        const specs = await this.specificationRepository.find({
            where: { productId },
            relations: ['product'],
        });
        if (!specs.length) {
            throw new common_1.NotFoundException(`Không tìm thấy thông số kỹ thuật cho sản phẩm có ID ${productId}`);
        }
        return specs;
    }
    async findOne(id) {
        const spec = await this.specificationRepository.findOne({ where: { id } });
        if (!spec) {
            throw new common_1.NotFoundException(`Specification with ID ${id} not found`);
        }
        return spec;
    }
    async update(id, updateSpecificationDto) {
        const spec = await this.findOne(id);
        Object.assign(spec, updateSpecificationDto);
        return this.specificationRepository.save(spec);
    }
    async remove(id) {
        await this.findOne(id);
        await this.specificationRepository.delete(id);
    }
};
exports.SpecificationService = SpecificationService;
exports.SpecificationService = SpecificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(specification_entity_1.Specification)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SpecificationService);
//# sourceMappingURL=specification.service.js.map