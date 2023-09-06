"use client";

import * as React from "react";
import { format } from "date-fns";

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
  checkOut: any;
  setCheckOut: any;
  disable?: boolean;
}

export function B2BDatePicker({
  className,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  disable,
}: Props) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-full justify-start text-left text-small")}
            disabled={disable}
          >
            {checkIn ? (
              checkOut ? (
                <>
                  {format(checkIn, "dd/MM/yyyy")} |{" "}
                  {format(checkOut, "dd/MM/yyyy")}
                </>
              ) : (
                format(checkIn, "dd/MM/yyyy")
              )
            ) : (
              <span>Escolha uma Data</span>
            )}
          </Button>
        </PopoverTrigger>
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
