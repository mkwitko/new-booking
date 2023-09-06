"use client";

import WhiteBox from "@/components/coreComponents/containers/WhiteBox";
import * as FormComponents from "@/components/formComponents";
import { useReservationForm } from "../(form)/useReservationForm";

// Mock Data
import { PaymentMethods } from "../(data)";

import { CreditCardOption } from "./CreditCardOption";
import { NewCreditCardOption } from "./NewCreditCardOption";
import { CredtiCard } from "./CreditCard";
import { useContext, useEffect, useState } from "react";
import B2BButton from "@/components/interactiveComponents/Button";
import Link from "next/link";
import { SearchContext } from "@/context/SearchContext";
import { B2BApi } from "@/infra/api/B2BApi";

export function ReserveForm() {
  const {
    errors,
    watch,
    handleSubmit,
    isSubmitting,
    register,
    // billings,
    setValue,
    submitForm,
    displayGuaranteeForm,
    displayNewCreditCardForm,
    displayCreditCardNameField,
    guestIdToDisplay,

    creditCardExpirationDateToDisplay,
    creditCardNumberToDisplay,
    creditCardNameToDisplay,
  } = useReservationForm();

  const [displayCardBackside, setDisplayCardBackside] =
    useState<boolean>(false);

  const [creditCards, setCreditCards] = useState<any[] | null>(null);
  const [availableCustomers, setAvailableCustomers] = useState<any[] | null>(
    null,
  );

  const { hotelHook, peopleHook } = useContext(SearchContext);
  const disableAllowedExpensesField = displayGuaranteeForm;
  const { billings, companyId } = hotelHook.currentHotel;

  const NUMBER_OF_GUESTS = peopleHook.numberOfGuests;

  function handleChangePurchaseName(value: string) {
    setValue("consumer", value);
  }

  //   TODO - Criar classses
  useEffect(() => {
    B2BApi.get("/cards", { headers: { "X-Company-Id": companyId } }).then(
      (res) => {
        setCreditCards(res.data.cardList);
      },
    );

    B2BApi.get("/customers", { headers: { "X-Company-Id": companyId } }).then(
      (res) => {
        console.log(res);
        setAvailableCustomers(res.data.data);
      },
    );
  }, [companyId]);

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
          <div className="mt-auto w-full">
            {availableCustomers && (
              <FormComponents.Combobox
                items={availableCustomers}
                comboBoxValue={watch("consumer")}
                comboBoxSetValue={handleChangePurchaseName}
                costumLabel="name"
                costumValue="name"
              />
            )}

            {errors.consumer && (
              <p className="mt-2 text-xs text-red-500">
                {errors.consumer?.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <FormComponents.Checkbox
              label="Autoriza cobrança de taxa de turismo"
              id="allow-turism-taxes"
              register={register("chargeTurismTaxes")}
            />

            <FormComponents.Checkbox
              label="Reserva com garantia de no-show"
              id="allow-no-show-ensurance"
              register={register("chargeNoShow")}
            />
          </div>
        </div>

        <span className="mt-10 block text-xs font-semibold uppercase text-textSecondary">
          Informações gerenciais
        </span>

        <div className="mt-4 grid w-full grid-cols-1 gap-4 lg:grid-cols-1">
          {/* Combo box */}
          <FormComponents.Input
            type="text"
            placeholder="Centro de Custos"
            errorMessage={errors?.centerCost?.message}
            register={register("centerCost")}
          />

          {/* <FormComponents.Input
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
          /> */}
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

            <div className="mt-4 grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
              {/* Combo Box */}
              {/* <FormComponents.Input
                type="text"
                placeholder="CPF (Opcional)"
                maxLength={14}
                value={guestIdToDisplay(watch(`guests.${index}.id`))}
                register={register(`guests.${index}.id`)}
                errorMessage={errors?.guests?.[index]?.id?.message}
              /> */}

              <FormComponents.Input
                type="email"
                placeholder="Email (Opcional)"
                register={register(`guests.${index}.email`)}
                errorMessage={errors?.guests?.[index]?.email?.message}
              />

              <FormComponents.Input
                type="text"
                placeholder="Nome"
                register={register(`guests.${index}.givenName`)}
                errorMessage={errors?.guests?.[index]?.givenName?.message}
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
            disabled={disableAllowedExpensesField}
            placeholder={
              disableAllowedExpensesField
                ? "Direto ao Hotel"
                : "Despesas Autorizadas"
            }
            errorMessage={errors?.payment?.allowedExpenses?.message}
            onValueChange={(value) =>
              setValue("payment.allowedExpenses", value)
            }
          >
            {billings &&
              billings.map((expense: { id: number; description: string }) => (
                <FormComponents.Select.Item
                  key={expense.id}
                  text={expense.description}
                  value={expense.description}
                />
              ))}
          </FormComponents.Select.Root>
        </div>

        {displayCreditCardNameField && (
          <div className="mt-4 grid w-full grid-cols-1">
            <FormComponents.Select.Root
              disabled={!creditCards}
              placeholder="Informe o cartão de crédito"
              errorMessage={errors?.payment?.selectedCreditCard?.message}
              onValueChange={(value) => {
                const selectedCreditCard = creditCards?.find(
                  (card: any) => card.tokenized === value,
                );

                console.log(selectedCreditCard);

                setValue(
                  "creditCard.cardNumber",
                  selectedCreditCard.cardNumber,
                );
                setValue("creditCard.cardName", selectedCreditCard.entity);
              }}
            >
              {creditCards &&
                creditCards.map((card: any) => (
                  <FormComponents.Select.Item
                    key={card.tokenized}
                    text={card.entity}
                    value={card.tokenized}
                    creditCard
                  >
                    <CreditCardOption
                      flag={card.brand}
                      cvv="123"
                      id={card.tokenized}
                      name={card.entity}
                      number={card.cardNumber}
                    />
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

            {displayNewCreditCardForm && (
              <div className="mt-4 grid w-full grid-cols-1 gap-y-4 md:grid-cols-2">
                {/* Cartão de Crédito */}
                <div className="space-y-4">
                  <span className="mt-4 block text-xs font-semibold uppercase text-textSecondary">
                    Dados do cartão de crédito
                  </span>
                  <CredtiCard
                    expirationDate={watch("creditCard.expiry")}
                    name={watch("creditCard.cardName")}
                    number={watch("creditCard.cardNumber")}
                    securityCode={watch("creditCard.cardCVV")}
                    showBackside={displayCardBackside}
                  />
                </div>

                <div className="mt-auto space-y-4">
                  <FormComponents.Input
                    placeholder="Nome no cartão"
                    maxLength={25}
                    value={creditCardNameToDisplay}
                    register={register("creditCard.cardName")}
                    errorMessage={errors?.creditCard?.cardName?.message}
                    type="text"
                  />

                  <FormComponents.Input
                    placeholder="Número do cartão"
                    maxLength={19}
                    pattern="[0-9]{16}"
                    value={creditCardNumberToDisplay}
                    register={register("creditCard.cardNumber")}
                    errorMessage={errors?.creditCard?.cardNumber?.message}
                    type="text"
                  />

                  <FormComponents.Input
                    placeholder="Validade"
                    maxLength={5}
                    value={creditCardExpirationDateToDisplay}
                    register={register("creditCard.expiry")}
                    errorMessage={errors?.creditCard?.expiry?.message}
                    type="text"
                  />

                  <FormComponents.Input
                    type="text"
                    placeholder="CVV"
                    className="w-28"
                    errorMessage={errors?.creditCard?.cardCVV?.message}
                    register={register("creditCard.cardCVV")}
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

      {displayGuaranteeForm && (
        <WhiteBox classes="gap-0 lg:gap-0">
          <span className="font-semibold uppercase text-primary-500">
            Informar Garantia
          </span>

          <div className="mt-4 grid w-full grid-cols-1 gap-y-4 md:grid-cols-2">
            <CredtiCard
              expirationDate={watch("creditCard.expiry")}
              name={watch("creditCard.cardName")}
              number={watch("creditCard.cardNumber")}
              securityCode={watch("creditCard.cardCVV")}
              showBackside={displayCardBackside}
            />

            <div className="mt-auto space-y-4">
              <FormComponents.Input
                placeholder="Nome no cartão"
                maxLength={25}
                value={creditCardNameToDisplay}
                register={register("creditCard.cardName")}
                errorMessage={errors?.creditCard?.cardName?.message}
                type="text"
              />

              <FormComponents.Input
                placeholder="Número do cartão"
                maxLength={19}
                pattern="[0-9]{16}"
                value={creditCardNumberToDisplay}
                register={register("creditCard.cardNumber")}
                errorMessage={errors?.creditCard?.cardNumber?.message}
                type="text"
              />

              <FormComponents.Input
                placeholder="Validade"
                maxLength={5}
                value={creditCardExpirationDateToDisplay}
                register={register("creditCard.expiry")}
                errorMessage={errors?.creditCard?.expiry?.message}
                type="text"
              />

              <FormComponents.Input
                type="text"
                placeholder="CVV"
                className="w-28"
                errorMessage={errors?.creditCard?.cardCVV?.message}
                register={register("creditCard.cardCVV")}
                maxLength={3}
                onFocus={() => setDisplayCardBackside(true)}
                onBlur={() => setDisplayCardBackside(false)}
              />
            </div>
          </div>
        </WhiteBox>
      )}

      <WhiteBox classes="gap-0 lg:gap-0">
        <span className="font-semibold uppercase text-primary-500">
          Forma de Pagamento
        </span>

        <FormComponents.Textarea
          placeholder="Observações (Opcional)"
          className="mt-6"
          register={register("comments")}
          errorMessage={errors?.comments?.message}
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
