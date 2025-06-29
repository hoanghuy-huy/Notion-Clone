export enum DocumentMessageKey {
  Create = "create",
  Archive = "archive",
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
};
