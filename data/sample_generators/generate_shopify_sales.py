import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

products = [
    {"id": 101, "name": "Bluetooth Speaker", "price": 49.99},
    {"id": 102, "name": "Wireless Headphones", "price": 89.99},
    {"id": 103, "name": "Smartwatch", "price": 129.99},
]

customers = [f"CUST-{i:04}" for i in range(1, 101)]
order_rows = []

for _ in range(300):
    customer = random.choice(customers)
    product = random.choice(products)
    quantity = random.randint(1, 3)
    order_date = datetime.today() - timedelta(days=random.randint(0, 30))
    total = round(product["price"] * quantity, 2)
    ltv = round(total + np.random.uniform(0, 300), 2)

    order_rows.append({
        "order_id": f"ORD-{random.randint(10000, 99999)}",
        "customer_id": customer,
        "customer_type": "returning" if random.random() > 0.4 else "new",
        "checkout_time": order_date.strftime("%Y-%m-%d"),
        "product_id": product["id"],
        "product_name": product["name"],
        "quantity": quantity,
        "unit_price": product["price"],
        "total_amount": total,
        "ltv": ltv
    })

df_shopify = pd.DataFrame(order_rows)
df_shopify.to_csv("../shopify_sales_sample.csv", index=False)
print("✅ Shopify sample data generated.")
