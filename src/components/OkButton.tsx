'use client';

interface OkButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

export default function OkButton({ onClick, label = 'OK', disabled = false }: OkButtonProps) {
  const isWide = label !== 'OK';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        background: 'rgb(241, 236, 226)',
        color: 'rgb(38, 38, 38)',
        fontSize: '14px',
        fontWeight: 700,
        fontFamily: 'Karla, sans-serif',
        border: 'none',
        borderRadius: '4px',
        padding: isWide ? '10px 16px' : '8px 14px',
        height: isWide ? '40px' : '32px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        transition: 'opacity 0.15s ease',
      }}
    >
      {label}
      {!isWide && (
        <span style={{ fontSize: '12px' }}>✓</span>
      )}
    </button>
  );
}
