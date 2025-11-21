import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { createTransport } from 'nodemailer';

// Load environment variables
dotenv.config();

const app = express();

// Helper function to strip quotes from environment variables
function stripQuotes(value: string | undefined): string | undefined {
  if (!value) return value;
  return value.replace(/^['"](.*)['"]$/, '$1');
}

const { EMAIL_USER, EMAIL_PASS } = (() => {
  // Get email credentials and strip quotes
  const user = stripQuotes(process.env.EMAIL_USER);
  const pass = stripQuotes(process.env.EMAIL_PASS);

  // Validate required environment variables
  if (!user || !pass) {
    console.error('Error: EMAIL_USER and EMAIL_PASS environment variables are required');
    process.exit(1);
  } else {
    return { EMAIL_USER: user, EMAIL_PASS: pass };
  }
})();

// Middleware
app.use(express.json());

// Email transporter configuration
function createEmailTransporter() {
  return createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });
}

// Email sending endpoint
app.post('/api/send-email', async (req: Request, res: Response) => {
  const { from, to, subject, text, html } = req.body;

  // Validate request body
  if (!from || !to || !subject || (!text && !html)) {
    res.status(400).json({
      error: 'Missing required fields: from, to, subject, and either text or html'
    });
  }

  try {
    const transporter = createEmailTransporter();
    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(8081, () => {
  console.log(`Email server running on http://localhost:8081`);
});
