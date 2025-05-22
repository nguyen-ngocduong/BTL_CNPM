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
exports.AttributeValueService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const variant_entity_1 = require("./../variant/entities/variant.entity");
const attribute_value_entity_1 = require("./entities/attribute-value.entity");
let AttributeValueService = class AttributeValueService {
    constructor(attributeValuesRepository, variantRepo) {
        this.attributeValuesRepository = attributeValuesRepository;
        this.variantRepo = variantRepo;
    }
    async create(createAttributeValueDto) {
        return this.attributeValuesRepository
            .save(createAttributeValueDto)
            .then(() => ({
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Register success',
        }));
    }
    findAll() {
        return this.attributeValuesRepository.find();
    }
    async findOne(id) {
        const exist = await this.attributeValuesRepository.findOneBy({ id });
        if (!exist) {
            throw new common_1.NotFoundException('Not found.');
        }
        return exist;
    }
    async update(id, updateAttributeValueDto) {
        const exist = await this.attributeValuesRepository.findOneBy({ id });
        if (!exist) {
            throw new common_1.NotFoundException('Not found.');
        }
        return this.attributeValuesRepository
            .update(id, updateAttributeValueDto)
            .then(() => ({
            statusCode: common_1.HttpStatus.OK,
            message: 'Update success',
        }))
            .catch((err) => console.log(err));
    }
    async remove(id) {
        const exist = await this.attributeValuesRepository.findOneBy({ id });
        if (!exist) {
            throw new common_1.NotFoundException('Not found.');
        }
        const existVariants = await this.variantRepo.findBy({
            attributeValues: { id },
        });
        if (existVariants.length > 0) {
            throw new common_1.InternalServerErrorException("Can't delete because it's linked");
        }
        try {
            return await this.attributeValuesRepository.delete({ id }).then(() => ({
                statusCode: common_1.HttpStatus.OK,
                message: 'Delete success',
            }));
        }
        catch (error) {
            if (error.errno === 1451) {
                throw new common_1.InternalServerErrorException("Can't delete because it's linked");
            }
            throw new common_1.InternalServerErrorException();
        }
    }
};
exports.AttributeValueService = AttributeValueService;
exports.AttributeValueService = AttributeValueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attribute_value_entity_1.AttributeValue)),
    __param(1, (0, typeorm_1.InjectRepository)(variant_entity_1.Variant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AttributeValueService);
//# sourceMappingURL=attribute-value.service.js.map