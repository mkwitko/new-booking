'use client'

import { GoFilter } from "react-icons/go";
import * as FormComponents from '@/components/formComponents'
import { ScrollArea } from "@/components/ui/scroll-area"
import B2BButton from "@/components/interactiveComponents/Button";
import { useFilterForm } from "./useFilterForm";

export function Filter() {
  const { availNeighborhoods, filterHotels, formState, handleSubmit, priceRange, register, setValue, watch, hotels, clearFilters } = useFilterForm()

  console.log(formState.errors)

  return (
    <form onSubmit={handleSubmit(filterHotels)} className="flex flex-col w-full justify-start relative">
      <div className="absolute top-0 left-0 right-0 flex items-center justify-start gap-2 h-[50px]">
        <GoFilter size={24} className="text-primary" />
        <span className="text-primary uppercase font-semibold text-lg">Filtros</span>
      </div>

      <div className="mt-[calc(50px+1.5rem)] flex flex-col w-full">
        <button type="button" className="ml-auto text-xs text-primary font-bold uppercase pb-2" onClick={clearFilters}>Limpar Filtros</button>
        {!hotels && <p>Carregando...</p>}
        {hotels && (
        <ScrollArea className="h-[300px] flex flex-col pr-4">

        <FormComponents.Input 
          placeholder="Digite o nome do hotel"
          className="mt-2"
          register={register('name')}
        />

        <FormComponents.Checkbox 
          label="Apenas hotéis com gateway"
          className="mt-4"
          id='onlyWithGateway'
          register={register('onlyWithGateway')}
        />

        {/* Price Range */}
        <FormComponents.Range 
          defaultValue={[watch('priceRange.min') || priceRange?.minPrice || 0, watch('priceRange.max') || priceRange?.maxPrice || 500]} 
          maxLimit={watch('priceRange.max') || priceRange?.maxPrice}
          minLimit={watch('priceRange.min') || priceRange?.minPrice}
          onValueChange={(value) => {
            setValue('priceRange.min', value[0])
            setValue('priceRange.max', value[1])
          }}
          className="mt-6" 
          max={priceRange?.maxPrice} 
          min={priceRange?.minPrice} 
          minStepsBetweenThumbs={500} 
          // register={register('priceRange')}
        />

        {
          watch('priceRange.min') && watch('priceRange.max') && (
            <p className="block mt-2 text-end text-primary text-xs uppercase">BRL {watch('priceRange.min')},00 até BRL {watch('priceRange.max')},00</p>
          )
        }
        
        {/* Star Rating */}
        <FormComponents.Input 
          placeholder="Endereço "
          className="mt-2"
          register={register('address')}
        />

        <span className="text-primary text-xs mt-4 block">Distância máxima (Km)</span>

        <FormComponents.Slider 
          className="mt-4"
          onValueChange={(value) => { setValue('distanceRange', value[0]) }}
          initialValue={watch('distanceRange')}
          defaultValue={[ 0 ]}
          min={0}
          max={100}
        />

        <span className="uppercase block text-primary font-semibold text-xs mt-4">
          Disponibilidade
        </span>

        <div className="flex items-center justify-between gap-2 mt-2">
          <FormComponents.Checkbox 
            label="Somente disponíveis"
            id='onlyAvailable'
            register={register('onlyAvailable')}
          />

        </div>

        <span className="uppercase block text-primary font-semibold text-xs mt-4">
          Formas de Pagamento
        </span>

        <div className="flex items-center justify-between gap-2 mt-2">
          <FormComponents.Checkbox 
            label="Pagamento Direto"
            id="directPayment"
            register={register('paymentMethods.directPayment')}
          />
        </div>

        <div className="flex items-center justify-between gap-2 mt-2">
          <FormComponents.Checkbox 
            label="Faturado"
            id="billed"
            register={register('paymentMethods.billed')}
          />
        </div>

        <div className="flex items-center justify-between gap-2 mt-2">
          <FormComponents.Checkbox 
            label="Cartão Virtual"
            id="virtualCard"
            register={register('paymentMethods.virtualCard')}
          />
        </div>

        <span className="uppercase block text-primary font-semibold text-xs mt-4">
          Política de Cancelamento
        </span>

        <div className="flex items-center justify-between gap-2 mt-2">
          <FormComponents.Checkbox 
            label="Gratuito"
            id="freeCancellation"
            register={register('freeCancellation')}
          />
        </div>

        <span className="uppercase block text-primary font-semibold text-xs mt-4">
          Bairros
        </span>

        {availNeighborhoods && availNeighborhoods.map((neighborhood: string, index:number) => {
          return (
            <div className="flex items-center justify-between gap-2 mt-2" key={neighborhood}>
              <FormComponents.Checkbox 
                label={neighborhood}
                id={`neighborhood-${neighborhood}`}
                register={register(`neighborhoods.${index}.${neighborhood}`)}
              />    
            </div>
          )
        })}
      </ScrollArea>
      )}
      <div className="w-full flex items-center h-[50px]">
        <B2BButton label="filtrar" buttonType="submit" />
        </div>
    </div>
  </form>
  )
}