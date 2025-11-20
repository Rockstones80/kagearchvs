# Payment Verification Flow

## Secure Payment Process

```
┌─────────────────────────────────────────────────────────────────┐
│                     SECURE PAYMENT FLOW                          │
└─────────────────────────────────────────────────────────────────┘

1. USER FILLS CHECKOUT FORM
   ↓
   [Contact Info, Shipping Address]

2. USER CLICKS "PROCEED TO PAYMENT"
   ↓
   [Frontend initializes Paystack with PUBLIC KEY]

3. PAYSTACK POPUP OPENS
   ↓
   User enters card details on Paystack's secure page
   ↓
   Paystack processes payment

4. PAYMENT SUCCESSFUL
   ↓
   Paystack returns payment reference
   ↓
   Frontend receives callback with reference

5. VERIFICATION (NEW - SECURE!)
   ↓
   Frontend → POST /api/verify-payment
              └── { reference: "xyz123" }
   ↓
   Backend API Route:
   ├── Uses SECRET KEY (server-side only)
   ├── Calls Paystack: GET /transaction/verify/{reference}
   ├── Paystack confirms: ✓ Payment is genuine
   └── Returns verification result

6. ONLY IF VERIFIED ✓
   ↓
   ├── Cart is cleared
   ├── Success message shown
   └── Order confirmed

   IF NOT VERIFIED ✗
   ↓
   ├── Cart remains intact
   ├── Error message shown
   └── User contacts support with reference

```

## Why This Matters

### Without Verification (Insecure) ❌

```javascript
// Someone could fake this in browser console:
onSuccess({ reference: "fake_ref_123" });
// Cart clears without actual payment!
```

### With Verification (Secure) ✅

```javascript
// Backend checks with Paystack:
// "Did payment ref 'xyz123' actually get paid?"
// Paystack: "Yes, ₦22,999.99 received ✓"
// Only then: clear cart
```

## Key Security Features

1. **Secret Key Never Exposed**
   - Stored only in `.env.local` (not in frontend code)
   - Only used in API routes (server-side)
   - Never sent to browser

2. **Double Verification**
   - User pays → Paystack confirms
   - Our backend asks Paystack: "Is this real?"
   - Cart clears only after both confirmations

3. **Fraud Prevention**
   - Can't fake payment in browser
   - Can't manipulate success callback
   - Can't bypass verification

## Files Involved

- **Frontend**: `app/(routes)/checkout/page.tsx`
  - Uses public key
  - Opens Paystack popup
  - Calls verification API

- **Backend**: `app/api/verify-payment/route.ts`
  - Uses secret key
  - Verifies with Paystack
  - Returns genuine result

- **Environment**: `.env.local`
  - `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` → Frontend
  - `PAYSTACK_SECRET_KEY` → Backend only
