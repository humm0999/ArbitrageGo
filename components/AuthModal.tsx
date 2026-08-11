'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import {
  X,
  Mail,
  Lock,
  User,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Copy,
} from 'lucide-react';

export function AuthModal() {
  const {
    authModalState,
    closeAuthModal,
    openAuthModal,
    login,
    register,
    verifyEmail,
    resendVerificationCode,
    requestPasswordReset,
    resetPasswordWithCode,
    pendingVerificationEmail,
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'register' | 'verify' | 'forgot' | 'resetCode'>(
    authModalState.mode
  );
  const [prevPropMode, setPrevPropMode] = useState(authModalState.mode);

  if (authModalState.mode !== prevPropMode) {
    setPrevPropMode(authModalState.mode);
    setMode(authModalState.mode);
  }

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Status & Feedback
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [demoCodeHint, setDemoCodeHint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!authModalState.isOpen) return null;

  const handleClearFeedback = () => setFeedback(null);

  // Sign In Handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleClearFeedback();
    if (!email || !password) {
      setFeedback({ type: 'error', text: 'Please fill in both email and password.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);
      if (res.success) {
        setFeedback({ type: 'success', text: res.message });
      } else {
        if (res.requiresVerification) {
          setMode('verify');
          setFeedback({ type: 'info', text: res.message });
        } else {
          setFeedback({ type: 'error', text: res.message });
        }
      }
    }, 400);
  };

  // Sign Up Handler
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleClearFeedback();
    if (!name || !email || !password) {
      setFeedback({ type: 'error', text: 'All fields are required.' });
      return;
    }

    if (password.length < 6) {
      setFeedback({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = register(name, email, password);
      setIsLoading(false);
      if (res.success) {
        if (res.verificationCode) {
          setDemoCodeHint(res.verificationCode);
        }
        setMode('verify');
        setFeedback({
          type: 'success',
          text: `Account created! Check ${email} for your 6-digit verification code.`,
        });
      } else {
        setFeedback({ type: 'error', text: res.message });
      }
    }, 400);
  };

  // Verify Email Handler
  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleClearFeedback();
    const targetEmail = email || pendingVerificationEmail || '';

    if (!targetEmail || !verificationCode) {
      setFeedback({ type: 'error', text: 'Please enter your email and 6-digit code.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = verifyEmail(targetEmail, verificationCode);
      setIsLoading(false);
      if (res.success) {
        setFeedback({ type: 'success', text: res.message });
      } else {
        setFeedback({ type: 'error', text: res.message });
      }
    }, 400);
  };

  // Resend Code
  const handleResendCode = () => {
    handleClearFeedback();
    const targetEmail = email || pendingVerificationEmail || '';
    if (!targetEmail) {
      setFeedback({ type: 'error', text: 'Please provide your email address first.' });
      return;
    }

    const res = resendVerificationCode(targetEmail);
    if (res.success) {
      if (res.code) setDemoCodeHint(res.code);
      setFeedback({ type: 'info', text: res.message });
    } else {
      setFeedback({ type: 'error', text: res.message });
    }
  };

  // Forgot Password Request
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleClearFeedback();
    if (!email) {
      setFeedback({ type: 'error', text: 'Please enter your email address.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = requestPasswordReset(email);
      setIsLoading(false);
      if (res.code) setDemoCodeHint(res.code);
      setMode('resetCode');
      setFeedback({ type: 'info', text: res.message });
    }, 400);
  };

  // Reset Password with Code
  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleClearFeedback();
    if (!email || !resetCode || !newPassword) {
      setFeedback({ type: 'error', text: 'Please complete all password reset fields.' });
      return;
    }

    if (newPassword.length < 6) {
      setFeedback({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = resetPasswordWithCode(email, resetCode, newPassword);
      setIsLoading(false);
      if (res.success) {
        setMode('login');
        setFeedback({ type: 'success', text: res.message });
      } else {
        setFeedback({ type: 'error', text: res.message });
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden text-[#0A192F]">
        {/* Top Header Bar */}
        <div className="bg-[#0A192F] text-white p-5 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider">
                {mode === 'login' && 'Account Login'}
                {mode === 'register' && 'Create Account'}
                {mode === 'verify' && 'Verify Email Address'}
                {mode === 'forgot' && 'Reset Password'}
                {mode === 'resetCode' && 'Set New Password'}
              </h3>
              <p className="text-[10px] text-blue-300 font-medium">ArbitrageGo PRO Secure Engine</p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Mode Tabs */}
        {(mode === 'login' || mode === 'register') && (
          <div className="grid grid-cols-2 bg-gray-100 p-1 border-b border-gray-200 text-xs font-bold text-center">
            <button
              onClick={() => {
                setMode('login');
                handleClearFeedback();
              }}
              className={`py-2 rounded-md transition ${
                mode === 'login'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-gray-500 hover:text-[#0A192F]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('register');
                handleClearFeedback();
              }}
              className={`py-2 rounded-md transition ${
                mode === 'register'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-gray-500 hover:text-[#0A192F]'
              }`}
            >
              Register Email
            </button>
          </div>
        )}

        <div className="p-6 space-y-4">
          {/* Notification Feedback Box */}
          {feedback && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-start space-x-2 ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : feedback.type === 'info'
                  ? 'bg-blue-50 border-blue-200 text-blue-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              )}
              <span className="font-semibold leading-tight">{feedback.text}</span>
            </div>
          )}

          {/* Demo Simulated Code Auto-Fill Banner */}
          {demoCodeHint && (mode === 'verify' || mode === 'resetCode') && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1.5">
              <div className="flex items-center justify-between font-bold text-amber-900">
                <span>Verification Dispatch (Simulated Email)</span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded uppercase">
                  Netlify Test Code
                </span>
              </div>
              <div className="flex items-center justify-between text-amber-800 font-mono font-bold bg-white p-2 rounded border border-amber-300">
                <span>Code: {demoCodeHint}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (mode === 'verify') setVerificationCode(demoCodeHint);
                    if (mode === 'resetCode') setResetCode(demoCodeHint);
                  }}
                  className="text-[10px] font-sans font-bold bg-amber-600 hover:bg-amber-700 text-white px-2 py-0.5 rounded flex items-center space-x-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Auto-Fill</span>
                </button>
              </div>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="john.doe@arbitragego.io"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold uppercase text-gray-500">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      handleClearFeedback();
                    }}
                    className="text-[11px] text-blue-600 hover:underline font-bold"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[11px] text-gray-600 flex items-center justify-between">
                <span>Demo Creds: <strong>john.doe@arbitragego.io</strong></span>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('john.doe@arbitragego.io');
                    setPassword('password123');
                  }}
                  className="text-blue-600 hover:text-blue-800 font-bold"
                >
                  Quick Fill
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg transition shadow-md flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                  Password (min 6 chars)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="text-[10px] text-gray-500 leading-tight">
                By registering, a 6-digit email verification code will be dispatched for immediate confirmation.
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg transition shadow-md flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Create Account & Send Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* EMAIL VERIFICATION FORM */}
          {mode === 'verify' && (
            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <p className="text-xs text-gray-600">
                Please enter the 6-digit confirmation code dispatched to{' '}
                <strong className="text-[#0A192F]">{email || pendingVerificationEmail || 'your email'}</strong>.
              </p>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                  6-Digit Verification Code
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="123456"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm tracking-widest font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none text-center"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-blue-600 hover:underline font-bold"
                >
                  Resend Verification Code
                </button>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-gray-500 hover:text-gray-800"
                >
                  Back to Sign In
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg transition shadow-md flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* FORGOT PASSWORD REQUEST FORM */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <p className="text-xs text-gray-600">
                Enter your account email address. We will send a secure password reset code to recover your access.
              </p>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                  Your Account Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="john.doe@arbitragego.io"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-gray-500 hover:text-gray-800 font-medium"
                >
                  Back to Sign In
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg transition shadow-md flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Send Reset Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* RESET PASSWORD WITH CODE FORM */}
          {mode === 'resetCode' && (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                  Reset Code
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="6-digit reset code"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="New password (min 6 chars)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg transition shadow-md flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <span>Update Password & Sign In</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
