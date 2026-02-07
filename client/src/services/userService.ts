export interface UserProfile {
  id: string;
  email: string | null;
  creatorId: string | null;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  videoTypes: string[];
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

export interface UpdateUserProfileInput {
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  videoTypes: string[];
}

export const updateUserProfile = async (
  token: string,
  data: UpdateUserProfileInput
): Promise<UserProfile> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return response.json() as Promise<UserProfile>;
};
