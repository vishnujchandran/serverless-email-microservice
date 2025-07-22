import { Resend } from "resend";
import { EmailProvider, EmailMessage } from "../types";

export class ResendEmailProvider implements EmailProvider {
  private resend: Resend;

  constructor(apiKey: string) {
    this.resend = new Resend(apiKey);
  }

  async send(message: EmailMessage): Promise<{ ok: boolean; error?: string }> {
    const { to, from, subject, text, html, data } = message;

    try {
      const { data: resendData, error } = await this.resend.emails.send({
        from: from || "onboarding@resend.dev",
        to: to || "vixhnuchandran@gmail.com",
        subject: subject || "Hello World",
        html:
          html ||
          text ||
          "<p>Congrats on sending your <strong>first email</strong>!</p>",
        react: undefined,
      });

      if (error) {
        console.error("Error sending email with Resend:", error);
        return { ok: false, error: error.message };
      }

      console.log("Resend email sent successfully:", resendData);
      return { ok: true };
    } catch (error: any) {
      console.error("Error sending email with Resend:", error);
      return {
        ok: false,
        error: error.message || "Failed to send email with Resend",
      };
    }
  }
}
