/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { User } from "../schemas/user.schema";
import { UserDto } from "./user.dto";
export declare class UsersService {
    private userModel;
    private readonly logger;
    constructor(userModel: Model<User>);
    findByEmail(email: string): Promise<User>;
    findByUsername(username: string): Promise<User>;
    createUser(userDTO: UserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    findUserByUsername(username: string): Promise<User>;
    deleteUser(userId: string): Promise<User | null>;
    updateUser(userId: string, userDto: UserDto): Promise<User>;
    storePwdToken(token: string, id: string): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: string;
    }>>;
    findByResetToken(token: string): Promise<User | undefined>;
    clearResetToken(userId: string): Promise<void>;
    updatePassword(userId: string, newPassword: string): Promise<void>;
    updateResetToken(userId: string, token: string, expirationDate: Date): Promise<void>;
}
