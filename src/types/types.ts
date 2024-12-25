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
  participant1: string;
  participant2: string;
  _creationTime: number;
  _id: Id<"chats">;
}

interface Receiver {
  name: string;
  photoUrl: string;
  tokenIdentifier: string;
  userId: string;
  _creationTime: number;
  _id: Id<"users">;
}
