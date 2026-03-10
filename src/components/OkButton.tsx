'use client';

interface OkButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

export default function OkButton({ onClick, label = 'OK', disabled = false }: OkButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        background: 'rgba(38, 38, 38, 0.3)',
        color: 'rgb(138, 118, 78)',
        fontSize: '14px',
        fontWeight: 600,
        border: 'none',
        boxShadow: 'rgb(241, 236, 226) 0px 0px 0px 1px inset',
        borderRadius: '8px',
        padding: '8px',
        height: '40px',
        minWidth: label === 'OK' ? '56px' : '164px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontFamily: 'Karla, sans-serif',
      }}
    >
      {label}
    </button>
  );
}
