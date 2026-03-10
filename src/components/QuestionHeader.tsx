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
            borderRadius: '5px 3px',
            padding: '0px 4px',
            minWidth: '16px',
            height: '19px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '6px',
          }}
        >
          {questionNumber}
        </span>
        {/* Question title */}
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 400,
            color: 'rgb(241, 236, 226)',
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {title}
          <span style={{ color: 'rgb(200, 196, 188)' }}>*</span>
        </h1>
      </div>
      {/* Description */}
      {description && (
        <p
          style={{
            fontSize: '18px',
            fontWeight: 400,
            color: 'rgb(200, 196, 188)',
            margin: 0,
            marginLeft: '24px',
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
