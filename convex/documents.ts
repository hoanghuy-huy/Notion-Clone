import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const get = query({
  args: { parentDocument: v.optional(v.id("documents")) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("byParentId", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();
    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      userId,
      title: args.title,
      parentDocument: args.parentDocument,
      isArchived: false,
      isPublished: false,
    });

    return document;
  },
});

export const archive = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) throw new Error("Document not found");

    if (existingDocument.userId !== userId) throw new Error("Unauthorized");

    const recursiveArchive = async (id: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("byParentId", (q) =>
          q.eq("userId", userId).eq("parentDocument", id)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, { isArchived: true });
        await recursiveArchive(child._id);
      }
    };

    const document = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    await recursiveArchive(args.id);

    return document;
  },
});

export const restore = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) throw new Error("Document not found");

    if (existingDocument.userId !== userId) throw new Error("Unauthorized");

    const recursiveRestore = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("byParentId", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, { isArchived: false });
        await recursiveRestore(child._id);
      }
    };
    const options: Partial<Doc<"documents">> = { isArchived: false };

    if (existingDocument.parentDocument) {
      const parent = await ctx.db.get(existingDocument.parentDocument);
      if (parent?.isArchived) {
        options.parentDocument = undefined;
      }
    }

    await ctx.db.patch(args.id, options);

    await recursiveRestore(args.id);

    return existingDocument;
  },
});

export const getTrash = query({
  args: {
    id: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("byUserId", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return documents;
  },
});

export const remove = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) throw new Error("Document not found");

    if (existingDocument.userId !== userId) throw new Error("Unauthorized");

    const recursiveRemove = async (id: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("byParentId", (q) =>
          q.eq("userId", userId).eq("parentDocument", id)
        )
        .collect();

      for (const child of children) {
        await ctx.db.delete(child._id);
        await recursiveRemove(child._id);
      }
    };

    await recursiveRemove(args.id);

    return await ctx.db.delete(args.id);
  },
});

export const getOne = query({
  args: {
    idDocument: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const document = await ctx.db.get(args.idDocument);

    if (!document) throw new Error("Document not found");

    if (document.userId !== userId) throw new Error("Unauthorized");

    return document;
  },
});
