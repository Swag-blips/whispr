import { useQuery } from "convex/react";
import MessageInput from "./MessageInput";
import { api } from "../../convex/_generated/api";
import { useParams } from "react-router-dom";

import { useEffect, useRef } from "react";
import useChatStore from "../store/useChatStore";
import { Id } from "../../convex/_generated/dataModel";
import useUserStore from "../store/useUserStore";

interface Params {
  id: Id<"chats">;
}

const Messages = () => {
  const { id: chatId } = useParams<keyof Params>() as Params;

  if (!chatId) {
    return;
  }
  const messages = useQuery(api.messages.getMessages, {
    chatId,
  });

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const { loading, setLoading } = useChatStore();
  const { user: authUser } = useUserStore();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (loading) {
      setLoading();
    }
  }, [messages]);

  return (
    <>
      <main className="px-6 relative mt-6">
        <div className="flex flex-col gap-6 justify-center">
          {messages?.map((message) => (
            <>
              <div
                className={`flex items-end gap-6 last:mb-[86px] ${message.senderId === authUser.userId ? "justify-end" : ""}`}
              >
                <img
                  src={message.receiver?.photoUrl}
                  alt="profile-img"
                  className={`w-12 h-12 object-cover rounded-full ${message.senderId === authUser.userId ? "hidden" : ""}`}
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
        <div ref={messagesEndRef} className="end" />
      </main>
      <MessageInput />
    </>
  );
};

export default Messages;
