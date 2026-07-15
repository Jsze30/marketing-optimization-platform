import pandas as pd

def get_shopify_forecast():
    df = pd.read_csv("../data/shopify_revenue_forecast.csv")
    return df.to_dict(orient="records")

def get_shopify_recommendations():
    with open("../data/shopify_recommendations.txt", "r") as f:
        return f.read().splitlines()
