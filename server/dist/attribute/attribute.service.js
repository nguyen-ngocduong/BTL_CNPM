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
exports.AttributeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attribute_entity_1 = require("./entities/attribute.entity");
let AttributeService = class AttributeService {
    constructor(attributesRepository) {
        this.attributesRepository = attributesRepository;
    }
    async create(createAttributeDto) {
        const name = await this.attributesRepository.findOneBy({
            name: createAttributeDto.name,
        });
        if (name)
            throw new common_1.BadRequestException('Name already exist');
        return this.attributesRepository.save(createAttributeDto).then((res) => ({
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Register success',
        }));
    }
    findAll() {
        return this.attributesRepository.find({
            relations: { attributeValues: true },
            order: {
                id: 'DESC',
            },
        });
    }
    async findOne(id) {
        const exist = await this.attributesRepository.findOneBy({ id });
        if (!exist) {
            throw new common_1.NotFoundException('Attribute not found.');
        }
        return exist;
    }
    async update(id, updateAttributeDto) {
        const exist = await this.attributesRepository.findOneBy({ id });
        if (!exist) {
            throw new common_1.NotFoundException('Attribute not found.');
        }
        const name = await this.attributesRepository
            .createQueryBuilder('attribute')
            .where('attribute.name = :nameUpdate and attribute.name != :nameExist', {
            nameUpdate: updateAttributeDto.name,
            nameExist: exist.name,
        })
            .getOne();
        if (name)
            throw new common_1.BadRequestException('Name already exist');
        return this.attributesRepository
            .update(id, updateAttributeDto)
            .then((res) => ({
            statusCode: common_1.HttpStatus.OK,
            message: 'Update success',
        }))
            .catch((err) => console.log(err));
    }
    async remove(id) {
        const exist = await this.attributesRepository.findOneBy({ id });
        if (!exist) {
            throw new common_1.NotFoundException('Product not found.');
        }
        try {
            return await this.attributesRepository.delete({ id }).then((res) => ({
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
exports.AttributeService = AttributeService;
exports.AttributeService = AttributeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attribute_entity_1.Attribute)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AttributeService);
//# sourceMappingURL=attribute.service.js.map