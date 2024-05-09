import {Inject, Injectable} from '@nestjs/common';
import * as process from 'process'; // Import process for accessing environment variables
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import Stripe from 'stripe';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../schemas/user.schema";
import {Model} from "mongoose";
import {Challenges, ChallengesDocument} from "../schemas/challenges.schema";

@Injectable()
export class PaiementService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}
    async onPaymentSuccess(user_id : string) {
        const user = await this.userModel.findById(user_id).exec();
        user.subscription = 'premium';
        return user.save();
    }
}
