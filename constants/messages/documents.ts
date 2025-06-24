

export enum DocumentMessageKey {
  Create = "create",
}

export const documentMessages: Record<DocumentMessageKey, ToastMessage> = {
  [DocumentMessageKey.Create]: {
    loading: "Creating note...",
    success: "Note created successfully",
    error: "Failed to create note"
  },
};
