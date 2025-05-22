import { Role } from './../../enums/role.enum';
import { CreateUserDto } from './create-user.dto';
export declare class CreateEmployeeDto extends CreateUserDto {
    roles: Role[];
}
