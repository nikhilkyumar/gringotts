import { Clock3, Percent } from "lucide-react";
import PercentageInput from "./ui/PercentageInput";
import InfoTip from "./ui/InfoTip";

interface AssumptionsSectionProps {
  annualReturn: number;
  years: number;
  onReturnChange: (value: number) => void;
  onYearsChange: (value: number) => void;
}

function AssumptionsSection({
  annualReturn,
  years,
  onReturnChange,
  onYearsChange,
}: AssumptionsSectionProps) {
  return (
    <section className="rounded-2xl border border-[#e5e0d5] bg-[#fffdf8] p-5 shadow-[0_8px_30px_rgba(23,32,51,0.035)] sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4ead2] text-[#a67b2d]">
            <Percent size={18} strokeWidth={1.8} />
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#292720]">
              Assumptions
            </h3>

            <p className="mt-0.5 text-xs text-[#8a8478]">
              Return and investment period
            </p>
          </div>
        </div>

        <InfoTip title="Assumptions">
          These are illustrative assumptions used for the
          projection. Actual investment returns can be higher
          or lower than the value entered here.
        </InfoTip>
      </div>

      {/* Inputs */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {/* Expected annual return */}
        <div>
          <PercentageInput
            value={annualReturn}
            onChange={onReturnChange}
            label="Expected annual return"
            min={0}
            max={30}
            step={0.5}
          />
        </div>

        {/* Investment period */}
        <div>
          <div className="flex items-center gap-2">
            <Clock3
              size={15}
              className="text-[#8d6d3e]"
            />

            <label
              htmlFor="investment-years"
              className="text-sm font-semibold text-[#555044]"
            >
              Investment period
            </label>
          </div>

          <div className="mt-3 flex items-center rounded-xl border border-[#d7cfbf] bg-white px-4 transition focus-within:border-[#6b2635] focus-within:ring-4 focus-within:ring-[#6b2635]/10">
            <input
              id="investment-years"
              type="number"
              min="1"
              max="50"
              value={years}
              onChange={(event) =>
                onYearsChange(
                  Math.min(
                    50,
                    Math.max(
                      1,
                      Number(event.target.value)
                    )
                  )
                )
              }
              className="w-full bg-transparent py-3 text-base font-semibold text-[#292720] outline-none"
            />

            <span className="ml-2 text-sm font-medium text-[#777267]">
              years
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AssumptionsSection;