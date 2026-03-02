# Contact Form Testing Checklist

## Pre-Testing Setup

Before you can test, you MUST set up environment variables in `.env.local`:

```bash
# Copy .env.example to .env.local
cp .env.example .env.local
```

Then fill in the required values (see CONTACT_FORM_SETUP.md for detailed instructions).

---

## Quick Test Setup (For Development)

If you just want to test the form quickly without full setup:

1. **Resend (Email):**
   - Sign up at https://resend.com
   - Get API key
   - Use test domain: `FROM_EMAIL=onboarding@resend.dev`

2. **Google Sheets:**
   - Follow steps in CONTACT_FORM_SETUP.md
   - This is required - no shortcut available

3. **Start dev server:**
   ```bash
   npm run dev
   ```

---

## Testing Checklist

### ✅ Basic Form Functionality

- [ ] Navigate to http://localhost:3000 and scroll to contact form
- [ ] Form displays correctly with all fields
- [ ] Submit button shows "Send Message" text
- [ ] All animations work (framer-motion)

### ✅ Validation Testing

**Test 1: Empty Submission**
- [ ] Try submitting empty form
- [ ] See inline error messages for all fields

**Test 2: Invalid Email**
- [ ] Enter name: "Test"
- [ ] Enter email: "notanemail"
- [ ] Enter message: "Test message here"
- [ ] See error: "Please enter a valid email address"

**Test 3: Name Too Short**
- [ ] Enter name: "A" (1 character)
- [ ] See error: "Name must be at least 2 characters"

**Test 4: Message Too Short**
- [ ] Enter message: "Hi" (2 characters)
- [ ] See error: "Message must be at least 10 characters"

**Test 5: Name Too Long**
- [ ] Enter name with 101+ characters
- [ ] See error: "Name must be less than 100 characters"

**Test 6: Message Too Long**
- [ ] Enter message with 2001+ characters
- [ ] See error: "Message must be less than 2000 characters"

### ✅ Successful Submission

**Test 7: Valid Submission**
- [ ] Enter name: "John Doe"
- [ ] Enter email: "your-test-email@gmail.com" (use your real email to test confirmation)
- [ ] Enter message: "This is a test message for the contact form."
- [ ] Click "Send Message"
- [ ] See button text change to "Sending..."
- [ ] Button should be disabled during submission
- [ ] See success toast notification: "Message sent! We'll be in touch soon."
- [ ] Form resets to empty state
- [ ] Check admin email (samiragele010@gmail.com) - should receive notification
- [ ] Check your test email - should receive confirmation email
- [ ] Check Google Sheets - should have new row with submission data

### ✅ Email Verification

**Admin Email (samiragele010@gmail.com):**
- [ ] Email received
- [ ] Subject: "New Contact Form Submission from John Doe"
- [ ] Contains name, email, and message
- [ ] Purple theme styling
- [ ] Not in spam folder

**Client Confirmation Email:**
- [ ] Email received at submitted address
- [ ] Subject: "Thank you for contacting us"
- [ ] Professional formatting
- [ ] Purple theme styling
- [ ] Not in spam folder

### ✅ Google Sheets Integration

- [ ] Open your Google Sheet
- [ ] New row added with:
  - Timestamp (ISO format)
  - Name
  - Email
  - Message
  - Status: "New"

### ✅ Rate Limiting

**Test 8: Rate Limit**
- [ ] Submit 5 valid forms quickly (within 1 minute)
- [ ] All 5 should succeed
- [ ] Submit 6th form
- [ ] See error toast: "Too many requests. Please try again after [time]."
- [ ] Wait 15 minutes (or restart dev server to reset)
- [ ] Submit again - should work

### ✅ Error Handling

**Test 9: Network Error Simulation**
- [ ] Stop the dev server (`Ctrl+C`)
- [ ] Try submitting the form
- [ ] See error toast with fallback email address

**Test 10: Invalid API Response**
- [ ] Submit form with invalid environment variables
- [ ] See user-friendly error message
- [ ] Error toast includes fallback contact email

### ✅ UI/UX Testing

- [ ] Test on mobile viewport (responsive design)
- [ ] Test keyboard navigation (Tab through all fields)
- [ ] Test focus states on inputs
- [ ] Test hover states on submit button
- [ ] Toast notifications appear in bottom-right corner
- [ ] Toast notifications auto-dismiss after a few seconds
- [ ] Form validation errors are clear and helpful
- [ ] Loading state is visible during submission

### ✅ Accessibility

- [ ] All inputs have associated labels
- [ ] Error messages are announced (aria-invalid)
- [ ] Form is keyboard navigable
- [ ] Focus indicators are visible
- [ ] Color contrast is sufficient

---

## Production Testing (After Deployment)

### ✅ Vercel Deployment

- [ ] Set all environment variables in Vercel dashboard
- [ ] Deploy to production
- [ ] Test on production URL
- [ ] Verify emails use production domain (not onboarding@resend.dev)
- [ ] Test from different browsers (Chrome, Safari, Firefox)
- [ ] Test from different devices (Desktop, Mobile, Tablet)

### ✅ Email Deliverability

- [ ] Admin emails not going to spam
- [ ] Client confirmation emails not going to spam
- [ ] Emails render correctly in:
  - [ ] Gmail
  - [ ] Outlook
  - [ ] Apple Mail
  - [ ] Mobile email clients

---

## Troubleshooting Common Issues

### Issue: "RESEND_API_KEY is not defined"
**Solution:** Make sure `.env.local` exists and has valid RESEND_API_KEY

### Issue: "Failed to send admin notification"
**Solution:**
- Check RESEND_API_KEY is correct
- Verify FROM_EMAIL domain is verified in Resend
- Check Resend dashboard for error details

### Issue: "Failed to add contact submission to Google Sheets"
**Solution:**
- Verify GOOGLE_SHEETS_SPREADSHEET_ID is correct
- Check service account has Editor access to the sheet
- Verify GOOGLE_SHEETS_PRIVATE_KEY has correct format (with \n)
- Check Google Sheets API is enabled in Google Cloud Console

### Issue: Validation not working
**Solution:**
- Check browser console for errors
- Verify react-hook-form and zod are installed
- Clear browser cache and restart dev server

### Issue: Toast notifications not appearing
**Solution:**
- Verify Toaster component is added to layout.tsx
- Check sonner is installed correctly
- Clear browser cache

---

## Success Criteria

All tests should pass before deploying to production:

- ✅ Form validation works correctly
- ✅ Successful submissions send both emails
- ✅ Data is stored in Google Sheets
- ✅ Toast notifications work properly
- ✅ Rate limiting prevents spam
- ✅ Error handling provides helpful messages
- ✅ Form is accessible and responsive
- ✅ Emails are delivered and not marked as spam

---

## Next Steps After Testing

1. Monitor Resend dashboard for email delivery stats
2. Check Google Sheets regularly for new submissions
3. Set up notifications for new sheet rows (optional - use Google Sheets notifications)
4. Consider adding honeypot field for additional spam protection
5. Monitor rate limiting effectiveness
6. Collect user feedback on form experience
