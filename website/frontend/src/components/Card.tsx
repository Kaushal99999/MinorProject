import { Link } from "react-router-dom";

interface CardProps {
  to: string;
  heading: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ to, heading, description }) => {
  return (
    <Link to={to} className="group">
      <div className="flex flex-col justify-between p-5 transition duration-300 transform border border-neutral-300 rounded-xl shadow-sm aspect-[4/3] bg-neutral-50 w-80 group-hover:bg-neutral-100">
        <h2 className="text-2xl font-bold">{heading}</h2>
        <p className="text-neutral-500">{description}</p>
      </div>
    </Link>
  );
};

export default Card;
