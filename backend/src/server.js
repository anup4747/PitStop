import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { createClient } from "@supabase/supabase-js";

const requiredEnv = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];
const missingEnv = requiredEnv.filter((name) => !process.env[name]);

if (missingEnv.length > 0) {
  console.warn(`Missing environment variables: ${missingEnv.join(", ")}`);
}

const supabase =
  missingEnv.length === 0
    ? createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: { autoRefreshToken: false, persistSession: false },
        },
      )
    : null;

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "pitstop-solutions-backend",
    databaseConfigured: Boolean(supabase),
  });
});

const authErrorStatus = (error) => {
  if (error?.status === 400 || error?.code === "invalid_credentials") {
    return 400;
  }

  if (error?.status === 422) {
    return 422;
  }

  return 500;
};

app.post("/api/auth/signup", async (req, res) => {
  if (!supabase) {
    return res.status(503).json({ error: "Supabase is not configured." });
  }

  const { email, password, fullName } = req.body ?? {};
  if (!email || !password || !fullName) {
    return res
      .status(400)
      .json({ error: "Full name, email, and password are required." });
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: { data: { full_name: fullName.trim() } },
  });

  if (error) {
    return res.status(authErrorStatus(error)).json({ error: error.message });
  }

  return res.status(201).json({ data });
});

app.post("/api/auth/login", async (req, res) => {
  if (!supabase) {
    return res.status(503).json({ error: "Supabase is not configured." });
  }

  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    return res.status(authErrorStatus(error)).json({ error: error.message });
  }

  return res.json({ data });
});

app.get("/api/categories", async (_req, res) => {
  if (!supabase) {
    return res.status(503).json({ error: "Supabase is not configured." });
  }

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, image_url")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({ data });
});

app.get("/api/products", async (req, res) => {
  if (!supabase) {
    return res.status(503).json({ error: "Supabase is not configured." });
  }

  const { category, search, limit = "50", offset = "0" } = req.query;
  const pageSize = Math.min(Math.max(Number(limit) || 50, 1), 100);
  const pageOffset = Math.max(Number(offset) || 0, 0);
  let query = supabase
    .from("products")
    .select(
      "*, categories!inner(id, name, slug), product_images(id, image_url, alt_text, sort_order), inventory(stock_count)",
      { count: "exact" },
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .range(pageOffset, pageOffset + pageSize - 1);

  if (category) {
    query = query.eq("categories.slug", category);
  }

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,short_description.ilike.%${search}%,sku.ilike.%${search}%`,
    );
  }

  const { data, error, count } = await query;

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({
    data,
    pagination: { count, limit: pageSize, offset: pageOffset },
  });
});

app.get("/api/products/:slug", async (req, res) => {
  if (!supabase) {
    return res.status(503).json({ error: "Supabase is not configured." });
  }

  const { data, error } = await supabase
    .from("products")
    .select(
      "*, categories!inner(id, name, slug), product_images(id, image_url, alt_text, sort_order), inventory(stock_count)",
    )
    .eq("slug", req.params.slug)
    .eq("is_active", true)
    .single();

  if (error?.code === "PGRST116") {
    return res.status(404).json({ error: "Product not found." });
  }

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({ data });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Pitstop backend listening on http://localhost:${port}`);
});
