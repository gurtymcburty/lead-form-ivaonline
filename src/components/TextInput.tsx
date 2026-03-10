'use client';

import { useState, useRef, useEffect } from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  type?: 'text' | 'email';
  error?: string;
}

export default function TextInput({
  value,
  onChange,
  onSubmit,
  placeholder = 'Type your answer here...',
  type = 'text',
  error,
}: TextInputProps) {
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
          position: 'relative',
          borderBottom: isFocused || value
            ? '2px solid rgb(241, 236, 226)'
            : '1px solid rgba(241, 236, 226, 0.3)',
          paddingBottom: '4px',
          transition: 'border-color 0.2s ease',
        }}
      >
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          style={{
            width: '100%',
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
