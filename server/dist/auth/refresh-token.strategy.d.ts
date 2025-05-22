import { Strategy } from 'passport-jwt';
declare const RefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        userId: any;
        username: any;
        roles: any;
    }>;
}
export {};
