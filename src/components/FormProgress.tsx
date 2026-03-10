'use client';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function FormProgress({ currentStep, totalSteps }: FormProgressProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full flex flex-col gap-0">
      {/* Top loading bar */}
      <div
        className="w-full"
        style={{
          height: '4px',
          background: 'rgba(241, 236, 226, 0.3)',
          borderRadius: '4px',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'rgb(241, 236, 226)',
            borderRadius: '4px',
            transition: 'width 0.3s ease-out',
          }}
        />
      </div>
      {/* Secondary progress bar */}
      <div
        className="w-full flex"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-valuenow={currentStep + 1}
        style={{ height: '3px', marginTop: '1px' }}
      >
        <div
          style={{
            width: `${progress}%`,
            background: 'rgb(241, 236, 226)',
            transition: 'width 0.2s ease-in-out',
          }}
        />
        <div
          style={{
            width: `${100 - progress}%`,
            background: 'rgba(241, 236, 226, 0.4)',
            transition: 'width 0.2s ease-in-out',
          }}
        />
      </div>
    </div>
  );
}
