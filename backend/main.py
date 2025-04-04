from fastapi import FastAPI
from routers import meta_ads, shopify
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Marketing Optimizer")

app.include_router(meta_ads.router, prefix="/api/meta")
app.include_router(shopify.router, prefix="/api/shopify")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify: ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "🚀 Backend is live"}



