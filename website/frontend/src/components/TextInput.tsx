interface TextInputProps {
  name: string;
  value: string;
  heading: string;
  description?: string;
  handleChange: (name: string, value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  value,
  heading,
  description,
  handleChange,
}) => {
  return (
    <div className="w-full">
      <p className="mb-1 text-lg font-bold">{heading}</p>
      <input
        type="number"
        name={name}
        value={value}
        onChange={(e) => handleChange(name, e.target.value)} // Adjusted to pass name and value
        className="w-full px-3 py-2 transition-all duration-200 border border-gray-300 rounded-md focus:outline focus:outline-blue-500"
        placeholder=""
        required
      />
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default TextInput;
