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
        padding: '8px 8px 4px',
        width: '153px',
        height: '206px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'box-shadow 0.15s ease',
      }}
    >
      {/* Image wrapper */}
      <div
        style={{
          height: '158px',
          width: '137px',
          overflow: 'hidden',
          borderRadius: '2px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Image
          src={imageSrc}
          alt={label}
          width={137}
          height={158}
          style={{
            objectFit: 'cover',
            width: '137px',
            height: '158px',
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
          marginTop: '4px',
        }}
      >
        {/* Key badge */}
        <span
          style={{
            background: 'rgba(38, 38, 38, 0.4)',
            border: '1px solid rgba(241, 236, 226, 0.24)',
            borderRadius: '4px',
            padding: '0px 6px',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            color: 'rgb(241, 236, 226)',
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
          }}
        >
          {label}
        </span>
      </div>
    </button>
  );
}
