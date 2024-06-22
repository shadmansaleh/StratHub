import { rateLimit } from "express-rate-limit";

const RateLimiter = (count: number) =>
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: count,
    message: JSON.stringify({
      status: "rate-limited",
      message: `You have exceeded your ${count} requests per 10 minute limit.`,
    }),
    headers: true,
  });

export default RateLimiter;
