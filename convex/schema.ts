import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    name: v.string(),
    photoUrl: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_userId", ["userId"]),

  messages: defineTable({
    senderId: v.string(),
    receiverId: v.string(),
    conversationKey: v.string(),
    message: v.string(),
  }).index("by_conversationKey", ["conversationKey"]),

  userChats: defineTable({
    
  })
});
