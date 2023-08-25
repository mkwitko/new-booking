import React, { useState } from 'react';
import {
  B2BPopover,
  B2BPopoverContent,
  B2BPopoverTrigger,
} from '@/components/nonInteractiveComponents/Popover/index';

interface TextProps {
  children: any;
  className: string;
  length?: number;
}

export default function TextLimmiter({
  className,
  children,
  length = 20,
}: TextProps) {
  const [open, setOpen] = useState(false);

  const handlePopoverOpen = (showShortText: boolean) => {
    if (!showShortText) return;

    setOpen(true);
  };

  const handlePopoverClose = (showShortText = false) => {
    if (!showShortText) return;
    setOpen(false);
  };

  const text = children as string;

  const showShortText: boolean = text.length > length;

  const shortenedText = showShortText ? `${text.slice(0, length)}...` : text;

  return (
    <>
      <B2BPopover
        open={open}
        openChange={setOpen}
      >
        <B2BPopoverTrigger>
          <button
            onMouseEnter={() => handlePopoverOpen(showShortText)}
            onMouseLeave={() => handlePopoverClose(showShortText)}
            className={className}
          >
            {shortenedText}
          </button>
        </B2BPopoverTrigger>
        <B2BPopoverContent>
          <div>
            <p className="capitalize">{text.toLowerCase()}</p>
          </div>
        </B2BPopoverContent>
      </B2BPopover>
    </>
  );
}
