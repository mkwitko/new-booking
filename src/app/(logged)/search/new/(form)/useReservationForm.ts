"use client";

import { Schema } from "./schema";
import { useForm } from "react-hook-form";
import type { ReservationFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMasks } from "@/hooks/useMasks";
import { SearchContext } from "@/context/SearchContext";
import { useContext, useState } from "react";
import { LoggedContext } from "@/context/LoggedContext";

export function useReservationForm() {
  const { peopleHook, dateHook } = useContext(SearchContext);
  const { customer, card, booking, hotels } = useContext(LoggedContext);

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

  const displayCreditCardNameField =
    watch("paymentMethod") === "Cartão de Crédito";

  const displayNewCreditCardForm =
    watch("selectCreditCard") === "Informar Manualmente";

  const displayGuaranteeForm = watch("paymentMethod") === "Direto ao Hotel";

  const displayIndividualCvvField =
    watch("selectCreditCard") !== "Informar Manualmente" &&
    watch("paymentMethod") === "Cartão de Crédito";

  const creditCardExpirationDateToDisplay = watch("creditCard.plain.expireDate")
    ? createExpirationDateMask(watch("creditCard.plain.expireDate")) || ""
    : "";

  const creditCardNameToDisplay = watch("creditCard.plain.cardHolder")
    ? watch("creditCard.plain.cardHolder")?.toUpperCase()
    : "";

  async function submitForm(values: ReservationFormSchema) {
    let objectToSubmit: any = { ...values };
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

    objectToSubmit = {
      ...objectToSubmit,
      checkinDate: dateHook.checkIn,
      checkoutDate: dateHook.checkOut,
      rateId: currentHotel.rates[currentRateIndex].id,
      roomTypeId: currentHotel.roomTypes[currentApartamentIndex].id,
      hotelId: hotels.hook.currentHotel.id,
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

    await booking.createBooking(objectToSubmit);
  }

  function handleChangePurchaseName(value: string) {
    const selectedCustomer = customer.hook.data?.find(
      (customer: any) => customer.name === value,
    );

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

  const defineCreditCardBrand = (cardNumber: string) => {
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

  const disableAllowedExpensesField = displayGuaranteeForm;

  return {
    watch,
    errors,
    setValue,
    register,
    submitForm,
    handleSubmit,
    customer,
    isSubmitting,
    handleChangePurchaseName,
    displayCardBackside,
    setDisplayCardBackside,
    creditCards,
    disableAllowedExpensesField,
    numberOfGuests,
    displayGuaranteeForm,
    creditCardNameToDisplay,
    displayNewCreditCardForm,
    createExpirationDateMask,
    displayIndividualCvvField,
    displayCreditCardNameField,
    creditCardExpirationDateToDisplay,
  };
}
