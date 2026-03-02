# Contact Form Backend Setup Guide

This guide will walk you through setting up the contact form backend with email notifications and Google Sheets integration.

## Prerequisites

- Node.js 18+ installed
- A domain for sending emails (or use Resend's test domain initially)
- A Google account for Google Sheets

## Setup Steps

### 1. Install Dependencies

Already done! The required packages are installed:
- `resend` - Email service
- `zod` - Validation
- `sonner` - Toast notifications
- `googleapis` - Google Sheets integration
- `@react-email/components` - Email templates

### 2. Configure Resend (Email Service)

1. **Create a Resend account:**
   - Go to https://resend.com
   - Sign up for a free account (3,000 emails/month free)

2. **Get your API key:**
   - Go to API Keys in the Resend dashboard
   - Create a new API key
   - Copy the key (starts with `re_`)

3. **Verify your domain (for production):**
   - Go to Domains in the Resend dashboard
   - Add your domain
   - Add the DNS records to your domain provider
   - Wait for verification (usually 1-24 hours)
   - **For testing:** You can use Resend's test domain `onboarding@resend.dev`

### 3. Configure Google Sheets

1. **Create a Google Cloud Project:**
   - Go to https://console.cloud.google.com
   - Create a new project (e.g., "SU Contact Form")
   - Enable the Google Sheets API:
     - Navigate to "APIs & Services" → "Enable APIs and Services"
     - Search for "Google Sheets API"
     - Click "Enable"

2. **Create a Service Account:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Name it (e.g., "contact-form-service")
   - Click "Create and Continue"
   - Skip optional steps, click "Done"

3. **Generate Service Account Key:**
   - Click on the created service account
   - Go to "Keys" tab
   - Click "Add Key" → "Create New Key"
   - Choose JSON format
   - Download the JSON file (keep it secure!)

4. **Create your Google Sheet:**
   - Go to https://sheets.google.com
   - Create a new spreadsheet
   - Name it "Contact Form Submissions"
   - Add headers in row 1: `Timestamp | Name | Email | Message | Status`
   - Copy the Spreadsheet ID from the URL:
     - URL format: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`

5. **Share the sheet with the service account:**
   - In your Google Sheet, click "Share"
   - Add the service account email (found in the JSON file as `client_email`)
   - Give it "Editor" permissions
   - Click "Share"

### 4. Set Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Email Service (Resend)
RESEND_API_KEY=re_your_api_key_here
ADMIN_EMAIL=samiragele010@gmail.com
FROM_EMAIL=noreply@yourdomain.com

# For testing, you can use:
# FROM_EMAIL=onboarding@resend.dev

# Google Sheets
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project-name.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"

# Security (optional - defaults shown)
RATE_LIMIT_MAX_REQUESTS=5
RATE_LIMIT_WINDOW_MS=900000
```

**Important Notes:**
- The `GOOGLE_SHEETS_PRIVATE_KEY` must be enclosed in double quotes
- Keep the `\n` characters in the private key
- Never commit `.env.local` to version control (already in .gitignore)

### 5. Extract Google Service Account Credentials

From the downloaded JSON file, extract:
- `client_email` → Copy to `GOOGLE_SHEETS_CLIENT_EMAIL`
- `private_key` → Copy to `GOOGLE_SHEETS_PRIVATE_KEY` (keep the quotes and \n characters)

Example JSON structure:
```json
{
  "type": "service_account",
  "project_id": "your-project",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "contact-form@your-project.iam.gserviceaccount.com",
  ...
}
```

### 6. Test Locally

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the contact section:**
   - Go to http://localhost:3000
   - Scroll to the contact form

3. **Submit a test message:**
   - Fill in the form with valid data
   - Click "Send Message"
   - You should see:
     - A loading state ("Sending...")
     - A success toast notification
     - Form resets automatically
     - Admin email received at samiragele010@gmail.com
     - Client confirmation email received
     - New row in Google Sheets

4. **Test validation:**
   - Try submitting with invalid email
   - Try submitting with too short name (< 2 chars)
   - Try submitting with too short message (< 10 chars)
   - You should see inline error messages

5. **Test rate limiting:**
   - Submit 6 messages quickly
   - The 6th should show a rate limit error

### 7. Deploy to Production

1. **Deploy to Vercel (recommended):**
   ```bash
   vercel
   ```

2. **Set environment variables in Vercel:**
   - Go to your project settings in Vercel dashboard
   - Navigate to "Environment Variables"
   - Add all the variables from `.env.local`
   - Deploy again for changes to take effect

3. **Verify domain in Resend:**
   - Make sure to verify your actual domain
   - Update `FROM_EMAIL` to use your verified domain

## Troubleshooting

### Emails not sending
- Check RESEND_API_KEY is correct
- Verify FROM_EMAIL domain is verified in Resend
- Check Resend dashboard for error logs

### Google Sheets not updating
- Verify service account has Editor access to the sheet
- Check GOOGLE_SHEETS_SPREADSHEET_ID is correct
- Ensure GOOGLE_SHEETS_PRIVATE_KEY has correct format with \n characters
- Check Google Cloud Console API is enabled

### Rate limit issues
- Adjust RATE_LIMIT_MAX_REQUESTS and RATE_LIMIT_WINDOW_MS
- For development, increase MAX_REQUESTS temporarily
- Note: Rate limiting is IP-based (resets on server restart in dev)

### Form validation not working
- Check browser console for errors
- Verify zod schema in `/src/lib/validations/contact.ts`
- Check react-hook-form errors in component

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts              # API endpoint
│   └── layout.tsx                    # Toaster added
├── components/
│   └── Contact.tsx                   # Form with validation
├── lib/
│   ├── validations/
│   │   └── contact.ts                # Zod schema
│   ├── email/
│   │   ├── resend.ts                 # Resend client
│   │   ├── templates/
│   │   │   ├── admin-notification.tsx
│   │   │   └── client-confirmation.tsx
│   │   └── index.ts                  # Email functions
│   ├── google-sheets/
│   │   ├── client.ts                 # Sheets client
│   │   └── index.ts                  # Sheets functions
│   └── rate-limit.ts                 # Rate limiter
└── types/
    └── contact.ts                    # TypeScript types
```

## Security Features

- ✅ Rate limiting (5 requests per 15 minutes per IP)
- ✅ Input validation (client + server with Zod)
- ✅ Environment variables (never exposed to client)
- ✅ XSS protection (React auto-escaping)
- ✅ Type safety (TypeScript throughout)

## Next Steps

1. ✅ Set up environment variables
2. ✅ Test locally
3. ✅ Verify emails are being sent
4. ✅ Check Google Sheets integration
5. ✅ Deploy to production
6. ✅ Test on production
7. ✅ Monitor Resend dashboard for delivery issues

## Support

If you encounter issues:
- Check the console for error messages
- Verify all environment variables are set correctly
- Check Resend dashboard for email delivery status
- Check Google Cloud Console for API errors
- Review the implementation plan in the repository
