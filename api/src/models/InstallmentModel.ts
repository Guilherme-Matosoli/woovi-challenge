import { Field, ObjectType } from "type-graphql";
import { Installment } from "./PaymentModel";

@ObjectType()
class MainTitle {
  @Field()
  pt: string

  @Field()
  en: string
};

@ObjectType()
class benefit {
  @Field()
  pt: string

  @Field()
  en: string
};

@ObjectType()
export class InstallmentModel {
  @Field(() => Installment)
  installment: Installment

  @Field(() => MainTitle, { nullable: true })
  mainTitle?: MainTitle

  @Field(() => MainTitle, { nullable: true })
  benefit?: MainTitle
};
