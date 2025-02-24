import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface SelectComponentProps extends React.ComponentProps<typeof Select> {
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
  optionsClassName?: string;
  label?: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  options,
  label,
  optionsClassName,
  className,
  placeholder = 'Select an Item',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-md-1 text-white-1">{label}</span>}
      <Select {...props}>
        <SelectTrigger className={cn('min-w-[11.25rem] bg-black-2', className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-black-2">
          {options.map(({ label, value }) => (
            <SelectItem
              key={value}
              value={value}
              className={cn('cursor-pointer bg-black-2 text-white-1 hover:bg-black-3', optionsClassName)}
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectComponent;
