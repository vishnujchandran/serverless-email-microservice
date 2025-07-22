export interface EmailMessage {
  to: string;
  from?: string;
  subject: string;
  text?: string;
  html?: string;
  data?: { [key: string]: any };
}

export interface EmailProvider {
  send(message: EmailMessage): Promise<{ ok: boolean; error?: string }>;
}
