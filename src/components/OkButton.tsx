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
        background: 'rgba(38, 38, 38, 0.3)',
        color: 'rgb(138, 118, 78)',
        fontSize: '14px',
        fontWeight: 700,
        fontFamily: 'Karla, sans-serif',
        border: 'none',
        boxShadow: 'rgb(241, 236, 226) 0px 0px 0px 1px inset',
        borderRadius: '8px',
        padding: isWide ? '10px 20px' : '10px 16px',
        height: '40px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'opacity 0.15s ease',
      }}
    >
      {label}
      {!isWide && (
        <span style={{ fontSize: '12px', opacity: 0.8 }}>✓</span>
      )}
    </button>
  );
}
