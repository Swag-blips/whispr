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
    receiverId: v.optional(v.string()),
    chatId: v.id("chats"),
    message: v.optional(v.string()),
    image: v.optional(v.id("_storage")),
    format: v.string(),
  }).index("by_chatId", ["chatId"]),

  userChats: defineTable({
    chatId: v.id("chats"),
    with: v.optional(v.string()),
    userId: v.string(),
    groupPic: v.optional(v.string()),
  }).index("by_userId", ["userId"]),

  chats: defineTable({
    type: v.string(),
    admin: v.optional(v.string()),
    groupName: v.optional(v.string()),
    participant1: v.optional(v.string()),
    participant2: v.optional(v.string()),
    participants: v.optional(v.array(v.string())),
    lastMessage: v.string(),
    lastMessageTime: v.number(),
  }),

  friendRequests: defineTable({
    from: v.string(),
    to: v.string(),
    toHasRead: v.boolean(),
  }).index("by_receiver", ["to"]),
});
