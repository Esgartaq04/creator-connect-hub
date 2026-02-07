import { getAuthToken } from "@/lib/firebase";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5174";

export interface LinkedAccount {
  platform: string;
  handle: string;
  url: string | null;
}

export interface AccountProfile {
  id: string;
  linkedAccounts: LinkedAccount[];
}

export const fetchAccountProfile = async (): Promise<AccountProfile> => {
  const token = await getAuthToken();
  const response = await fetch(`${API_BASE_URL}/api/accounts/me`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return response.json() as Promise<AccountProfile>;
};
