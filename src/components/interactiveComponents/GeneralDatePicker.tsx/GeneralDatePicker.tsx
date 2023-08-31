"use client";

import * as React from "react";
import { add, addDays, format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  checkIn: any;
  setCheckIn: any;
  checkOut?: any;
  setCheckOut?: any;
  children: React.ReactNode;
  onChange?: (e: any) => void;
  open?: boolean;
}

export function GeneralB2BDatePicker({
  className,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  children,
  onChange,
  open,
}: Props) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
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
                if (onChange) onChange(e);
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
