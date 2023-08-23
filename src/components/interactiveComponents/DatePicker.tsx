'use client';

import * as React from 'react';
import { addDays, format, parseISO } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  checkIn: any;
  setCheckIn: any;
  checkOut: any;
  setCheckOut: any;
}

export function B2BDatePicker({
  className,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
}: Props) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('w-full justify-start text-left text-small')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {checkIn ? (
              checkOut ? (
                <>
                  {format(checkIn, 'LLL dd, y')} -{' '}
                  {format(checkOut, 'LLL dd, y')}
                </>
              ) : (
                format(checkIn, 'LLL dd, y')
              )
            ) : (
              <span>Escolha uma Data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0"
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={checkIn}
            selected={{
              from: checkIn,
              to: checkOut,
            }}
            onSelect={(e: any) => {
              if (e) {
                setCheckIn(e.from || null);
                setCheckOut(e.to || null);
              } else {
                setCheckIn(null);
                setCheckOut(null);
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
