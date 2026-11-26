/**
 * Small fixed-window, in-memory rate limiter.
 * Limitation: state is per server instance, so with several instances the limit is per instance.
 * Swap for a shared store (database or Redis) before scaling out.
 */
export function createRateLimiter({
  limit,
  windowMs,
  now = Date.now,
}: {
  limit: number;
  windowMs: number;
  now?: () => number;
}) {
  const entries = new Map<string, { count: number; resetAt: number }>();

  return {
    /** Counts one attempt. Returns allowed=false once the limit is exceeded within the window. */
    consume(key: string): { allowed: boolean; retryAfterMs: number } {
      const t = now();
      for (const [k, v] of entries) if (v.resetAt <= t) entries.delete(k);
      const current = entries.get(key);
      if (!current) {
        entries.set(key, { count: 1, resetAt: t + windowMs });
        return { allowed: true, retryAfterMs: 0 };
      }
      current.count += 1;
      if (current.count > limit) return { allowed: false, retryAfterMs: current.resetAt - t };
      return { allowed: true, retryAfterMs: 0 };
    },
    reset(key: string) {
      entries.delete(key);
    },
  };
}
