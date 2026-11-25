import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

function loadEnvFromFile(filePath: string): Record<string, string> {
  if (!fs.existsSync(filePath)) return {};
  const result: Record<string, string> = {};
  const content = fs.readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eqIdx = line.indexOf("=");
    if (eqIdx <= 0) continue;
    const key = line.slice(0, eqIdx).trim();
    let val = line.slice(eqIdx + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    result[key] = val;
  }
  return result;
}

const loadedEnv = {
  ...loadEnvFromFile(path.resolve(__dirname, "../.env")),
  ...loadEnvFromFile(path.resolve(__dirname, "../.env.local")),
  ...loadEnvFromFile(path.resolve(__dirname, ".env")),
  ...loadEnvFromFile(path.resolve(__dirname, ".env.local")),
};

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_PROJECT_URL ||
  loadedEnv.NEXT_PUBLIC_SUPABASE_URL ||
  loadedEnv.SUPABASE_PROJECT_URL ||
  "";

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  loadedEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  loadedEnv.SUPABASE_PUBLISHABLE_KEY ||
  "";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: supabaseUrl,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseKey,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
