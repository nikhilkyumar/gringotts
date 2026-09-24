import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Table2,
} from "lucide-react";

import type { ProjectionResult } from "../../calculations/types";
import { formatIndianCompact } from "../../utils/currency";

interface YearlyProjectionTableProps {
  result: ProjectionResult;
}

function YearlyProjectionTable({
  result,
}: YearlyProjectionTableProps) {
  const [expanded, setExpanded] = useState(false);

  const visibleRows = expanded
    ? result.yearlyData
    : result.yearlyData.slice(0, 5);

  return (
    <section className="rounded-[24px] border border-[#D9D0BD] bg-[#FBF7EC] shadow-[0_12px_35px_rgba(42,35,25,0.06)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[#DED5C5] p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5A1F2B]/10">
            <Table2
              size={18}
              className="text-[#5A1F2B]"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#292720]">
              Yearly projection
            </p>

            <p className="mt-0.5 text-[11px] text-[#777267]">
              Corpus at the end of each year
            </p>
          </div>
        </div>

        {result.yearlyData.length > 5 && (
          <button
            type="button"
            onClick={() =>
              setExpanded((value) => !value)
            }
            className="flex items-center gap-1.5 rounded-xl bg-[#F2EAD8] px-3 py-2 text-xs font-semibold text-[#5A1F2B] transition hover:bg-[#E5DBC5]"
          >
            {expanded ? "Show less" : "Show full breakdown"}

            {expanded ? (
              <ChevronUp size={14} />
            ) : (
              <ChevronDown size={14} />
            )}
          </button>
        )}
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-[#E3DCCA] sm:hidden">
        {visibleRows.map((row) => (
          <div
            key={row.year}
            className="p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#292720]">
                  Year {row.year}
                </p>

                <p className="mt-0.5 text-[10px] text-[#777267]">
                  SIP {formatIndianCompact(row.sipInvested)}
                </p>
              </div>

              <p className="text-sm font-bold text-[#5A1F2B]">
                {formatIndianCompact(
                  row.endingCorpus
                )}
              </p>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-[#F2EAD8] p-2">
                <p className="text-[9px] uppercase tracking-wider text-[#8D6D3E]">
                  Start
                </p>

                <p className="mt-1 text-[11px] font-semibold text-[#454239]">
                  {formatIndianCompact(
                    row.startingCorpus
                  )}
                </p>
              </div>

              <div className="rounded-lg bg-[#F2EAD8] p-2">
                <p className="text-[9px] uppercase tracking-wider text-[#8D6D3E]">
                  Lump sum
                </p>

                <p className="mt-1 text-[11px] font-semibold text-[#454239]">
                  {formatIndianCompact(
                    row.lumpSumInvested
                  )}
                </p>
              </div>

              <div className="rounded-lg bg-[#F2EAD8] p-2">
                <p className="text-[9px] uppercase tracking-wider text-[#8D6D3E]">
                  Growth
                </p>

                <p className="mt-1 text-[11px] font-semibold text-[#7A2638]">
                  {formatIndianCompact(row.growth)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[680px] border-collapse">
          <thead>
            <tr className="bg-[#F2EAD8] text-left">
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#8D6D3E]">
                Year
              </th>

              <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[#8D6D3E]">
                Starting
              </th>

              <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[#8D6D3E]">
                SIP
              </th>

              <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[#8D6D3E]">
                Lump sum
              </th>

              <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[#8D6D3E]">
                Growth
              </th>

              <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[#8D6D3E]">
                Ending
              </th>
            </tr>
          </thead>

          <tbody>
            {visibleRows.map((row) => (
              <tr
                key={row.year}
                className="border-t border-[#E3DCCA] transition hover:bg-[#F6F0E3]"
              >
                <td className="px-5 py-4 text-sm font-bold text-[#292720]">
                  {row.year}
                </td>

                <td className="px-5 py-4 text-right text-xs text-[#777267]">
                  {formatIndianCompact(
                    row.startingCorpus
                  )}
                </td>

                <td className="px-5 py-4 text-right text-xs font-medium text-[#454239]">
                  {formatIndianCompact(
                    row.sipInvested
                  )}
                </td>

                <td className="px-5 py-4 text-right text-xs font-medium text-[#454239]">
                  {formatIndianCompact(
                    row.lumpSumInvested
                  )}
                </td>

                <td className="px-5 py-4 text-right text-xs font-semibold text-[#7A2638]">
                  {formatIndianCompact(row.growth)}
                </td>

                <td className="px-5 py-4 text-right text-sm font-bold text-[#5A1F2B]">
                  {formatIndianCompact(
                    row.endingCorpus
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {result.yearlyData.length > 5 && !expanded && (
        <div className="border-t border-[#E3DCCA] px-5 py-3 text-center">
          <p className="text-[11px] text-[#777267]">
            Showing first 5 years
          </p>
        </div>
      )}
    </section>
  );
}

export default YearlyProjectionTable;