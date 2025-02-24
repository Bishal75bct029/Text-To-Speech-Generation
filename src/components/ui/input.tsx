import * as React from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  startIcon?: string;
  startIconClassName?: string;
  endIcon?: string;
  endIconClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ startIcon, label, startIconClassName, endIcon, endIconClassName, className, type, ...props }, ref) => {
    return (
      <div className="relative flex flex-col gap-2">
        {label && <span className="text-md-1 text-white-1">{label}</span>}
        {startIcon && (
          <Image
            src={startIcon}
            width={20}
            height={20}
            alt=""
            className={cn('absolute left-4 top-[14px] items-center justify-self-end', startIconClassName)}
          />
        )}
        <input
          type={type}
          className={cn(
            'placeholder:placeholder transition-border flex h-9 w-full rounded-md bg-black-2 p-4 px-3 py-6 text-md-3 shadow-sm transition-colors duration-300 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:border-2 focus:border-orange-1 focus:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-md-3',
            startIcon && 'pl-12',
            endIcon && 'pr-12',
            className,
          )}
          ref={ref}
          {...props}
        />
        {endIcon && (
          <Image
            src={endIcon}
            width={20}
            height={20}
            alt=""
            className={cn('absolute right-2 top-[14px] items-center justify-self-end', endIconClassName)}
          />
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
