import { v } from "convex/values";
import { mutation } from "./_generated/server";

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
      message:args.message
    });
  },
});
