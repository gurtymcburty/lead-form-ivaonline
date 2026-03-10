'use client';

import { useState, useCallback } from 'react';
import { config, FormQuestion } from '@/lib/form-config';
import FormProgress from '@/components/FormProgress';
import MultipleChoice from '@/components/MultipleChoice';
import PictureChoice from '@/components/PictureChoice';
import TextInput from '@/components/TextInput';
import EmailInput from '@/components/EmailInput';
import PhoneInput from '@/components/PhoneInput';
import LegalConsent from '@/components/LegalConsent';

interface FormData {
  [key: string]: string | boolean;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Honeypot field
  const [honeypot, setHoneypot] = useState('');

  const handleFieldChange = useCallback((fieldName: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value,
    }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < config.questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleSubmit = async () => {
    // Check honeypot - if filled, silently "succeed" but don't submit
    if (honeypot) {
      setTimeout(() => {
        window.location.href = config.redirectUrl;
      }, 1000);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      // Redirect on success
      window.location.href = config.redirectUrl;
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const currentQuestion = config.questions[currentStep];
  const firstName = formData['firstname'] as string || '';

  const renderQuestion = (question: FormQuestion) => {
    const value = formData[question.fieldName] as string || '';
    const boolValue = formData[question.fieldName] as boolean || false;

    switch (question.type) {
      case 'multiple-choice':
        return (
          <MultipleChoice
            question={question}
            config={config}
            value={value}
            onChange={(val) => handleFieldChange(question.fieldName, val)}
            onNext={handleNext}
            firstName={firstName}
          />
        );
      case 'picture-choice':
        return (
          <PictureChoice
            question={question}
            config={config}
            value={value}
            onChange={(val) => handleFieldChange(question.fieldName, val)}
            onNext={handleNext}
          />
        );
      case 'text':
        return (
          <TextInput
            question={question}
            config={config}
            value={value}
            onChange={(val) => handleFieldChange(question.fieldName, val)}
            onNext={handleNext}
            firstName={firstName}
          />
        );
      case 'email':
        return (
          <EmailInput
            question={question}
            config={config}
            value={value}
            onChange={(val) => handleFieldChange(question.fieldName, val)}
            onNext={handleNext}
          />
        );
      case 'phone':
        return (
          <PhoneInput
            question={question}
            config={config}
            value={value}
            onChange={(val) => handleFieldChange(question.fieldName, val)}
            onNext={handleNext}
            firstName={firstName}
          />
        );
      case 'legal':
        return (
          <LegalConsent
            question={question}
            config={config}
            value={boolValue}
            onChange={(val) => handleFieldChange(question.fieldName, val)}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: config.backgroundColor }}
    >
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-10 px-4 py-4">
        <FormProgress
          currentStep={currentStep}
          totalSteps={config.questions.length}
          config={config}
        />
      </div>

      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        style={{
          position: 'absolute',
          left: '-9999px',
          opacity: 0,
          height: 0,
          width: 0,
        }}
      />

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="w-full">
          {renderQuestion(currentQuestion)}

          {submitError && (
            <div className="max-w-xl mx-auto px-4 mt-4">
              <p className="text-center" style={{ color: config.errorColor }}>
                {submitError}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Navigation */}
      <div className="fixed bottom-6 right-6 flex gap-2">
        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className="p-3 rounded-full transition-opacity hover:opacity-80"
            style={{
              backgroundColor: config.cardBackgroundColor,
              color: config.textColor,
              border: `1px solid ${config.borderColor}`,
            }}
            aria-label="Previous question"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
        {currentStep < config.questions.length - 1 && currentQuestion.type !== 'multiple-choice' && currentQuestion.type !== 'picture-choice' && (
          <button
            onClick={handleNext}
            className="p-3 rounded-full transition-opacity hover:opacity-80"
            style={{
              backgroundColor: config.primaryColor,
              color: config.buttonTextColor,
            }}
            aria-label="Next question"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
