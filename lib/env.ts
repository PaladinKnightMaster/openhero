export const env = {
    supabase: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        publishableKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    },
    security: {
        ipHashSalt: process.env.IP_HASH_SALT || "",
    },
} as const;