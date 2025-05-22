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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_2 = require("typeorm");
const role_enum_1 = require("./../enums/role.enum");
const user_entity_1 = require("./entities/user.entity");
const saltOrRounds = 10;
let UserService = class UserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserDto) {
        const exist = await this.usersRepository.findOneBy({
            username: createUserDto.username,
        });
        if (exist)
            throw new common_1.BadRequestException('username already exist');
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
        createUserDto.password = hashedPassword;
        return this.usersRepository.save(createUserDto).then((res) => ({
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Register success',
        }));
    }
    async createEmployee(createEmployeeDto) {
        const exist = await this.usersRepository.findOneBy({
            username: createEmployeeDto.username,
        });
        if (exist)
            throw new common_1.BadRequestException('username already exist');
        const hashedPassword = await bcrypt.hash(createEmployeeDto.password, saltOrRounds);
        createEmployeeDto.password = hashedPassword;
        return this.usersRepository.save(createEmployeeDto).then((res) => ({
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Register success',
        }));
    }
    async findAllForAdmin(options, name) {
        const queryBuilder = this.usersRepository.createQueryBuilder('user');
        queryBuilder
            .where([
            {
                id: (0, typeorm_2.Raw)((alias) => `CAST(${alias} as char(20)) Like '%${name}%'`),
            },
            {
                username: (0, typeorm_2.Like)(`%${name}%`),
            },
        ])
            .andWhere(':role1 IN(user.roles) or :role2 IN(user.roles)', {
            role1: role_enum_1.Role.Manager,
            role2: role_enum_1.Role.Employee,
        })
            .orderBy('user.updatedDate', 'DESC');
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, options);
    }
    async findOne(id) {
        const exist = await this.usersRepository.findOneBy({ id });
        if (!exist) {
            throw new common_1.NotFoundException('User not found.');
        }
        return exist;
    }
    async findByName(username) {
        const exist = await this.usersRepository.findOneBy({ username });
        if (!exist) {
            throw new common_1.NotFoundException('User not found.');
        }
        return exist;
    }
    async update(id, updateUserDto) {
        const exist = await this.usersRepository.findOneBy({ id });
        if (!exist) {
            throw new common_1.NotFoundException('User not found.');
        }
        return this.usersRepository.update(id, updateUserDto).then((res) => ({
            statusCode: common_1.HttpStatus.OK,
            message: 'Update success',
        }));
    }
    async updateAccount(id, updateAccountDto) {
        const exist = await this.usersRepository.findOneBy({ id });
        if (!exist) {
            throw new common_1.NotFoundException('User not found.');
        }
        const hashedPassword = await bcrypt.hash(updateAccountDto.password, saltOrRounds);
        updateAccountDto.password = hashedPassword;
        return this.usersRepository.update(id, updateAccountDto).then((res) => ({
            statusCode: common_1.HttpStatus.OK,
            message: 'Update success',
        }));
    }
    async updatePassword(updatePasswordDto) {
        const user = await this.findOne(updatePasswordDto.userId);
        const result = await bcrypt.compare(updatePasswordDto.oldPass, user.password);
        if (!result) {
            throw new common_1.BadRequestException('Password not exactly');
        }
        if (updatePasswordDto.newPass !== updatePasswordDto.confirmPass) {
            throw new common_1.BadRequestException('Confirm password not equal new password');
        }
        const hashedPassword = await bcrypt.hash(updatePasswordDto.newPass, saltOrRounds);
        return this.usersRepository
            .update(updatePasswordDto.userId, { password: hashedPassword })
            .then((res) => ({
            statusCode: common_1.HttpStatus.OK,
            message: 'Update password success',
        }));
    }
    async remove(id) {
        const exist = await this.usersRepository.findOneBy({ id });
        if (!exist) {
            throw new common_1.NotFoundException('User not found.');
        }
        return this.usersRepository.delete(id).then((res) => ({
            statusCode: common_1.HttpStatus.OK,
            message: 'Delete success',
        }));
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map