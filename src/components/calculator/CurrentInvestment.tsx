import { Vault } from "lucide-react";
import CurrencyInput from "./ui/CurrencyInput";
import InfoTip from "./ui/InfoTip";

interface CurrentInvestmentProps {
  currentCorpus: number;
  onChange: (value: number) => void;
}

function CurrentInvestment({
  currentCorpus,
  onChange,
}: CurrentInvestmentProps) {
  return (
    <section className="rounded-2xl border border-[#e5e0d5] bg-[#fffdf8] p-5 shadow-[0_8px_30px_rgba(23,32,51,0.035)] transition-all duration-300 hover:shadow-[0_14px_35px_rgba(23,32,51,0.06)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4ead2] text-[#a67b2d]">
            <Vault size={18} strokeWidth={1.8} />
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#292720]">
              Current Investment
            </h3>

            <p className="mt-0.5 text-xs text-[#8a8478]">
              Your starting corpus
            </p>
          </div>
        </div>

        <InfoTip title="Current Investment">
          Enter the value of your existing investments today.
          The calculator assumes this amount remains invested
          for the entire projection period.
        </InfoTip>
      </div>

      <div className="mt-5">
        <label
          htmlFor="current-corpus"
          className="text-xs font-semibold text-[#555044]"
        >
          Current corpus
        </label>

        <div className="mt-2">
          <CurrencyInput
            id="current-corpus"
            value={currentCorpus}
            onChange={onChange}
            placeholder="5,00,000"
          />
        </div>
      </div>
    </section>
  );
}

export default CurrentInvestment;