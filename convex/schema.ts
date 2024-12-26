import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    name: v.string(),
    photoUrl: v.string(),
    tokenIdentifier: v.string(),
    isOnline: v.boolean(),
  })
    .index("by_userId", ["userId"])
    .index("by_tokenIdentifier", ["tokenIdentifier"]),

  messages: defineTable({
    senderId: v.string(),
    receiverId: v.string(),
    chatId: v.id("chats"),
    message: v.optional(v.string()),
    image: v.optional(v.id("_storage")),
    format: v.string()
  }).index("by_chatId", ["chatId"]),

  userChats: defineTable({
    lastMessage: v.string(),
    lastMessageTime: v.number(),
    chatId: v.id("chats"),
    with: v.string(),
    userId: v.string(),
  }).index("by_userId", ["userId"]),

  chats: defineTable({
    participant1: v.string(),
    participant2: v.string(),
  }),

  friendRequests: defineTable({
    from: v.string(),
    to: v.string(),
    toHasRead: v.boolean(),
  }).index("by_receiver", ["to"]),
});
