import React from "react";
import { Message } from "@/types/chat";
import ReactMarkdown from "react-markdown";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const formatTime = (timestamp: Date) => {
    // Use a consistent time format to avoid hydration issues
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-4 py-2 ${
              message.role === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            }`}
          >
            <div className="text-sm prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
            <p className="text-xs opacity-70 mt-1">
              {formatTime(message.timestamp)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
