from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from mangum import Mangum

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample dataset and model
data = pd.DataFrame({
    'University Name': ['A', 'B', 'C', 'D'],
    'Overall Score': [90, 60, 40, 85],
    'Citations per Paper': [45, 32, 20, 50],
    'Papers per Faculty': [12, 8, 5, 15],
    'Academic Reputation': [80, 70, 50, 90],
    'Faculty Student Ratio': [10, 15, 20, 5],
})

# Process data
data['Success'] = (data['Overall Score'] >= 50).astype(int)
X = data[['Citations per Paper', 'Papers per Faculty', 'Academic Reputation', 'Faculty Student Ratio']]
y = data['Success']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(n_estimators=10, random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred) * 100

# API endpoints
@app.get("/predict")
def predict():
    data['Predicted Success'] = model.predict(X)
    return data[['University Name', 'Overall Score', 'Predicted Success']].to_dict(orient='records')

@app.get("/accuracy")
def get_accuracy():
    return {"accuracy": f"{accuracy:.2f}%"}

# Handler for Vercel
handler = Mangum(app)