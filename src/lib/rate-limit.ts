interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5', 10)
const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10) // 15 minutes

export function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  // Clean up old entries periodically
  if (rateLimitMap.size > 1000) {
    cleanupOldEntries(now)
  }

  // No existing entry - create new one
  if (!entry) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + WINDOW_MS
    })
    return true
  }

  // Reset time has passed - reset counter
  if (now > entry.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + WINDOW_MS
    })
    return true
  }

  // Within window - check if limit exceeded
  if (entry.count >= MAX_REQUESTS) {
    return false
  }

  // Increment counter
  entry.count++
  return true
}

function cleanupOldEntries(now: number): void {
  const entries = Array.from(rateLimitMap.entries())
  for (const [key, entry] of entries) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}

export function getRateLimitInfo(identifier: string): {
  remaining: number
  resetTime: number | null
} {
  const entry = rateLimitMap.get(identifier)
  const now = Date.now()

  if (!entry || now > entry.resetTime) {
    return {
      remaining: MAX_REQUESTS,
      resetTime: null
    }
  }

  return {
    remaining: Math.max(0, MAX_REQUESTS - entry.count),
    resetTime: entry.resetTime
  }
}
