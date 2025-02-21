import { Id } from "../../convex/_generated/dataModel";

export interface User {
  _id: Id<"users">;
  _creationTime: number;
  userId: string;
  name: string;
  photoUrl: string;
  tokenIdentifier: string;
  isOnline: boolean;
}
export interface UserChats {
  firstname: string;
  lastname: string;
  lastMessage: string;
  timeOfLastMessage: string;
  image: string;
}

export interface Chat {
  type: string;

  lastMessage: string;
  lastMessageTime: number;
  _creationTime: number;

  admin?: string | undefined;
  groupName?: string | undefined;
  participant1?: string | undefined;
  participant2?: string | undefined;
  participants?: string[] | undefined;
  _id: Id<"chats">;
}

export interface Receiver {
  name: string;
  photoUrl: string;
  tokenIdentifier: string;
  userId: string;
  _creationTime: number;
  _id: Id<"users">;
}
