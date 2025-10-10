import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use("*", cors());
app.use("*", logger(console.log));

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// Health check
app.get("/make-server-e056f5cc/health", (c) => {
  return c.json({ status: "ok", message: "Annual server is running" });
});

// ==================== AUTHENTICATION ROUTES ====================

// Sign up new user
app.post("/make-server-e056f5cc/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true,
    });

    if (error) {
      console.log("Signup error:", error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (error) {
    console.log("Signup error:", error);
    return c.json({ error: "Internal server error during signup" }, 500);
  }
});

// Get user profile
app.get("/make-server-e056f5cc/auth/profile", async (c) => {
  try {
    const accessToken = c.req.header("Authorization")?.split(" ")[1];
    if (!accessToken) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.log("Get user error:", error);
      return c.json({ error: "Unauthorized" }, 401);
    }

    return c.json({ user });
  } catch (error) {
    console.log("Get profile error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Update user profile
app.put("/make-server-e056f5cc/auth/profile", async (c) => {
  try {
    const accessToken = c.req.header("Authorization")?.split(" ")[1];
    if (!accessToken) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      console.log("Auth error:", authError);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { name } = await c.req.json();

    const { data, error } = await supabase.auth.admin.updateUserById(
      user.id,
      { user_metadata: { name } }
    );

    if (error) {
      console.log("Update profile error:", error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (error) {
    console.log("Update profile error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ==================== ASSET ROUTES ====================

// Get all assets for authenticated user
app.get("/make-server-e056f5cc/assets", async (c) => {
  try {
    const accessToken = c.req.header("Authorization")?.split(" ")[1];
    if (!accessToken) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      console.log("Auth error:", authError);
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get user's assets from KV store
    const assets = await kv.get(`assets:${user.id}`);
    return c.json({ assets: assets || [] });
  } catch (error) {
    console.log("Get assets error:", error);
    return c.json({ error: "Internal server error while getting assets" }, 500);
  }
});

// Create new asset
app.post("/make-server-e056f5cc/assets", async (c) => {
  try {
    const accessToken = c.req.header("Authorization")?.split(" ")[1];
    if (!accessToken) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      console.log("Auth error:", authError);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const assetData = await c.req.json();
    
    // Get existing assets
    const assets = await kv.get(`assets:${user.id}`) || [];
    
    // Create new asset with ID
    const newAsset = {
      ...assetData,
      id: Date.now(),
    };

    // Add to assets array
    const updatedAssets = [...assets, newAsset];
    
    // Save back to KV store
    await kv.set(`assets:${user.id}`, updatedAssets);

    return c.json({ asset: newAsset });
  } catch (error) {
    console.log("Create asset error:", error);
    return c.json({ error: "Internal server error while creating asset" }, 500);
  }
});

// Update asset
app.put("/make-server-e056f5cc/assets/:id", async (c) => {
  try {
    const accessToken = c.req.header("Authorization")?.split(" ")[1];
    if (!accessToken) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      console.log("Auth error:", authError);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const assetId = parseInt(c.req.param("id"));
    const assetData = await c.req.json();
    
    // Get existing assets
    const assets = await kv.get(`assets:${user.id}`) || [];
    
    // Update asset
    const updatedAssets = assets.map((asset: any) =>
      asset.id === assetId ? { ...asset, ...assetData } : asset
    );
    
    // Save back to KV store
    await kv.set(`assets:${user.id}`, updatedAssets);

    return c.json({ asset: assetData });
  } catch (error) {
    console.log("Update asset error:", error);
    return c.json({ error: "Internal server error while updating asset" }, 500);
  }
});

// Delete asset
app.delete("/make-server-e056f5cc/assets/:id", async (c) => {
  try {
    const accessToken = c.req.header("Authorization")?.split(" ")[1];
    if (!accessToken) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user) {
      console.log("Auth error:", authError);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const assetId = parseInt(c.req.param("id"));
    
    // Get existing assets
    const assets = await kv.get(`assets:${user.id}`) || [];
    
    // Remove asset
    const updatedAssets = assets.filter((asset: any) => asset.id !== assetId);
    
    // Save back to KV store
    await kv.set(`assets:${user.id}`, updatedAssets);

    return c.json({ success: true });
  } catch (error) {
    console.log("Delete asset error:", error);
    return c.json({ error: "Internal server error while deleting asset" }, 500);
  }
});

Deno.serve(app.fetch);
