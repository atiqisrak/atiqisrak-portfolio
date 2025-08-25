"use client";

import React, { useState, useRef, useEffect } from "react";
import MessageList from "@/components/Assistant/MessageList";
import ChatInput from "@/components/Assistant/ChatInput";
import AIHeader from "@/components/Assistant/AIHeader";
import { generateIntelligentResponse } from "@/components/Assistant/AIResponseGenerator";
import { fetchAIData } from "@/components/Assistant/AIDataFetcher";
import { Message } from "@/types/chat";

const AIPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm Atiq Israk, your AI portfolio assistant. I can help you learn about my projects, skills, and experience. I remember our conversations, so feel free to ask follow-up questions or dive deeper into any topic we discuss. What would you like to know?",
      role: "assistant",
      timestamp: new Date("2024-01-01T00:00:00Z"),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Fetch all data using the extracted function
      const { projects, skills, experience } = await fetchAIData(content);

      // Get chat history for context, with smart summarization for long conversations
      let chatHistory = "";
      if (messages.length > 10) {
        // For long conversations, create a summary of key topics
        const recentMessages = messages.slice(-8);
        const summary = `Conversation summary: We've discussed ${
          recentMessages.filter((m) => m.role === "user").length
        } topics including projects, skills, and experience. Recent focus: ${recentMessages
          .slice(-3)
          .map((m) => m.content.substring(0, 50))
          .join(", ")}...`;
        chatHistory =
          summary +
          "\n\nRecent messages:\n" +
          recentMessages.map((msg) => `${msg.role}: ${msg.content}`).join("\n");
      } else {
        // For shorter conversations, use all messages
        const recentMessages = messages.slice(-5);
        chatHistory = recentMessages
          .map((msg) => `${msg.role}: ${msg.content}`)
          .join("\n");
      }

      // Generate intelligent response using the extracted function with chat history
      const responseContent = await generateIntelligentResponse(
        content,
        projects,
        skills,
        experience,
        chatHistory
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error processing message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm sorry, I encountered an error while processing your request. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <AIHeader />

          <div className="flex flex-col h-96">
            <MessageList messages={messages} />
            <div ref={messagesEndRef} />
          </div>

          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default AIPage;
