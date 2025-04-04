// utils/api.js
import axios from "axios";

const API_BASE = "http://localhost:8000/api";

export const fetchMetaInsights = () =>
  axios.get(`${API_BASE}/meta/insights`).then(res => res.data);

export const fetchMetaRecommendations = () =>
  axios.get(`${API_BASE}/meta/recommendations`).then(res => res.data);

export const fetchShopifyForecast = () =>
  axios.get(`${API_BASE}/shopify/forecast`).then(res => res.data);

export const fetchShopifyRecommendations = () =>
  axios.get(`${API_BASE}/shopify/recommendations`).then(res => res.data);
