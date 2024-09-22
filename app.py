import streamlit as st
import numpy as np
import pickle
from sklearn.preprocessing import MinMaxScaler

# Load your pickled model
def load_model():
    with open("xgb_model.pkl", "rb") as file:
        model = pickle.load(file)
    return model

# Preprocess the data (needed for scaling the inputs)
def scale(X):
    scaler = MinMaxScaler()
    scaler.fit(X)
    return X


# Predict function using your pickled model
def predict(model, input_data):
    scaled_data = scale(input_data)
    prediction = model.predict(scaled_data)
    return prediction[0]

# Streamlit app main function
def main():
    st.title("Heart Disease Prediction App")

    # Load model and scaler
    model = load_model()

    st.subheader("Heart Disease Prediction")
    
    # Input fields for user to fill in
    age = st.slider('Age', 18, 100 , 50)
    
    sex_options = [("Female", 0), ("Male", 1)]
    sex = st.selectbox('Sex', [option[0] for option in sex_options], index=None,placeholder="Male or Female")

    cp = st.selectbox('Chest Pain Type (0-3)', (0, 1, 2, 3))
    chol = st.slider('Serum Cholesterol (mg/dl)', 126, 564, 250)
    restecg = st.selectbox('Resting ECG (0 = Normal, 1 = Abnormal)', (0, 1, 2))
    thalach = st.slider('Max Heart Rate Achieved', 71, 202, 150)
    oldpeak = st.slider('ST Depression', 0.0, 6.2, 1.0)
    ca = st.slider('Number of Major Vessels Colored by Fluoroscopy (0-3)', 0, 3, 0)
    thal = st.selectbox('Thalassemia (0 = Normal, 1 = Fixed Defect, 2 = Reversible Defect)', (0, 1, 2))

    # Collect inputs into a list
    input_data = [thal, ca, cp, restecg, oldpeak, chol, thalach]
    input_data = np.array(input_data).reshape(1, -1)

    # Predict button
    if st.button('Predict'):
        prediction = predict(model,  input_data)
        if prediction == 1:
            st.success("The model predicts that you are **at risk** of heart disease.")
        else:
            st.success("The model predicts that you are **not at risk** of heart disease.")

# Run the Streamlit app
if __name__ == '__main__':
    main()
