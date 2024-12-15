import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getChat = mutation({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    const chat = await ctx.db.get(args.chatId);

    return chat;
  },
});
