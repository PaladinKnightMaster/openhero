"use client";

import { useCallback, useSyncExternalStore } from "react";
import { DEFAULT_HERO_CONFIG, type HeroConfig } from "@/lib/hero-templates";

const STORAGE_KEY = "openhero_studio_config";

// Module-level store so getSnapshot returns a stable reference (required by
// useSyncExternalStore) and the config is shared across modal instances.
let cache: HeroConfig = DEFAULT_HERO_CONFIG;
let hydrated = false;
const listeners = new Set<() => void>();

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) cache = { ...DEFAULT_HERO_CONFIG, ...(JSON.parse(raw) as Partial<HeroConfig>) };
  } catch {
    // ignore malformed storage
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): HeroConfig {
  hydrate();
  return cache;
}

function getServerSnapshot(): HeroConfig {
  return DEFAULT_HERO_CONFIG;
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // storage unavailable (private mode) — keep in-memory only
  }
}

/**
 * Persisted, SSR-safe Hero Studio config. The config is global (not per-slug) so
 * a user's brand/heading carries across heroes. Uses useSyncExternalStore so the
 * server render uses defaults and the client hydrates from localStorage without
 * a hydration mismatch.
 */
export function useHeroConfig() {
  const config = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const update = useCallback((patch: Partial<HeroConfig>) => {
    cache = { ...cache, ...patch };
    persist();
    emit();
  }, []);

  const reset = useCallback(() => {
    cache = DEFAULT_HERO_CONFIG;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    emit();
  }, []);

  return { config, update, reset };
}
