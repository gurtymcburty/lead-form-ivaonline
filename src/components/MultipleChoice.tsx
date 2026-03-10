'use client';

import { SiteConfig, FormQuestion } from '@/lib/form-config';

interface MultipleChoiceProps {
  question: FormQuestion;
  config: SiteConfig;
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  firstName?: string;
}

export default function MultipleChoice({
  question,
  config,
  value,
  onChange,
  onNext,
  firstName,
}: MultipleChoiceProps) {
  const handleSelect = (optionLabel: string) => {
    onChange(optionLabel);
    setTimeout(() => onNext(), 300);
  };

  const questionText = question.dynamicQuestion && firstName
    ? `${firstName}${question.question}`
    : question.question;

  return (
    <div className="w-full max-w-xl mx-auto px-4">
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

      <div className="space-y-3">
        {question.options?.map((option) => (
          <button
            key={option.key}
            onClick={() => handleSelect(option.label)}
            className="w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center gap-3"
            style={{
              backgroundColor: value === option.label ? config.selectedColor : config.cardBackgroundColor,
              borderColor: value === option.label ? config.primaryColor : config.borderColor,
              color: config.textColor,
            }}
            onMouseEnter={(e) => {
              if (value !== option.label) {
                e.currentTarget.style.backgroundColor = config.hoverColor;
              }
            }}
            onMouseLeave={(e) => {
              if (value !== option.label) {
                e.currentTarget.style.backgroundColor = config.cardBackgroundColor;
              }
            }}
          >
            <span
              className="w-7 h-7 rounded flex items-center justify-center text-sm font-medium shrink-0"
              style={{
                backgroundColor: value === option.label ? config.primaryColor : 'transparent',
                border: `1px solid ${value === option.label ? config.primaryColor : config.borderColor}`,
                color: value === option.label ? config.buttonTextColor : config.secondaryTextColor,
              }}
            >
              {option.key}
            </span>
            <span className="text-base">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
