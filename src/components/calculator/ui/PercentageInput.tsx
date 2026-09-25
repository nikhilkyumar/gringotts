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
        onChange={(event) =>
          onChange(Number(event.target.value))
        }
        className="mt-4 w-full accent-slate-900"
      />

      <div className="mt-3 flex items-center rounded-xl border border-slate-300 bg-white px-4 focus-within:border-slate-900 focus-within:ring-2 focus-within:ring-slate-900/10">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) =>
            onChange(Number(event.target.value))
          }
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