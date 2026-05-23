import { useState, useEffect } from "react";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  bio: string | null;
  location: string | null;
  profileImageUrl: string | null;
  resumeUrl: string | null;
  createdAt: string;
}

interface StoredUser extends UserProfile {
  password: string;
}

const USERS_KEY = "talentHub_users";
const SESSION_KEY = "talentHub_currentUser";

function readUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); } catch { return []; }
}
function writeUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function readSession(): UserProfile | null {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
}
function writeSession(user: UserProfile | null): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}
function nextUserId(): number {
  const users = readUsers();
  return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
}

export function useUserAuth() {
  const [user, setUserState] = useState<UserProfile | null>(() => readSession());
  const [loading, setLoading] = useState(false);

  const setUser = (u: UserProfile | null) => {
    writeSession(u);
    setUserState(u);
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    location?: string;
  }): Promise<UserProfile> => {
    const users = readUsers();
    if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      throw new Error("Email already registered");
    }
    const profile: UserProfile = {
      id: nextUserId(),
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      bio: null,
      location: data.location ?? null,
      profileImageUrl: null,
      resumeUrl: null,
      createdAt: new Date().toISOString(),
    };
    writeUsers([...users, { ...profile, password: data.password }]);
    setUser(profile);
    return profile;
  };

  const login = async (email: string, password: string): Promise<UserProfile> => {
    const users = readUsers();
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) throw new Error("Invalid credentials");
    const { password: _pw, ...profile } = found;
    setUser(profile);
    return profile;
  };

  const logout = async (): Promise<void> => {
    setUser(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<UserProfile> => {
    if (!user) throw new Error("Not logged in");
    const users = readUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) throw new Error("User not found");
    const updated: StoredUser = { ...users[idx], ...updates };
    users[idx] = updated;
    writeUsers(users);
    const { password: _pw, ...profile } = updated;
    setUser(profile);
    return profile;
  };

  return { user, loading, register, login, logout, updateProfile, setUser };
}
