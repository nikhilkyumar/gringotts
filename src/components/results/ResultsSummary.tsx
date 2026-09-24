import {
  Coins,
  Sparkles,
  TrendingUp,
  Vault,
} from "lucide-react";

import type { ProjectionResult } from "../../calculations/types";
import { formatIndianCompact } from "../../utils/currency";

interface ResultsSummaryProps {
  result: ProjectionResult;
  years: number;
}

function ResultsSummary({
  result,
  years,
}: ResultsSummaryProps) {
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-[#5A1F2B] p-5 text-[#FBF7EC] shadow-[0_20px_55px_rgba(90,31,43,0.2)] sm:p-7">
      {/* Magical glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#C9A24D]/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[#E0BD68]/10 blur-3xl" />

      {/* Decorative stars */}
      <Sparkles
        size={16}
        className="absolute right-7 top-7 text-[#E0BD68]"
      />

      <Sparkles
        size={11}
        className="absolute bottom-8 left-8 text-[#C9A24D]/70"
      />

      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C9A24D]/15">
            <Vault
              size={18}
              className="text-[#E0BD68]"
            />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E0BD68]">
              Vault projection
            </p>

            <p className="mt-0.5 text-xs text-[#EADFC9]/70">
              After {years} years
            </p>
          </div>
        </div>

        <div className="mt-7">
          <p className="text-xs font-medium text-[#EADFC9]/70">
            Projected corpus
          </p>

          <p className="mt-1 text-4xl font-bold tracking-tight text-[#FFF8E8] sm:text-5xl">
            {formatIndianCompact(result.finalCorpus)}
          </p>
        </div>

        {/* Mini metrics */}
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
            <div className="flex items-center gap-2">
              <Coins
                size={14}
                className="text-[#E0BD68]"
              />

              <span className="text-[10px] uppercase tracking-wider text-[#EADFC9]/60">
                Invested
              </span>
            </div>

            <p className="mt-2 text-sm font-bold text-[#FFF8E8]">
              {formatIndianCompact(
                result.totalInvested
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
            <div className="flex items-center gap-2">
              <TrendingUp
                size={14}
                className="text-[#E0BD68]"
              />

              <span className="text-[10px] uppercase tracking-wider text-[#EADFC9]/60">
                Growth
              </span>
            </div>

            <p className="mt-2 text-sm font-bold text-[#FFF8E8]">
              {formatIndianCompact(
                result.totalGrowth
              )}
            </p>
          </div>

          <div className="col-span-2 rounded-2xl border border-[#C9A24D]/20 bg-[#C9A24D]/10 p-4 sm:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#E0BD68]">
                ✦
              </span>

              <span className="text-[10px] uppercase tracking-wider text-[#EADFC9]/60">
                Growth share
              </span>
            </div>

            <p className="mt-2 text-sm font-bold text-[#FFF8E8]">
              {result.finalCorpus > 0
                ? `${Math.round(
                    (result.totalGrowth /
                      result.finalCorpus) *
                      100
                  )}%`
                : "0%"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResultsSummary;