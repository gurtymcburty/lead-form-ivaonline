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
        background: selected ? 'rgba(241, 236, 226, 0.1)' : 'transparent',
        boxShadow: selected
          ? 'rgb(241, 236, 226) 0px 0px 0px 1px'
          : 'rgba(241, 236, 226, 0.3) 0px 0px 0px 1px',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 12px',
        minHeight: '40px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        fontFamily: 'Karla, sans-serif',
      }}
    >
      {/* Key badge */}
      <span
        style={{
          background: selected ? 'rgb(241, 236, 226)' : 'transparent',
          border: selected ? 'none' : '1px solid rgba(241, 236, 226, 0.5)',
          borderRadius: '2px',
          padding: '0px 6px',
          minWidth: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
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
          fontSize: '14px',
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
