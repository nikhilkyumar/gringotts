import { WalletCards } from "lucide-react";
import CurrencyInput from "./ui/CurrencyInput";
import InfoTip from "./ui/InfoTip";

interface SipSectionProps {
  monthlySip: number;
  onChange: (value: number) => void;
}

function SipSection({
  monthlySip,
  onChange,
}: SipSectionProps) {
  return (
    <section className="rounded-2xl border border-[#e5e0d5] bg-[#fffdf8] p-5 shadow-[0_8px_30px_rgba(23,32,51,0.035)] transition-all duration-300 hover:shadow-[0_14px_35px_rgba(23,32,51,0.06)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6eee9] text-[#31483f]">
            <WalletCards size={18} strokeWidth={1.8} />
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#292720]">
              Monthly SIP
            </h3>

            <p className="mt-0.5 text-xs text-[#8a8478]">
              Your regular monthly investment
            </p>
          </div>
        </div>

        <InfoTip title="Monthly SIP">
          This is the amount invested at the end of every
          month. If you use SIP step-up, this amount can
          increase each year.
        </InfoTip>
      </div>

      <div className="mt-5">
        <label
          htmlFor="monthly-sip"
          className="text-xs font-semibold text-[#555044]"
        >
          Starting monthly SIP
        </label>

        <div className="mt-2">
          <CurrencyInput
            id="monthly-sip"
            value={monthlySip}
            onChange={onChange}
            placeholder="30,000"
          />
        </div>
      </div>
    </section>
  );
}

export default SipSection;