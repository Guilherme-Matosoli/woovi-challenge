import { GraphQLBoolean } from "graphql";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
class Installment {
  @Field(() => Int)
  quantity: number

  @Field(() => Int)
  value: number
};

@ObjectType()
class Client {
  @Field()
  name: string

  @Field()
  cpf: string
};

@ObjectType()
export class PixInfo {
  @Field()
  code: string

  @Field()
  identifier: string

  @Field(() => Int)
  value: number
};

@ObjectType()
export class PaymentModel {
  @Field()
  id: string

  @Field(() => PixInfo)
  pixInfo: PixInfo

  @Field(() => Installment)
  installment: Installment

  @Field(() => Client)
  client: Client

  @Field(() => Int)
  steps: number

  @Field(() => GraphQLBoolean)
  concluded: boolean
};
