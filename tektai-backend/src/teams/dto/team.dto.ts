import {User, UserDocument} from "src/schemas/user.schema";

export class TeamDto {
    readonly name: string;
    readonly leader: string;
    readonly members: string[];
}

