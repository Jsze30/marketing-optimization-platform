import pandas as pd
import numpy as np
from datetime import datetime, timedelta

np.random.seed(42)

campaigns = [
    {"id": 1, "name": "Holiday Promo"},
    {"id": 2, "name": "Spring Launch"},
    {"id": 3, "name": "Retargeting Campaign"},
]

start_date = datetime.today() - timedelta(days=30)
dates = [start_date + timedelta(days=i) for i in range(30)]

rows = []

for campaign in campaigns:
    for date in dates:
        impressions = np.random.randint(5000, 20000)
        clicks = int(impressions * np.random.uniform(0.01, 0.05))
        spend = round(np.random.uniform(100, 500), 2)
        conversions = int(clicks * np.random.uniform(0.1, 0.3))
        revenue = round(conversions * np.random.uniform(30, 70), 2)
        
        rows.append({
            "campaign_id": campaign["id"],
            "campaign_name": campaign["name"],
            "date": date.strftime("%Y-%m-%d"),
            "spend": spend,
            "impressions": impressions,
            "clicks": clicks,
            "ctr": round(clicks / impressions, 4),
            "conversions": conversions,
            "conversion_rate": round(conversions / clicks if clicks > 0 else 0, 4),
            "revenue": revenue,
        })

df_meta = pd.DataFrame(rows)
df_meta.to_csv("../meta_ads_sample.csv", index=False)
print("✅ Meta Ads sample data generated.")
