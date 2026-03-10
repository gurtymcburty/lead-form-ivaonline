// Form configuration for IVA Online - Pixel-perfect Typeform clone

export interface FormQuestion {
  id: string;
  type: 'multiple-choice' | 'image-choice' | 'text' | 'email' | 'phone' | 'legal';
  question: string;
  description?: string;
  descriptionHasLink?: boolean;
  options?: Array<{
    key: string;
    label: string;
    image?: string;
  }>;
  placeholder?: string;
  required: boolean;
  fieldName: string;
  dynamicQuestion?: boolean;
  layout?: 'horizontal' | 'vertical' | 'grid';
}

export interface SiteConfig {
  name: string;
  questions: FormQuestion[];
  redirectUrl: string;
}

export const config: SiteConfig = {
  name: 'IVA Online',
  redirectUrl: 'https://www.ivaonline.co.uk/results.html',
  questions: [
    {
      id: 'debt_amount',
      type: 'multiple-choice',
      question: 'What is the total sum of your debt?',
      description: 'Add all of your debts together to get the total amount.',
      options: [
        { key: 'A', label: 'Under £5000' },
        { key: 'B', label: '£5001–£19,999' },
        { key: 'C', label: '£20,000 or more' },
      ],
      layout: 'horizontal',
      required: true,
      fieldName: 'total_debts',
    },
    {
      id: 'debt_count',
      type: 'multiple-choice',
      question: 'How many debts do you have?',
      options: [
        { key: 'A', label: '1' },
        { key: 'B', label: '2' },
        { key: 'C', label: '3 or more' },
        { key: 'D', label: 'Unsure' },
      ],
      layout: 'grid',
      required: true,
      fieldName: 'debt_level',
    },
    {
      id: 'employment',
      type: 'image-choice',
      question: 'What is your employment status?',
      options: [
        { key: 'A', label: 'Employed', image: 'https://images.typeform.com/images/LzNSAf9vFW4v' },
        { key: 'B', label: 'Self-Employed', image: 'https://images.typeform.com/images/DvcCXffDYJ9Y' },
        { key: 'C', label: 'Retired', image: 'https://images.typeform.com/images/RdTjmTWGYPrn' },
        { key: 'D', label: 'Unemployed', image: 'https://images.typeform.com/images/b55PgyEBwmrT' },
      ],
      required: true,
      fieldName: 'employment_status',
    },
    {
      id: 'firstname',
      type: 'text',
      question: 'What is your first name?',
      placeholder: 'Type your answer here...',
      required: true,
      fieldName: 'firstname',
    },
    {
      id: 'lastname',
      type: 'text',
      question: ', what is your last name?',
      dynamicQuestion: true,
      placeholder: 'Type your answer here...',
      required: true,
      fieldName: 'lastname',
    },
    {
      id: 'email',
      type: 'email',
      question: 'What is your email address?',
      description: 'We need this to email you details about possible solutions to your debt problem. You can unsubscribe at any time.',
      placeholder: 'name@example.com',
      required: true,
      fieldName: 'email',
    },
    {
      id: 'phone',
      type: 'phone',
      question: ', what is your phone number?',
      dynamicQuestion: true,
      description: "We won't share your phone number with any other companies, in line with our Data Protection policies.",
      placeholder: '07400 123456',
      required: true,
      fieldName: 'phone_mobile',
    },
    {
      id: 'consent',
      type: 'legal',
      question: 'Please read carefully',
      description: 'By completing this form you are agreeing with our Privacy Policy.',
      descriptionHasLink: true,
      options: [
        { key: 'A', label: 'I accept' },
        { key: 'B', label: "I don't accept" },
      ],
      required: true,
      fieldName: 'consent',
    },
  ],
};
