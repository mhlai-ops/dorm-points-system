import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createSyncToken, readSnapshot, replaceSnapshot, verifySyncToken, type SyncLog, type SyncStudent } from "./supabase";

const verifyRouterSyncToken = async (token: string) => {
  try {
    return await verifySyncToken(token);
  } catch {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Sync session expired" });
  }
};

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  sync: router({
    login: publicProcedure
      .input(z.object({ account: z.string(), password: z.string() }))
      .mutation(async ({ input }) => {
        const account = process.env.DORM_SYNC_ACCOUNT;
        const password = process.env.DORM_SYNC_PASSWORD;
        if (!account || !password || input.account !== account || input.password !== password) {
          throw new Error("帳戶號碼或帳戶密碼不正確");
        }
        return { token: await createSyncToken(input.account) };
      }),
    snapshot: publicProcedure
      .input(z.object({ token: z.string().min(1) }))
      .query(async ({ input }) => {
        await verifyRouterSyncToken(input.token);
        return readSnapshot();
      }),
    save: publicProcedure
      .input(z.object({
        token: z.string().min(1),
        students: z.array(z.object({ id: z.string().min(1), qrCode: z.string().trim().min(1).max(160), name: z.string().min(1), points: z.number().int().min(0), nfcCode: z.string().trim().min(1).max(160).optional() })),
        logs: z.array(z.object({ id: z.string().min(1), studentId: z.string().min(1), at: z.string(), item: z.string().min(1), delta: z.number().int().refine(value => value !== 0), balance: z.number().int().min(0) })),
      }))
      .mutation(async ({ input }) => {
        await verifyRouterSyncToken(input.token);
        return replaceSnapshot({ students: input.students as SyncStudent[], logs: input.logs as SyncLog[] });
      }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
