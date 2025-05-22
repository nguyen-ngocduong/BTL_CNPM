"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const attribute_value_module_1 = require("./attribute-value/attribute-value.module");
const attribute_module_1 = require("./attribute/attribute.module");
const auth_module_1 = require("./auth/auth.module");
const category_module_1 = require("./category/category.module");
const order_module_1 = require("./order/order.module");
const product_module_1 = require("./product/product.module");
const user_module_1 = require("./user/user.module");
const variant_module_1 = require("./variant/variant.module");
const specification_module_1 = require("./specification/specification.module");
const commnet_module_1 = require("./comment/commnet.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: process.env.DB_NAME,
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_SCHEMA,
                autoLoadEntities: true,
                synchronize: process.env.NODE_ENV === 'development',
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            category_module_1.CategoryModule,
            product_module_1.ProductModule,
            attribute_module_1.AttributeModule,
            attribute_value_module_1.AttributeValueModule,
            order_module_1.OrderModule,
            variant_module_1.VariantModule,
            specification_module_1.SpecificationModule,
            commnet_module_1.CommentModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map