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
exports.ProductService = void 0;
const order_entity_1 = require("./../order/entities/order.entity");
const orderItem_entity_1 = require("./../order/entities/orderItem.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_2 = require("typeorm");
const image_entity_1 = require("./../image/entities/image.entity");
const variant_entity_1 = require("./../variant/entities/variant.entity");
const product_entity_1 = require("./entities/product.entity");
let ProductService = class ProductService {
    constructor(productRepo, imageRepo, variantRepo) {
        this.productRepo = productRepo;
        this.imageRepo = imageRepo;
        this.variantRepo = variantRepo;
    }
    async topSelling() {
        return this.productRepo
            .createQueryBuilder('product')
            .select('product.name', 'name')
            .addSelect('SUM(oi.orderedQuantity)', 'sold')
            .leftJoin(variant_entity_1.Variant, 'v', 'product.id = v.productId')
            .leftJoin(orderItem_entity_1.OrderItem, 'oi', 'v.id = oi.variantId')
            .leftJoin(order_entity_1.Order, 'o', 'o.id = oi.orderId')
            .groupBy('product.name')
            .having('sold > 0')
            .orderBy('sold', 'DESC')
            .limit(5)
            .getRawMany();
    }
    async findAllForAdmin(options, name) {
        return (0, nestjs_typeorm_paginate_1.paginate)(this.productRepo, options, {
            where: {
                name: (0, typeorm_2.Like)(`%${name}%`),
            },
            relations: {
                category: true,
                images: true,
                variants: true,
            },
            order: {
                updatedDate: 'DESC',
            },
        });
    }
    async findAllForUser(options, name) {
        return (0, nestjs_typeorm_paginate_1.paginate)(this.productRepo, options, {
            where: {
                isActive: true,
                name: (0, typeorm_2.Like)(`%${name}%`),
            },
            order: {
                createdDate: 'DESC',
            },
            relations: {
                category: true,
                images: true,
                variants: true,
            },
        });
    }
    async findNew(options) {
        return (0, nestjs_typeorm_paginate_1.paginate)(this.productRepo, options, {
            where: {
                isNew: true,
                isActive: true,
            },
            order: {
                createdDate: 'DESC',
            },
            relations: {
                images: true,
                variants: true,
            },
        });
    }
    async findPopular(options) {
        return (0, nestjs_typeorm_paginate_1.paginate)(this.productRepo, options, {
            where: {
                isPopular: true,
                isActive: true,
            },
            order: {
                createdDate: 'DESC',
            },
            relations: {
                images: true,
                variants: true,
            },
        });
    }
    findAll() {
        return this.productRepo.find({
            relations: {
                category: true,
                images: true,
                variants: true,
            },
        });
    }
    async findByIds(ids) {
        const exist = await this.productRepo.find({
            where: { id: (0, typeorm_2.In)(ids), isActive: true },
            relations: {
                category: true,
                images: true,
                variants: true,
            },
        });
        if (!exist) {
            throw new common_1.NotFoundException('Product not found.');
        }
        return exist;
    }
    async findById(id) {
        const exist = await this.productRepo.findOne({
            where: { id },
            relations: {
                category: true,
                images: true,
                variants: {
                    attributeValues: {
                        attribute: true,
                    },
                },
            },
        });
        if (!exist) {
            throw new common_1.NotFoundException('Product not found.');
        }
        return exist;
    }
    async findBySlugForUser(slug) {
        const exist = await this.productRepo.findOne({
            where: { slug, isActive: true },
            relations: {
                category: true,
                images: true,
                variants: {
                    attributeValues: {
                        attribute: true,
                    },
                },
            },
        });
        if (!exist) {
            throw new common_1.NotFoundException('Product not found.');
        }
        return exist;
    }
    async findByCategoryForUser(slug) {
        return await this.productRepo.find({
            where: {
                category: {
                    slug,
                },
                isActive: true,
            },
            relations: {
                images: true,
                variants: {
                    attributeValues: {
                        attribute: true,
                    },
                },
            },
        });
    }
    async create(createProductDto) {
        const name = await this.productRepo.findOneBy({
            name: createProductDto.name,
        });
        if (name)
            throw new common_1.BadRequestException('Name already exist');
        const slug = await this.productRepo.findOneBy({
            slug: createProductDto.slug,
        });
        if (slug)
            throw new common_1.BadRequestException('Slug already exist');
        const { images, variants } = createProductDto;
        let duplicateVariant = false;
        for (let i = 0; i < variants.length; i++) {
            const curr = variants[i].attributeValues;
            for (let j = i + 1; j < variants.length; j++) {
                const next = variants[j].attributeValues;
                if (JSON.stringify(curr) === JSON.stringify(next)) {
                    duplicateVariant = true;
                    break;
                }
            }
        }
        if (duplicateVariant)
            throw new common_1.BadRequestException('Duplicate variant attributes');
        await this.imageRepo.save(images);
        await this.variantRepo.save(variants);
        return this.productRepo.save(Object.assign({}, createProductDto));
    }
    async update(id, updateProductDto) {
        const exist = await this.productRepo.findOneBy({ id });
        if (!exist) {
            throw new common_1.NotFoundException('Product not found.');
        }
        const name = await this.productRepo
            .createQueryBuilder('product')
            .where('product.name = :nameUpdate and product.name != :nameExist', {
            nameUpdate: updateProductDto.name,
            nameExist: exist.name,
        })
            .getOne();
        if (name)
            throw new common_1.BadRequestException('Name already exist');
        const slug = await this.productRepo
            .createQueryBuilder('product')
            .where('product.slug = :slugUpdate and product.slug != :slugExist', {
            slugUpdate: updateProductDto.slug,
            slugExist: exist.slug,
        })
            .getOne();
        if (slug)
            throw new common_1.BadRequestException('Slug already exist');
        const { images, variants } = updateProductDto;
        let duplicateVariant = false;
        for (let i = 0; i < variants.length; i++) {
            const curr = variants[i].attributeValues;
            for (let j = i + 1; j < variants.length; j++) {
                const next = variants[j].attributeValues;
                if (JSON.stringify(curr) === JSON.stringify(next)) {
                    duplicateVariant = true;
                    break;
                }
            }
        }
        if (duplicateVariant)
            throw new common_1.BadRequestException('Duplicate variant attributes');
        await this.imageRepo.save(images);
        await this.variantRepo.save(variants);
        return this.productRepo.save(Object.assign({ id }, updateProductDto));
    }
    async remove(id) {
        const exist = await this.productRepo.findOneBy({ id });
        if (!exist) {
            throw new common_1.NotFoundException('Product not found.');
        }
        return this.productRepo.delete({ id }).then(() => ({
            statusCode: common_1.HttpStatus.OK,
            message: 'Delete success',
        }));
    }
    async count() {
        return await this.productRepo.count();
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(image_entity_1.Image)),
    __param(2, (0, typeorm_1.InjectRepository)(variant_entity_1.Variant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map