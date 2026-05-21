import type { SafeUser } from ".";

declare global {
  namespace Express {
    interface Request {
      user: SafeUser;
    }
  }
}
