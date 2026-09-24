import { useState } from "react";
import {
  ChevronDown,
  Coins,
  Landmark,
  Wallet,
} from "lucide-react";

import type { ProjectionResult } from "../../calculations/types";
import { formatIndianCompact } from "../../utils/currency";

interface ResultBreakdownProps {
  result: ProjectionResult;
}

interface BreakdownCardProps {
  title: string;
  invested: number;
  finalValue: number;
  growth: number;
  icon: React.ReactNode;
  accent: string;
  softAccent: string;
}

function BreakdownCard({
  title,
  invested,
  finalValue,
  growth,
  icon,
  accent,
  softAccent,
}: BreakdownCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[22px] border border-[#D9D0BD] bg-[#FBF7EC] p-4 shadow-[0_10px_30px_rgba(42,35,25,0.05)] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{
              backgroundColor: softAccent,
              color: accent,
            }}
          >
            {icon}
          </div>

          <div>
            <p className="text-sm font-semibold text-[#292720]">
              {title}
            </p>

            <p className="mt-0.5 text-[11px] text-[#777267]">
              Final value
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2EAD8] text-[#777267] transition hover:bg-[#E5DBC5] hover:text-[#5A1F2B]"
          aria-label={`Show details for ${title}`}
        >
          <ChevronDown
            size={15}
            className={`transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <p className="mt-5 text-2xl font-bold tracking-tight text-[#292720]">
        {formatIndianCompact(finalValue)}
      </p>

      {open && (
        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#E3DCCA] pt-4">
          <div className="rounded-xl bg-[#F2EAD8] p-3">
            <p className="text-[10px] uppercase tracking-wider text-[#8D6D3E]">
              Invested
            </p>

            <p className="mt-1 text-sm font-bold text-[#292720]">
              {formatIndianCompact(invested)}
            </p>
          </div>

          <div className="rounded-xl bg-[#F2EAD8] p-3">
            <p className="text-[10px] uppercase tracking-wider text-[#8D6D3E]">
              Growth
            </p>

            <p
              className="mt-1 text-sm font-bold"
              style={{ color: accent }}
            >
              {formatIndianCompact(growth)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultBreakdown({
  result,
}: ResultBreakdownProps) {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8D6D3E]">
            Vault ledger
          </p>

          <h2 className="gringotts-title mt-1 text-xl font-semibold text-[#292720]">
            Where it comes from
          </h2>
        </div>

        <p className="hidden text-[11px] text-[#777267] sm:block">
          Tap a card for details
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <BreakdownCard
          title="Current corpus"
          invested={result.currentCorpusInvested}
          finalValue={result.currentCorpusFinalValue}
          growth={result.currentCorpusGrowth}
          icon={<Landmark size={18} />}
          accent="#5A1F2B"
          softAccent="rgba(90,31,43,0.10)"
        />

        <BreakdownCard
          title="SIP"
          invested={result.sipInvested}
          finalValue={result.sipFinalValue}
          growth={result.sipGrowth}
          icon={<Wallet size={18} />}
          accent="#9A7429"
          softAccent="rgba(201,162,77,0.16)"
        />

        <BreakdownCard
          title="Lump sums"
          invested={result.lumpSumInvested}
          finalValue={result.lumpSumFinalValue}
          growth={result.lumpSumGrowth}
          icon={<Coins size={18} />}
          accent="#8B3046"
          softAccent="rgba(139,48,70,0.10)"
        />
      </div>
    </section>
  );
}

export default ResultBreakdown;