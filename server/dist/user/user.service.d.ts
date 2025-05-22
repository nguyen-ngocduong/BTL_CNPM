import { HttpStatus } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    findAllForAdmin(options: IPaginationOptions, name: string): Promise<Pagination<User>>;
    findOne(id: number): Promise<User>;
    findByName(username: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    updateAccount(id: number, updateAccountDto: UpdateAccountDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    remove(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
