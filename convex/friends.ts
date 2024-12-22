import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const sendFriendRequest = mutation({
  args: { to: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("You need to be authenticated to perform this action");
    }
    await ctx.db.insert("friendRequests", {
      from: identity.subject,
      to: args.to,
    });
  },
});

export const fetchFriendRequests = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("You need to be authenticated to perform this action");
    }

    const friendRequests = await ctx.db
      .query("friendRequests")
      .withIndex("by_receiver", (q) => q.eq("to", identity.subject))
      .collect();

    return friendRequests;
  },
});
