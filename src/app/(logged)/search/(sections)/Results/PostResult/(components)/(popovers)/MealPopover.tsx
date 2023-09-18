import { getMealIncludedValue } from "@/app/(logged)/search/(utils)/MealIncluded";
import { Hotels } from "@/classes/availability/DTO/AvailabilityDTO";
import Image from "next/image";
import { useState } from "react";
import {
  B2BPopover,
  B2BPopoverContent,
  B2BPopoverTrigger,
} from "@/components/nonInteractiveComponents/Popover";

export default function MealPopover({
  hotel,
  mealTitle = false,
  rateIndex = 0,
}: {
  hotel: Hotels;
  mealTitle?: boolean;
  rateIndex?: number;
}) {
  const [mealPopover, setMealPopover] = useState(false);
  const mealIncluded =
    hotel.rates &&
    getMealIncludedValue(hotel.rates[rateIndex].mealIncluded.code);
  return (
    mealIncluded && (
      <>
        <B2BPopover open={mealPopover} openChange={setMealPopover}>
          <B2BPopoverTrigger>
            <button
              type="button"
              onMouseEnter={() => {
                if (!mealTitle) setMealPopover(true);
              }}
              onMouseLeave={() => {
                if (!mealTitle) setMealPopover(false);
              }}
            >
              <div className="flex items-center gap-2">
                <div className="relative h-6 w-6">
                  <Image
                    fill
                    src={mealIncluded.iconPath}
                    alt={mealIncluded.name}
                  />
                </div>
                {mealTitle && (
                  <p className="hidden text-small font-[400] capitalize text-textPrimary sm:block">
                    {mealIncluded.name.toLowerCase()}
                  </p>
                )}
              </div>
            </button>
          </B2BPopoverTrigger>
          <B2BPopoverContent>
            <p className="text-small">{mealIncluded.name}</p>
          </B2BPopoverContent>
        </B2BPopover>
      </>
    )
  );
}
