"use client";

import WhiteBox from "@/components/coreComponents/containers/WhiteBox";
import * as FormComponents from "@/components/formComponents";
import { useReservationForm } from "../(form)/useReservationForm";

// Mock Data
import {
  AllowedExpenses,
  AvailableCreditCards,
  PaymentMethods,
} from "../(data)";

import { CreditCardOption } from "./CreditCardOption";
import { NewCreditCardOption } from "./NewCreditCardOption";
import { CredtiCard } from "./CreditCard";
import { useContext, useState } from "react";
import B2BButton from "@/components/interactiveComponents/Button";
import Link from "next/link";
import { SearchContext } from "@/context/SearchContext";

export function ReserveForm() {
  const {
    errors,
    watch,
    handleSubmit,
    isSubmitting,
    register,
    setValue,
    submitForm,
    creditCardNumberToDisplay,
    displayCreditCardForm,
    displayCreditCardNameField,
    expirationDateToDisplay,
    guestIdToDisplay,
    nameToDisplay,
  } = useReservationForm();

  const [displayCardBackside, setDisplayCardBackside] =
    useState<boolean>(false);
  const NUMBER_OF_GUESTS = 1;

  const { hotelHook } = useContext(SearchContext);

  return (
    <form
      className="w-full space-y-4"
      onSubmit={handleSubmit(submitForm)}
      noValidate
    >
      {/* Dados do Comprador */}
      <WhiteBox classes="gap-0 lg:gap-0">
        <span className="font-semibold uppercase text-primary-500">
          Dados do Comprador
        </span>

        <div className="mt-6 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Combo Box */}
          <FormComponents.Input
            type="text"
            placeholder="Cliente"
            register={register("purchaser.name")}
            errorMessage={errors.purchaser?.name?.message}
          />

          <div className="space-y-2">
            <FormComponents.Checkbox
              label="Autoriza cobrança de taxa de turismo"
              id="allow-turism-taxes"
              register={register("purchaser.allowTurismTaxes")}
            />

            <FormComponents.Checkbox
              label="Reserva com garantia de no-show"
              id="allow-no-show-ensurance"
              register={register("purchaser.noShowEnsurance")}
            />
          </div>
        </div>

        <span className="mt-10 block text-xs font-semibold uppercase text-textSecondary">
          Informações gerenciais
        </span>

        <div className="mt-4 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Combo box */}
          <FormComponents.Input
            type="text"
            placeholder="Centro de Custos"
            errorMessage={errors?.managemntInformation?.costsCenter?.message}
            register={register("managemntInformation.costsCenter")}
          />

          <FormComponents.Input
            type="text"
            placeholder="Matrícula"
            errorMessage={errors?.managemntInformation?.register?.message}
            register={register("managemntInformation.register")}
          />

          <FormComponents.Input
            type="text"
            id="area"
            placeholder="Area"
            register={register("managemntInformation.area")}
            errorMessage={errors?.managemntInformation?.area?.message}
          />
        </div>
      </WhiteBox>

      <WhiteBox classes="gap-0 lg:gap-0">
        <span className="font-semibold uppercase text-primary-500">
          Dados dos Hóspedes
        </span>

        {Array.from({ length: NUMBER_OF_GUESTS }).map((_, index) => (
          <>
            <span className="mt-4 block text-xs font-semibold uppercase text-textSecondary">
              Hóspede {index + 1}
            </span>

            <div className="mt-4 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Combo Box */}
              <FormComponents.Input
                type="text"
                placeholder="CPF (Opcional)"
                maxLength={14}
                value={guestIdToDisplay(watch(`guests.${index}.id`))}
                register={register(`guests.${index}.id`)}
                errorMessage={errors?.guests?.[index]?.id?.message}
              />

              <FormComponents.Input
                type="email"
                placeholder="Email (Opcional)"
                register={register(`guests.${index}.email`)}
                errorMessage={errors?.guests?.[index]?.email?.message}
              />

              <FormComponents.Input
                type="text"
                placeholder="Nome"
                register={register(`guests.${index}.name`)}
                errorMessage={errors?.guests?.[index]?.name?.message}
              />

              <FormComponents.Input
                type="text"
                placeholder="Sobrenome"
                register={register(`guests.${index}.surname`)}
                errorMessage={errors?.guests?.[index]?.surname?.message}
              />
            </div>
          </>
        ))}
      </WhiteBox>

      <WhiteBox classes="gap-0 lg:gap-0">
        <span className="font-semibold uppercase text-primary-500">
          Forma de Pagamento
        </span>

        <div className="mt-6 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          <FormComponents.Select.Root
            placeholder="Método de Pagamento"
            errorMessage={errors?.payment?.method?.message}
            onValueChange={(value) => setValue("payment.method", value)}
          >
            {PaymentMethods.map((method) => (
              <FormComponents.Select.Item
                key={method}
                text={method}
                value={method}
              />
            ))}
          </FormComponents.Select.Root>

          <FormComponents.Select.Root
            placeholder="Despesas Autorizadas"
            errorMessage={errors?.payment?.allowedExpenses?.message}
            onValueChange={(value) =>
              setValue("payment.allowedExpenses", value)
            }
          >
            {AllowedExpenses.map((expense) => (
              <FormComponents.Select.Item
                key={expense}
                text={expense}
                value={expense}
              />
            ))}
          </FormComponents.Select.Root>
        </div>

        {displayCreditCardNameField && (
          <div className="mt-4 grid w-full grid-cols-1">
            <FormComponents.Select.Root
              placeholder="Informe o cartão de crédito"
              errorMessage={errors?.payment?.selectedCreditCard?.message}
              onValueChange={(value) =>
                setValue("payment.selectedCreditCard", value)
              }
            >
              {AvailableCreditCards.map((card) => (
                <FormComponents.Select.Item
                  key={card.id}
                  text={card.name}
                  value={card.id}
                  creditCard
                >
                  <CreditCardOption key={card.id} {...card} />
                </FormComponents.Select.Item>
              ))}
              <FormComponents.Select.Item
                text="Informar Manualmente"
                value="Informar Manualmente"
                creditCard
              >
                <NewCreditCardOption />
              </FormComponents.Select.Item>
            </FormComponents.Select.Root>

            {displayCreditCardForm && (
              <div className="mt-4 grid w-full grid-cols-1 gap-y-4 md:grid-cols-2">
                {/* Cartão de Crédito */}
                <div className="space-y-4">
                  <span className="mt-4 block text-xs font-semibold uppercase text-textSecondary">
                    Dados do cartão de crédito
                  </span>
                  <CredtiCard
                    expirationDate={watch(
                      "payment.newCreditCard.expirationDate",
                    )}
                    name={watch("payment.newCreditCard.name")}
                    number={watch("payment.newCreditCard.number")}
                    securityCode={watch("payment.newCreditCard.securityCode")}
                    showBackside={displayCardBackside}
                  />
                </div>

                <div className="mt-auto space-y-4">
                  <FormComponents.Input
                    placeholder="Nome no cartão"
                    maxLength={25}
                    value={nameToDisplay}
                    register={register("payment.newCreditCard.name")}
                    errorMessage={errors?.payment?.newCreditCard?.name?.message}
                    type="text"
                  />

                  <FormComponents.Input
                    placeholder="Número do cartão"
                    maxLength={19}
                    pattern="[0-9]{16}"
                    value={creditCardNumberToDisplay}
                    register={register("payment.newCreditCard.number")}
                    errorMessage={
                      errors?.payment?.newCreditCard?.number?.message
                    }
                    type="text"
                  />

                  <FormComponents.Input
                    placeholder="Validade"
                    maxLength={5}
                    value={expirationDateToDisplay}
                    register={register("payment.newCreditCard.expirationDate")}
                    errorMessage={
                      errors?.payment?.newCreditCard?.expirationDate?.message
                    }
                    type="text"
                  />

                  <FormComponents.Input
                    type="text"
                    placeholder="CVV"
                    className="w-28"
                    errorMessage={
                      errors?.payment?.newCreditCard?.securityCode?.message
                    }
                    register={register("payment.newCreditCard.securityCode")}
                    maxLength={3}
                    onFocus={() => setDisplayCardBackside(true)}
                    onBlur={() => setDisplayCardBackside(false)}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </WhiteBox>

      <WhiteBox classes="gap-0 lg:gap-0">
        <span className="font-semibold uppercase text-primary-500">
          Forma de Pagamento
        </span>

        <FormComponents.Textarea
          placeholder="Observações (Opcional)"
          className="mt-6"
          register={register("observations")}
          errorMessage={errors?.observations?.message}
        />
      </WhiteBox>

      <p className="block text-xs md:text-right">
        Ao confirmar você afirma estar de acordo com a{" "}
        <span className="font-bold">política do hotel</span>
      </p>

      <div className="flex w-full flex-col items-center gap-4 pt-2 md:flex-row md:items-end md:justify-end">
        <Link href="/search">
          <B2BButton
            onClick={() => {
              hotelHook.resetCurrentHotel();
            }}
            label="Descartar"
            color="disabled"
          />
        </Link>
        <B2BButton
          mergeClass="w-1/6"
          buttonType="submit"
          label="Confirmar Reserva"
        />
      </div>
    </form>
  );
}
