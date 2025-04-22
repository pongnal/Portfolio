import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("./schemas/user.schemas").User>;
    findAll(): Promise<import("./schemas/user.schemas").User[]>;
    findOne(id: string): Promise<import("./schemas/user.schemas").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./schemas/user.schemas").User>;
    remove(id: string): Promise<import("./schemas/user.schemas").User>;
}
