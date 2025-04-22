import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    private configService;
    constructor(userService: UserService, configService: ConfigService);
    validate(payload: any): Promise<import("../../user/schemas/user.schemas").User>;
}
export {};
