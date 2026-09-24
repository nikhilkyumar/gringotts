import { useState } from "react";
import { Info, X } from "lucide-react";

interface InfoTipProps {
  title: string;
  children: React.ReactNode;
}

function InfoTip({
  title,
  children,
}: InfoTipProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={`More information about ${title}`}
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 ${
          open
            ? "bg-[#31483f] text-white"
            : "bg-[#eee8da] text-[#777267] hover:bg-[#e5dbc5] hover:text-[#31483f]"
        }`}
      >
        {open ? (
          <X size={13} />
        ) : (
          <Info size={14} />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-9 z-30 w-64 rounded-2xl border border-[#dcd4c5] bg-[#fffdf8] p-4 text-left shadow-[0_15px_40px_rgba(42,35,25,0.12)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a67b2d]">
            About this
          </p>

          <p className="mt-2 text-xs leading-5 text-[#777267]">
            {children}
          </p>
        </div>
      )}
    </div>
  );
}

export default InfoTip;