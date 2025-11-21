interface EmailRequest {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  response?: string;
  error?: string;
  details?: string;
}

export async function sendEmail(emailData: EmailRequest): Promise<EmailResponse> {
  try {
    const response = await fetch(`/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
