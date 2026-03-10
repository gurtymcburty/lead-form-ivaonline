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
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: isFocused || value
            ? '2px solid rgb(241, 236, 226)'
            : '1px solid rgba(241, 236, 226, 0.3)',
          paddingBottom: '4px',
          transition: 'border-color 0.2s ease',
        }}
      >
        {/* Country selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            paddingRight: '16px',
            fontSize: '24px',
            color: 'rgb(241, 236, 226)',
            cursor: 'pointer',
            borderRight: '1px solid rgba(241, 236, 226, 0.2)',
            marginRight: '12px',
          }}
        >
          <span style={{ fontSize: '20px' }}>🇬🇧</span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{ color: 'rgb(200, 196, 188)' }}
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
            fontSize: '24px',
            fontWeight: 400,
            padding: '8px 0',
            fontFamily: 'Karla, sans-serif',
            lineHeight: 1.4,
          }}
        />
      </div>
      {error && (
        <p style={{
          color: 'rgb(248, 113, 113)',
          fontSize: '14px',
          marginTop: '12px',
          margin: '12px 0 0 0',
        }}>
          {error}
        </p>
      )}
    </div>
  );
}
