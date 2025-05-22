import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
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
    refresh(req: any): Promise<{
        accessToken: string;
    }>;
}
