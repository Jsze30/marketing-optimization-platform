// pages/index.js
import Head from "next/head";
import MetaInsights from "../../components/meta_insights";
import ShopifyForecast from "../../components/shopify_forecast";

export default function Home() {
  return (
    <div>
      <Head>
        <title>AI Marketing Dashboard</title>
      </Head>

      <main style={{ padding: "2rem" }}>
        <h1>📊 AI-Powered Marketing Optimization</h1>
        <MetaInsights />
        <hr style={{ margin: "3rem 0" }} />
        <ShopifyForecast />
      </main>
    </div>
  );
}
