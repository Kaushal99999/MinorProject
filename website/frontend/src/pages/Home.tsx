import React from "react";
import Card from "../components/Card";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen text-neutral-950 bg-neutral-50">
      <h1 className="mb-8 text-4xl font-bold">Health Analysis</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Card for Heart Disease Prediction */}
        <Card
          to="/heart-analysis"
          heading="Heart Disease Prediction"
          description="Analyze heart health and predict potential risks of heart disease based on patient data."
        />

        {/* Card for Diabetes Prediction */}
        <Card
          to="/diabetes"
          heading="Diabetes Prediction"
          description="Assess risk factors for diabetes and predict likelihood of developing diabetes."
        />
      </div>
    </div>
  );
};

export default Home;
