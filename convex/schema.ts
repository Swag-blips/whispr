import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    name: v.string(),
    photoUrl: v.string(),
    tokenIdentifier: v.string(),
    isOnline: v.boolean()
  })
    .index("by_userId", ["userId"])
    .index("by_tokenIdentifier", ["tokenIdentifier"]),

  messages: defineTable({
    senderId: v.id("users"),
    receiverId: v.id("users"),
    chatId: v.id("chats"),
    message: v.string(),
  }).index("by_chatId", ["chatId"]),

  userChats: defineTable({
    lastMessage: v.string(),
    lastMessageTime: v.number(),
    tokenIdentifier: v.string(),
    chatId: v.id("chats"),
    with: v.id("users"),
    userId: v.id("users"),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),

  chats: defineTable({
    participant1: v.id("users"),
    participant2: v.id("users"),
  }),
});
