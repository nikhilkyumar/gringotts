
import { TrendingUp } from "lucide-react";
import CurrencyInput from "./ui/CurrencyInput";
import PercentageInput from "./ui/PercentageInput";
import InfoTip from "./ui/InfoTip";

type StepUpType = "none" | "percentage" | "fixed";

interface StepUpSectionProps {
  type: StepUpType;
  value: number;
  onTypeChange: (value: StepUpType) => void;
  onValueChange: (value: number) => void;
}

function StepUpSection({
  type,
  value,
  onTypeChange,
  onValueChange,
}: StepUpSectionProps) {
  return (
    <section className="rounded-2xl border border-[#d9d0bd] bg-[#f2ead8] p-5 shadow-[0_8px_30px_rgba(42,35,25,0.05)] sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ad8750]/35 bg-[#6b2635]/[0.08] text-[#6b2635]">
            <TrendingUp size={18} strokeWidth={1.8} />
          </div>

          {/* Title */}
          <div>
            <h3 className="text-base font-semibold text-[#292720]">
              SIP Step-up
            </h3>

            <p className="mt-0.5 text-xs text-[#777267]">
              Increase your SIP over time
            </p>
          </div>
        </div>

        <InfoTip title="SIP Step-up">
          Step-up increases your monthly SIP every year.
          For example, a 10% step-up turns a ₹30,000 SIP
          into ₹33,000 in year two.
        </InfoTip>
      </div>

      {/* Step-up type */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        {[
          {
            id: "none" as const,
            label: "None",
          },
          {
            id: "percentage" as const,
            label: "% yearly",
          },
          {
            id: "fixed" as const,
            label: "₹ yearly",
          },
        ].map((option) => {
          const active = type === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onTypeChange(option.id)}
              className={`rounded-xl border px-3 py-3 text-xs font-semibold transition-all duration-200 ${
                active
                  ? "border-[#ad8750] bg-[#6b2635] text-[#f8edd8] shadow-[0_4px_12px_rgba(107,38,53,0.18)]"
                  : "border-[#d4c8b2] bg-[#fbf7ec] text-[#777267] hover:border-[#ad8750] hover:bg-[#f8f0df] hover:text-[#4f1d29]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Value input */}
      {type !== "none" && (
        <div className="mt-5">
          {type === "percentage" ? (
            <PercentageInput
              value={value}
              onChange={onValueChange}
              min={0}
              max={50}
              step={1}
            />
          ) : (
            <div>
              <label className="text-xs font-semibold text-[#555044]">
                Annual SIP increase
              </label>

              <div className="mt-2">
                <CurrencyInput
                  value={value}
                  onChange={onValueChange}
                  placeholder="5,000"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default StepUpSection;
