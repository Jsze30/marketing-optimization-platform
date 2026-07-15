import MetaInsights from "../../components/meta_insights";
import ShopifyForecast from "../../components/shopify_forecast";
import BudgetForecast from "../../components/budget_forecast";
import ABTestSuggestions from "../../components/ab_test_suggestions";
import ROASTracker from "../../components/roastracker";
import Navbar from "../../components/navbar";
import { ArrowUpRight, TrendingUp, Target, DollarSign } from "lucide-react";

const HERO_STATS = [
  { metric: "$124,592", label: "Total Revenue", delta: "+12.5%", note: "vs last month", icon: DollarSign },
  { metric: "3.2x", label: "Average ROAS", delta: "+0.8x", note: "vs last month", icon: TrendingUp },
  { metric: "4.7%", label: "Conversion Rate", delta: "+0.3%", note: "vs last month", icon: Target },
];

function ActionButton({ children, href }) {
  return (
    <a href={href} className="group inline-flex items-center gap-4 rounded-full bg-white pl-6 pr-2 py-2 text-zinc-900 font-medium transition-transform duration-300 hover:scale-105">
      <span>{children}</span>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 transition-colors duration-300 group-hover:bg-zinc-700">
        <ArrowUpRight className="h-5 w-5 text-white" />
      </span>
    </a>
  );
}

function HeroStatCard({ metric, label, delta, note, icon: Icon }) {
  return (
    <div className="glass rounded-2xl p-5 transition-transform duration-300 hover:scale-105">
      <div className="flex items-start justify-between">
        <div className="eyebrow text-white/50">{label}</div>
        <Icon className="h-4 w-4 text-emerald-400" />
      </div>
      <div className="mt-3 text-3xl font-medium tracking-tightest text-white">{metric}</div>
      <div className="mt-1 flex items-center gap-1.5 text-sm text-white/60">
        <span className="font-medium text-emerald-400">{delta}</span>
        <span>{note}</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-100">
      {/* Floating glass navbar */}
      <Navbar />

      <main className="mx-auto max-w-[1600px] px-3 pb-16 pt-3 sm:px-5 sm:pt-5">
        {/* Immersive dark hero */}
        <section className="grain relative flex min-h-[92vh] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-black p-6 sm:p-10 lg:p-14">
          {/* bottom-heavy gradient — never a flat dark fill */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-900/40 via-black/60 to-black" />
          {/* massive background wordmark */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-[8vw] left-1/2 -translate-x-1/2 select-none text-[22vw] font-bold leading-none tracking-tightest text-white/[0.03] blur-sm"
          >
            UPLIFT
          </div>

          <div className="relative z-10 flex flex-1 flex-col justify-center gap-12 pt-24 lg:flex-row lg:items-center lg:justify-between lg:pt-16">
            {/* Left: typography block */}
            <div className="max-w-2xl animate-fade-in-up">
              <div className="eyebrow flex items-center gap-2 text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                AI Marketing Optimization
              </div>
              <h1 className="mt-6 text-5xl font-medium leading-[1.05] tracking-tightest text-white sm:text-6xl lg:text-7xl">
                Every dollar,
                <br />
                <span className="text-white/50">precisely placed.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg font-light leading-relaxed text-zinc-400">
                A unified view of Meta and Shopify performance — with machine-learning
                forecasts that tell you exactly where to spend next.
              </p>
              <div className="mt-8">
                <ActionButton href="#performance">View live dashboard</ActionButton>
              </div>
            </div>

            {/* Right: vertical stack of glass stat cards */}
            <div className="flex w-full flex-col gap-4 lg:w-80">
              {HERO_STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${0.15 * (i + 1)}s` }}
                >
                  <HeroStatCard {...stat} />
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-white/10 pt-6 text-sm font-light text-white/40">
            <span className="eyebrow text-white/40">Data sources</span>
            <span>Meta Ads</span>
            <span>Shopify</span>
            <span>Predictive Budget Engine</span>
            <span>A/B Experiments</span>
          </div>
        </section>

        {/* Dashboard — light feature sections */}
        <section id="performance" className="mt-16 scroll-mt-24 sm:mt-24">
          <div className="max-w-3xl">
            <div className="eyebrow text-emerald-500">Performance</div>
            <h2 className="mt-3 text-4xl font-medium tracking-tightest text-zinc-900 sm:text-5xl">
              The full picture,
              <span className="text-zinc-400"> in one place.</span>
            </h2>
            <p className="mt-4 text-lg font-light text-zinc-500">
              Live campaign revenue and forecasted growth, side by side.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <MetaInsights />
            <ShopifyForecast />
          </div>
        </section>

        <section id="optimization" className="mt-16 scroll-mt-24">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BudgetForecast />
            <ABTestSuggestions />
          </div>
        </section>

        <section id="roas" className="mt-16 scroll-mt-24">
          <ROASTracker />
        </section>

      </main>
    </div>
  );
}
