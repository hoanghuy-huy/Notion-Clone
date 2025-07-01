export enum DocumentMessageKey {
  Create = "create",
  Archive = "archive",
  Restore = "restore",
  Remove = "remove",
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
};
