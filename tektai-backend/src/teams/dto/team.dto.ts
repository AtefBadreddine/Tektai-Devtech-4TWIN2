import { User } from "src/schemas/user.schema";

export class TeamDto {
    readonly name: string;
    readonly leader: User;
    readonly members: User[];
}

