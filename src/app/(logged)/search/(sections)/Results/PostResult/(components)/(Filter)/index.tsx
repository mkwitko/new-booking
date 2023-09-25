"use client";

import { GoFilter } from "react-icons/go";
import * as FormComponents from "@/components/formComponents";
import { ScrollArea } from "@/components/ui/scroll-area";
import B2BButton from "@/components/interactiveComponents/Button";
import { useFilterForm } from "./useFilterForm";
import { integratedSistems } from "@/utils/integratedSystem";

export function Filter({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    availNeighborhoods,
    filterHotels,
    handleSubmit,
    minPrice,
    maxPrice,

    integratedSystems,
    register,
    setValue,
    watch,
    hotels,
    clearFilters,
  } = useFilterForm({ setOpen });

  return (
    <form
      onSubmit={handleSubmit(filterHotels)}
      className="relative flex w-full flex-col justify-start"
    >
      <div className="absolute left-0 right-0 top-0 flex h-[50px] items-center justify-start gap-2">
        <GoFilter size={24} className="text-primary" />
        <span className="text-lg font-semibold uppercase text-primary">
          Filtros
        </span>
      </div>

      <div className="mt-[calc(50px+1.5rem)] flex w-full flex-col">
        <button
          type="button"
          className="ml-auto pb-2 text-xs font-bold uppercase text-primary"
          onClick={clearFilters}
        >
          Limpar Filtros
        </button>
        {!hotels && <p>Carregando...</p>}
        {hotels && (
          <ScrollArea className="flex h-[300px] flex-col pr-4">
            <FormComponents.Input
              placeholder="Digite o nome do hotel"
              className="mt-2"
              register={register("name")}
            />

            <div className="mt-2">
              <FormComponents.Checkbox
                label="Apenas hotéis com gateway"
                id="onlyWithGateway"
                register={register("onlyWithGateway")}
              />
            </div>

            {/* Price Range */}
            <FormComponents.Range
              value={[
                watch("priceRange.min") || minPrice,
                watch("priceRange.max") || maxPrice,
              ]}
              minLimit={watch("priceRange.min") || minPrice}
              maxLimit={watch("priceRange.max") || maxPrice}
              onValueChange={(value) => {
                setValue("priceRange.min", value[0]);
                setValue("priceRange.max", value[1]);
              }}
              className="mt-6"
              max={maxPrice}
              min={minPrice}
              minStepsBetweenThumbs={500}
              // register={register('priceRange')}
            />

            {watch("priceRange.min") && watch("priceRange.max") && (
              <p className="mt-2 block text-end text-xs uppercase text-primary">
                BRL {watch("priceRange.min")},00 até BRL{" "}
                {watch("priceRange.max")},00
              </p>
            )}

            <FormComponents.Input
              placeholder="Endereço "
              className="mt-2"
              register={register("address")}
            />

            {/* <span className="mt-4 block text-xs text-primary">
              Distância máxima (Km)
            </span>

            <FormComponents.Slider
              className="mt-4"
              onValueChange={(value) => {
                setValue("distanceRange", value[0]);
              }}
              initialValue={watch("distanceRange")}
              defaultValue={[0]}
              min={0}
              max={100}
            /> */}

            <span className="mt-4 block text-xs font-semibold uppercase text-primary">
              Pensão
            </span>

            <div className="mt-2 flex items-center justify-between gap-2">
              <FormComponents.Checkbox
                label="Café da manhã incluído"
                id="withBreakfast"
                register={register("withBreakfast")}
              />
            </div>

            <span className="mt-4 block text-xs font-semibold uppercase text-primary">
              Disponibilidade
            </span>

            <div className="mt-2 flex items-center justify-between gap-2">
              <FormComponents.Checkbox
                label="Somente disponíveis"
                id="onlyAvailable"
                register={register("onlyAvailable")}
              />
            </div>

            <span className="mt-4 block text-xs font-semibold uppercase text-primary">
              Formas de Pagamento
            </span>

            <div className="mt-2 flex items-center justify-between gap-2">
              <FormComponents.Checkbox
                label="Pagamento Direto"
                id="directPayment"
                register={register("paymentMethods.directPayment")}
              />
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              <FormComponents.Checkbox
                label="Faturado"
                id="billed"
                register={register("paymentMethods.billed")}
              />
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              <FormComponents.Checkbox
                label="Cartão Virtual"
                id="virtualCard"
                register={register("paymentMethods.virtualCard")}
              />
            </div>

            {/* <span className="mt-4 block text-xs font-semibold uppercase text-primary">
              Política de Cancelamento
            </span>

            <div className="mt-2 flex items-center justify-between gap-2">
              <FormComponents.Checkbox
                label="Gratuito"
                id="freeCancellation"
                register={register("freeCancellation")}
              />
            </div> */}

            <span className="mt-4 block text-xs font-semibold uppercase text-primary">
              Bairros
            </span>

            {availNeighborhoods &&
              availNeighborhoods.map((neighborhood: string, index: number) => {
                return (
                  <div
                    className="mt-2 flex items-center justify-between gap-2"
                    key={neighborhood}
                  >
                    <FormComponents.Checkbox
                      label={neighborhood}
                      id={`neighborhood-${neighborhood}`}
                      register={register(
                        `neighborhoods.${index}.${neighborhood}`,
                      )}
                    />
                  </div>
                );
              })}

            <span className="mt-4 block text-xs font-semibold uppercase text-primary">
              Sistemas Integrados
            </span>

            {integratedSystems &&
              integratedSystems.map(
                (integratedSystem: string, index: number) => {
                  return (
                    <div
                      className="mt-2 flex items-center justify-between gap-2"
                      key={integratedSystem}
                    >
                      <FormComponents.Checkbox
                        label={
                          integratedSistems.find(
                            (e) => e.systemId === integratedSystem,
                          )?.label
                        }
                        id={`integratedSystem-${integratedSystem}`}
                        register={register(
                          `integratedSystems.${index}.${integratedSystem}`,
                        )}
                      />
                    </div>
                  );
                },
              )}
          </ScrollArea>
        )}
        <div className="flex h-[50px] w-full items-center">
          <B2BButton label="filtrar" buttonType="submit" />
        </div>
      </div>
    </form>
  );
}
