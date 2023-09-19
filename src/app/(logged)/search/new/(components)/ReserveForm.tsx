"use client";

import { useContext } from "react";
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
import ConfirmationDialog from "./ConfirmationDialog";
import { LoggedContext } from "@/context/LoggedContext";

export function ReserveForm() {
  const {
    errors,
    watch,
    costCenter,
    handleSubmit,
    numberOfGuests,
    billings,
    creditCards,
    disableAllowedExpensesField,
    displayCardBackside,
    isBookingCreatedSuccessfully,
    setDisplayCardBackside,
    register,
    setValue,
    isSubmitting,
    submitForm,
    displayGuaranteeForm,
    displayNewCreditCardForm,
    displayIndividualCvvField,
    displayCreditCardNameField,
    bookingAttributes,
    createExpirationDateMask,
    creditCardNameToDisplay,
    creditCardExpirationDateToDisplay,
    setIsBookingCreatedSuccessfully,
  } = useReservationForm();

  console.log(errors);

  const { customer, card, booking, hotels } = useContext(LoggedContext);

  function resetCreditCardValues() {
    setValue("creditCard", {
      plain: null,
      cardCVV: null,
      rcnToken: null,
      tokenized: null,
    });
  }

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

  async function handleChangePurchaseName(value: string) {
    const selectedCustomer = customer.hook.data?.find(
      (customer: any) => customer.name === value,
    );

    await Promise.all([
      customer.findBookingAttributes(selectedCustomer?.alphaId),
      customer.findCostCenter(selectedCustomer?.alphaId),
      card.getCustomerCards(selectedCustomer?.alphaId),
    ]);

    setValue("customer", {
      id: selectedCustomer?.alphaId,
      name: selectedCustomer?.name,
    });
  }

  return (
    <>
      <ConfirmationDialog
        open={!!isBookingCreatedSuccessfully}
        setOpen={setIsBookingCreatedSuccessfully}
        content={isBookingCreatedSuccessfully}
      />

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
              {/* {customer.hook.data && (
                <FormComponents.Combobox
                  items={customer.hook.data}
                  comboBoxValue={watch("customer.name")}
                  comboBoxSetValue={handleChangePurchaseName}
                  costumLabel="name"
                  costumValue="name"
                />
              )} */}

              <FormComponents.Select.Root onValueChange={handleChangePurchaseName} placeholder="Selecione um cliente">
                {customer.hook.data && customer.hook.data.map((item: any) => {
                  return (
                    <FormComponents.Select.Item 
                      key={item.alphaId}
                      text={item.name}
                      value={item.name}
                    />
                  )
                })}
              </FormComponents.Select.Root>

              {errors.consumer && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.customer?.message}
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

          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-1">
            {costCenter && bookingAttributes && (
              <span className="mt-10 block text-xs font-semibold uppercase text-textSecondary">
                Informações gerenciais
              </span>
            )}

            {costCenter && (
              <FormComponents.Select.Root
                placeholder="Centro de Custos"
                onValueChange={(value) => setValue("centerCost", value)}
              >
                {costCenter.map((center: any) => (
                  <FormComponents.Select.Item
                    key={center.costCenterDescription}
                    text={center.costCenterDescription}
                    value={center.costCenterDescription}
                  />
                ))}
              </FormComponents.Select.Root>
            )}
          </div>

          {bookingAttributes && (
            <div className="mt-4 w-full space-y-4">
              {bookingAttributes.map((attribute: any, index: number) => {
                if (!attribute.options) {
                  return (
                    <FormComponents.Input
                      key={attribute.fieldName}
                      type={attribute.type === "numeric" ? "number" : "text"}
                      placeholder={attribute.fieldName}
                      // onChange={(e) => {
                      //   setValue(`customFields.${index}`, {
                      //     field: attribute.fieldName,
                      //     value: e.target.value
                      //   })
                      // }}
                    />
                  );
                } else {
                  return (
                    <FormComponents.Select.Root
                      onValueChange={(e) => {
                        // setValue(`customFields.${index}`, {
                        //   field: attribute.fieldName,
                        //   value: e
                        //   })
                      }}
                      key={attribute.fieldName}
                      placeholder={attribute.fieldName}
                    >
                      {attribute.options.map((option: any) => (
                        <FormComponents.Select.Item
                          key={option}
                          text={option}
                          value={option}
                        />
                      ))}
                    </FormComponents.Select.Root>
                  );
                }
              })}
            </div>
          )}
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

                <FormComponents.Input
                  type="email"
                  placeholder="Email (Opcional)"
                  register={register(`guests.${index}.email`)}
                  errorMessage={errors?.guests?.[index]?.email?.message}
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
              {PaymentMethods.map((method: any) => (
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
                  (billing: {
                    code: string;
                    id: number;
                    description: string;
                  }) => billing.id.toString() === value,
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
                onValueChange={(value) => handleChangeCreditCardValue(value)}
              >
                {creditCards &&
                  creditCards.map((card: any) => {
                    return (
                      <FormComponents.Select.Item
                        key={card.tokenized}
                        text={card.entity}
                        value={
                          card.typeCard === "vcn"
                            ? `vcn-${card.rcnToken}`
                            : `token-${card.tokenized}`
                        }
                        creditCard
                      >
                        <CreditCardOption creditCard={card} />
                      </FormComponents.Select.Item>
                    );
                  })}
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
                      errorMessage={
                        errors?.creditCard?.plain?.cardHolder?.message
                      }
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
                      value={createExpirationDateMask(
                        watch("creditCard.plain.expireDate"),
                      )}
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
                expirationDate={watch("creditCard.plain.expireDate")}
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
                hotels.hook.resetCurrentHotel();
              }}
              label="Descartar"
              color="disabled"
            />
          </Link>
          <B2BButton
            mergeClass="w-auto px-3 py-2 transition-colors"
            disabled={isSubmitting}
            buttonType="submit"
            label="Confirmar Reserva"
          />
        </div>
      </form>
    </>
  );
}
