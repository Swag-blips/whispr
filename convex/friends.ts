import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const sendFriendRequest = mutation({
  args: { from: v.id("users"), to: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.insert("friendRequests", {
      from: args.from,
      to: args.to,
    });
  },
});

export const fetchFriendRequests = query({
  args: { to: v.id("users") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("You need to be authenticated to perform this action");
    }

    const friendRequests = await ctx.db
      .query("friendRequests")
      .withIndex("by_receiver", (q) => q.eq("to", args.to))
      .collect();

    return friendRequests;
  },
});
