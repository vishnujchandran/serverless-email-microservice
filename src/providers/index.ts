import { EmailProvider } from "../types";
import { SendGridEmailProvider } from "./SendGridEmailProvider";
import { ResendEmailProvider } from "./ResendEmailProvider";

export class EmailProviderFactory {
  public static getProvider(providerArg?: string): EmailProvider {
    let providerName = providerArg || process.env.EMAIL_PROVIDER;

    if (!providerName) {
      console.warn(
        "EMAIL_PROVIDER environment variable is not set. Defaulting to Resend."
      );
      providerName = "resend";
    }

    switch (providerName.toLowerCase()) {
      // Temporarily disabled SendGrid
      // case "sendgrid":
      //   const sendgridApiKey = process.env.SENDGRID_API_KEY;
      //   if (!sendgridApiKey) {
      //     throw new Error("SENDGRID_API_KEY environment variable is not set.");
      //   }
      //   return new SendGridEmailProvider(sendgridApiKey);
      case "resend":
        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
          throw new Error("RESEND_API_KEY environment variable is not set.");
        }
        return new ResendEmailProvider(resendApiKey);
      default:
        throw new Error(`Unsupported email provider: ${providerName}`);
    }
  }
}
