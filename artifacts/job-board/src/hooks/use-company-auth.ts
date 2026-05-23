import { useState } from "react";

export interface CompanyProfile {
  id: number;
  name: string;
  email: string;
  logoUrl: string | null;
  website: string | null;
  industry: string | null;
  description: string | null;
  size: string | null;
  location: string | null;
  approved: boolean;
  createdAt: string;
}

interface StoredCompany extends CompanyProfile {
  password: string;
}

const COMPANIES_KEY = "talentHub_companies";
const SESSION_KEY = "talentHub_currentCompany";

function readCompanies(): StoredCompany[] {
  try { return JSON.parse(localStorage.getItem(COMPANIES_KEY) || "[]"); } catch { return []; }
}
function writeCompanies(companies: StoredCompany[]): void {
  localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
}
function readSession(): CompanyProfile | null {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
}
function writeSession(company: CompanyProfile | null): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(company));
}
function nextCompanyId(): number {
  const companies = readCompanies();
  return companies.length > 0 ? Math.max(...companies.map(c => c.id)) + 1 : 1;
}

export function useCompanyAuth() {
  const [company, setCompanyState] = useState<CompanyProfile | null>(() => readSession());
  const [loading, setLoading] = useState(false);

  const setCompany = (c: CompanyProfile | null) => {
    writeSession(c);
    setCompanyState(c);
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    website?: string;
    industry?: string;
    description?: string;
    size?: string;
    location?: string;
  }): Promise<CompanyProfile> => {
    const companies = readCompanies();
    if (companies.find(c => c.email.toLowerCase() === data.email.toLowerCase())) {
      throw new Error("Email already registered");
    }
    const profile: CompanyProfile = {
      id: nextCompanyId(),
      name: data.name,
      email: data.email,
      logoUrl: null,
      website: data.website ?? null,
      industry: data.industry ?? null,
      description: data.description ?? null,
      size: data.size ?? null,
      location: data.location ?? null,
      approved: true,
      createdAt: new Date().toISOString(),
    };
    writeCompanies([...companies, { ...profile, password: data.password }]);
    setCompany(profile);
    return profile;
  };

  const login = async (email: string, password: string): Promise<CompanyProfile> => {
    const companies = readCompanies();
    const found = companies.find(
      c => c.email.toLowerCase() === email.toLowerCase() && c.password === password
    );
    if (!found) throw new Error("Invalid credentials");
    const { password: _pw, ...profile } = found;
    setCompany(profile);
    return profile;
  };

  const logout = async (): Promise<void> => {
    setCompany(null);
  };

  const updateProfile = async (updates: Partial<CompanyProfile>): Promise<CompanyProfile> => {
    if (!company) throw new Error("Not logged in");
    const companies = readCompanies();
    const idx = companies.findIndex(c => c.id === company.id);
    if (idx === -1) throw new Error("Company not found");
    const updated: StoredCompany = { ...companies[idx], ...updates };
    companies[idx] = updated;
    writeCompanies(companies);
    const { password: _pw, ...profile } = updated;
    setCompany(profile);
    return profile;
  };

  return { company, loading, register, login, logout, updateProfile, setCompany };
}
