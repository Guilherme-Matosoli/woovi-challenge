import { Query, Resolver } from "type-graphql";


@Resolver()
export class PaymentResolver {

  @Query(() => String)
  async payment() {
    return "Payments"
  }
};
