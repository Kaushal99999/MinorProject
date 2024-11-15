interface RadioInputProps {
  name: string;
  value: string;
  heading: string;
  description?: string;
  options: {
    label: string;
    value: number;
  }[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const RadioInputs: React.FC<RadioInputProps> = ({
  name,
  value,
  heading,
  description,
  options,
  handleChange,
}) => {
  return (
    <div className="w-full">
      <p className="mb-1 text-lg font-bold">{heading}</p>
      <div className="flex flex-col">
        {options.map((option) => (
          <label key={option.value} className="flex gap-1">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value.toString()}
              onChange={handleChange}
            />
            {option.label}
          </label>
        ))}
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default RadioInputs;
