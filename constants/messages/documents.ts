export enum DocumentMessageKey {
  Create = "create",
  Archive = "archive",
  Restore = "restore",
  Remove = "remove",
  Duplicate = "duplicate",
  Update = "update",
  RemoveCoverImage = "removeCoverImage",
}

export const documentMessages: Record<DocumentMessageKey, ToastMessage> = {
  [DocumentMessageKey.Create]: {
    loading: "Creating note...",
    success: "Note created successfully",
    error: "Failed to create note",
  },
  [DocumentMessageKey.Archive]: {
    loading: "Move to trash...",
    success: "Move to trash successfully",
    error: "Move to trash failed",
  },
  [DocumentMessageKey.Restore]: {
    loading: "Restore note...",
    success: "Restore note successfully",
    error: "Restore note failed",
  },
  [DocumentMessageKey.Remove]: {
    loading: "Remove note...",
    success: "Remove note successfully",
    error: "Remove note failed",
  },
  [DocumentMessageKey.Duplicate]: {
    loading: "Duplicate note...",
    success: "Duplicate note successfully",
    error: "Duplicate note failed",
  },
  [DocumentMessageKey.Update]: {
    loading: "Update note...",
    success: "Update note successfully",
    error: "Update note failed",
  },
  [DocumentMessageKey.RemoveCoverImage]: {
    loading: "Remove cover image...",
    success: "Remove cover image successfully",
    error: "Remove cover image failed",
  },
};
