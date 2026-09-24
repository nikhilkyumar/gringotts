import { Coins, Plus, Trash2 } from "lucide-react";
import CurrencyInput from "./ui/CurrencyInput";
import InfoTip from "./ui/InfoTip";

export interface LumpSum {
  id: string;
  amount: number;
  afterMonths: number;
}

interface LumpSumSectionProps {
  lumpSums: LumpSum[];
  years: number;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (
    id: string,
    field: "amount" | "afterMonths",
    value: number
  ) => void;
}

function LumpSumSection({
  lumpSums,
  years,
  onAdd,
  onRemove,
  onUpdate,
}: LumpSumSectionProps) {
  const maxMonths = years * 12;

  return (
    <section className="rounded-2xl border border-[#e5e0d5] bg-[#fffdf8] p-5 shadow-[0_8px_30px_rgba(23,32,51,0.035)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4ead2] text-[#a67b2d]">
            <Coins size={18} strokeWidth={1.8} />
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#292720]">
              Future investments
            </h3>

            <p className="mt-0.5 text-xs text-[#8a8478]">
              Optional lump-sum contributions
            </p>
          </div>
        </div>

        <InfoTip title="Future investments">
          Add one-time investments you expect to make in
          the future. Each amount compounds only from the
          month in which you invest it.
        </InfoTip>
      </div>

      <div className="mt-5 space-y-3">
        {lumpSums.map((lumpSum, index) => (
          <div
            key={lumpSum.id}
            className="rounded-xl border border-[#e1d9ca] bg-[#f7f2e8] p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#555044]">
                Investment {index + 1}
              </span>

              <button
                type="button"
                onClick={() =>
                  onRemove(lumpSum.id)
                }
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[#a35e53] transition hover:bg-[#f1dfdb]"
                aria-label="Remove investment"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_150px]">
              <div>
                <label className="mb-1.5 block text-[11px] font-medium text-[#777267]">
                  Amount
                </label>

                <CurrencyInput
                  value={lumpSum.amount}
                  onChange={(value) =>
                    onUpdate(
                      lumpSum.id,
                      "amount",
                      value
                    )
                  }
                  placeholder="1,00,000"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-medium text-[#777267]">
                  After
                </label>

                <div className="flex items-center rounded-xl border border-[#d7cfbf] bg-white px-3">
                  <input
                    type="number"
                    min="1"
                    max={maxMonths}
                    value={lumpSum.afterMonths}
                    onChange={(event) =>
                      onUpdate(
                        lumpSum.id,
                        "afterMonths",
                        Number(
                          event.target.value
                        )
                      )
                    }
                    className="w-full bg-transparent py-3 text-sm font-semibold text-[#292720] outline-none"
                  />

                  <span className="text-xs text-[#777267]">
                    months
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={onAdd}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#c9bfad] bg-[#fbf7ec] px-4 py-3 text-xs font-semibold text-[#31483f] transition hover:border-[#31483f] hover:bg-[#f3eee3]"
        >
          <Plus size={15} />
          Add future investment
        </button>
      </div>
    </section>
  );
}

export default LumpSumSection;