from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from backend.routers import meta_ads, shopify

app = FastAPI(title="AI Marketing Optimizer")

app.include_router(meta_ads.router, prefix="/api/meta")
app.include_router(shopify.router, prefix="/api/shopify")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://uplift.vercel.app",
    ],
    # This permits Vercel preview deployments for this project as well.
    allow_origin_regex=r"https://uplift-[a-z0-9-]+\.vercel\.app",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "🚀 Backend is live"}


