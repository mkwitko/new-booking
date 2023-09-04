"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxProps extends React.ComponentProps<'input'> {
  comboBoxValue: string | undefined | null,
  comboBoxSetValue: (value: string) => void,
  items: any
}

/**
 * Componente de Combobox
 * 
 * Este componente aceita receber qualquer lista para iterar sobre seus ítems, porém o valor a ser capturado deve estar na propriedade 'value' de cada ítem.
 * Bem como o item a ser exibido deve estar na propriedade 'label' de cada ítem.
 * 
 * @param comboBoxValue Valor do combobox
 * @param comboBoxSetValue Função para setar o valor do combobox
 * @param items Lista de ítems a serem exibidos no combobox
 */
export function Combobox({ comboBoxValue, comboBoxSetValue, items }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [filter, setFilter] = React.useState<string | null>(null)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full mt-auto justify-between"
        >
          {comboBoxValue
            ? items.find((item: any) => item.value === comboBoxValue)?.label
            : "Cliente"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput className="placeholder:text-textSecondary font-regular" placeholder="Digite para filtrar" onValueChange={(search) => setFilter(search)}/>
          <CommandEmpty>Nenhum registro encontrado</CommandEmpty>
          <CommandGroup>
            {items.map((item: any) => {
              if (filter && !item.label.toLowerCase().includes(filter.toLowerCase())) return null

              return (
                <CommandItem
                  key={item.value}
                  onSelect={() => {
                    comboBoxSetValue(item.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      comboBoxValue === item.label ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
