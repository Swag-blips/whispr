import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getChat = mutation({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    const chat = await ctx.db.get(args.chatId);

    return chat;
  },
});

export const getChatUser = mutation({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    if (args.userId) {
      const user = await ctx.db.get(args.userId);
      return user;
    } else {
      return;
    }
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
