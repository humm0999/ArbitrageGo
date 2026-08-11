'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import {
  ShieldCheck,
  KeyRound,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Smartphone,
  Globe,
  User,
  ExternalLink,
  Check,
  RefreshCw,
} from 'lucide-react';

export function SecurityView() {
  const { user, updatePassword, updateProfile, toggleTwoFactor, openAuthModal, resendVerificationCode } = useAuth();

  // Profile update form
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password update form
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleUpdateProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);
    if (!name || !email) {
      setProfileMsg({ type: 'error', text: 'Name and Email are required.' });
      return;
    }

    const res = updateProfile(name, email);
    if (res.success) {
      setProfileMsg({ type: 'success', text: res.message });
    } else {
      setProfileMsg({ type: 'error', text: res.message });
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    const res = updatePassword(oldPassword, newPassword);
    if (res.success) {
      setPasswordMsg({ type: 'success', text: res.message });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordMsg({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="space-y-6 text-[#0A192F]">
      {/* Page Title */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-black text-[#0A192F]">Security, Auth & Netlify Deployment</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Manage your credentials, email verification status, 2FA security, and Netlify hosting configuration.
          </p>
        </div>

        {/* User Account Status Tag */}
        <div className="flex items-center space-x-3 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
          <div className="w-10 h-10 rounded-lg bg-[#0A192F] text-white font-extrabold flex items-center justify-center text-sm">
            {user?.avatarInitials || 'US'}
          </div>
          <div className="text-xs">
            <div className="font-extrabold text-[#0A192F]">{user?.name || 'Guest User'}</div>
            <div className="text-[10px] text-gray-500 flex items-center space-x-1">
              <span>{user?.email}</span>
              {user?.isVerified ? (
                <span className="text-emerald-600 font-bold flex items-center">
                  <CheckCircle2 className="w-3 h-3 ml-1 inline" /> Verified
                </span>
              ) : (
                <span className="text-amber-600 font-bold flex items-center">
                  <AlertTriangle className="w-3 h-3 ml-1 inline" /> Unverified
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Verification & Profile Settings */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
              Email Verification & Profile
            </h3>
            <p className="text-xs text-gray-600">
              Your email address is used for authentication, verification alerts, and password resets.
            </p>
          </div>

          {/* Email Status Box */}
          <div
            className={`p-4 rounded-xl border ${
              user?.isVerified
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 font-extrabold text-xs">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
              <span
                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                  user?.isVerified
                    ? 'bg-emerald-200 text-emerald-800'
                    : 'bg-amber-200 text-amber-900'
                }`}
              >
                {user?.isVerified ? 'VERIFIED EMAIL' : 'PENDING VERIFICATION'}
              </span>
            </div>

            {!user?.isVerified && (
              <div className="mt-3 pt-3 border-t border-amber-200/60 flex items-center justify-between">
                <span className="text-[11px] text-amber-800 font-medium">
                  Verification code required to unlock all live execution features.
                </span>
                <button
                  onClick={() => openAuthModal('verify')}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-[10px] uppercase rounded tracking-wider shadow-xs"
                >
                  Enter Verification Code
                </button>
              </div>
            )}
          </div>

          {/* Update Profile Form */}
          <form onSubmit={handleUpdateProfileSubmit} className="space-y-4">
            {profileMsg && (
              <div
                className={`p-3 rounded-lg text-xs font-bold ${
                  profileMsg.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                }`}
              >
                {profileMsg.text}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Account Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition"
            >
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Change Password & Security Settings */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
              Change Password & 2FA
            </h3>
            <p className="text-xs text-gray-600">
              Update your password or enable Two-Factor Authentication for API key safety.
            </p>
          </div>

          {/* 2FA Toggle Card */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-xs text-[#0A192F]">Two-Factor Authentication (2FA)</div>
                <div className="text-[10px] text-gray-500">Authenticator App / TOTP Security Layer</div>
              </div>
            </div>

            <button
              onClick={toggleTwoFactor}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider transition ${
                user?.twoFactorEnabled
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {user?.twoFactorEnabled ? 'ENABLED' : 'ENABLE 2FA'}
            </button>
          </div>

          {/* Change Password Form */}
          <form onSubmit={handlePasswordSubmit} className="space-y-3">
            {passwordMsg && (
              <div
                className={`p-3 rounded-lg text-xs font-bold ${
                  passwordMsg.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                }`}
              >
                {passwordMsg.text}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Current Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">New Password</label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="New password (min 6 chars)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-[#0A192F] hover:bg-gray-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>

      {/* Netlify Deployment Readiness Card */}
      <div className="bg-[#0A192F] text-white p-6 rounded-xl border border-blue-900 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-blue-900 pb-3">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-white">
              Netlify Deployment & Google Ads Status
            </h3>
          </div>
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-[10px] uppercase px-2.5 py-1 rounded">
            READY FOR NETLIFY
          </span>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed">
          This applet is fully packaged with <code className="bg-blue-900/60 text-blue-200 px-1.5 py-0.5 rounded font-mono">netlify.toml</code>, Next.js static/SSR hydration support, client-side Auth persistence, and Google AdSense monetization integration.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium">
          <div className="p-3 bg-blue-950/60 rounded-lg border border-blue-800/60">
            <div className="font-bold text-blue-300 mb-1 flex items-center space-x-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Netlify Configuration</span>
            </div>
            <div className="text-[11px] text-gray-400">
              <code className="text-emerald-300">@netlify/plugin-nextjs</code> configured in <code className="text-gray-300">netlify.toml</code>.
            </div>
          </div>

          <div className="p-3 bg-blue-950/60 rounded-lg border border-blue-800/60">
            <div className="font-bold text-blue-300 mb-1 flex items-center space-x-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Email Auth System</span>
            </div>
            <div className="text-[11px] text-gray-400">
              Email registration, 6-digit verification code, login, & password reset.
            </div>
          </div>

          <div className="p-3 bg-blue-950/60 rounded-lg border border-blue-800/60">
            <div className="font-bold text-blue-300 mb-1 flex items-center space-x-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google AdSense</span>
            </div>
            <div className="text-[11px] text-gray-400">
              Set <code className="text-amber-300">NEXT_PUBLIC_GOOGLE_ADSENSE_ID</code> in Netlify Env Vars.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
