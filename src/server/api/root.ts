import { router } from '@/server/api/trpc';
import { referralRouter } from './routers/referral';

export const appRouter = router({
  referral: referralRouter,
});

export type AppRouter = typeof appRouter;