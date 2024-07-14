import crypto from "node:crypto";

import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Payment from "../database/entities/Payment";
import { PaymentModel } from "../models/PaymentModel";
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
    const date = new Date();
    date.setDate(date.getDate() + 2);

    const payment = await Payment.create({
      id: crypto.randomUUID(),
      client: {
        name: input.name,
        cpf: input.cpf
      },
      pixInfo: {
        identifier: fakePix.identifier,
        code: fakePix.code,
        expiresIn: date
      },

      installment: {
        quantity: input.quantity,
        value: input.value
      },
      steps: 1,
      concluded: false
    });

    return payment;
  };

  @Mutation(() => PaymentModel)
  async simulatePayment(
    @Arg("id")
    id: string
  ) {

    try {
      const oldPayment = await Payment.findOne({ id });
      const handleSteps = () => {
        if (oldPayment.steps == oldPayment.installment.quantity) return { concluded: true, steps: oldPayment.steps + 1 };

        return { steps: oldPayment.steps + 1 }
      };

      const newPayment = await Payment.findOneAndUpdate({ id }, handleSteps());

      return newPayment;
    }
    catch (err) {
      console.log(err);
    };
  }

  @Mutation(() => String!)
  async simulateCreditCard(
    @Arg("id")
    id: string
  ) {

    try {
      const oldPayment = await Payment.findOne({ id });
      const handleSteps = () => {
        if (oldPayment.steps == oldPayment.installment.quantity) return { concluded: true, steps: oldPayment.steps + 1 };

        return { steps: oldPayment.steps + 1 }
      };

      await Payment.findOneAndUpdate({ id }, handleSteps());

      await new Promise(resolve => {
        setTimeout((e) => {
          resolve(e)
        }, 2000)
      });

      return "ok"
    }
    catch (err) {
      console.log(err)
    }
  }
};
