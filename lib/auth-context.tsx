'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  twoFactorEnabled: boolean;
  avatarInitials: string;
  createdAt: string;
}

export interface StoredUser extends UserProfile {
  passwordHash: string;
  verificationCode?: string;
  resetCode?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  pendingVerificationEmail: string | null;
  login: (email: string, pass: string) => { success: boolean; message: string; requiresVerification?: boolean };
  register: (name: string, email: string, pass: string) => { success: boolean; message: string; verificationCode?: string };
  verifyEmail: (email: string, code: string) => { success: boolean; message: string };
  resendVerificationCode: (email: string) => { success: boolean; message: string; code?: string };
  requestPasswordReset: (email: string) => { success: boolean; message: string; code?: string };
  resetPasswordWithCode: (email: string, code: string, newPass: string) => { success: boolean; message: string };
  updatePassword: (oldPass: string, newPass: string) => { success: boolean; message: string };
  updateProfile: (name: string, email: string) => { success: boolean; message: string };
  toggleTwoFactor: () => void;
  logout: () => void;
  openAuthModal: (mode?: 'login' | 'register' | 'verify' | 'forgot') => void;
  closeAuthModal: () => void;
  authModalState: { isOpen: boolean; mode: 'login' | 'register' | 'verify' | 'forgot' };
}

