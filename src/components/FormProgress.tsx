'use client';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function FormProgress({ currentStep, totalSteps }: FormProgressProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div style={{ width: '100%' }}>
      {/* Main progress bar */}
      <div
        style={{
          width: '100%',
          height: '4px',
          borderRadius: '4px',
          overflow: 'hidden',
          background: 'rgba(241, 236, 226, 0.56)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'rgb(241, 236, 226)',
            transition: 'width 0.3s ease-out',
            borderRadius: '4px',
          }}
        />
      </div>
    </div>
  );
}
