'use client';

import { useState } from 'react';
import { SiteConfig, FormQuestion } from '@/lib/form-config';

interface PhoneInputProps {
  question: FormQuestion;
  config: SiteConfig;
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  firstName?: string;
}

export default function PhoneInput({
  question,
  config,
  value,
  onChange,
  onNext,
  firstName,
}: PhoneInputProps) {
  const [error, setError] = useState('');

  const validatePhone = (phone: string) => {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    const ukPhoneRegex = /^(?:(?:\+44)|(?:0))(?:\d{10}|\d{9})$/;
    return ukPhoneRegex.test(cleanPhone) || cleanPhone.length >= 10;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() && question.required) {
      setError('Please enter your phone number');
      return;
    }
    if (!validatePhone(value)) {
      setError('Please enter a valid UK phone number');
      return;
    }
    setError('');
    onNext();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const questionText = question.dynamicQuestion && firstName
    ? `${firstName}${question.question}`
    : question.question;

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h1
            className="text-2xl md:text-3xl font-medium mb-3"
            style={{ color: config.textColor }}
          >
            {questionText}
          </h1>
          {question.description && (
            <p
              className="text-base"
              style={{ color: config.secondaryTextColor }}
            >
              {question.description}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <input
            type="tel"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              if (error) setError('');
            }}
            onKeyDown={handleKeyDown}
            placeholder={question.placeholder}
            className="w-full p-4 text-lg rounded-lg border-2 outline-none transition-colors"
            style={{
              backgroundColor: config.cardBackgroundColor,
              borderColor: error ? config.errorColor : config.borderColor,
              color: config.textColor,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = config.primaryColor;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = error ? config.errorColor : config.borderColor;
            }}
            autoFocus
          />

          {error && (
            <p className="text-sm" style={{ color: config.errorColor }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="px-8 py-3 rounded-lg font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: config.primaryColor,
              color: config.buttonTextColor,
            }}
          >
            OK
          </button>

          <p className="text-sm" style={{ color: config.secondaryTextColor }}>
            press <span className="font-medium">Enter ↵</span>
          </p>
        </div>
      </form>
    </div>
  );
}
