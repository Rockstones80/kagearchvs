# Paystack Integration Setup Guide

## 1. Get Your Paystack API Keys

1. Go to [Paystack Dashboard](https://dashboard.paystack.com)
2. Sign up or log in to your account
3. Navigate to **Settings** → **API Keys & Webhooks**
4. Copy **both keys**:
   - **Public Key** (starts with `pk_test_` for test mode or `pk_live_` for live mode)
   - **Secret Key** (starts with `sk_test_` for test mode or `sk_live_` for live mode)

## 2. Add Your Keys to Environment Variables

Open your `.env.local` file and ensure both keys are present:

```env
# Public Key (exposed to client-side)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_actual_key_here

# Secret Key (server-side only - NEVER expose in client code)
PAYSTACK_SECRET_KEY=sk_test_your_actual_secret_key_here
```

**Important:**

- For testing, use the **Test Keys** (pk*test*... and sk*test*...)
- For production, use the **Live Keys** (pk*live*... and sk*live*...)
- Never commit your API keys to version control
- The secret key is used for server-side payment verification

## 3. Test the Integration

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Add items to your cart
3. Go to checkout and fill in the form
4. Use Paystack test cards:
   - **Success:** 4084084084084081 (any CVV, any future date)
   - **Insufficient Funds:** 5060666666666666666
   - See more test cards: https://paystack.com/docs/payments/test-payments

## 4. Currency Configuration

The integration is currently set up for **Nigerian Naira (₦)**. Paystack multiplies amounts by 100 (kobo), so ₦1,000.00 = 100,000 kobo.

## 5. How Payment Verification Works

For security, we verify every payment server-side:

1. **User completes payment** → Paystack processes it
2. **Paystack redirects back** → with payment reference
3. **Our API verifies** → Calls Paystack API with secret key
4. **Cart clears only if verified** → Prevents fraud

This ensures no one can fake a successful payment!

## 6. Going Live

When ready for production:

1. Switch to your **Live Keys** in `.env.local` (both public and secret)
2. Complete Paystack's business verification
3. Test thoroughly before launching
4. Consider setting up webhooks for additional payment notifications (optional)

## Features Included

✅ Secure payment processing via Paystack  
✅ Support for cards, bank transfers, and mobile money  
✅ **Server-side payment verification** (using secret key)  
✅ Automatic cart clearing only after verification  
✅ Payment reference tracking  
✅ Customer metadata collection  
✅ Mobile-responsive checkout form  
✅ Protection against payment fraud

## Troubleshooting

**Payment not opening?**

- Check that your API key is correctly set in `.env.local`
- Ensure the key starts with `pk_test_` or `pk_live_`
- Restart your development server after updating `.env.local`

**Payment successful but cart not clearing?**

- Check browser console for errors
- Verify the payment verification API is working: open DevTools → Network tab
- Check if `/api/verify-payment` endpoint returns success
- Ensure your secret key is correctly set in `.env.local`

**"Payment verification failed" error?**

- Verify your secret key is correct in `.env.local`
- Ensure you're using the matching test/live keys (don't mix test public with live secret)
- Check that the payment reference is valid

**Need help?**

- [Paystack Documentation](https://paystack.com/docs)
- [Paystack Support](https://paystack.com/contact)
