'use client';

import Image from 'next/image';

interface ImageChoiceCardProps {
  keyLabel: string;
  label: string;
  imageSrc: string;
  selected: boolean;
  onClick: () => void;
}

export default function ImageChoiceCard({
  keyLabel,
  label,
  imageSrc,
  selected,
  onClick,
}: ImageChoiceCardProps) {
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
        padding: '8px',
        width: '120px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        fontFamily: 'Karla, sans-serif',
      }}
    >
      {/* Image wrapper */}
      <div
        style={{
          width: '104px',
          height: '104px',
          overflow: 'hidden',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(0,0,0,0.1)',
        }}
      >
        <Image
          src={imageSrc}
          alt={label}
          width={104}
          height={104}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
          unoptimized
        />
      </div>
      {/* Label area */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '6px',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        {/* Key badge */}
        <span
          style={{
            background: selected ? 'rgb(241, 236, 226)' : 'transparent',
            border: selected ? 'none' : '1px solid rgba(241, 236, 226, 0.5)',
            borderRadius: '2px',
            padding: '0px 5px',
            minWidth: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
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
            fontSize: '12px',
            fontWeight: 400,
            color: 'rgb(241, 236, 226)',
            textAlign: 'left',
          }}
        >
          {label}
        </span>
      </div>
    </button>
  );
}
