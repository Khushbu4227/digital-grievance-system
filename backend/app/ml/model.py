import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression


# Simple training data (starter demo model)
texts = [
    "water not working",
    "electricity issue",
    "need help with account",
    "how to apply scheme",
    "road damaged",
    "very urgent help",
    "fire emergency"
]

labels_category = [
    "Complaint",
    "Complaint",
    "Support",
    "Query",
    "Complaint",
    "Emergency",
    "Emergency"
]

labels_priority = [
    "Medium",
    "Medium",
    "Low",
    "Low",
    "Medium",
    "High",
    "High"
]


vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts)


category_model = LogisticRegression()
priority_model = LogisticRegression()


category_model.fit(X, labels_category)
priority_model.fit(X, labels_priority)


def predict_ticket(text: str):
    X_input = vectorizer.transform([text])

    category = category_model.predict(X_input)[0]
    priority = priority_model.predict(X_input)[0]

    return {
        "category": category,
        "priority": priority
    }