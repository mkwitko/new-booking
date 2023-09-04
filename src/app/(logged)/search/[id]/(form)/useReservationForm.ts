import { Schema } from "./schema";
import { useForm } from "react-hook-form";
import type { ReservationFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMasks } from "@/hooks/useMasks";
import { get } from "@/services/cache";

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

  const displayNewCreditCardForm =
    watch("payment.selectedCreditCard") === "Informar Manualmente";

  const displayGuaranteeForm = 
    watch("payment.method") === "Direto ao Hotel"

  const creditCardNumberToDisplay = watch("creditCard.cardName")
    ? createCreditCardNumberMask(watch("creditCard.cardName")) || ""
    : "";

  const creditCardExpirationDateToDisplay = watch("creditCard.expiry")
    ? createExpirationDateMask(watch("creditCard.expiry")) ||
      ""
    : "";

  const creditCardNameToDisplay = watch("creditCard.cardName")
  ? watch("creditCard.cardName")?.toUpperCase()
  : "";

  const guestIdToDisplay = (data: string | null | undefined): string => {
    return data ? createCPFMask(data) || "" : "";
  };

  if (watch('payment.method') === 'Direto ao Hotel') {
    setValue('payment.allowedExpenses', 'Direto ao Hotel')
  }

  function submitForm(values: ReservationFormSchema) {
    console.log(values);
    // const methodIsDirect = values.payment.method === "direto";
    // const billing = JSON.parse(values.payment.allowedExpenses);
    // values.payment.allowedExpenses = billing;

    // values.purchaser.name = JSON.parse(values.purchaser.name);

    // const creditCard: any = values.payment.selectedCreditCard
    //   ? AvailableCreditCards.find(
    //       (card) => card.id === values.payment.selectedCreditCard,
    //     )
    //   : values.payment.newCreditCard;

    // const creditCardData: any = {};

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
    creditCardExpirationDateToDisplay,
    creditCardNumberToDisplay,
    creditCardNameToDisplay,
    displayNewCreditCardForm,
    displayCreditCardNameField,
    guestIdToDisplay,
    displayGuaranteeForm,
    setValue,
    handleSubmit,
    submitForm,
    isSubmitting,
  };
}
