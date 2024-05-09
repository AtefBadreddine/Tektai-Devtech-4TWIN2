// paiement.module.ts

import { Module } from '@nestjs/common';
import { PaiementController } from './paiement.controller';
import { PaiementService } from './paiement.service';
import Stripe from "stripe";
import {UsersModule} from "../users/users.module";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../schemas/user.schema";

@Module({
  controllers: [PaiementController],
  providers: [PaiementService,Stripe],
  imports: [    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),]
})
export class PaiementModule {}
