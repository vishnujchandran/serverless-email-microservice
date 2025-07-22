import type { VercelRequest, VercelResponse } from "@vercel/node";
import dotenv from "dotenv";
import { EmailProviderFactory } from "../src/providers";
import { EmailMessage } from "../src/types";

dotenv.config();

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { to, from, subject, text, html, data } = req.body;

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({
      error:
        "Missing required email parameters: to, subject, and either text or html",
    });
  }

  const emailProviderName = process.env.EMAIL_PROVIDER || "resend";

  try {
    const emailProvider = EmailProviderFactory.getProvider(emailProviderName);

    const message: EmailMessage = { to, from, subject, text, html, data };
    const result = await emailProvider.send(message);

    if (result.ok) {
      return res.status(200).json({ message: "Email sent successfully" });
    } else {
      return res
        .status(500)
        .json({ error: result.error || "Internal Server Error" });
    }
  } catch (error: any) {
    console.error("Error in serverless function:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
}
