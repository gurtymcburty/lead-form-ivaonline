// Form configuration for IVA Online

export interface FormQuestion {
  id: string;
  type: 'multiple-choice' | 'picture-choice' | 'text' | 'email' | 'phone' | 'legal';
  question: string;
  description?: string;
  options?: Array<{
    key: string;
    label: string;
    icon?: string;
  }>;
  placeholder?: string;
  required: boolean;
  fieldName: string;
  dynamicQuestion?: boolean; // Uses first name in question
}

export interface SiteConfig {
  name: string;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  secondaryTextColor: string;
  buttonTextColor: string;
  cardBackgroundColor: string;
  borderColor: string;
  hoverColor: string;
  selectedColor: string;
  errorColor: string;
  questions: FormQuestion[];
  redirectUrl: string;
}

// IVA Online (Dark Theme)
export const config: SiteConfig = {
  name: 'IVA Online',
  primaryColor: '#F1ECE2',
  backgroundColor: '#262626',
  textColor: '#F1ECE2',
  secondaryTextColor: '#A8A29E',
  buttonTextColor: '#262626',
  cardBackgroundColor: '#363636',
  borderColor: '#404040',
  hoverColor: '#404040',
  selectedColor: '#4A4A4A',
  errorColor: '#F87171',
  redirectUrl: 'https://www.ivaonline.co.uk/results.html',
  questions: [
    {
      id: 'debt_amount',
      type: 'multiple-choice',
      question: 'What is the total sum of your debt?',
      description: 'Add all of your debts together to get the total amount.',
      options: [
        { key: 'A', label: 'Under £5000' },
        { key: 'B', label: '£5001-£19,999' },
        { key: 'C', label: '£20,000 or more' },
      ],
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
      required: true,
      fieldName: 'debt_level',
    },
    {
      id: 'employment',
      type: 'picture-choice',
      question: 'What is your employment status?',
      options: [
        { key: 'A', label: 'Employed', icon: '💼' },
        { key: 'B', label: 'Self-Employed', icon: '🏠' },
        { key: 'C', label: 'Retired', icon: '🏖️' },
        { key: 'D', label: 'Unemployed', icon: '🔍' },
      ],
      required: true,
      fieldName: 'employment_status',
    },
    {
      id: 'firstname',
      type: 'text',
      question: 'What is your first name?',
      placeholder: 'First name',
      required: true,
      fieldName: 'firstname',
    },
    {
      id: 'lastname',
      type: 'text',
      question: ', what is your last name?',
      dynamicQuestion: true,
      placeholder: 'Last name',
      required: true,
      fieldName: 'lastname',
    },
    {
      id: 'email',
      type: 'email',
      question: 'What is your email address?',
      description: 'We need this to email you details about possible solutions.',
      placeholder: 'name@example.com',
      required: true,
      fieldName: 'email',
    },
    {
      id: 'phone',
      type: 'phone',
      question: ', what is your phone number?',
      dynamicQuestion: true,
      description: 'We won\'t share your phone number with any other companies.',
      placeholder: '07700 900000',
      required: true,
      fieldName: 'phone_mobile',
    },
    {
      id: 'consent',
      type: 'legal',
      question: 'Please read carefully',
      description: 'By completing this form you are agreeing with our Privacy Policy. Your information will be used to provide you with debt advice services.',
      required: true,
      fieldName: 'consent',
    },
  ],
};
