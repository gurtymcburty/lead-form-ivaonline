'use client';

import { useState } from 'react';
import { SiteConfig, FormQuestion } from '@/lib/form-config';

interface LegalConsentProps {
  question: FormQuestion;
  config: SiteConfig;
  value: boolean;
  onChange: (value: boolean) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function LegalConsent({
  question,
  config,
  value,
  onChange,
  onSubmit,
  isSubmitting,
}: LegalConsentProps) {
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value && question.required) {
      setError('Please accept to continue');
      return;
    }
    setError('');
    onSubmit();
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h1
            className="text-2xl md:text-3xl font-medium mb-3"
            style={{ color: config.textColor }}
          >
            {question.question}
          </h1>
        </div>

        <div
          className="p-6 rounded-lg mb-6"
          style={{ backgroundColor: config.cardBackgroundColor }}
        >
          <p
            className="text-base leading-relaxed"
            style={{ color: config.secondaryTextColor }}
          >
            {question.description}
          </p>
        </div>

        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => {
                onChange(e.target.checked);
                if (error) setError('');
              }}
              className="mt-1 w-5 h-5 rounded cursor-pointer"
              style={{
                accentColor: config.primaryColor,
              }}
            />
            <span style={{ color: config.textColor }}>
              I agree to the above terms
            </span>
          </label>

          {error && (
            <p className="text-sm" style={{ color: config.errorColor }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-lg font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{
              backgroundColor: config.primaryColor,
              color: config.buttonTextColor,
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
