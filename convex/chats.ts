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
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.userId) {
      const user = await ctx.db
        .query("users")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId!))
        .unique();
      return user;
    } else {
      return;
    }
  },
});

export const createUserChats = mutation({
  args: {
    toBeAddedId: v.string(),
    friendRequestId: v.id("friendRequests"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Must be authenticated");
    }

    const chat = await ctx.db.insert("chats", {
      participant1: identity.subject,
      participant2: args.toBeAddedId,
    });

    await ctx.db.insert("userChats", {
      userId: identity.subject,
      lastMessage: "",
      lastMessageTime: 0,
      with: args.toBeAddedId,
      chatId: chat,
    });

    await ctx.db.insert("userChats", {
      userId: args.toBeAddedId,
      lastMessage: "",
      lastMessageTime: 0,
      with: identity.subject,
      chatId: chat,
    });

    await ctx.db.delete(args.friendRequestId);
  },
});

export const getUserChats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Must be authenticated");
    }

    const userChats = await ctx.db
      .query("userChats")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .take(100);

    return Promise.all(
      userChats.map(async (user) => {
        const receiver = await ctx.db
          .query("users")
          .withIndex("by_userId", (q) => q.eq("userId", user.with))
          .unique();

        return {
          ...user,
          receiver,
        };
      })
    );
  },
});
