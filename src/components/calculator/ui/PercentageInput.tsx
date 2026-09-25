import { useEffect, useState } from "react";

interface PercentageInputProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
}

function PercentageInput({
  value,
  onChange,
  label = "Expected annual return",
  min = 0,
  max = 30,
  step = 0.5,
}: PercentageInputProps) {
  const [inputValue, setInputValue] = useState(String(value));

  // Keep the text field synchronized when the value
  // changes from the slider or from the parent component.
  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const rawValue = event.target.value;

    // Allow the user to temporarily clear the field
    // while editing.
    if (rawValue === "") {
      setInputValue("");
      return;
    }

    // Allow normal numeric input, including decimals.
    if (!/^\d*\.?\d*$/.test(rawValue)) {
      return;
    }

    setInputValue(rawValue);

    const numericValue = Number(rawValue);

    if (
      Number.isFinite(numericValue) &&
      numericValue >= min &&
      numericValue <= max
    ) {
      onChange(numericValue);
    }
  }

  function handleInputBlur() {
    if (inputValue === "") {
      setInputValue(String(value));
      return;
    }

    const numericValue = Number(inputValue);

    if (!Number.isFinite(numericValue)) {
      setInputValue(String(value));
      return;
    }

    const clampedValue = Math.min(
      max,
      Math.max(min, numericValue)
    );

    setInputValue(String(clampedValue));
    onChange(clampedValue);
  }

  function handleSliderChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const numericValue = Number(event.target.value);

    setInputValue(String(numericValue));
    onChange(numericValue);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">
          {label}
        </span>

        <span className="text-lg font-bold text-slate-950">
          {value}%
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
        className="mt-4 w-full accent-slate-900"
      />

      <div className="mt-3 flex items-center rounded-xl border border-slate-300 bg-white px-4 transition focus-within:border-slate-900 focus-within:ring-2 focus-within:ring-slate-900/10">
        <input
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="w-full bg-transparent py-3 text-base font-semibold text-slate-900 outline-none"
        />

        <span className="ml-2 font-medium text-slate-500">
          %
        </span>
      </div>

      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <span>{min}%</span>
        <span>{max}%</span>
      </div>
    </div>
  );
}

export default PercentageInput;