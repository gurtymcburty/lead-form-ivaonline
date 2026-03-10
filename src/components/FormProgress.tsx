'use client';

import { SiteConfig } from '@/lib/form-config';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  config: SiteConfig;
}

export default function FormProgress({ currentStep, totalSteps, config }: FormProgressProps) {
  const progress = ((currentStep) / totalSteps) * 100;

  return (
    <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: config.borderColor }}>
      <div
        className="h-full transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          backgroundColor: config.primaryColor,
        }}
      />
    </div>
  );
}
