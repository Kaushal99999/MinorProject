import React, { useState } from "react";
import BarChart from "../components/BarChart";
import TextInput from "../components/TextInput";

interface IFormData {
  Pregnancies: string;
  Glucose: string;
  BloodPressure: string;
  SkinThickness: string;
  Insulin: string;
  BMI: string;
  DiabetesPedigreeFunction: string;
  Age: string;
}

interface IPrediction {
  prediction: number;
  probability: number;
  shapValues: number[][];
}

const Diabetes = () => {
  const [formData, setFormData] = useState<IFormData>({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });
  const [predictionResult, setPredictionResult] = useState<IPrediction | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchPrediction(); // Fetch prediction after updating the URL
    console.log(formData);
  };

  const fetchPrediction = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict_diabetes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
      // setPredictionResult(result);
      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to get prediction. Please try again.");
    }
  };

  return (
    <div className="flex flex-col w-full h-screen max-w-screen-md p-4 pb-10 m-10 mx-auto text-black border border-gray-300 rounded-md">
      <h2 className="mb-4 text-xl font-semibold text-center">
        Diabetes Prediction
      </h2>
      <div className="w-full p-6 bg-white">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-6 p-6justify-items-center"
        >
          <TextInput
            name="Pregnancies"
            value={formData["Pregnancies"]}
            heading="Pregnancies"
            handleChange={handleChange}
            description="Number of times pregnant"
          />
          <TextInput
            name="Glucose"
            value={formData["Glucose"]}
            heading="Glucose"
            handleChange={handleChange}
            description="Plasma glucose concentration a 2 hours in an oral glucose tolerance test"
          />
          <TextInput
            name="BloodPressure"
            value={formData["BloodPressure"]}
            heading="Blood Pressure"
            handleChange={handleChange}
            description="Diastolic blood pressure (mm Hg)"
          />
          <TextInput
            name="SkinThickness"
            value={formData["SkinThickness"]}
            heading="SkinThickness"
            handleChange={handleChange}
            description="Triceps skin fold thickness (mm)"
          />
          <TextInput
            name="Insulin"
            value={formData["Insulin"]}
            heading="Insulin"
            handleChange={handleChange}
            description="2-Hour serum insulin (mu U/ml)"
          />
          <TextInput
            name="BMI"
            value={formData["BMI"]}
            heading="BMI"
            handleChange={handleChange}
            description="Body mass index (weight in kg/(height in m)^2)"
          />
          <TextInput
            name="DiabetesPedigreeFunction"
            value={formData["DiabetesPedigreeFunction"]}
            heading="Diabetes Pedigree Function"
            handleChange={handleChange}
            description="Diabetes pedigree function"
          />
          <TextInput
            name="Age"
            value={formData["Age"]}
            heading="Age"
            handleChange={handleChange}
            description="Age (years)"
          />

          {errorMessage && (
            <p className="w-1/2 col-span-2 px-4 py-2 text-sm text-red-500">
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            className="w-1/2 col-span-2 px-4 py-2 text-white transition-all duration-200 rounded-md bg-neutral-900 hover:bg-neutral-900/90"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="flex flex-col items-center w-full p-6 text-center min-h-96">
        <div className="relative flex flex-col items-center justify-center w-full p-6 text-center h-80">
          <div
            className={`absolute z-0 w-1/2 aspect-square flex flex-col items-center justify-center transition-all animate-beat duration-500
                ${
                  predictionResult === null
                    ? "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,0,0,0.30)_0%,rgba(255,255,255,0.00)_100%)]"
                    : predictionResult.prediction === 1
                    ? "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,255,0,0.30)_0%,rgba(255,255,255,0.00)_100%)]"
                    : "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,0,0,0.30)_0%,rgba(255,255,255,0.00)_100%)]"
                }
                `}
          ></div>
          <div className="z-10 flex flex-col items-center justify-center gap-2">
            <h3 className="text-lg font-semibold">Prediction Result</h3>
            {predictionResult === null ? (
              <p className="text-2xl font-bold text-gray-700">Get started</p>
            ) : (
              <>
                <p
                  className={`text-gray-700 text-2xl font-bold
                  ${
                    predictionResult.prediction === 1
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {predictionResult.prediction === 1
                    ? "No heart disease detected."
                    : "Heart disease detected."}
                </p>
                <p className="flex items-baseline gap-2 text-gray-700 ">
                  <span>With probability</span>
                  <span className="text-2xl text-black">
                    {Math.round(predictionResult.probability * 10000) / 100} %
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
        {predictionResult !== null && (
          <BarChart shapValues={predictionResult.shapValues[0]} />
        )}
      </div>
    </div>
  );
};

export default Diabetes;
