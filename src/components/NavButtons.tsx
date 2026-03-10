'use client';

interface NavButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  showPrev: boolean;
  showNext: boolean;
}

export default function NavButtons({ onPrev, onNext, showPrev, showNext }: NavButtonsProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        display: 'flex',
        gap: '0px',
      }}
    >
      {showPrev && (
        <button
          type="button"
          onClick={onPrev}
          style={{
            background: 'rgba(38, 38, 38, 0.3)',
            border: 'none',
            borderRadius: '8px 2px 2px 8px',
            width: '32px',
            height: '32px',
            padding: '7px 8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Previous question"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(138, 118, 78)"
            strokeWidth="2"
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
            background: 'rgba(38, 38, 38, 0.3)',
            border: 'none',
            borderRadius: '2px 8px 8px 2px',
            width: '32px',
            height: '32px',
            padding: '7px 8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Next question"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(173, 157, 127)"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}
