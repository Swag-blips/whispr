import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const message = mutation({
  args: {
    image: v.optional(v.id("_storage")),
    format: v.optional(v.string()),
    receiverId: v.optional(v.string()),
    chatId: v.id("chats"),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const chat = await ctx.db.get(args.chatId);

    if (!identity) {
      throw new Error("You need to be authenticated to perform this action");
    }
    if (!chat) {
      throw new Error("Chat does not exist");
    }
    await ctx.db.insert("messages", {
      senderId: identity.subject,
      image: args.image,
      format: args.image ? "image" : "",
      receiverId: args.receiverId,
      chatId: args.chatId,
      message: args.message,
    });

    await ctx.db.patch(args.chatId, {
      lastMessage: args.message,
      lastMessageTime: new Date().getTime(),
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

    return Promise.all(
      messages
        .map(async (message) => {
          const receiver = await ctx.db
            .query("users")
            .withIndex("by_userId", (q) => q.eq("userId", message.senderId))
            .unique();

          let image;
          if (message.format === "image") {
            image = await ctx.storage.getUrl(message.image!);
          }

          return {
            ...message,
            receiver,
            image,
          };
        })
        .reverse()
    );
  },
});
