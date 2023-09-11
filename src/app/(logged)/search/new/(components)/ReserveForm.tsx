"use client";

import WhiteBox from "@/components/coreComponents/containers/WhiteBox";
import * as FormComponents from "@/components/formComponents";
import { useReservationForm } from "../(form)/useReservationForm";

// Mock Data
import { PaymentMethods } from "../(data)";

import { CreditCardOption } from "./CreditCardOption";
import { NewCreditCardOption } from "./NewCreditCardOption";
import { CredtiCard } from "./CreditCard";
import B2BButton from "@/components/interactiveComponents/Button";

import Link from "next/link";

export function ReserveForm() {
  const {
    errors,
    watch,
    hotelHook,
    handleSubmit,
    isSubmitting,
    numberOfGuests,
    customer,
    billings,
    creditCards,
    disableAllowedExpensesField,
    displayCardBackside,
    handleChangePurchaseName,
    setDisplayCardBackside,
    register,
    setValue,
    submitForm,
    displayGuaranteeForm,
    displayNewCreditCardForm,
    displayIndividualCvvField,
    displayCreditCardNameField,
    creditCardExpirationDateToDisplay,
    createExpirationDateMask,
    creditCardNameToDisplay,
  } = useReservationForm();

  return (
    <form
      className="w-full space-y-4"
      onSubmit={handleSubmit(submitForm)}
      noValidate
    >
      <WhiteBox classes="gap-0 lg:gap-0">
        <span className="font-semibold uppercase text-primary-500">
          Dados do Comprador
        </span>

        <div className="mt-6 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="mt-auto w-full">
            {customer.hook.data && (
              <FormComponents.Combobox
                items={customer.hook.data}
                comboBoxValue={watch("customer.name")}
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
        </div>
      </WhiteBox>

      <WhiteBox classes="gap-0 lg:gap-0">
        <span className="font-semibold uppercase text-primary-500">
          Dados dos Hóspedes
        </span>

        {Array.from({ length: numberOfGuests }).map((_, index) => (
          <>
            <span className="mt-4 block text-xs font-semibold uppercase text-textSecondary">
              Hóspede {index + 1}
            </span>

            <div className="mt-4 grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
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
            errorMessage={errors?.paymentMethod?.message}
            onValueChange={(value) => {
              if (value === "Direto ao Hotel") {
                setValue("billing", {
                  id: 746,
                  code: "direto",
                  description: "DIRETO NO HOTEL",
                });
              }
              setValue("paymentMethod", value);
            }}
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
            errorMessage={errors?.billing?.description?.message}
            onValueChange={(value) => {
              const selectedBilling = billings.find(
                (billing: { code: string; id: number; description: string }) =>
                  billing.id.toString() === value,
              );
              setValue("billing", {
                code: selectedBilling.code,
                description: selectedBilling.description,
                id: selectedBilling.id,
              });
            }}
          >
            {billings &&
              billings.map((expense: { id: number; description: string }) => (
                <FormComponents.Select.Item
                  key={expense.id}
                  text={expense.description}
                  value={expense.id.toString()}
                />
              ))}
          </FormComponents.Select.Root>
        </div>

        {displayCreditCardNameField && (
          <div className="mt-4 grid w-full grid-cols-1">
            <FormComponents.Select.Root
              disabled={!creditCards}
              placeholder="Informe o cartão de crédito"
              errorMessage={errors?.selectCreditCard?.message}
              onValueChange={(value) => {
                if (value === "Informar Manualmente") {
                  setValue("selectCreditCard", "Informar Manualmente");
                } else {
                  setValue("selectCreditCard", value);
                  setValue("creditCard.tokenized", value);
                }
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

            {displayIndividualCvvField && (
              <FormComponents.Input
                type="text"
                placeholder="CVV"
                className="mt-4 w-28"
                errorMessage={errors?.creditCard?.cardCVV?.message}
                register={register("creditCard.cardCVV")}
                maxLength={3}
              />
            )}

            {displayNewCreditCardForm && (
              <div className="mt-4 grid w-full grid-cols-1 gap-y-4 md:grid-cols-2">
                <div className="space-y-4">
                  <span className="mt-4 block text-xs font-semibold uppercase text-textSecondary">
                    Dados do cartão de crédito
                  </span>
                  <CredtiCard
                    expirationDate={watch("creditCard.plain.expireDate")}
                    name={watch("creditCard.plain.cardHolder")}
                    number={watch("creditCard.plain.cardNumber")}
                    securityCode={watch("creditCard.cardCVV")}
                    showBackside={displayCardBackside}
                  />
                </div>

                <div className="mt-auto space-y-4">
                  <FormComponents.Input
                    placeholder="Nome no cartão"
                    maxLength={25}
                    value={creditCardNameToDisplay}
                    register={register("creditCard.plain.cardHolder")}
                    errorMessage={errors?.creditCard?.plain?.cardHolder?.message}
                    type="text"
                  />

                  <FormComponents.Input
                    placeholder="Número do cartão"
                    maxLength={16}
                    pattern="[0-9]{16}"
                    register={register("creditCard.plain.cardNumber")}
                    errorMessage={
                      errors?.creditCard?.plain?.cardNumber?.message
                    }
                    type="text"
                  />

                  <FormComponents.Input
                    placeholder="Validade"
                    maxLength={5}
                    value={createExpirationDateMask(watch('creditCard.plain.expireDate'))}
                    register={register("creditCard.plain.expireDate")}
                    errorMessage={
                      errors?.creditCard?.plain?.expireDate?.message
                    }
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
              expirationDate={watch(
                "creditCard.plain.expireDate",
              )}
              name={watch("creditCard.plain.cardHolder")}
              number={watch("creditCard.plain.cardNumber")}
              securityCode={watch("creditCard.cardCVV")}
              showBackside={displayCardBackside}
            />

            <div className="mt-auto space-y-4">
              <FormComponents.Input
                placeholder="Nome no cartão"
                maxLength={25}
                value={creditCardNameToDisplay}
                register={register("creditCard.plain.cardHolder")}
                errorMessage={errors?.creditCard?.plain?.cardHolder?.message}
                type="text"
              />

              <FormComponents.Input
                placeholder="Número do cartão"
                maxLength={16}
                // value={creditCardNumberToDisplay}
                register={register("creditCard.plain.cardNumber")}
                errorMessage={errors?.creditCard?.plain?.cardNumber?.message}
                type="text"
              />

              <FormComponents.Input
                placeholder="Validade"
                maxLength={5}
                value={creditCardExpirationDateToDisplay}
                register={register("creditCard.plain.expireDate")}
                errorMessage={errors?.creditCard?.plain?.expireDate?.message}
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
