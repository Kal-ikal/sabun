// Development mode fallback using localStorage
// This is a fallback when Supabase server is not available

export const devAuth = {
  signup: (email: string, password: string, name: string) => {
    const users = JSON.parse(localStorage.getItem("dev_users") || "[]");
    
    // Check if user exists
    if (users.find((u: any) => u.email === email)) {
      return { error: "User already exists", user: null };
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In dev mode only - never store plain passwords in production!
      user_metadata: { name },
    };

    users.push(newUser);
    localStorage.setItem("dev_users", JSON.stringify(users));

    return { user: newUser, error: null };
  },

  login: (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("dev_users") || "[]");
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      return { session: null, error: "Invalid credentials" };
    }

    const session = {
      access_token: `dev_token_${user.id}`,
      user,
    };

    return { session, error: null };
  },

  getProfile: (token: string) => {
    const userId = token.replace("dev_token_", "");
    const users = JSON.parse(localStorage.getItem("dev_users") || "[]");
    const user = users.find((u: any) => u.id === userId);

    if (!user) {
      return { user: null, error: "User not found" };
    }

    return { user, error: null };
  },
};

export const devAssets = {
  getAll: (userId: string) => {
    const assets = JSON.parse(localStorage.getItem(`dev_assets_${userId}`) || "[]");
    return { assets };
  },

  create: (userId: string, asset: any) => {
    const assets = JSON.parse(localStorage.getItem(`dev_assets_${userId}`) || "[]");
    const newAsset = { ...asset, id: Date.now() };
    assets.push(newAsset);
    localStorage.setItem(`dev_assets_${userId}`, JSON.stringify(assets));
    return { asset: newAsset };
  },

  update: (userId: string, assetId: number, assetData: any) => {
    const assets = JSON.parse(localStorage.getItem(`dev_assets_${userId}`) || "[]");
    const updated = assets.map((a: any) => (a.id === assetId ? { ...a, ...assetData } : a));
    localStorage.setItem(`dev_assets_${userId}`, JSON.stringify(updated));
    return { asset: assetData };
  },

  delete: (userId: string, assetId: number) => {
    const assets = JSON.parse(localStorage.getItem(`dev_assets_${userId}`) || "[]");
    const filtered = assets.filter((a: any) => a.id !== assetId);
    localStorage.setItem(`dev_assets_${userId}`, JSON.stringify(filtered));
    return { success: true };
  },
};
