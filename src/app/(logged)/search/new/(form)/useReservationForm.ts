'use client'

import { Schema } from "./schema";
import { useForm } from "react-hook-form";
import type { ReservationFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMasks } from "@/hooks/useMasks";
import { SearchContext } from "@/context/SearchContext";
import { useContext } from "react";

export function useReservationForm() {

  const { peopleHook, hotelHook, dateHook, salePointHook } = useContext(SearchContext);
  const { currentHotel, currentRateIndex, currentApartamentIndex } = hotelHook

  console.log('salespoint hook => ', salePointHook)

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
    createExpirationDateMask,
  } = useMasks();

  const displayCreditCardNameField =
    watch("paymentMethod") === "Cartão de Crédito";

  const displayNewCreditCardForm =
    watch("selectCreditCard") === "Informar Manualmente";

  const displayGuaranteeForm = 
    watch("paymentMethod") === "Direto ao Hotel"

  const displayIndividualCvvField = 
    watch('selectCreditCard') !== 'Informar Manualmente' &&
    watch("paymentMethod") === "Cartão de Crédito";

  const creditCardExpirationDateToDisplay = watch("creditCard.plain.expireDate")
    ? createExpirationDateMask(watch("creditCard.plain.expireDate")) ||
      ""
    : "";

  const creditCardNameToDisplay = watch("creditCard.plain.cardHolder")
  ? watch("creditCard.plain.cardHolder")?.toUpperCase()
  : "";

  function submitForm(values: ReservationFormSchema) {
    let objectToSubmit: any = {...values};

    if (values.creditCard && values.creditCard.plain) {
      const { month, year } = getExpireMonthAndExpireYear(values.creditCard.plain.expireDate!);
      const cardBrand = defineCreditCardBrand(values.creditCard.plain.cardNumber!);

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
          }
        }
      }
    }

    if (values.creditCard.tokenized) {
      objectToSubmit = {
        ...objectToSubmit,
        creditCard: {
          tokenized: values.creditCard.tokenized,
          cardCVV: values.creditCard.cardCVV,
        }
      }
    }

    objectToSubmit = {
      ...objectToSubmit,
      checkinDate: dateHook.checkIn,
      checkoutDate: dateHook.checkOut,
      rateId: currentHotel.rates[currentRateIndex].id,
      roomTypeId: currentHotel.roomTypes[currentApartamentIndex].id,
      hotelId: hotelHook.currentHotel.id,
      bookingDetails: true,
      consumer: 'others',
      forceBooking: true,
      adultGuestCount: peopleHook.numberOfGuests,
      guests: values.guests.map((guest) => {
        return {
          ...guest,
          ageGroup: 'ADULT',
        }
      })
    }

    console.log({
      companyId: +salePointHook.salePoint,
      bookingData: objectToSubmit,
    })
  }

  const getExpireMonthAndExpireYear = (expireDate: string) => {
    const [month, year] = expireDate.split("/");

    return {
      month,
      year,
    }
  }

  const defineCreditCardBrand = (cardNumber: string) => {
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercardRegex = /^5[1-5][0-9]{14}$/;
    const americanExpressRegex = /^3[47][0-9]{13}$/;

    if (visaRegex.test(cardNumber)) {
      return {
        code: 'VI',
      }
    }

    if (mastercardRegex.test(cardNumber)) {
      return {
        code: 'MC',
      }
    }

    if (americanExpressRegex.test(cardNumber)) {
      return {
        code: 'AX',
      }
    }

    return {
      code: 'VI',
    }
  }

  return {
    watch,
    errors,
    register,
    creditCardExpirationDateToDisplay,
    displayIndividualCvvField,
    creditCardNameToDisplay,
    displayNewCreditCardForm,
    displayCreditCardNameField,
    displayGuaranteeForm,
    setValue,
    handleSubmit,
    submitForm,
    isSubmitting,
  };
}
