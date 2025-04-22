import { Model } from 'mongoose';
import { User } from '../../user/schemas/user.schemas';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userModel;
    private configService;
    constructor(userModel: Model<User>, configService: ConfigService);
    validate(payload: any): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
export {};
