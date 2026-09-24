import { useEffect, useState } from "react";
import {
  formatIndianNumber,
  parseIndianNumber,
} from "../../../utils/formatting";

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  id?: string;
}

function CurrencyInput({
  value,
  onChange,
  placeholder = "1,00,000",
  id,
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState(
    formatIndianNumber(value)
  );

  useEffect(() => {
    setDisplayValue(formatIndianNumber(value));
  }, [value]);

  function handleChange(input: string) {
    const numericValue = parseIndianNumber(input);

    setDisplayValue(input);
    onChange(numericValue);
  }

  function handleBlur() {
    setDisplayValue(formatIndianNumber(value));
  }

  return (
    <div className="flex items-center rounded-xl border border-slate-300 bg-white px-4 transition focus-within:border-slate-900 focus-within:ring-2 focus-within:ring-slate-900/10">
      <span className="mr-2 text-base font-medium text-slate-500">
        ₹
      </span>

      <input
        id={id}
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={(event) =>
          handleChange(event.target.value)
        }
        onBlur={handleBlur}
        placeholder={placeholder}
        className="w-full min-w-0 bg-transparent py-3.5 text-base font-semibold text-slate-900 outline-none placeholder:text-slate-300"
      />
    </div>
  );
}

export default CurrencyInput;