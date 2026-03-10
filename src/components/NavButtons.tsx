'use client';

interface NavButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  showPrev: boolean;
  showNext: boolean;
}

export default function NavButtons({ onPrev, onNext, showPrev, showNext }: NavButtonsProps) {
  if (!showPrev && !showNext) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '32px',
        right: '32px',
        display: 'flex',
        gap: '2px',
      }}
    >
      {showPrev && (
        <button
          type="button"
          onClick={onPrev}
          style={{
            background: 'rgba(38, 38, 38, 0.6)',
            boxShadow: 'rgba(241, 236, 226, 0.2) 0px 0px 0px 1px inset',
            border: 'none',
            borderRadius: '6px 2px 2px 6px',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Previous question"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(138, 118, 78)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}
      {showNext && (
        <button
          type="button"
          onClick={onNext}
          style={{
            background: 'rgba(38, 38, 38, 0.6)',
            boxShadow: 'rgba(241, 236, 226, 0.2) 0px 0px 0px 1px inset',
            border: 'none',
            borderRadius: '2px 6px 6px 2px',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Next question"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(173, 157, 127)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}
