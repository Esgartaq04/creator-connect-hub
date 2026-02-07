export interface UserProfile {
  id: string;
  email: string | null;
  creatorId: string | null;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5174";

export const fetchUserProfile = async (token: string): Promise<UserProfile> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return response.json() as Promise<UserProfile>;
};
