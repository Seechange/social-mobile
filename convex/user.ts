import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
    args: {
        username: v.string(),
        fullname: v.string(),
        email: v.string(),
        bio: v.optional(v.string()),
        image: v.string(),
        clerkId: v.string()
    },

    handler: async (ctx, args) => {
        const checkUser = await ctx.db.query("users").withIndex("by_clerk_id").filter((q) => q.eq("clerkId", args.clerkId)).first()
        if (checkUser) return
        await ctx.db.insert("users", {
            username: args.username,
            fullname: args.fullname,
            email: args.email,
            bio: args.bio,
            image: args.image,
            clerkId: args.clerkId,
            folower: 0,
            folowing: 0,
            posts: 0
        })
    }
})