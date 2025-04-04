from fastapi import APIRouter
from services.meta_ads_service import get_meta_insights, get_meta_recommendations

router = APIRouter()

@router.get("/insights")
def meta_insights():
    return get_meta_insights()

@router.get("/recommendations")
def meta_recommendations():
    return {"recommendations": get_meta_recommendations()}
