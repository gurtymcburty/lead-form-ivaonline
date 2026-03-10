'use client';

interface QuestionHeaderProps {
  questionNumber: number;
  title: string;
  description?: string;
  descriptionHasLink?: boolean;
}

export default function QuestionHeader({
  questionNumber,
  title,
  description,
  descriptionHasLink,
}: QuestionHeaderProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
        {/* Question number badge */}
        <span
          style={{
            background: 'rgb(241, 236, 226)',
            color: 'rgb(38, 38, 38)',
            fontSize: '11px',
            fontWeight: 400,
            borderRadius: '5px 3px 3px 5px',
            padding: '2px 6px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '8px',
            lineHeight: 1.4,
          }}
        >
          {questionNumber}
        </span>
        {/* Question title with arrow */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <span
            style={{
              color: 'rgb(241, 236, 226)',
              fontSize: '20px',
              marginTop: '2px',
            }}
          >
            →
          </span>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 400,
              color: 'rgb(241, 236, 226)',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {title}
            <span style={{ color: 'rgb(200, 196, 188)' }}>*</span>
          </h1>
        </div>
      </div>
      {/* Description */}
      {description && (
        <p
          style={{
            fontSize: '16px',
            fontWeight: 400,
            color: 'rgb(200, 196, 188)',
            margin: 0,
            marginLeft: '54px',
            lineHeight: 1.5,
          }}
        >
          {descriptionHasLink ? (
            <>
              By completing this form you are agreeing with our{' '}
              <a
                href="https://www.ivaonline.co.uk/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'rgb(200, 196, 188)',
                  textDecoration: 'underline',
                }}
              >
                Privacy Policy
              </a>
              .
            </>
          ) : (
            description
          )}
        </p>
      )}
    </div>
  );
}
