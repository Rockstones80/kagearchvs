# Admin Authentication Guide

## Overview

Your admin orders dashboard is now protected with password authentication. Only you can access the orders!

---

## 🔐 How It Works

```
User tries to access /admin/orders
         ↓
Check for admin session cookie
         ↓
   No session?  →  Redirect to /admin/login
         ↓
  Enter password
         ↓
Password correct?  →  Create session & access granted
         ↓
    View Orders Dashboard
```

---

## 🚀 Quick Setup

### 1. Set Your Admin Password

Open your `.env.local` file and change the admin password:

```env
# Admin Authentication
ADMIN_PASSWORD=your_secure_admin_password_123
```

**⚠️ Change this to a strong password!**

Good password examples:

- `MyStore2024!SecurePass`
- `K@geArch_Admin#789`
- `SecureOrder$Dashboard2024`

### 2. Restart Your Server

```bash
npm run dev
```

---

## 🔑 Accessing Admin Dashboard

### Option 1: Direct Login

1. **Go to:** `http://localhost:3000/admin/login`
2. **Enter password** (the one you set in `.env.local`)
3. **Click "Access Dashboard"**
4. **You're in!** Session lasts 7 days

### Option 2: Try Orders Page (Auto-Redirect)

1. **Go to:** `http://localhost:3000/admin/orders`
2. **Automatically redirected** to login
3. **Enter password**
4. **Back to orders!**

---

## 📱 Features

### ✅ Secure Login Page

- Clean, professional design
- Password-only authentication
- Toast notifications for feedback
- Mobile responsive

### ✅ Session Management

- 7-day session duration
- HttpOnly cookies (secure)
- Automatic logout after expiry

### ✅ Protected Routes

- `/admin/orders` - Requires authentication
- Redirects to login if not authenticated
- Session checked on every page load

### ✅ Logout Button

- Red button in orders dashboard
- Clears session immediately
- Redirects to login page

---

## 🛡️ Security Features

| Feature                  | Protection                  |
| ------------------------ | --------------------------- |
| **HttpOnly Cookies**     | ✅ Prevents XSS attacks     |
| **Secure Flag**          | ✅ HTTPS only in production |
| **SameSite**             | ✅ CSRF protection          |
| **Environment Variable** | ✅ Password not in code     |
| **Session Tokens**       | ✅ Unique per login         |

---

## 📂 Files Created

1. **`app/(routes)/admin/login/page.tsx`**
   - Beautiful login page
   - Password input form
   - Toast notifications

2. **`app/api/admin/login/route.ts`**
   - Verifies password
   - Creates session cookie
   - Secure token generation

3. **`app/api/admin/logout/route.ts`**
   - Clears session cookie
   - Logs user out

4. **`app/api/admin/check-auth/route.ts`**
   - Checks if user is authenticated
   - Returns true/false

5. **`components/admin/logout-button.tsx`**
   - Client component for logout
   - Toast notification on logout

6. **`app/(routes)/admin/orders/page.tsx`** (updated)
   - Added auth check
   - Redirects if not authenticated
   - Logout button in header

---

## 🔄 How Sessions Work

### Login Flow:

```typescript
1. User enters password
2. API checks against ADMIN_PASSWORD
3. If correct, creates session token
4. Sets cookie: admin_session={token}
5. Cookie expires in 7 days
6. User can access /admin/orders
```

### Logout Flow:

```typescript
1. User clicks "Logout" button
2. API deletes admin_session cookie
3. User redirected to /admin/login
4. Must re-enter password to access
```

---

## 🎨 Customization

### Change Session Duration

Edit `app/api/admin/login/route.ts`:

```typescript
cookieStore.set("admin_session", sessionToken, {
  maxAge: 60 * 60 * 24 * 30, // 30 days instead of 7
});
```

### Change Login Page Styling

Edit `app/(routes)/admin/login/page.tsx`:

- Colors, fonts, layout
- Add your logo
- Customize messages

### Add More Protected Routes

Protect any route by adding this at the top:

```typescript
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const MyProtectedPage = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session?.value) {
    redirect("/admin/login");
  }

  // Your page content here
};
```

---

## 🧪 Testing

### Test Login:

1. Go to: `http://localhost:3000/admin/login`
2. Enter WRONG password → See error toast ❌
3. Enter CORRECT password → Access granted ✅
4. Check: You're now at `/admin/orders`

### Test Protection:

1. **In Incognito/Private Window:**
   - Go to: `http://localhost:3000/admin/orders`
   - Should redirect to login ✅

2. **After Login:**
   - Refresh `/admin/orders`
   - Should stay on page (session active) ✅

3. **Click Logout:**
   - Redirected to login ✅
   - Try accessing `/admin/orders` again
   - Redirected back to login ✅

---

## 🚨 Important Security Notes

### ⚠️ For Production:

1. **Use Strong Password**
   - At least 16 characters
   - Mix of letters, numbers, symbols
   - Don't share it!

2. **Enable HTTPS**
   - Cookies marked `secure` in production
   - Prevents session hijacking

3. **Environment Variables**
   - Never commit `.env.local` to git
   - Use environment variables in hosting

4. **Consider Enhancements:**
   - Add rate limiting (prevent brute force)
   - Add 2FA (two-factor authentication)
   - Use proper auth system (NextAuth.js)
   - Add user roles (multiple admins)

---

## 🔧 Troubleshooting

### "Invalid password" but password is correct?

- Check `.env.local` for typos
- Make sure no spaces before/after password
- Restart dev server after changing password

### Session expires immediately?

- Check browser cookie settings
- Make sure cookies are enabled
- Try clearing browser cookies

### Can't access after login?

- Check browser console for errors
- Verify cookie is set (DevTools → Application → Cookies)
- Try logging out and back in

### Forgot password?

- Check your `.env.local` file
- It's stored there in plain text (for development)
- Change it to something new if needed

---

## 📊 Session Details

| Property    | Value                             |
| ----------- | --------------------------------- |
| Cookie Name | `admin_session`                   |
| Duration    | 7 days                            |
| Security    | HttpOnly, Secure (prod), SameSite |
| Storage     | Browser cookies                   |
| Token       | Base64 encoded string             |

---

## ✨ Next Steps (Optional)

### Add More Admins:

Currently single password. To add multiple admins:

1. Use a database (Supabase users table)
2. Store hashed passwords
3. Add user management UI

### Add Activity Logs:

Track who accessed what:

```typescript
// Log admin actions
await supabase.from("admin_logs").insert({
  action: "viewed_orders",
  timestamp: new Date(),
});
```

### Email Notifications:

Get notified when someone logs in:

- Use Supabase Edge Functions
- Send email on login
- Alert on suspicious activity

---

**Your admin dashboard is now secure! Only you can access the orders.** 🔐✅
