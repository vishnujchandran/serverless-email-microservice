import sgMail from "@sendgrid/mail";
import { EmailProvider, EmailMessage } from "../types";

export class SendGridEmailProvider implements EmailProvider {
  constructor(apiKey: string) {
    sgMail.setApiKey(apiKey);
  }

  async send(message: EmailMessage): Promise<{ ok: boolean; error?: string }> {
    const { to, from, subject, text, html, data } = message;

    const msg = {
      to,
      from: from || "noreply@example.com",
      subject,
      templateId: "d-b370e04b1ffe46c2950d3c004d1e8794",
      dynamic_template_data: data || {},
      html: html || text,
    };

    try {
      const response = await sgMail.send(msg);
      if (response[0].statusCode === 202) {
        return { ok: true };
      } else {
        return {
          ok: false,
          error: `SendGrid API returned status code ${response[0].statusCode}`,
        };
      }
    } catch (error: any) {
      console.error(
        "Error sending email with SendGrid:",
        error.response?.body || error
      );
      return {
        ok: false,
        error: error.message || "Failed to send email with SendGrid",
      };
    }
  }
}
