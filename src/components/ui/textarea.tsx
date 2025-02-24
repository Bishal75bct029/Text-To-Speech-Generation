import * as React from 'react';

import { cn } from '@/lib/utils';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  label?: string;
  className?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, label, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-md-1 text-white-1">{label}</span>}
      <textarea
        className={cn(
          'placeholder:placeholder flex min-h-[60px] w-full resize-none rounded-md bg-black-1 p-4 text-base text-md-1 text-white-1 shadow-sm outline-none focus:border focus:border-orange-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
