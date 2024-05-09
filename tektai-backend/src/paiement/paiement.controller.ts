// paiement.controller.ts

import {Controller, Post, Body, Headers, Logger, Get, Redirect, Req, Query, UseGuards, Res} from '@nestjs/common';
import Stripe from "stripe";
import * as process from "process";
import {session} from "passport";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {PaiementService} from "./paiement.service";


@Controller('payment')
export class PaiementController {

  private readonly logger = new Logger();


  constructor(private readonly paymentService : PaiementService) {
  }


  @Post('/stripe/checkout')
  @UseGuards(JwtAuthGuard)
  async handleStripeCheckout(@Req() req:any) {
    const YOUR_DOMAIN = 'http://localhost:3000/payment';
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const product_id = req.body.plan === 'premium' ?  'prod_Q4kB6VwIs7xupB' : 'prod_Q4ooLA0hBuJEfg';
    const product = await stripe.products.retrieve(product_id);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: product.default_price.toString(),
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${YOUR_DOMAIN}/checkout?session={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/checkout?session={CHECKOUT_SESSION_ID}`,
      metadata: {
        'user_id' : req.user['_id'],
        'type' : req.body.plan
      }
    });
    return session.url;
  }

  @Get('checkout')
  @Redirect()
  async handleCheckoutRedirect(
      @Req() req: any,
      @Query('session') session_id: string,
  ) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (session && session.status === 'complete') {
        await this.paymentService.onPaymentSuccess(session.metadata.user_id,session.metadata.type);

        return { url : 'http://localhost:5173/company?payment=success'};
      } else {

        return { url : 'http://localhost:5173/company?payment=failure'};
      }
    } catch (error) {
      return { url : 'http://localhost:5173/company?payment=failure'};
    }
  }

}
