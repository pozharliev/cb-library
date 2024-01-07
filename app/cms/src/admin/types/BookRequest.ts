export type BookRequestAction = "approve" | "decline";

export  type ActionHandler = (bookId: number, action: BookRequestAction) => Promise<void>;
