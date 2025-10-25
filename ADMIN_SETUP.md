# YEESP Admin Setup Guide

## 🔐 How to Create Your Admin Account

### Step 1: Run the Secure Admin Setup Script

Open the terminal in your Replit workspace and run:

```bash
npm run create-admin
```

### Step 2: Enter Your Admin Details

The script will ask for:

1. **Email**: Enter your admin email (e.g., fasih31@gmail.com)
2. **Full Name**: Enter your full name
3. **Password**: Enter a strong password (minimum 8 characters)

### Step 3: Login to Admin Dashboard

After creating your admin account:

1. Go to `/auth/login` 
2. Enter your email and password
3. You'll be logged in as an admin with full access

## ✅ Admin Features

Once logged in as an admin, you can:

### Dashboard
- View platform statistics (total users, courses, projects, revenue)
- See real-time analytics charts
- Access quick actions for all admin tasks

### User Management
- View all users
- Manage user roles
- Approve/reject role requests
- View user activity

### Content Management
- Manage courses (approve/reject/delete)
- Manage projects (monitor/moderate)
- Review and approve KYC documents

### Platform Settings
- Configure pricing and fees
- Set platform commission rates
- Manage email templates
- Control security settings

### Reports & Analytics
- Download reports (CSV/PDF)
- View platform analytics
- Track revenue and growth

### Admin Management (NEW!)
- Go to `/admin/manage-admins`
- Add new administrators
- Remove admin accounts
- View all current admins

## 🔒 Security Best Practices

1. **Use a Strong Password**: 
   - Minimum 8 characters
   - Mix of uppercase, lowercase, numbers, and symbols
   - Example: `MyS3cur3P@ss!`

2. **Don't Share Credentials**: 
   - Never share your admin password
   - Don't store passwords in plain text
   - Use a password manager

3. **Regular Password Changes**:
   - Change your password every 90 days
   - Use unique passwords for different services

4. **Prevent Self-Deletion**:
   - The system prevents you from removing your own admin account
   - The last admin cannot be removed (safety measure)

5. **Review Admin Access**:
   - Regularly audit who has admin access
   - Remove admin access for users who no longer need it

## 📝 How to Add Another Admin

1. Login as an admin
2. Navigate to `/admin/manage-admins`
3. Click "Add Admin" button
4. Fill in the new admin's details:
   - Full Name
   - Email
   - Password (minimum 8 characters)
5. Click "Create Admin"

The new admin can now login with their credentials.

## ⚠️ Important Notes

- **First Admin**: You're the first admin! After you create your account, you can add more admins.
- **Cannot Delete Last Admin**: The system prevents deleting the last admin account
- **Cannot Delete Self**: You cannot remove your own admin account (prevents accidental lockout)
- **Password Security**: Passwords are hashed with bcrypt (never stored in plain text)

## 🛡️ Security Audit Findings

All admin routes are now protected with:
- `requireAuth` middleware (ensures user is logged in)
- `requireRole('admin')` middleware (ensures user is admin)

Protected routes include:
- ✅ `/api/admin/stats` - Admin statistics
- ✅ `/api/admin/admins` - Admin management
- ✅ `/api/admin/reports/*` - Report downloads
- ✅ `/api/admin/settings` - Platform settings
- ✅ All other admin routes

## 📞 Need Help?

If you forget your password or get locked out:
1. Run `npm run create-admin` again
2. Enter your email
3. Set a new password

This will update your existing admin account with a new password.

---

**Developed by:** Fasih ur Rehman
**Platform:** YEESP - Youth Education and Employment Support Platform
