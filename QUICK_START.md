# Contact Form - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Set Up Resend (5 minutes)

1. Go to https://resend.com and create a free account
2. Get your API key from the dashboard
3. For testing, you can use their test domain `onboarding@resend.dev`

### Step 2: Set Up Google Sheets (15 minutes)

1. **Create Google Cloud Project:**
   - https://console.cloud.google.com
   - Create new project
   - Enable Google Sheets API

2. **Create Service Account:**
   - Go to "APIs & Services" → "Credentials"
   - Create Service Account
   - Download JSON key file

3. **Create Spreadsheet:**
   - https://sheets.google.com
   - Create new sheet
   - Add headers: `Timestamp | Name | Email | Message | Status`
   - Share with service account email (from JSON file)
   - Copy spreadsheet ID from URL

### Step 3: Configure Environment Variables (3 minutes)

Create `.env.local` file:

```bash
# Copy the template
cp .env.example .env.local

# Edit and fill in these values:
RESEND_API_KEY=re_your_key_here
ADMIN_EMAIL=samiragele010@gmail.com
FROM_EMAIL=onboarding@resend.dev

GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nKey\nHere\n-----END PRIVATE KEY-----\n"
```

**Important:** Copy `client_email` and `private_key` from the JSON file you downloaded.

---

## ✅ Test It

```bash
# Start dev server
npm run dev

# Open browser
open http://localhost:3000

# Fill and submit the contact form
# Check:
# 1. Success toast appears
# 2. Form resets
# 3. Email arrives at samiragele010@gmail.com
# 4. Confirmation email arrives at your test email
# 5. New row appears in Google Sheets
```

---

## 🎯 What Works Now

✅ **Email Notifications**
- Admin gets notified at samiragele010@gmail.com
- Clients get confirmation emails

✅ **Data Storage**
- All submissions saved to Google Sheets
- Includes timestamp, name, email, message, status

✅ **Validation**
- Real-time form validation
- Helpful error messages
- Server-side verification

✅ **User Feedback**
- Toast notifications for success/errors
- Loading states
- Form auto-resets

✅ **Spam Protection**
- Rate limiting (5 per 15 minutes)
- Input validation
- Server-side checks

---

## 📚 Need More Details?

- **Full Setup Guide:** See `CONTACT_FORM_SETUP.md`
- **Testing Guide:** See `TESTING_CHECKLIST.md`
- **Implementation Details:** See `IMPLEMENTATION_SUMMARY.md`

---

## 🆘 Troubleshooting

**Form not submitting?**
- Check browser console for errors
- Verify `.env.local` exists with all variables
- Restart dev server after changing env vars

**Emails not sending?**
- Check RESEND_API_KEY is correct
- Verify FROM_EMAIL is valid
- Check Resend dashboard for errors

**Google Sheets not updating?**
- Verify service account has Editor access to sheet
- Check GOOGLE_SHEETS_SPREADSHEET_ID matches your sheet
- Ensure GOOGLE_SHEETS_PRIVATE_KEY has correct format with `\n`

---

## 🚀 Deploy to Production

1. Deploy to Vercel:
   ```bash
   vercel
   ```

2. Add environment variables in Vercel dashboard

3. Verify your domain in Resend (replace test domain)

4. Test on production URL

Done! 🎉

---

## 📞 Need Help?

Check the detailed guides:
- `CONTACT_FORM_SETUP.md` - Step-by-step setup
- `TESTING_CHECKLIST.md` - Comprehensive testing
- `IMPLEMENTATION_SUMMARY.md` - Technical details
