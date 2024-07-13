import crypto from "node:crypto";

import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Payment from "../database/entities/Payment";
import { PaymentModel } from "../models/PaymentModal";
import { PaymentInput } from "../inputs/PaymentInput";
import { fakePikGenerator } from "../utils/fakePixGenerator";

@Resolver()
export class PaymentResolver {

  @Query(() => PaymentModel, { nullable: true })
  async payment(
    @Arg("id", () => String)
    id: string
  ) {
    const payment = await Payment.findOne({ id });

    return payment;
  };

  @Mutation(() => PaymentModel)
  async createPayment(
    @Arg("input")
    input: PaymentInput
  ) {

    const fakePix = fakePikGenerator();

    const payment = await Payment.create({
      id: crypto.randomUUID(),
      client: {
        name: input.name,
        cpf: input.cpf
      },
      pixInfo: {
        identifier: fakePix.identifier,
        code: fakePix.code,
        value: input.value
      },

      installment: {
        quantity: input.quantity,
        value: input.value
      },
      steps: 1,
      concluded: false
    });

    return payment
  };
};
