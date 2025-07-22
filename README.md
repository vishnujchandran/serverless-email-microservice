# Serverless Email Microservice

A versatile and extensible serverless email sending microservice built with TypeScript, Node.js, and Vercel. This service supports multiple email providers (currently Resend and SendGrid) and can be easily integrated into any project requiring email functionalities.

## Features

*   **Provider Agnostic**: Easily switch between email providers (Resend, SendGrid) with a simple configuration.
*   **Serverless Deployment**: Optimized for deployment on Vercel as a serverless function.
*   **TypeScript**: Strongly typed codebase for better maintainability and scalability.
*   **Modular Design**: Clear separation of concerns with dedicated provider modules.
*   **Environment Variable Support**: Securely manage API keys and configurations.
*   **Local Development Server**: Includes a local Express server for easy testing during development.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (LTS recommended)
*   npm or pnpm (pnpm is used in this project's lock file)
*   Vercel CLI (`npm install -g vercel`)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/vishnujchandran/serverless-email-microservice.git
    cd serverless-email-microservice
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    # or npm install
    ```

### Environment Variables

Create a `.env` file in the root of your project based on `.env.example`.

```
# .env.example
RESEND_API_KEY=your_resend_api_key_here
SENDGRID_API_KEY=your_sendgrid_api_key_here
# EMAIL_PROVIDER=resend # Optional: Set 'resend' or 'sendgrid' to override default
```

**Important**: Never commit your actual `.env` file to version control. The `.gitignore` is configured to ignore it.

## Usage

### Local Development

To run the local development server:

```bash
npm start
# or node server.ts
```

The server will run on `http://localhost:3000`. The API endpoint will be `http://localhost:3000/api`.

### Sending Test Emails (CLI)

You can send test emails directly from the command line using `send-test-email.ts`.

*   **Using Resend (default):**
    ```bash
    npx ts-node send-test-email.ts resend
    ```
*   **Using SendGrid (currently disabled in code):**
    ```bash
    npx ts-node send-test-email.ts sendgrid
    ```
    *Note: SendGrid is currently commented out in `src/providers/index.ts`. Uncomment it and ensure `SENDGRID_API_KEY` is set in your `.env` for it to work.*

### Sending Emails via API Endpoint

Send a `POST` request to the `/api` endpoint with your email message in the JSON body.

**Request Body Example:**

```json
{
  "to": "recipient@example.com",
  "from": "sender@example.com",
  "subject": "Hello from Serverless Email API",
  "text": "This is a test email sent from the serverless email microservice.",
  "html": "<strong>This is a test email sent from the serverless email microservice.</strong>",
  "data": {
    "name": "John Doe"
  }
}
```

**Example using `curl` (Local):**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "to": "username@email.com",
  "from": "noreply@example.com",
  "subject": "Test Email from Serverless API (Resend Default)",
  "text": "This is a test email sent from the serverless email microservice using Resend as the default provider."
}' http://localhost:3000/api
```

## Deployment to Vercel

This project is designed for seamless deployment on Vercel.

1.  **Push to GitHub**: Ensure your project is pushed to a GitHub repository (e.g., `serverless-email-microservice`).
2.  **Vercel CLI Deployment**:
    ```bash
    vercel login
    vercel
    ```
    Follow the prompts to link your project to Vercel.
3.  **Configure Environment Variables**:
    In your Vercel project settings (Dashboard > Your Project > Settings > Environment Variables), add your `RESEND_API_KEY` and any other necessary keys.

Vercel will automatically detect the `api/index.ts` file and deploy it as a serverless function. Subsequent pushes to your connected Git branch will trigger automatic deployments.

## Project Structure

```
.
├── api/
│   └── index.ts            # Vercel Serverless Function entry point
├── src/
│   ├── providers/
│   │   ├── index.ts        # Email Provider Factory
│   │   ├── ResendEmailProvider.ts
│   │   └── SendGridEmailProvider.ts
│   └── types.ts            # TypeScript interfaces for email messages and providers
├── .env.example            # Example environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies and scripts
├── pnpm-lock.yaml          # pnpm lock file
├── README.md               # Project README
├── send-test-email.ts      # CLI script for sending test emails
├── server.ts               # Local development server for Vercel function
└── tsconfig.json           # TypeScript configuration
```

## Contributing

Feel free to fork this repository, open issues, or submit pull requests.

## License

[MIT License](LICENSE) - *You might want to create a LICENSE file if you don't have one.*