'use client';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

export default function Slider({ label, value, min, max, step = 1, unit = '', onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="field-label mb-0">{label}</label>
        <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-md">
          {value}{unit}
        </span>
      </div>
      <div className="relative py-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
          style={{
            background: `linear-gradient(to right, #6366F1 0%, #6366F1 ${pct}%, #222633 ${pct}%, #222633 100%)`,
          }}
        />
      </div>
    </div>
  );
}
