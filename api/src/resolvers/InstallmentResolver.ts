import { Query, Resolver } from "type-graphql";
import { InstallmentModel } from "../models/InstallmentModel";

const Installments = [
  {
    installment: {
      quantity: 1,
      value: 3050000
    },
    mainTitle: {
      pt: "Pix",
      en: "Pix"
    },
    benefit: {
      pt: "🤑 R$ 300,00 de volta no seu Pix na hora",
      en: "🤑 R$ 300.00 back on your Pix instantly"
    }
  },
  {
    installment: {
      quantity: 2,
      value: 1530000
    },
    mainTitle: {
      pt: "Pix parcelado",
      en: "Pix in installments"
    }
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
    benefit: {
      pt: "-3% de juros: Melhor opção de parcelamento",
      en: "-3% interest: Best installment option"
    }
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
