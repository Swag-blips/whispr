import { Id } from "../../convex/_generated/dataModel";

export interface UserChats {
  firstname: string;
  lastname: string;
  lastMessage: string;
  timeOfLastMessage: string;
  image: string;
}

export interface Chat {
  conversationKey: string;
  message: string;
  receiver: Receiver | null;
  receiverId: string;
  senderId: string;
  _creationTime: number;
  _id: Id<"messages">;
}

interface Receiver {
  name: string;
  photoUrl: string;
  tokenIdentifier: string;
  userId: string;
  _creationTime: number;
  _id: Id<"users">;
}
