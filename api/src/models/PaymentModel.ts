import { GraphQLBoolean } from "graphql";
import { Field, GraphQLISODateTime, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Installment {
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

  @Field(() => GraphQLISODateTime)
  expiresIn: Date
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
