import streamlit as st
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors

# Sample dataset of problems and AI solutions
data = pd.DataFrame({
    "problem": [
        "need restrooms in areas",
        "need volunteers for cleaning    ",
        "street lights not working",
        "Poor healthcare center access",
        "blood donation ",
       
    ],
    "severity": [ 8, 7, 6, 9, 9 ],
    "solution": [
        "request accepted for restroom installation and maintenance will be intiated soon by the nearest NGO's",
        "15 volunteers have been found for cleaning",
        "request accepted and will be forwarded to the nearest municipality",
        "10 volunteers will be sent for sanitation",
        "volunteers based on blood group will be notified ",
        
    ]
})

# Vectorize problem descriptions
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(data["problem"])

# Recommendation model
model = NearestNeighbors(n_neighbors=1, metric='cosine')
model.fit(X)

# Streamlit Dashboard
st.set_page_config(page_title="AI Solutions Recommender", layout="wide")

st.title("AI Recommendation System for Societal Problems")
st.write("Enter a description of a societal problem and rate its severity (1-10).")

# User input
problem_input = st.text_area("Describe the problem")
severity_input = st.slider("Severity (1 = Low, 10 = High)", 1, 10, 5)

if st.button("Get AI Solution Recommendation"):
    if problem_input.strip() == "":
        st.warning("Please enter a problem description.")
    else:
        vec_input = vectorizer.transform([problem_input])
        dist, idx = model.kneighbors(vec_input)
        recommended = data.iloc[idx[0][0]]

        st.subheader("Recommended AI-Based Solution:")
        st.write(f"*Problem Matched*: {recommended['problem']}")
        st.write(f"*Recommended Solution*: {recommended['solution']}")
        st.write(f"*Original Severity Level*: {recommended['severity']}")
        st.write(f"*Your Severity Level*: {severity_input}")
        
        # Add visualization
        st.markdown("---")
        st.subheader("Severity Comparison")
        st.bar_chart(pd.DataFrame({
            'Original': [recommended['severity']],
            'Yours': [severity_input]
        }))