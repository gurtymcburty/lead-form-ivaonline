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
        background: 'rgba(38, 38, 38, 0.6)',
        boxShadow: selected
          ? 'rgb(241, 236, 226) 0px 0px 0px 2px'
          : 'rgba(241, 236, 226, 0.1) 0px 0px 0px 1px',
        border: 'none',
        borderRadius: '8px',
        padding: '8px',
        width: '140px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'box-shadow 0.15s ease',
        fontFamily: 'Karla, sans-serif',
      }}
    >
      {/* Image wrapper */}
      <div
        style={{
          width: '124px',
          height: '140px',
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
          width={124}
          height={140}
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
          gap: '8px',
          alignItems: 'center',
          marginTop: '8px',
          paddingBottom: '4px',
        }}
      >
        {/* Key badge */}
        <span
          style={{
            background: selected ? 'rgb(241, 236, 226)' : 'rgba(38, 38, 38, 0.4)',
            border: selected ? 'none' : '1px solid rgba(241, 236, 226, 0.3)',
            borderRadius: '4px',
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
            fontSize: '13px',
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
