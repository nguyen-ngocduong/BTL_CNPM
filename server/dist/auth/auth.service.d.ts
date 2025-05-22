import { JwtService } from '@nestjs/jwt';
import { User } from './../user/entities/user.entity';
import { UserService } from './../user/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
        id: number;
        fullName: string;
        phone: string;
        address: string;
        username: string;
        password: string;
        roles: import("../enums/role.enum").Role[];
        orders: import("../order/entities/order.entity").Order[];
        cartItems: import("../user/entities/cartItem.entity").CartItem[];
        createdDate: Date;
        updatedDate: Date;
    }>;
    refresh(user: any): Promise<{
        accessToken: string;
    }>;
}
