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
    });
  },
});

export const getAuthUser = query({
  args: {},
  handler: async (ctx, args) => {
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

export const getChatUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    return user;
  },
});

export const createUserChats = mutation({
  args: {
    adderId: v.id("users"),
    toBeAddedId: v.id("users"),
    toBeAddedTokenidentifier: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Must be authenticated");
    }

    const chat = await ctx.db.insert("chats", {
      participant1: args.adderId,
      participant2: args.toBeAddedId,
    });

    await ctx.db.insert("userChats", {
      userId: args.adderId,
      lastMessage: "",
      lastMessageTime: 0,
      with: args.toBeAddedId,
      tokenIdentifier: identity.tokenIdentifier,
      chatId: chat,
    });

    await ctx.db.insert("userChats", {
      userId: args.toBeAddedId,
      lastMessage: "",
      lastMessageTime: 0,
      with: args.adderId,
      tokenIdentifier: args.toBeAddedTokenidentifier,
      chatId: chat,
    });
  },
});

export const getUserChats = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Must be authenticated");
    }

    const userChats = await ctx.db
      .query("userChats")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .order("desc")
      .take(100);

    return Promise.all(
      userChats.map(async (user) => {
        const receiver = await ctx.db
          .query("users")
          .withIndex("by_id", (q) => q.eq("_id", user.with))
          .unique();

        return {
          ...user,
          receiver,
        };
      })
    );
  },
});
