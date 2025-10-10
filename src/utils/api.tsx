import { projectId, publicAnonKey } from "./supabase/info";

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-e056f5cc`;

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchApi(
  endpoint: string,
  options: RequestInit = {},
  useAuth: boolean = true
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Get access token from session if available
  if (useAuth) {
    const session = sessionStorage.getItem("annual_session");
    if (session) {
      const { access_token } = JSON.parse(session);
      headers["Authorization"] = `Bearer ${access_token}`;
    }
  } else {
    headers["Authorization"] = `Bearer ${publicAnonKey}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new ApiError(response.status, error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Auth API
export const authApi = {
  signup: async (email: string, password: string, name: string) => {
    try {
      return await fetchApi("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
      }, false);
    } catch (error) {
      console.error("Signup API error:", error);
      return { error: error instanceof Error ? error.message : "Unknown error", user: null };
    }
  },

  getProfile: async () => {
    return fetchApi("/auth/profile");
  },

  updateProfile: async (name: string) => {
    return fetchApi("/auth/profile", {
      method: "PUT",
      body: JSON.stringify({ name }),
    });
  },
};

// Assets API
export const assetsApi = {
  getAll: async () => {
    return fetchApi("/assets");
  },

  create: async (asset: any) => {
    return fetchApi("/assets", {
      method: "POST",
      body: JSON.stringify(asset),
    });
  },

  update: async (id: number, asset: any) => {
    return fetchApi(`/assets/${id}`, {
      method: "PUT",
      body: JSON.stringify(asset),
    });
  },

  delete: async (id: number) => {
    return fetchApi(`/assets/${id}`, {
      method: "DELETE",
    });
  },
};
