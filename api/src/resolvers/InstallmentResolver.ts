import { Arg, Query, Resolver } from "type-graphql";
import { InstallmentModel } from "../models/InstallmentModel";

const Installments = [
  {
    installment: {
      quantity: 1,
      value: 3050000
    },
    mainTitle: "Pix",
    benefit: "🤑 R$ 300,00 de volta no seu Pix na hora"
  },
  {
    installment: {
      quantity: 2,
      value: 1530000
    },
    mainTitle: "Pix parcelado"
  },
  {
    installment: {
      quantity: 3,
      value: 1019666
    }
  },
  {
    installment: {
      quantity: 4,
      value: 772500
    },
    benefit: "-3% de juros: Melhor opção de parcelamento"
  },
  {
    installment: {
      quantity: 5,
      value: 630000
    }
  },
  {
    installment: {
      quantity: 6,
      value: 528333
    }
  },
  {
    installment: {
      quantity: 7,
      value: 454285
    }
  }
];

@Resolver()
export class InstallmentResolver {
  @Query(() => [InstallmentModel])
  async installment() {
    return Installments
  };
};
