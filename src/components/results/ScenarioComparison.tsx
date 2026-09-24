import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

import type { CalculatorInputs } from "../../calculations/types";
import { calculateProjection } from "../../calculations/projection";
import { formatIndianCompact } from "../../utils/currency";

interface ScenarioComparisonProps {
  inputs: CalculatorInputs;
}

const scenarios = [
  {
    rate: 8,
    color: "#5A1F2B",
    background: "rgba(90,31,43,0.08)",
  },
  {
    rate: 10,
    color: "#8B3046",
    background: "rgba(139,48,70,0.08)",
  },
  {
    rate: 12,
    color: "#9A7429",
    background: "rgba(201,162,77,0.14)",
  },
];

function ScenarioComparison({
  inputs,
}: ScenarioComparisonProps) {
  const [expanded, setExpanded] = useState(false);

  const results = scenarios.map((scenario) => {
    const projection = calculateProjection({
      ...inputs,
      annualReturn: scenario.rate,
    });

    return {
      ...scenario,
      corpus: projection.finalCorpus,
      growth: projection.totalGrowth,
    };
  });

  return (
    <section className="rounded-[24px] border border-[#D9D0BD] bg-[#FBF7EC] shadow-[0_12px_35px_rgba(42,35,25,0.06)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A24D]/15">
            <Sparkles
              size={18}
              className="text-[#9A7429]"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#292720]">
              Return scenarios
            </p>

            <p className="mt-0.5 text-[11px] text-[#777267]">
              Compare different return assumptions
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setExpanded((value) => !value)
          }
          className="flex items-center gap-1.5 rounded-xl bg-[#F2EAD8] px-3 py-2 text-xs font-semibold text-[#5A1F2B] transition hover:bg-[#E5DBC5]"
        >
          {expanded ? "Hide details" : "View details"}

          {expanded ? (
            <ChevronUp size={14} />
          ) : (
            <ChevronDown size={14} />
          )}
        </button>
      </div>

      {/* Scenario cards */}
      <div className="grid gap-3 px-5 pb-5 sm:grid-cols-3 sm:px-6 sm:pb-6">
        {results.map((scenario) => (
          <div
            key={scenario.rate}
            className="rounded-2xl border border-[#E0D7C7] p-4"
            style={{
              backgroundColor:
                scenario.background,
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-bold"
                style={{
                  color: scenario.color,
                }}
              >
                {scenario.rate}% return
              </span>

              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor:
                    scenario.color,
                }}
              />
            </div>

            <p className="mt-4 text-xl font-bold tracking-tight text-[#292720]">
              {formatIndianCompact(
                scenario.corpus
              )}
            </p>

            {expanded && (
              <div className="mt-3 border-t border-[#D9D0BD] pt-3">
                <p className="text-[10px] uppercase tracking-wider text-[#8D6D3E]">
                  Estimated growth
                </p>

                <p
                  className="mt-1 text-sm font-bold"
                  style={{
                    color: scenario.color,
                  }}
                >
                  {formatIndianCompact(
                    scenario.growth
                  )}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div className="border-t border-[#E3DCCA] px-5 py-4 sm:px-6">
        <p className="text-[11px] leading-5 text-[#777267]">
          These are illustrative scenarios based on
          the same investment inputs. Actual returns
          can vary.
        </p>
      </div>
    </section>
  );
}

export default ScenarioComparison;