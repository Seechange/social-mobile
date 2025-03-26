import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    users: defineTable({
        username: v.string(),
        fullname: v.string(),
        email: v.string(),
        bio: v.optional(v.string()),
        image: v.string(),
        folower: v.number(),
        folowing: v.number(),
        posts: v.number(),
        clerkId: v.string()
    }).index("by_clerk_id", ["clerkId"]),

    posts: defineTable({
        userId: v.id("users"),
        storageId: v.id("_storage"),
        caption: v.optional(v.string()),
        likes: v.number(),
        comments: v.number(),
    }).index("by_user_id", ["userId"]),

    comments: defineTable({
        postId: v.id("posts"),
        userId: v.id("users"),
        comment: v.string(),
    }).index("by_post_id", ["postId"]),

    likes: defineTable({
        postId: v.id("posts"),
        userId: v.id("users"),
    }).index("by_post_id", ["postId"]).index("by_user_and_post", ["userId", "postId"]),

    folows: defineTable({
        folowerId: v.id("users"),
        folowingId: v.id("users"),
    }).index("by_folower_id", ["folowerId"]).index("by_folowing_id", ["folowingId"]).index("by_folower_and_folowing", ["folowerId", "folowingId"]),

    notifications: defineTable({
        receiverId: v.id("users"),
        senderId: v.id("users"),
        postId: v.optional(v.id("posts")),
        commentId: v.optional(v.id("comments")),
        type: v.union(v.literal("like"), v.literal("follow"), v.literal("comment")),
    }).index("by_receiver", ["receiverId"]),

    bookmarks: defineTable({
        postId: v.id("posts"),
        userId: v.id("users"),
    }).index("by_post_id", ["postId"]).index("by_user_and_post", ["userId", "postId"]).index("by_user", ["userId"]),

})