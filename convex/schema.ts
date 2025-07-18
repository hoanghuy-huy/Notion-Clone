import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    userId: v.string(),
    title: v.string(),
    content: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
    isArchived: v.boolean(),
    parentDocument: v.optional(v.id("documents")),
    coverImage: v.optional(v.string()),
  })
    .index("byUserId", ["userId"])
    .index("byParentId", ["userId", "parentDocument"]),
});
