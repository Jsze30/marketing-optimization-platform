import pandas as pd
import json

from backend.services.data import DATA_DIR

def get_meta_insights():
    df = pd.read_csv(DATA_DIR / "meta_insights.csv")
    return df.to_dict(orient="records")

def get_meta_recommendations():
    with open(DATA_DIR / "meta_recommendations.txt", "r") as f:
        return f.read().splitlines()

def get_budget_forecast():
    df = pd.read_csv(DATA_DIR / "predictive_budgeting.csv")
    return df.to_dict(orient="records")

def get_budget_recommendation():
    with open(DATA_DIR / "predictive_budget_recommendation.txt", "r") as f:
        return f.read()

def get_ab_test_suggestions():
    with open(DATA_DIR / "ab_test_suggestions.json", "r") as f:
        return json.load(f)
    
def get_campaign_roas():
    df = pd.read_csv(DATA_DIR / "campaign_roas.csv")
    return df.to_dict(orient="records")
