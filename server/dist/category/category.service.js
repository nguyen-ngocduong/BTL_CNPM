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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
let CategoryService = class CategoryService {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async create(createCategoryDto) {
        const name = await this.categoriesRepository.findOneBy({
            name: createCategoryDto.name,
        });
        if (name)
            throw new common_1.BadRequestException('Name already exist');
        const slug = await this.categoriesRepository.findOneBy({
            slug: createCategoryDto.slug,
        });
        if (slug)
            throw new common_1.BadRequestException('Slug already exist');
        return this.categoriesRepository.save(createCategoryDto).then((res) => ({
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Register success',
        }));
    }
    findAllForAdmin() {
        return this.categoriesRepository.find({});
    }
    findAllForUser() {
        return this.categoriesRepository.find({
            where: {
                isActive: true,
            },
        });
    }
    async findBySlugForUser(slug) {
        const exist = await this.categoriesRepository.findOne({
            where: { slug, isActive: true },
        });
        if (!exist) {
            throw new common_1.NotFoundException('Category not found.');
        }
        return exist;
    }
    async findOne(id) {
        const exist = await this.categoriesRepository.findOne({
            where: { id },
        });
        if (!exist) {
            throw new common_1.NotFoundException('Category not found.');
        }
        return exist;
    }
    async update(id, updateCategoryDto) {
        const exist = await this.categoriesRepository.findOneBy({ id });
        if (!exist) {
            throw new common_1.NotFoundException('Category not found.');
        }
        const name = await this.categoriesRepository
            .createQueryBuilder('category')
            .where('category.name = :nameUpdate and category.name != :nameExist', {
            nameUpdate: updateCategoryDto.name,
            nameExist: exist.name,
        })
            .getOne();
        if (name)
            throw new common_1.BadRequestException('Name already exist');
        const slug = await this.categoriesRepository
            .createQueryBuilder('category')
            .where('category.slug = :slugUpdate and category.slug != :slugExist', {
            slugUpdate: updateCategoryDto.slug,
            slugExist: exist.slug,
        })
            .getOne();
        if (slug)
            throw new common_1.BadRequestException('Slug already exist');
        return this.categoriesRepository
            .update(id, updateCategoryDto)
            .then((res) => ({
            statusCode: common_1.HttpStatus.OK,
            message: 'Update success',
        }))
            .catch((err) => console.log(err));
    }
    async remove(id) {
        const exist = await this.categoriesRepository.findOneBy({ id });
        if (!exist) {
            throw new common_1.NotFoundException('Category not found.');
        }
        return this.categoriesRepository.delete({ id }).then(() => ({
            statusCode: common_1.HttpStatus.OK,
            message: 'Delete success',
        }));
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
//# sourceMappingURL=category.service.js.map