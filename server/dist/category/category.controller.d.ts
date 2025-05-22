import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAllForUser(): Promise<import("./entities/category.entity").Category[]>;
    findBySlugForUser(slug: string): Promise<import("./entities/category.entity").Category>;
}
export declare class CategoryAdminController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    findAllForAdmin(): Promise<import("./entities/category.entity").Category[]>;
    findOne(id: number): Promise<import("./entities/category.entity").Category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<void | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    remove(id: number): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
