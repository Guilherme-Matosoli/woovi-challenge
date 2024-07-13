import { Arg, Query, Resolver } from "type-graphql";
import { PixInfo } from "../models/PaymentModal";
import Payment from "../database/entities/Payment";

@Resolver()
export class PixResolver {
  @Query(() => PixInfo)
  async pix(
    @Arg("id")
    id: string
  ) {

    try {
      const { pixInfo } = await Payment.findOne({ id });
      return pixInfo;
    }
    catch (err) {
      console.log(err);
    };
  };
};
