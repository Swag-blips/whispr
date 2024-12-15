import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const message = mutation({
  args: {
    senderId: v.id("users"),
    receiverId: v.id("users"),
    chatId: v.id("chats"),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      senderId: args.senderId,
      receiverId: args.receiverId,
      chatId: args.chatId,
      message: args.message,
    });
  },
});

export const getMessages = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
      .order("desc")
      .take(100);

    return messages.reverse();
  },
});
