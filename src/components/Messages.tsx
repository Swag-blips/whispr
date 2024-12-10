import { useQuery } from "convex/react";
import MessageInput from "./MessageInput";
import receiverImg from "/assets/john_doe.jpg";
import { api } from "../../convex/_generated/api";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const Messages = () => {
  const { id: conversationKey } = useParams();

  if (!conversationKey) {
    return;
  }
  const messages = useQuery(api.messages.getMessages, { conversationKey });
  const { userId } = useAuth();
  console.log(messages);

  return (
    <main className="px-6 relative mt-6">
      <div className="flex flex-col gap-6 justify-center">
        {messages?.map((message) => (
          <>
            <div
              className={`flex items-end gap-6 ${message.senderId === userId ? "justify-end" : ""}`}
            >
              <img
                src={receiverImg}
                alt="profile-img"
                className={`w-12 h-12 object-cover rounded-full ${message.senderId === userId ? "hidden" : ""}`}
              />
              <div>
                <div
                  className={`bg-[#1E2126] max-w-[300px] py-4 px-4 rounded-lg`}
                >
                  <p className="text-xs break-words leading-[20px] text-white ">
                    {message.message}
                  </p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>

      <MessageInput />
    </main>
  );
};

export default Messages;
