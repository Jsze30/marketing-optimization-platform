from fastapi import APIRouter
from services.shopify_service import get_shopify_forecast, get_shopify_recommendations

router = APIRouter()

@router.get("/forecast")
def forecast():
    return get_shopify_forecast()

@router.get("/recommendations")
def recommendations():
    return {"recommendations": get_shopify_recommendations()}
