"use client";

import { Icon } from "@iconify/react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import type {
  HeroConfig,
  MotionPreset,
  OverlayStrength,
  PerformancePreset,
} from "@/lib/hero-templates";

interface HeroStudioProps {
  config: HeroConfig;
  onChange: (patch: Partial<HeroConfig>) => void;
  onReset: () => void;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  maxLength = 80,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] font-medium uppercase tracking-wider text-white/35">
        {label}
      </span>
      <input
        type="text"
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[12px] text-white/90 placeholder:text-white/25 focus:border-white/25 focus:outline-none"
      />
    </label>
  );
}

const OVERLAY_OPTIONS: { value: OverlayStrength; label: string }[] = [
  { value: "none", label: "None" },
  { value: "subtle", label: "Subtle" },
  { value: "medium", label: "Medium" },
  { value: "strong", label: "Strong" },
];

const PERF_OPTIONS: { value: PerformancePreset; label: string }[] = [
  { value: "balanced", label: "Balanced" },
  { value: "max", label: "Max perf" },
];

const MOTION_OPTIONS: { value: MotionPreset; label: string }[] = [
  { value: "always", label: "Always play" },
  { value: "reduced", label: "Reduced-motion" },
];

export function HeroStudio({ config, onChange, onReset }: HeroStudioProps) {
  return (
    <details className="group mt-3 rounded-xl border border-white/10 bg-white/3">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2.5 text-xs font-medium text-white/80 transition-colors hover:text-white">
        <Icon icon="solar:tuning-2-linear" width="14" className="text-white/50" />
        Customize
        <span className="ml-1 rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/45">
          Studio
        </span>
        <Icon
          icon="solar:alt-arrow-down-linear"
          width="13"
          className="ml-auto text-white/40 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>

      <div className="flex flex-col gap-3 border-t border-white/10 px-3 py-3">
        <div className="grid grid-cols-2 gap-2">
          <Field
            label="Brand"
            value={config.brand}
            onChange={(v) => onChange({ brand: v })}
            maxLength={40}
          />
          <Field
            label="CTA label"
            value={config.ctaLabel}
            onChange={(v) => onChange({ ctaLabel: v })}
            maxLength={40}
          />
        </div>

        <Field
          label="Heading"
          value={config.heading}
          onChange={(v) => onChange({ heading: v })}
        />
        <Field
          label="Highlight"
          value={config.highlight}
          onChange={(v) => onChange({ highlight: v })}
        />
        <Field
          label="Subheading"
          value={config.subheading}
          onChange={(v) => onChange({ subheading: v })}
          maxLength={140}
        />
        <Field
          label="CTA link"
          value={config.ctaHref}
          onChange={(v) => onChange({ ctaHref: v })}
          placeholder="#"
          maxLength={200}
        />

        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] font-medium uppercase tracking-wider text-white/35">
            Accent
          </span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={config.accent}
              onChange={(e) => onChange({ accent: e.target.value })}
              aria-label="Accent color"
              className="h-6 w-9 cursor-pointer rounded border border-white/10 bg-transparent p-0"
            />
            <code className="font-mono text-[11px] text-white/45">{config.accent}</code>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium uppercase tracking-wider text-white/35">
            Overlay strength
          </span>
          <SegmentedControl
            label="Overlay strength"
            options={OVERLAY_OPTIONS}
            value={config.overlay}
            onChange={(v) => onChange({ overlay: v })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium uppercase tracking-wider text-white/35">
            Performance preset
          </span>
          <SegmentedControl
            label="Performance preset"
            options={PERF_OPTIONS}
            value={config.performance}
            onChange={(v) => onChange({ performance: v })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium uppercase tracking-wider text-white/35">
            Motion
          </span>
          <SegmentedControl
            label="Motion preset"
            options={MOTION_OPTIONS}
            value={config.motion}
            onChange={(v) => onChange({ motion: v })}
          />
        </div>

        <button
          type="button"
          onClick={onReset}
          className="mt-1 inline-flex items-center justify-center gap-1.5 self-start rounded-lg border border-white/10 px-2.5 py-1.5 text-[11px] text-white/55 transition-colors hover:bg-white/5 hover:text-white/80"
        >
          <Icon icon="solar:restart-linear" width="12" />
          Reset to default
        </button>
      </div>
    </details>
  );
}
