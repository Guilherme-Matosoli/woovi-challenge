import { Field, ObjectType } from "type-graphql";
import { Installment } from "./PaymentModel";


@ObjectType()
export class InstallmentModel {
  @Field(() => Installment)
  installment: Installment

  @Field(() => String, { nullable: true })
  mainTitle?: string

  @Field(() => String, { nullable: true })
  benefits?: string
}
