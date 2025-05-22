import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateEmployeeDto } from './dto/create-employee';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
export declare class UserAdminController {
    private readonly userService;
    constructor(userService: UserService);
    create(createEmployeeDto: CreateEmployeeDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    findAll(page?: number, limit?: number, name?: string): Promise<Pagination<User>>;
    findOne(id: number): Promise<User>;
    updateAccount(id: number, updateAccountDto: UpdateAccountDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    remove(id: number): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