const DEFAULT_USERS: StoredUser[] = [
  {
    id: 'usr_demo_1',
    name: 'John Doe',
    email: 'john.doe@arbitragego.io',
    passwordHash: 'password123',
    isVerified: true,
    twoFactorEnabled: true,
    avatarInitials: 'JD',
    createdAt: '2026-01-15',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const storedUsersRaw = localStorage.getItem('arbitragego_users');
      if (!storedUsersRaw) {
        localStorage.setItem('arbitragego_users', JSON.stringify(DEFAULT_USERS));
      }

      const activeUserRaw = localStorage.getItem('arbitragego_active_user');
      if (activeUserRaw) {
        return JSON.parse(activeUserRaw);
      }
      return {
        id: DEFAULT_USERS[0].id,
        name: DEFAULT_USERS[0].name,
        email: DEFAULT_USERS[0].email,
        isVerified: DEFAULT_USERS[0].isVerified,
        twoFactorEnabled: DEFAULT_USERS[0].twoFactorEnabled,
        avatarInitials: DEFAULT_USERS[0].avatarInitials,
        createdAt: DEFAULT_USERS[0].createdAt,
      };
    } catch {
      return null;
    }
  });

  const [pendingVerificationEmail, setPendingVerificationEmail] = useState<string | null>(null);
  const [authModalState, setAuthModalState] = useState<{
    isOpen: boolean;
    mode: 'login' | 'register' | 'verify' | 'forgot';
  }>({
    isOpen: false,
    mode: 'login',
  });

  const getUsersFromStorage = (): StoredUser[] => {
    try {
      const raw = localStorage.getItem('arbitragego_users');
      return raw ? JSON.parse(raw) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  };

  const saveUsersToStorage = (users: StoredUser[]) => {
    localStorage.setItem('arbitragego_users', JSON.stringify(users));
  };

  const openAuthModal = (mode: 'login' | 'register' | 'verify' | 'forgot' = 'login') => {
    setAuthModalState({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const login = (email: string, pass: string) => {
    const users = getUsersFromStorage();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());

    if (!found) {
      return { success: false, message: 'No account found with this email address.' };
    }

    if (found.passwordHash !== pass) {
      return { success: false, message: 'Invalid password. Please try again.' };
    }

    if (!found.isVerified) {
      setPendingVerificationEmail(found.email);
      return {
        success: false,
        message: 'Your email address is not verified yet. Please enter the verification code.',
        requiresVerification: true,
      };
    }

    const sessionUser: UserProfile = {
      id: found.id,
      name: found.name,
      email: found.email,
      isVerified: found.isVerified,
      twoFactorEnabled: found.twoFactorEnabled,
      avatarInitials: found.avatarInitials,
      createdAt: found.createdAt,
    };

    setUser(sessionUser);
    localStorage.setItem('arbitragego_active_user', JSON.stringify(sessionUser));
    closeAuthModal();

    return { success: true, message: `Welcome back, ${found.name}!` };
  };

  const register = (name: string, email: string, pass: string) => {
    const users = getUsersFromStorage();
    const normalizedEmail = email.toLowerCase().trim();

    if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    // Generate 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const initials = name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'US';

    const newUser: StoredUser = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: pass,
      isVerified: false, // Default false until code entered
      twoFactorEnabled: false,
      avatarInitials: initials,
      createdAt: new Date().toISOString().split('T')[0],
      verificationCode,
    };

    users.push(newUser);
    saveUsersToStorage(users);
    setPendingVerificationEmail(normalizedEmail);

    return {
      success: true,
      message: `Account created successfully! Verification code sent to ${normalizedEmail}.`,
      verificationCode,
    };
  };

  const verifyEmail = (email: string, code: string) => {
    const users = getUsersFromStorage();
    const normalizedEmail = email.toLowerCase().trim();
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === normalizedEmail);

    if (userIndex === -1) {
      return { success: false, message: 'User record not found.' };
    }

    const targetUser = users[userIndex];

    if (targetUser.isVerified) {
      return { success: true, message: 'Email is already verified.' };
    }

    if (targetUser.verificationCode && targetUser.verificationCode !== code.trim()) {
      return { success: false, message: 'Incorrect 6-digit verification code.' };
    }

    // Mark as verified
    users[userIndex].isVerified = true;
    delete users[userIndex].verificationCode;
    saveUsersToStorage(users);

    const verifiedProfile: UserProfile = {
      id: targetUser.id,
      name: targetUser.name,
      email: targetUser.email,
      isVerified: true,
      twoFactorEnabled: targetUser.twoFactorEnabled,
      avatarInitials: targetUser.avatarInitials,
      createdAt: targetUser.createdAt,
    };

    setUser(verifiedProfile);
    localStorage.setItem('arbitragego_active_user', JSON.stringify(verifiedProfile));
    setPendingVerificationEmail(null);

    return { success: true, message: 'Email verified successfully! You are now logged in.' };
  };

  const resendVerificationCode = (email: string) => {
    const users = getUsersFromStorage();
    const normalizedEmail = email.toLowerCase().trim();
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === normalizedEmail);

    if (userIndex === -1) {
      return { success: false, message: 'User record not found.' };
    }

    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    users[userIndex].verificationCode = newCode;
    saveUsersToStorage(users);

    return {
      success: true,
      message: `A new 6-digit code has been dispatched to ${normalizedEmail}.`,
      code: newCode,
    };
  };

  const requestPasswordReset = (email: string) => {
    const users = getUsersFromStorage();
    const normalizedEmail = email.toLowerCase().trim();
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === normalizedEmail);

    if (userIndex === -1) {
      // Don't leak existence for security, return positive mock response
      return {
        success: true,
        message: `If an account exists for ${normalizedEmail}, a password reset code has been sent.`,
        code: '888999',
      };
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    users[userIndex].resetCode = resetCode;
    saveUsersToStorage(users);

    return {
      success: true,
      message: `Password reset code sent to ${normalizedEmail}.`,
      code: resetCode,
    };
  };

  const resetPasswordWithCode = (email: string, code: string, newPass: string) => {
    const users = getUsersFromStorage();
    const normalizedEmail = email.toLowerCase().trim();
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === normalizedEmail);

    if (userIndex === -1) {
      return { success: false, message: 'Invalid email or reset code.' };
    }

    const targetUser = users[userIndex];
    if (!targetUser.resetCode || targetUser.resetCode !== code.trim()) {
      return { success: false, message: 'Invalid or expired password reset code.' };
    }

    users[userIndex].passwordHash = newPass;
    delete users[userIndex].resetCode;
    saveUsersToStorage(users);

    return { success: true, message: 'Password updated successfully! Please log in with your new password.' };
  };

  const updatePassword = (oldPass: string, newPass: string) => {
    if (!user) return { success: false, message: 'Not logged in.' };

    const users = getUsersFromStorage();
    const userIndex = users.findIndex((u) => u.id === user.id);

    if (userIndex === -1 || users[userIndex].passwordHash !== oldPass) {
      return { success: false, message: 'Current password is incorrect.' };
    }

    users[userIndex].passwordHash = newPass;
    saveUsersToStorage(users);

    return { success: true, message: 'Password changed successfully.' };
  };

  const updateProfile = (name: string, email: string) => {
    if (!user) return { success: false, message: 'Not logged in.' };

    const users = getUsersFromStorage();
    const userIndex = users.findIndex((u) => u.id === user.id);

    if (userIndex === -1) return { success: false, message: 'User not found.' };

    const initials = name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'US';

    const updatedProfile: UserProfile = {
      ...user,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      avatarInitials: initials,
    };

    users[userIndex].name = updatedProfile.name;
    users[userIndex].email = updatedProfile.email;
    users[userIndex].avatarInitials = initials;

    saveUsersToStorage(users);
    setUser(updatedProfile);
    localStorage.setItem('arbitragego_active_user', JSON.stringify(updatedProfile));

    return { success: true, message: 'Profile updated successfully.' };
  };

  const toggleTwoFactor = () => {
    if (!user) return;

    const users = getUsersFromStorage();
    const userIndex = users.findIndex((u) => u.id === user.id);

    if (userIndex !== -1) {
      const nextVal = !users[userIndex].twoFactorEnabled;
      users[userIndex].twoFactorEnabled = nextVal;
      saveUsersToStorage(users);

      const updated = { ...user, twoFactorEnabled: nextVal };
      setUser(updated);
      localStorage.setItem('arbitragego_active_user', JSON.stringify(updated));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('arbitragego_active_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        pendingVerificationEmail,
        login,
        register,
        verifyEmail,
        resendVerificationCode,
        requestPasswordReset,
        resetPasswordWithCode,
        updatePassword,
        updateProfile,
        toggleTwoFactor,
        logout,
        openAuthModal,
        closeAuthModal,
        authModalState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
