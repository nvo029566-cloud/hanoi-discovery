import { describe, expect, it } from "vitest";
import { createRateLimiter } from "./rate-limit";

describe("createRateLimiter", () => {
  it("blocks after the limit and recovers after the window", () => {
    let t = 0;
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000, now: () => t });
    expect(limiter.consume("a").allowed).toBe(true);
    expect(limiter.consume("a").allowed).toBe(true);
    const blocked = limiter.consume("a");
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterMs).toBe(1000);
    t = 1001;
    expect(limiter.consume("a").allowed).toBe(true);
  });

  it("tracks keys independently and supports reset", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000, now: () => 0 });
    expect(limiter.consume("a").allowed).toBe(true);
    expect(limiter.consume("b").allowed).toBe(true);
    expect(limiter.consume("a").allowed).toBe(false);
    limiter.reset("a");
    expect(limiter.consume("a").allowed).toBe(true);
  });
});
