'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '../ui/scroll-area';

export function B2BCombobox({
  options,
  value,
  setValue,
  labelTag = 'label',
  valueTag = 'value',
}: {
  options: any;
  value: string;
  setValue: (value: string) => void;
  labelTag?: string;
  valueTag?: string;
  elementAsValue?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [filtered, setFiltered] = React.useState(options);

  const getOptions = () => {
    if (!filtered || filtered.length === 0) return options;
    return filtered;
  };

  React.useEffect(() => {
    if (!open) setFiltered(options);
  }, [open, options]);

  return (
    <Popover
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between truncate"
        >
          <p className="truncate w-11/12 text-start text-[0.75rem] capitalize">
            {' '}
            {value
              ? filtered
                  .find((e: any) => {
                    return e[valueTag].toString() === value.toString();
                  })
                  ?.[labelTag].toLowerCase()
              : 'Selecione Um'}
          </p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 PopoverContent">
        <Command>
          <CommandInput
            onChangeCapture={(e: any) => {
              const { value } = e.target;
              const filtered = options.filter((each: any) => {
                return each[labelTag]
                  .toLowerCase()
                  .includes(value.toLowerCase());
              });
              setFiltered(filtered);
            }}
            placeholder="Procurar"
          />
          <CommandEmpty>Sem opções</CommandEmpty>
          <ScrollArea className="max-h-[400px] overflow-y-auto w-full">
            <CommandGroup>
              {options &&
                options.length > 0 &&
                getOptions()
                  .map((each: any, index: number) => (
                    <CommandItem
                      className="text-small text-start"
                      value={each[valueTag].toString()}
                      key={each[valueTag] + '_' + index}
                      onSelect={(currentValue: any) => {
                        setValue(
                          currentValue.toString() === value.toString()
                            ? ''
                            : currentValue
                        );
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === each[valueTag] ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {each[labelTag]}
                    </CommandItem>
                  ))
                  .slice(0, 50)}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
