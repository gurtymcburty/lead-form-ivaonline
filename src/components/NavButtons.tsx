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
        bottom: '24px',
        right: '24px',
        display: 'flex',
        gap: '1px',
      }}
    >
      {showPrev && (
        <button
          type="button"
          onClick={onPrev}
          style={{
            background: 'rgba(241, 236, 226, 0.1)',
            border: 'none',
            borderRadius: showNext ? '4px 0 0 4px' : '4px',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s ease',
          }}
          aria-label="Previous question"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(241, 236, 226)"
            strokeWidth="2"
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
            background: 'rgba(241, 236, 226, 0.1)',
            border: 'none',
            borderRadius: showPrev ? '0 4px 4px 0' : '4px',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s ease',
          }}
          aria-label="Next question"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(241, 236, 226)"
            strokeWidth="2"
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
