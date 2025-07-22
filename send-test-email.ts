import { EmailProviderFactory } from "./src/providers";
import * as dotenv from "dotenv";

dotenv.config();

async function sendTestEmail() {
  const args = process.argv.slice(2);
  const selectedProvider = args[0];

  if (!selectedProvider) {
    console.error(
      "Please specify an email provider as a command line argument (e.g., 'node send-test-email.ts sendgrid' or 'node send-test-email.ts resend')."
    );
    return;
  }

  let provider;
  try {
    provider = EmailProviderFactory.getProvider(selectedProvider);
  } catch (error: any) {
    console.error("Error initializing email provider:", error.message);
    return;
  }

  const providerName = selectedProvider;

  const message = {
    to: "reciever@email.com",
    from: "noreply@example.com",
    subject: `Test Email from Serverless API (${providerName})`,
    text: `This is a test email sent from the serverless email service using ${providerName}.`,
    html: `<strong>This is a test email sent from the serverless email service using ${providerName}.</strong>`,
    data: {
      name: "Test User",
    },
  };

  console.log(
    `Attempting to send test email using ${providerName} provider...`
  );
  const result = await provider.send(message);

  if (result.ok) {
    console.log("Test email sent successfully!");
  } else {
    console.error("Failed to send test email:", result.error);
  }
}

sendTestEmail();
