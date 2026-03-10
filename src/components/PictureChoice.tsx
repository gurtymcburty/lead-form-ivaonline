'use client';

import { SiteConfig, FormQuestion } from '@/lib/form-config';

interface PictureChoiceProps {
  question: FormQuestion;
  config: SiteConfig;
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

export default function PictureChoice({
  question,
  config,
  value,
  onChange,
  onNext,
}: PictureChoiceProps) {
  const handleSelect = (optionLabel: string) => {
    onChange(optionLabel);
    setTimeout(() => onNext(), 300);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="mb-8">
        <h1
          className="text-2xl md:text-3xl font-medium mb-3"
          style={{ color: config.textColor }}
        >
          {question.question}
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

      <div className="grid grid-cols-2 gap-4">
        {question.options?.map((option) => (
          <button
            key={option.key}
            onClick={() => handleSelect(option.label)}
            className="p-6 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-3"
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
            <span className="text-4xl">{option.icon}</span>
            <span className="text-base font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
