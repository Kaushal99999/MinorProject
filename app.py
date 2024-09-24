import streamlit as st
import numpy as np
import pickle
from sklearn.preprocessing import MinMaxScaler

# Load your pickled model
def load_model():
    with open("xgb_model.pkl", "rb") as file:
        model = pickle.load(file)
    return model

# Predict function using your pickled model
def predict(model, input_data):
    prediction = model.predict(input_data)
    prob = model.predict_proba(input_data)
    Failure, Success = round(prob[0][0] * 100, 2), round(prob[0][1] * 100, 2)
    return (prediction[0], max(Failure, Success))

# Streamlit app main function
def main():
    st.title("Heart Disease Prediction App")

    # Load model and scaler
    model = load_model()

    st.subheader("Heart Disease Prediction")

    # Input fields for user to fill in
    age = st.slider('Age', 18, 100, 50)

    sex_options = [("Female", 0), ("Male", 1)]
    sex = st.selectbox('Sex', [option[0] for option in sex_options], index=None, placeholder="Male or Female")

    # Chest pain types with names and corresponding values
    cp_options = [("0 - Asymptomatic", 0), ("1 - Atypical Angina", 1), ("2 - Non-Anginal Pain", 2),("3 - Typical Angina", 3)] 
    cp = st.selectbox('Chest Pain Type', [option[0] for option in cp_options])
    cp_value = [option[1] for option in cp_options if option[0] == cp][0]

    chol = st.slider('Serum Cholesterol (mg/dl)', 126, 564, 250)
    exang = st.selectbox('Exercise Induced Angina (1 = Yes, 0 = No)', (0, 1))
    thalach = st.slider('Max Heart Rate Achieved', 71, 202, 150)
    oldpeak = st.slider('ST Depression', 0.0, 6.2, 1.0)
    ca = st.slider('Number of Major Vessels Colored by Fluoroscopy (0-3)', 0, 3, 0)

    # Thalassemia types with names and corresponding values
    thal_options = [("Fixed Defect", 1), ("Normal", 2), ("Reversible Defect", 3)]
    thal = st.selectbox('Thalassemia', [option[0] for option in thal_options])
    thal_value = [option[1] for option in thal_options if option[0] == thal][0]

    # Collect inputs into a list
    input_data = [thal_value, ca, cp_value, oldpeak, exang, chol, thalach]
    input_data = np.array(input_data).reshape(1, -1)

    # Predict button
    if st.button('Predict'):
        prediction = predict(model, input_data)
        if prediction[0] == 1:
            st.success(f"The model predicts that you are **at risk** of heart disease with a probability of {prediction[1]} %.")
        else:
            st.success(f"The model predicts that you are **not at risk** of heart disease with a probability of {prediction[1]} %.")

# Run the Streamlit app
if __name__ == '__main__':
    main()
