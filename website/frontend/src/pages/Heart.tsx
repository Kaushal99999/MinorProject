import React, { useState } from "react";
import BarChart from "../components/BarChart";
// import RadioInputs from "../components/RadioInputs";
import TextInput from "../components/TextInput";
import SelectInput from "@/components/SelectInput";

interface IFormData {
  thall: string;
  caa: string;
  cp: string;
  oldpeak: string;
  exng: string;
  chol: string;
  thalachh: string;
}

interface IPrediction {
  prediction: number;
  probability: number;
  shapValues: number[][];
}

const Heart = () => {
  const [formData, setFormData] = useState<IFormData>({
    thall: "",
    caa: "",
    cp: "",
    oldpeak: "",
    exng: "",
    chol: "",
    thalachh: "",
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
      const response = await fetch("http://127.0.0.1:5000/predict_heart", {
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
      setPredictionResult(result);
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to get prediction. Please try again.");
    }
  };

  return (
    <div className="flex flex-col w-full h-screen max-w-screen-md p-4 pb-10 mx-auto text-black">
      <div className="w-full p-6 bg-white">
        <h2 className="mb-4 text-xl font-semibold text-center">
          Heart Disease Prediction
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-3 justify-items-center"
        >
          {/* <SelectInput
            name="thall"
            value={formData["thall"]}
            heading="Thalassemia"
            options={[
              { value: 1, label: "Fixed Defect" },
              { value: 2, label: "Normal" },
              { value: 3, label: "Reversible Defect" },
            ]}
            handleChange={handleChange}
          /> */}
          <SelectInput
            name="thall"
            value={formData["thall"]}
            heading="Thalassemia"
            options={[
              { value: 1, label: "Fixed Defect" },
              { value: 2, label: "Normal" },
              { value: 3, label: "Reversible Defect" },
            ]}
            handleChange={handleChange}
          />
          <SelectInput
            name="caa"
            value={formData["caa"]}
            heading="Number of Major Vessels"
            options={[
              { value: 0, label: "0" },
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
            ]}
            handleChange={handleChange}
          />
          <SelectInput
            name="cp"
            value={formData["cp"]}
            heading="Chest Pain"
            options={[
              { value: 0, label: "Asymptomatic" },
              { value: 1, label: "Atypical Angina" },
              { value: 2, label: "Non-Anginal Pain" },
              { value: 3, label: "Typical Angina" },
            ]}
            handleChange={handleChange}
          />
          <SelectInput
            name="exng"
            value={formData["exng"]}
            heading="Exercise Induced Angina"
            options={[
              { value: 0, label: "No" },
              { value: 1, label: "Yes" },
            ]}
            handleChange={handleChange}
          />
          <TextInput
            name="oldpeak"
            value={formData["oldpeak"]}
            heading="ST Depression"
            handleChange={handleChange}
            description="ST depression induced by exercise relative to rest."
          />
          <TextInput
            name="chol"
            value={formData["chol"]}
            heading="Cholestrol"
            handleChange={handleChange}
            description="Cholesterol measurement in mg/dl."
          />
          <TextInput
            name="thalachh"
            value={formData["thalachh"]}
            heading="Maximum Heart Rate Achieved"
            handleChange={handleChange}
            // description="Cholesterol measurement in mg/dl."
          />
          {/* {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              {key === "cp" ? (
                <div>
                  <p className="mb-1 text-lg font-bold">
                    {getFullLabel(key as keyof IFormData)}
                  </p>
                  <div className="flex flex-col mb-2 space-x-4">
                    {["0", "1", "2", "3"].map((option) => (
                      <label key={option} className="flex">
                        <input
                          type="radio"
                          name={key}
                          value={option}
                          checked={value === option}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        {option === "0" && "Asymptomatic"}
                        {option === "1" && "Atypical Angina"}
                        {option === "2" && "Non-Anginal Pain"}
                        {option === "3" && "Typical Angina"}
                      </label>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    {getDescription(key as keyof IFormData)}
                  </p>
                </div>
              ) : key === "exng" ? (
                <div>
                  <p className="mb-1 text-lg font-bold">
                    {getFullLabel(key as keyof IFormData)}
                  </p>
                  <div className="flex mb-2 space-x-4">
                    {["0", "1"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name={key}
                          value={option}
                          checked={value === option}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        {option === "0" ? "No" : "Yes"}
                      </label>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    {getDescription(key as keyof IFormData)}
                  </p>
                </div>
              ) : key === "thall" || key === "caa" ? (
                <div>
                  <p className="mb-1 text-lg font-bold">
                    {getFullLabel(key as keyof IFormData)}
                  </p>
                  <div className="flex mb-2 space-x-4">
                    {key === "caa" &&
                      ["0", "1", "2", "3"].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name={key}
                            value={option}
                            checked={value === option}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    {getDescription(key as keyof IFormData)}
                  </p>
                </div>
              ) : (
                <div key={key}>
                  <p className="mb-1 text-lg font-bold">{getFullLabel(key)}</p>
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 transition-all duration-200 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                    placeholder=" " // Placeholder for floating label
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {getDescription(key)}
                  </p>
                </div>
              )}
            </div>
          ))} */}

          {errorMessage && (
            <p className="w-1/2 col-span-2 px-4 py-2 text-sm text-red-500">
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            className="w-1/2 col-span-2 px-4 py-2 text-white transition-all duration-200 bg-red-700 rounded-md hover:bg-red-600"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="flex flex-col items-center w-full p-6 text-center min-h-96">
        <div className="relative flex flex-col items-center justify-center w-full p-6 text-center h-80">
          <div
            className={`absolute z-0 w-1/2 aspect-square flex flex-col items-center justify-center animate-beat transition-all duration-500
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

export default Heart;
