import { Field, InputType, Int } from "type-graphql";


@InputType()
export class PaymentInput {
  @Field(() => Int)
  quantity: number

  @Field(() => Int)
  value: number

  @Field()
  name: string

  @Field()
  cpf: string
};
