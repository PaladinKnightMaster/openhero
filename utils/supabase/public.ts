import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

/**
 * Cookie-less Supabase client for public, unauthenticated reads (e.g. the
 * homepage popularity sort). Using this instead of the cookie-bound server
 * client keeps the calling page statically renderable so ISR can cache it.
 */
export function createPublicClient() {
  return createClient(env.supabase.url, env.supabase.publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
