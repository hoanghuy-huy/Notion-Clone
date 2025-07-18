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

    if (!existingDocument) return null;

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

    if (!existingDocument) return null;

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

    if (!existingDocument) return null;

    if (existingDocument.userId !== userId) throw new Error("Unauthorized");

    return await ctx.db.delete(args.id);
  },
});

export const getDocumentById = query({
  args: {
    idDocument: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const document = await ctx.db.get(args.idDocument);

    if (!document) return null;

    if (document.userId !== userId) throw new Error("Unauthorized");

    if (document.isPublished && document.isArchived) return document;

    return document;
  },
});

export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthenticated");

    const userId = identity.subject;

    const { id, ...rest } = args;

    const existingDocument = await ctx.db.get(id);

    if (!existingDocument) return null;

    if (existingDocument.userId !== userId) throw new Error("Unauthorized");

    const document = await ctx.db.patch(id, { ...rest });

    return document;
  },
});

export const removeIcon = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) return null;

    if (existingDocument.userId !== userId) throw new Error("Unauthorized");

    const document = await ctx.db.patch(args.id, { icon: undefined });

    return document;
  },
});

export const duplicate = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    // Lấy document gốc
    const original = await ctx.db.get(args.id);
    if (!original) return null;

    if (original.userId !== userId) throw new Error("Unauthorized");

    // Hàm đệ quy để sao chép document và các con của nó
    const duplicateDocument = async (
      document: Doc<"documents">,
      parentId?: Id<"documents">
    ): Promise<Id<"documents">> => {
      const newDocumentId = await ctx.db.insert("documents", {
        title: document.title,
        content: document.content,
        coverImage: document.coverImage,
        icon: document.icon,
        isPublished: document.isPublished,
        isArchived: document.isArchived,
        userId: userId,
        parentDocument: parentId ?? undefined,
      });

      // Lấy tất cả documents con
      const children = await ctx.db
        .query("documents")
        .withIndex("byParentId", (q) =>
          q.eq("userId", userId).eq("parentDocument", document._id)
        )
        .collect();

      // Nhân bản từng document con
      for (const child of children) {
        await duplicateDocument(child, newDocumentId);
      }

      return newDocumentId;
    };

    // Gọi đệ quy từ document gốc
    const newDocId = await duplicateDocument(original, original.parentDocument);

    return { newId: newDocId };
  },
});

export const removeCoverImage = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) return null;

    if (existingDocument.userId !== userId) throw new Error("Unauthorized");

    const document = await ctx.db.patch(args.id, { coverImage: undefined });

    return document;
  },
});
