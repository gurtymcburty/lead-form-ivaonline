'use client';

import { useState, useRef, useEffect } from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  error?: string;
}

export default function PhoneInput({
  value,
  onChange,
  onSubmit,
  placeholder = '07400 123456',
  error,
}: PhoneInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: isFocused || value
            ? '3px solid rgb(241, 236, 226)'
            : '1px solid rgba(241, 236, 226, 0.2)',
          transition: 'border-color 0.2s ease',
        }}
      >
        {/* Country selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 24px 8px 0',
            fontSize: '26px',
            color: 'rgb(241, 236, 226)',
            cursor: 'pointer',
          }}
        >
          <span>🇬🇧</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: 'rgb(241, 236, 226)' }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: 'rgb(241, 236, 226)',
            fontSize: '26px',
            fontWeight: 400,
            padding: '8px 0',
            fontFamily: 'Karla, sans-serif',
          }}
        />
      </div>
      {error && (
        <p style={{ color: '#F87171', fontSize: '14px', marginTop: '8px' }}>
          {error}
        </p>
      )}
    </div>
  );
}
