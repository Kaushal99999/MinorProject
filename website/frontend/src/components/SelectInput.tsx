import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectInputProps {
  name: string;
  value: string;
  heading: string;
  description?: string;
  options: {
    label: string;
    value: number;
  }[];
  handleChange: (name: string, value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  // value,
  heading,
  description,
  options,
  handleChange,
}) => {
  return (
    <div className="w-full">
      <p className="mb-1 text-lg font-bold">{heading}</p>
      <Select onValueChange={(val) => handleChange(name, val)}>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{heading}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
};

export default SelectInput;
