import { Schema } from "./schema";
import { useForm } from "react-hook-form";
import type { ReservationFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMasks } from "@/hooks/useMasks";
import { AvailableCreditCards } from "../(data)";
import creditCardType from "credit-card-type";

export function useReservationForm() {
  const {
    register,
    setValue,
    watch,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<ReservationFormSchema>({
    resolver: zodResolver(Schema),
  });

  const {
    createCPFMask,
    createCreditCardNumberMask,
    createExpirationDateMask,
  } = useMasks();

  const displayCreditCardNameField =
    watch("payment.method") === "Cartão de Crédito";

  const displayCreditCardForm =
    watch("payment.selectedCreditCard") === "Informar Manualmente";

  const creditCardNumberToDisplay = watch("payment.newCreditCard.number")
    ? createCreditCardNumberMask(watch("payment.newCreditCard.number")) || ""
    : "";

  const expirationDateToDisplay = watch("payment.newCreditCard.expirationDate")
    ? createExpirationDateMask(watch("payment.newCreditCard.expirationDate")) ||
      ""
    : "";

  const guestIdToDisplay = (data: string | null | undefined): string => {
    return data ? createCPFMask(data) || "" : "";
  };

  const nameToDisplay = watch("payment.newCreditCard.name")
    ? watch("payment.newCreditCard.name")?.toUpperCase()
    : "";

  function submitForm(values: ReservationFormSchema) {
    const methodIsDirect = values.payment.method === "direto";
    const billing = JSON.parse(values.payment.allowedExpenses);
    values.payment.allowedExpenses = billing;

    values.purchaser.name = JSON.parse(values.purchaser.name);

    const creditCard: any = values.payment.selectedCreditCard
      ? AvailableCreditCards.find(
          (card) => card.id === values.payment.selectedCreditCard,
        )
      : values.payment.newCreditCard;

    const creditCardData: any = {};

    // if (Object.keys(creditCard).length > 0) {
    //   const isVcn = !!creditCard.rcnToken;
    //   if (methodIsDirect) {
    //     creditCardData.plain = fillPlainCreditCardData(creditCard, values);
    //   } else if (isVcn) {
    //     creditCardData.rcnToken = creditCard.rcnToken;
    //   } else {
    //     creditCardData.tokenized = creditCard.tokenized;
    //   }
    // } else {
    //   creditCardData.plain = fillPlainCreditCardData(creditCard, values, true);
    // }
  }

  //   const fillPlainCreditCardData = (creditCard, values: ReservationFormSchema, extractCardBrand = false) => {
  //     const cardNumber = values.payment.newCreditCard?.number.replace(/\s/g, "");
  //     const cardType = creditCardType(cardNumber);

  //     return {
  //       cardBrand: {
  //         code:
  //           extractCardBrand &&
  //           cardType &&
  //           transformCardBrand(cardType[0].niceType),
  //       },
  //       cardHolder: values.cardName,
  //       cardNumber,
  //       expireMonth: values.expiry.split("/")[0],
  //       expireYear: values.expiry.split("/")[1],
  //     };
  //   };

  //   function transformCardBrand(cardBrand: any) {
  //     const brandTypes: any = {
  //       Visa: "VI",
  //       Mastercard: "MC",
  //       "American Express": "AX",
  //       "Diners Club": "DN",
  //       Elo: "AL",
  //       Hipercard: "HIP",
  //       Discover: "DI",
  //     };

  //     return brandTypes[cardBrand];
  //   }

  return {
    watch,
    errors,
    register,
    expirationDateToDisplay,
    creditCardNumberToDisplay,
    displayCreditCardForm,
    displayCreditCardNameField,
    guestIdToDisplay,
    nameToDisplay,
    setValue,
    handleSubmit,
    submitForm,
    isSubmitting,
  };
}
