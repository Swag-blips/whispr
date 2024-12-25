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
      toHasRead: false,
    });
  },
});

export const updateLatestFriendRequest = mutation({
  args: { notificationId: v.id("friendRequests") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("You need to be authenticated to perform this action");
    }

    await ctx.db.patch(args.notificationId, { toHasRead: true });
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

    if (!friendRequests.length) {
      return "No friend Requests";
    }

    return Promise.all(
      friendRequests.map(async (friend) => {
        const user = await ctx.db
          .query("users")
          .withIndex("by_userId", (q) => q.eq("userId", friend.from))
          .unique();

        return {
          ...friend,
          user,
        };
      })
    );
  },
});

export const handleRejectRequest = mutation({
  args: { friendRequestId: v.id("friendRequests") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("You need to be authenticated to perform this action");
    }

    await ctx.db.delete(args.friendRequestId);
  },
});
