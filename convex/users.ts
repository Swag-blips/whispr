import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .unique();

    if (user !== null) {
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name });
      }
      return user._id;
    }

    return await ctx.db.insert("users", {
      userId: identity.subject,
      photoUrl: identity.pictureUrl ?? "Anonymous",
      name: identity.name ?? "Anonymous",
      tokenIdentifier: identity.tokenIdentifier,
      isOnline: false,
    });
  },
});

export const getAuthUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Must be authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    return user;
  },
});

export const getUser = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Must be authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("name"), args.name))
      .collect();

    if (!user.length) {
      return "No user found";
    }

    return user;
  },
});

export const updateUserStatus = mutation({
  args: { status: v.boolean() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Must be authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .unique();

    if (!user) {
      throw new Error("user not found");
    }
    await ctx.db.patch(user._id, { isOnline: args.status });
  },
});
