"use client";

import { Schema } from "./schema";
import { useForm } from "react-hook-form";
import type { ReservationFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMasks } from "@/hooks/useMasks";
import { SearchContext } from "@/context/SearchContext";
import { useContext, useState } from "react";
import { LoggedContext } from "@/context/LoggedContext";
import { toast } from "react-toastify";

export function useReservationForm() {
  const { peopleHook, hotelHook, dateHook } = useContext(SearchContext);
  const { customer, card, booking } = useContext(LoggedContext);

  const [isBookingCreatedSuccessfully, setIsBookingCreatedSuccessfully] =
    useState<any>(null);

  const { costCenter, bookingAttributes } = customer.hook.data;
  const [displayCardBackside, setDisplayCardBackside] =
    useState<boolean>(false);

  const { currentHotel, currentRateIndex, currentApartamentIndex } =
    hotels.hook;
  const creditCards = card.hook.data;
  const numberOfGuests = peopleHook.numberOfGuests;

  const {
    register,
    setValue,
    watch,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<ReservationFormSchema>({
    resolver: zodResolver(Schema),
  });

  const { createExpirationDateMask } = useMasks();

  const paymentMethodCurrentValue = watch("paymentMethod");
  const selectedCreditCardCurrentValue = watch("selectCreditCard");
  const creditCardCurrentValue = watch("creditCard");

  const displayCreditCardNameField =
    paymentMethodCurrentValue === "Cartão de Crédito";

  const displayNewCreditCardForm =
    selectedCreditCardCurrentValue === "Informar Manualmente";

  const displayGuaranteeForm = paymentMethodCurrentValue === "Direto ao Hotel";

  const displayIndividualCvvField =
    creditCardCurrentValue?.rcnToken === null &&
    selectedCreditCardCurrentValue !== "Informar Manualmente" &&
    paymentMethodCurrentValue === "Cartão de Crédito";

  const creditCardExpirationDateToDisplay = creditCardCurrentValue?.plain
    ?.expireDate
    ? createExpirationDateMask(creditCardCurrentValue.plain?.expireDate) || ""
    : "";

  const creditCardNameToDisplay = creditCardCurrentValue?.plain?.cardHolder
    ? creditCardCurrentValue?.plain?.cardHolder?.toUpperCase()
    : "";

  function handleChangeCreditCardValue(value: string) {
    resetCreditCardValues();
    if (value === "Informar Manualmente") {
      setValue("selectCreditCard", "Informar Manualmente");
    } else {
      setValue("selectCreditCard", value);

      if (value.includes("token")) {
        setValue("creditCard.tokenized", value.split("-")[1]);
      } else {
        setValue("creditCard.rcnToken", value.split("-")[1]);
      }
    }
  }

  function resetCreditCardValues() {
    setValue("creditCard", {
      plain: null,
      cardCVV: null,
      rcnToken: null,
      tokenized: null,
    });
  }

  async function handleChangePurchaseName(value: string) {
    const selectedCustomer = customer.hook.data?.find(
      (customer: any) => customer.name === value,
    );

    await Promise.all([
      customer.findBookingAttributes(selectedCustomer?.alphaId),
      customer.findCostCenter(selectedCustomer?.alphaId),
    ]);

    setValue("customer", {
      id: selectedCustomer?.alphaId,
      name: selectedCustomer?.name,
    });
  }

  const getExpireMonthAndExpireYear = (expireDate: string) => {
    const [month, year] = expireDate.split("/");

    return {
      month,
      year,
    };
  };

  const defineCreditCardBrand = async (cardNumber: string) => {
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercardRegex = /^5[1-5][0-9]{14}$/;
    const americanExpressRegex = /^3[47][0-9]{13}$/;

    if (visaRegex.test(cardNumber)) {
      return {
        code: "VI",
      };
    }

    if (mastercardRegex.test(cardNumber)) {
      return {
        code: "MC",
      };
    }

    if (americanExpressRegex.test(cardNumber)) {
      return {
        code: "AX",
      };
    }

    return {
      code: "VI",
    };
  };

  async function submitForm(values: ReservationFormSchema) {
    let objectToSubmit: any = { ...values };
    const paymentMethod = values.paymentMethod;

    delete objectToSubmit.paymentMethod;
    delete objectToSubmit.selectCreditCard;

    if (values.creditCard && values.creditCard.plain) {
      const { month, year } = getExpireMonthAndExpireYear(
        values.creditCard.plain.expireDate!,
      );
      const cardBrand = defineCreditCardBrand(
        values.creditCard.plain.cardNumber!,
      );

      objectToSubmit = {
        ...objectToSubmit,
        creditCard: {
          cardCVV: values.creditCard.cardCVV,
          plain: {
            cardHolder: values.creditCard.plain.cardHolder,
            cardNumber: values.creditCard.plain.cardNumber,
            expireMonth: month,
            expireYear: year,
            cardBrand,
          },
        },
      };
    }

    if (values.creditCard.tokenized) {
      objectToSubmit = {
        ...objectToSubmit,
        creditCard: {
          tokenized: values.creditCard.tokenized,
          cardCVV: values.creditCard.cardCVV,
        },
      };
    }

    if (values.creditCard.rcnToken) {
      objectToSubmit = {
        ...objectToSubmit,
        creditCard: {
          rcnToken: values.creditCard.rcnToken,
          cardCVV: "",
        },
      };
    }

    objectToSubmit = {
      ...objectToSubmit,
      checkinDate: dateHook.checkIn,
      checkoutDate: dateHook.checkOut,
      rateId: currentHotel.rates[currentRateIndex].id,
      roomTypeId: currentHotel.roomTypes[currentApartamentIndex].id,
      hotelId: hotelHook.currentHotel.id,
      bookingDetails: true,
      consumer: "others",
      forceBooking: true,
      adultGuestCount: peopleHook.numberOfGuests,
      guests: values.guests.map((guest) => {
        return {
          ...guest,
          ageGroup: "ADULT",
        };
      }),
    };

    // console.log(objectToSubmit)
    try {
      const createdBooking = await booking.createBooking(objectToSubmit);
      setIsBookingCreatedSuccessfully({
        bookingId: createdBooking.bookingId,
        createdAt: createdBooking.timestamp,
        paymentMethod,
        ...createdBooking.bookingDetails.data[0],
        creditCard: {
          cardNumber: values.creditCard.plain?.cardNumber || null,
          vcnId: values.creditCard.rcnToken || null,
        },
      });
    } catch (error: any) {
      setIsBookingCreatedSuccessfully(null);
      toast.error(error.message);
    }
  }

  const disableAllowedExpensesField = displayGuaranteeForm;

  return {
    watch,
    errors,
    setValue,
    customer,
    register,
    billings,
    hotelHook,
    costCenter,
    submitForm,
    creditCards,
    isSubmitting,
    handleSubmit,
    numberOfGuests,
    bookingAttributes,
    displayCardBackside,
    displayGuaranteeForm,
    setDisplayCardBackside,
    creditCardNameToDisplay,
    displayNewCreditCardForm,
    handleChangePurchaseName,
    createExpirationDateMask,
    displayIndividualCvvField,
    displayCreditCardNameField,
    disableAllowedExpensesField,
    handleChangeCreditCardValue,
    isBookingCreatedSuccessfully,
    setIsBookingCreatedSuccessfully,
    creditCardExpirationDateToDisplay,
  };
}
