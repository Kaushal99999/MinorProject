import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.preprocessing import MinMaxScaler, scale
import shap
import tensorflow as tf
import joblib

# Load the scaler
diabetes_scaler = joblib.load('../../Diabetes/scaler.joblib')

# scaler = MinMaxScaler()
# def scale(X):
#     return scaler.fittransform(X)

app = Flask(__name__)
CORS(app)

# Load your model

with open('../../xgb_model2.pkl', 'rb') as model_file:
    heart_model = pickle.load(model_file)
    print("Open")

diabetes_model = tf.keras.models.load_model('../../Diabetes/my_model.keras')


explainer = shap.Explainer(heart_model)
# diabetes_explainer = shap.DeepExplainer(diabetes_model)
    
@app.route('/predict_heart', methods=['POST'])
def predict_heart():
    # Get data from POST request
    features=['thall','caa','cp','exng','oldpeak','chol','thalachh']

    data = request.get_json()
    # print("Received data:", data)

    cols_when_heart_model_builds = heart_model.get_booster().feature_names

    # print("Features used in model:", cols_when_model_builds)
    # print("Features in input:", features)

    # Extract values in the correct feature order
    values = [float(data[feature]) for feature in features]
    # print("Feature values:", values)

    # Create a DataFrame for the input data
    df = pd.DataFrame([values], columns=features)

    df = df[cols_when_heart_model_builds]

    # Run prediction using the model
    prediction = heart_model.predict(df)
    prob = heart_model.predict_proba(df)
    shap_values = explainer(df)

    # print("Prediction:", prediction[0])
    # print("Probabilty:", prob[0][prediction[0]])
    # print("Shap:", shap_values.values.tolist())

    # Return the result as a JSON response
    return jsonify({
        'prediction': int(prediction[0]), 
        'probability': float(prob[0][prediction[0]]), 
        'shapValues': shap_values.values.tolist()  
    }), 200, {'Content-Type': 'application/json; charset=utf-8'}

@app.route('/predict_diabetes', methods=['POST'])
def predict_diabetes():
    # Define features used by the diabetes model
    diabetes_features = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age']  # replace with actual features

    data = request.get_json()
    print("Received data:", data)

    values = [float(data[feature]) for feature in diabetes_features]
    input_data = pd.DataFrame([values], columns=diabetes_features)

    scaled_input = diabetes_scaler.transform(input_data.values)
    
    print(scaled_input)
    
    # Model expects input as a NumPy array
    prediction = diabetes_model.predict(scaled_input)
    class_probabilities = prediction[0]  # Extract the probabilities for the classes
    predicted_class = int(class_probabilities.argmax())  # Get the class with the highest probability
    predicted_probability = float(class_probabilities[predicted_class])  # Probability of the predicted class

    # shap_values = diabetes_explainer(scaled_input)


    print(prediction)

    return jsonify({
        'prediction': predicted_class,
        'probability': predicted_probability,
        # 'shapValues': shap_values.values.tolist()
    }), 200

if __name__ == '__main__':
    app.run(debug=True)
