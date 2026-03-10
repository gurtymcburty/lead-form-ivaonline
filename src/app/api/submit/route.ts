import { NextRequest, NextResponse } from 'next/server';

// Rate limiting map: IP -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // 10 submissions per minute
const RATE_WINDOW = 60 * 1000; // 1 minute in ms

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  return 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (record.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT - record.count };
}

function sanitizeInput(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 500);
}

function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d+\s\-()]/g, '').slice(0, 20);
}

function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase().slice(0, 254);
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const { allowed, remaining } = checkRateLimit(clientIP);

    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'Retry-After': '60',
          }
        }
      );
    }

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['firstname', 'email', 'phone_mobile'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Sanitize all inputs
    const sanitizedData = {
      firstname: sanitizeInput(body.firstname),
      lastname: sanitizeInput(body.lastname || ''),
      email: sanitizeEmail(body.email),
      phone_mobile: sanitizePhone(body.phone_mobile),
      total_debts: sanitizeInput(body.total_debts || ''),
      debt_level: sanitizeInput(body.debt_level || ''),
      employment_status: sanitizeInput(body.employment_status || ''),
      lead_generator: 'ivaonline', // Hardcoded
    };

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedData.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate phone (basic check for UK numbers)
    const cleanPhone = sanitizedData.phone_mobile.replace(/[\s\-\(\)]/g, '');
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Build form data for Hubsolv API
    const hubsolvData = new URLSearchParams({
      firstname: sanitizedData.firstname,
      lastname: sanitizedData.lastname,
      email: sanitizedData.email,
      phone_mobile: sanitizedData.phone_mobile,
      total_debts: sanitizedData.total_debts,
      debt_level: sanitizedData.debt_level,
      employment_status: sanitizedData.employment_status,
      lead_generator: sanitizedData.lead_generator,
    });

    // Hubsolv API credentials from environment
    const hubsolvUsername = process.env.HUBSOLV_USERNAME;
    const hubsolvPassword = process.env.HUBSOLV_PASSWORD;
    const hubsolvEndpoint = process.env.HUBSOLV_ENDPOINT || 'https://synigise.hubsolv.com/api/client/format/json';

    if (!hubsolvUsername || !hubsolvPassword) {
      console.error('Hubsolv credentials not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Make request to Hubsolv
    const hubsolvResponse = await fetch(hubsolvEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${hubsolvUsername}:${hubsolvPassword}`).toString('base64'),
      },
      body: hubsolvData.toString(),
    });

    const hubsolvResult = await hubsolvResponse.json();

    if (!hubsolvResponse.ok) {
      console.error('Hubsolv API error:', hubsolvResult);
      return NextResponse.json(
        { error: 'Failed to submit form. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Form submitted successfully',
        id: hubsolvResult.id || null,
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': remaining.toString(),
        }
      }
    );

  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
