from fastapi import APIRouter
from services.meta_ads_service import get_meta_insights, get_meta_recommendations, get_budget_forecast, get_budget_recommendation, get_ab_test_suggestions, get_campaign_roas

router = APIRouter()

@router.get("/insights")
def meta_insights():
    return get_meta_insights()

@router.get("/recommendations")
def meta_recommendations():
    return {"recommendations": get_meta_recommendations()}

@router.get("/budget/forecast")
def budget_forecast():
    return get_budget_forecast()

@router.get("/budget/recommendation")
def budget_rec():
    return {"recommendation": get_budget_recommendation()}

@router.get("/ab-test/suggestions")
def ab_test_suggestions():
    return get_ab_test_suggestions()

@router.get("/roas")
def campaign_roas():
    return get_campaign_roas()


