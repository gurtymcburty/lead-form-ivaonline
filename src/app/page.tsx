'use client';

import { useState, useCallback } from 'react';
import { config, FormQuestion } from '@/lib/form-config';
import FormProgress from '@/components/FormProgress';
import QuestionHeader from '@/components/QuestionHeader';
import ChoiceButton from '@/components/ChoiceButton';
import ImageChoiceCard from '@/components/ImageChoiceCard';
import TextInput from '@/components/TextInput';
import PhoneInput from '@/components/PhoneInput';
import OkButton from '@/components/OkButton';
import NavButtons from '@/components/NavButtons';

interface FormData {
  [key: string]: string;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const currentQuestion = config.questions[currentStep];
  const firstName = formData['firstname'] || '';
  const totalSteps = config.questions.length;

  const handleFieldChange = useCallback((fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    setError('');
  }, []);

  const validateCurrentStep = (): boolean => {
    const q = currentQuestion;
    const value = formData[q.fieldName];

    if (q.required && !value) {
      setError('This field is required');
      return false;
    }

    if (q.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError('Please enter a valid email address');
        return false;
      }
    }

    if (q.type === 'phone' && value) {
      const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
      if (cleanPhone.length < 10) {
        setError('Please enter a valid UK phone number');
        return false;
      }
    }

    if (q.type === 'legal' && value === "I don't accept") {
      setError('You must accept to continue');
      return false;
    }

    return true;
  };

  const handleNext = useCallback(() => {
    if (!validateCurrentStep()) return;

    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      setError('');
    }
  }, [currentStep, totalSteps, formData, currentQuestion]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setError('');
    }
  }, [currentStep]);

  const handleChoiceSelect = (value: string) => {
    handleFieldChange(currentQuestion.fieldName, value);
    // Auto-advance for choice questions (except legal)
    if (currentQuestion.type !== 'legal') {
      setTimeout(() => {
        if (currentStep < totalSteps - 1) {
          setCurrentStep(prev => prev + 1);
          setError('');
        }
      }, 300);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    // Honeypot check
    if (honeypot) {
      setTimeout(() => {
        window.location.href = config.redirectUrl;
      }, 1000);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      window.location.href = config.redirectUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  const getQuestionTitle = (q: FormQuestion): string => {
    if (q.dynamicQuestion && firstName) {
      return `${firstName}${q.question}`;
    }
    return q.question;
  };

  const renderQuestion = (question: FormQuestion) => {
    const value = formData[question.fieldName] || '';

    switch (question.type) {
      case 'multiple-choice':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <QuestionHeader
              questionNumber={currentStep + 1}
              title={getQuestionTitle(question)}
              description={question.description}
            />
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                maxWidth: question.layout === 'horizontal' ? '600px' : '400px',
              }}
            >
              {question.options?.map((option) => (
                <ChoiceButton
                  key={option.key}
                  keyLabel={option.key}
                  label={option.label}
                  selected={value === option.label}
                  onClick={() => handleChoiceSelect(option.label)}
                />
              ))}
            </div>
            <OkButton onClick={handleNext} />
          </div>
        );

      case 'image-choice':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <QuestionHeader
              questionNumber={currentStep + 1}
              title={getQuestionTitle(question)}
              description={question.description}
            />
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {question.options?.map((option) => (
                <ImageChoiceCard
                  key={option.key}
                  keyLabel={option.key}
                  label={option.label}
                  imageSrc={option.image || ''}
                  selected={value === option.label}
                  onClick={() => handleChoiceSelect(option.label)}
                />
              ))}
            </div>
            <OkButton onClick={handleNext} />
          </div>
        );

      case 'text':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <QuestionHeader
              questionNumber={currentStep + 1}
              title={getQuestionTitle(question)}
              description={question.description}
            />
            <div style={{ maxWidth: '400px' }}>
              <TextInput
                value={value}
                onChange={(v) => handleFieldChange(question.fieldName, v)}
                onSubmit={handleNext}
                placeholder={question.placeholder}
                error={error}
              />
            </div>
            <OkButton onClick={handleNext} />
          </div>
        );

      case 'email':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <QuestionHeader
              questionNumber={currentStep + 1}
              title={getQuestionTitle(question)}
              description={question.description}
            />
            <div style={{ maxWidth: '400px' }}>
              <TextInput
                value={value}
                onChange={(v) => handleFieldChange(question.fieldName, v)}
                onSubmit={handleNext}
                placeholder={question.placeholder}
                type="email"
                error={error}
              />
            </div>
            <OkButton onClick={handleNext} />
          </div>
        );

      case 'phone':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <QuestionHeader
              questionNumber={currentStep + 1}
              title={getQuestionTitle(question)}
              description={question.description}
            />
            <div style={{ maxWidth: '400px' }}>
              <PhoneInput
                value={value}
                onChange={(v) => handleFieldChange(question.fieldName, v)}
                onSubmit={handleNext}
                placeholder={question.placeholder}
                error={error}
              />
            </div>
            <OkButton onClick={handleNext} />
          </div>
        );

      case 'legal':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <QuestionHeader
              questionNumber={currentStep + 1}
              title={getQuestionTitle(question)}
              description={question.description}
              descriptionHasLink={question.descriptionHasLink}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '256px' }}>
              {question.options?.map((option) => (
                <ChoiceButton
                  key={option.key}
                  keyLabel={option.key}
                  label={option.label}
                  selected={value === option.label}
                  onClick={() => handleFieldChange(question.fieldName, option.label)}
                />
              ))}
            </div>
            {error && (
              <p style={{ color: '#F87171', fontSize: '14px' }}>{error}</p>
            )}
            <OkButton
              onClick={handleSubmit}
              label="See My Options"
              disabled={isSubmitting || !value || value === "I don't accept"}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'rgb(38, 38, 38)',
        position: 'relative',
      }}
    >
      {/* Progress bars at top */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <FormProgress currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
      />

      {/* Main content */}
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <fieldset
          style={{
            border: 'none',
            margin: 0,
            padding: '59px 80px 88px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {renderQuestion(currentQuestion)}
        </fieldset>
      </main>

      {/* Navigation buttons */}
      <NavButtons
        onPrev={handlePrev}
        onNext={handleNext}
        showPrev={currentStep > 0}
        showNext={currentStep < totalSteps - 1 && currentQuestion.type !== 'multiple-choice' && currentQuestion.type !== 'image-choice'}
      />
    </div>
  );
}
