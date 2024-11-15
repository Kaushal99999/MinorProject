import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

// Register the required components

const ShapBarChart = ({ shapValues }: { shapValues: number[] }) => {
  const features = [
    "thall",
    "caa",
    "cp",
    "exng",
    "oldpeak",
    "chol",
    "thalachh",
  ];
  const data = shapValues.map((value, index) => ({
    feature: features[index],
    shapValue: Math.abs(value),
  }));

  data.sort((a, b) => (a.shapValue > b.shapValue ? -1 : 1));

  return (
    <ResponsiveContainer width="60%" height={300}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="feature" />
        <Bar dataKey="shapValue" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ShapBarChart;
