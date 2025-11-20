# Vercel Environment Variables Setup

## 🚨 IMPORTANT: Add These to Vercel

Your deployment is failing because environment variables aren't set in Vercel.

---

## 📝 Steps to Fix:

### 1. Go to Vercel Dashboard
Visit: https://vercel.com/dashboard

### 2. Select Your Project
Click on **kagearchvs** project

### 3. Go to Settings
Click **Settings** tab → **Environment Variables**

### 4. Add These Variables:

**Copy these exactly from your `.env.local` file:**

#### Sanity (for Blog)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=yfvz087s
NEXT_PUBLIC_SANITY_DATASET=production
```

#### Supabase (for Orders) ⚠️ REQUIRED
```
NEXT_PUBLIC_SUPABASE_URL=https://njuwgfhowjizmzwpwwso.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qdXdnZmhvd2ppem16d3B3d3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NjI1OTQsImV4cCI6MjA3OTIzODU5NH0.m2ucRt9SxgDEuo7VBicO0jnby8bKB6sq_IclI45kTec
```

#### Paystack (for Payments)
```
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_3659b573bde926e5d8100757bdc99edeea1858f0
PAYSTACK_SECRET_KEY=sk_test_ea88e00a60e8cc7447e1082a869fc9033c2a5ef4
```

#### Admin Authentication
```
ADMIN_PASSWORD=your_secure_admin_password_123
```

### 5. Environment Selection

For each variable, select:
- ✅ **Production**
- ✅ **Preview**
- ✅ **Development**

### 6. Save and Redeploy

After adding all variables:
1. Click **Save**
2. Go to **Deployments** tab
3. Click **⋯** (three dots) on latest deployment
4. Click **Redeploy**

---

## ✅ Complete List (Copy-Paste Ready)

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=yfvz087s
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SUPABASE_URL=https://njuwgfhowjizmzwpwwso.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qdXdnZmhvd2ppem16d3B3d3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NjI1OTQsImV4cCI6MjA3OTIzODU5NH0.m2ucRt9SxgDEuo7VBicO0jnby8bKB6sq_IclI45kTec
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_3659b573bde926e5d8100757bdc99edeea1858f0
PAYSTACK_SECRET_KEY=sk_test_ea88e00a60e8cc7447e1082a869fc9033c2a5ef4
ADMIN_PASSWORD=your_secure_admin_password_123
```

---

## 🎯 Quick Reference

| Variable | Required For |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_*` | ⚠️ Orders (CRITICAL) |
| `NEXT_PUBLIC_PAYSTACK_*` | ⚠️ Payments (CRITICAL) |
| `PAYSTACK_SECRET_KEY` | ⚠️ Payment Verification |
| `ADMIN_PASSWORD` | Admin Dashboard Access |
| `NEXT_PUBLIC_SANITY_*` | Blog Posts |

---

## 🔍 How to Verify

After redeploying:
1. Check deployment logs for "Build completed"
2. Visit your site
3. Try making a test order
4. Check admin dashboard

---

**Add these environment variables to Vercel and redeploy!** 🚀

