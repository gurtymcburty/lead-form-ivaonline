'use client';

interface ChoiceButtonProps {
  keyLabel: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function ChoiceButton({ keyLabel, label, selected, onClick }: ChoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: 'rgba(38, 38, 38, 0.6)',
        boxShadow: selected
          ? 'rgb(241, 236, 226) 0px 0px 0px 2px'
          : 'rgba(241, 236, 226, 0.1) 0px 0px 0px 1px',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 14px',
        minHeight: '44px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        transition: 'box-shadow 0.15s ease',
        fontFamily: 'Karla, sans-serif',
      }}
    >
      {/* Key badge */}
      <span
        style={{
          background: selected ? 'rgb(241, 236, 226)' : 'rgba(38, 38, 38, 0.4)',
          border: selected ? 'none' : '1px solid rgba(241, 236, 226, 0.3)',
          borderRadius: '4px',
          padding: '0px 8px',
          minWidth: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 400,
          color: selected ? 'rgb(38, 38, 38)' : 'rgb(241, 236, 226)',
          flexShrink: 0,
        }}
      >
        {keyLabel}
      </span>
      {/* Label */}
      <span
        style={{
          fontSize: '16px',
          fontWeight: 400,
          color: 'rgb(241, 236, 226)',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </button>
  );
}
