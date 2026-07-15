import pandas as pd

from backend.services.data import DATA_DIR

def get_shopify_forecast():
    df = pd.read_csv(DATA_DIR / "shopify_revenue_forecast.csv")
    return df.to_dict(orient="records")

def get_shopify_recommendations():
    with open(DATA_DIR / "shopify_recommendations.txt", "r") as f:
        return f.read().splitlines()
