"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const express_1 = require("express");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.NODE_ENV === 'development' ? '*' : process.env.CLIENT,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Swagger Ecommerce')
        .setDescription('🛍️ Online Shopping Website | E-Commerce Platform\n' +
        '👋 Welcome to Online Shopping Website, an e-commerce platform that makes shopping easy, fast, and convenient. ' +
        'We offer a wide range of products, from fashion, electronics, home appliances, beauty to modern technology gadgets, ' +
        'all at affordable prices with exciting discounts.')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            url: '/api-json',
            deepLinking: true,
            displayRequestDuration: true,
        },
    });
    await app.listen(process.env.APP_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map