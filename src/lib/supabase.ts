// Supabase client factories (server-side use).
//
// Two access levels, both built from environment variables only:
//   - anon client: NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY.
//     Used for content reads; the portfolio_* tables carry an RLS policy
//     that grants this role SELECT and nothing else.
//   - service client: SUPABASE_SERVICE_ROLE_KEY (server-only secret, never
//     NEXT_PUBLIC). Bypasses RLS — used solely to INSERT contact messages
//     into portfolio_messages, which intentionally has no public policy.
//
// Each factory returns null when its variables are absent so callers can
// fall through to the next data source.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function supabaseUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url && url.startsWith("https://") ? url : null;
}

let anonClient: SupabaseClient | null = null;
let anonTried = false;

export function getAnonClient(): SupabaseClient | null {
  if (anonTried) return anonClient;
  anonTried = true;
  const url = supabaseUrl();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  anonClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return anonClient;
}

let serviceClient: SupabaseClient | null = null;
let serviceTried = false;

export function getServiceClient(): SupabaseClient | null {
  if (serviceTried) return serviceClient;
  serviceTried = true;
  const url = supabaseUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  serviceClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return serviceClient;
}
