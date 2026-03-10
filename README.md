# IVA Online Lead Capture Form

A Next.js 14 lead capture form for ivaonline.co.uk that submits to Hubsolv.

## Features

- Dark theme (cream on charcoal)
- Typeform-style animated form experience
- Hubsolv API integration
- Rate limiting (10 submissions/minute per IP)
- Honeypot bot protection
- Input sanitization
- UK phone validation
- Fully responsive design

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and update with your Hubsolv credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
HUBSOLV_USERNAME=your_actual_username
HUBSOLV_PASSWORD=your_actual_password
HUBSOLV_ENDPOINT=https://synigise.hubsolv.com/api/client/format/json
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
npm run build
```

## Deployment (Vercel)

### Option A: Vercel Dashboard

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in project settings:
   - `HUBSOLV_USERNAME`
   - `HUBSOLV_PASSWORD`
   - `HUBSOLV_ENDPOINT`
4. Deploy

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel
```

## Embedding in Hugo Site

Add an iframe to your Hugo template:

```html
<iframe
  src="https://lead-form-ivaonline.vercel.app/"
  width="100%"
  height="700"
  frameborder="0"
  style="border: none; border-radius: 8px;"
></iframe>
```

## API Endpoint

### POST /api/submit

Submits form data to Hubsolv with `lead_generator: "ivaonline"` hardcoded.

**Request body:**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "phone_mobile": "07700900000",
  "total_debts": "£5001-£19,999",
  "debt_level": "3 or more",
  "employment_status": "Employed"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Form submitted successfully",
  "id": "12345"
}
```

## Security

- **Rate limiting**: 10 submissions per IP per minute
- **Honeypot**: Hidden field that bots fill in (silently rejects)
- **Input sanitization**: All inputs cleaned before API submission
- **Email validation**: RFC-compliant email format check
- **Phone validation**: UK phone number format check

## Project Structure

```
lead-form/
├── src/
│   ├── app/
│   │   ├── api/submit/route.ts    # Hubsolv submission endpoint
│   │   ├── layout.tsx
│   │   └── page.tsx               # Main form page
│   ├── components/
│   │   ├── EmailInput.tsx
│   │   ├── FormProgress.tsx
│   │   ├── LegalConsent.tsx
│   │   ├── MultipleChoice.tsx
│   │   ├── PhoneInput.tsx
│   │   ├── PictureChoice.tsx
│   │   └── TextInput.tsx
│   └── lib/
│       └── form-config.ts         # Form configuration
├── .env.example
├── .env.local                      # Your credentials (git-ignored)
└── README.md
```

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Vercel (deployment)
