import pandas as pd
import json

def get_meta_insights():
    df = pd.read_csv("../data/meta_insights.csv")
    return df.to_dict(orient="records")

def get_meta_recommendations():
    with open("../data/meta_recommendations.txt", "r") as f:
        return f.read().splitlines()

def get_budget_forecast():
    df = pd.read_csv("../data/predictive_budgeting.csv")
    return df.to_dict(orient="records")

def get_budget_recommendation():
    with open("../data/predictive_budget_recommendation.txt", "r") as f:
        return f.read()

def get_ab_test_suggestions():
    with open("../data/ab_test_suggestions.json", "r") as f:
        return json.load(f)

