import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const message = mutation({
  args: {
    senderId: v.string(),
    receiverId: v.string(),
    conversationKey: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      senderId: args.senderId,
      receiverId: args.receiverId,
      conversationKey: args.conversationKey,
      message: args.message,
    });
  },
});

export const getMessages = query({
  args: { conversationKey: v.string(), receiverId: v.string() },
  handler: async (ctx, args) => {
    const receiver = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.receiverId))
      .unique();

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversationKey", (q) =>
        q.eq("conversationKey", args.conversationKey)
      )
      .order("desc")
      .take(100);

    return Promise.all(
      messages
        .map(async (message) => ({
          ...message,
          receiver,
        }))
        .reverse()
    );
  },
});
