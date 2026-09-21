"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Xmark,
  PaperPlane,
  TrashBin,
  ArrowRotateLeft,
  ChevronDown,
} from "@gravity-ui/icons";

const QUICK_PROMPTS = [
  "🍳 Dim r alu diye ki banabo?",
  "🥛 Buttermilk er substitute ki?",
  "⚡ 15-minute quick ranna",
  "🥗 Healthy dinner ideas",
];

const INITIAL_BOT_MESSAGE = {
  id: "welcome",
  sender: "bot",
  text: "👋 **Hello! Ami ChefBot, apnar AI Cooking Assistant.**\n\nApni **Bangla, Banglish ba English**—je kono bhabe kotha bolte paren! Apnar fridge-e ki ache bolun ba kono recipe tips janun! 🍳",
  time: "Just now",
  matchedRecipes: [],
};

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_BOT_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/api/ai-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();

      const botReply = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: data.reply || "Sorry, I had trouble finding that recipe. Please try asking again!",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        matchedRecipes: data.matchedRecipes || [],
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "👨‍🍳 ChefBot is taking a short break. Please check your connection and try again.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_BOT_MESSAGE]);
  };

  // Helper to format bot markdown text (bold, links, newlines)
  const formatBotText = (text) => {
    if (!text) return "";
    return text.split("\n").map((line, lineIndex) => {
      // Bold parser
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={lineIndex} className="min-h-[1.2em]">
          {parts.map((part, partIndex) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={partIndex} className="font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            // Link markdown parser: [Name](/path)
            const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) {
              return (
                <Link
                  key={partIndex}
                  href={linkMatch[2]}
                  className="font-semibold text-[#E85D3D] underline hover:text-[#D14E30]"
                >
                  {linkMatch[1]}
                </Link>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-r from-[#E85D3D] to-[#F4A340] text-white shadow-xl ring-4 ring-white/80 transition-all duration-300 hover:scale-108 hover:shadow-2xl active:scale-95 dark:ring-[#252019] cursor-pointer"
          aria-label="Open AI ChefBot"
        >
          {/* Chef Hat Emoji / Icon */}
          <span className="text-2xl transition-transform duration-300 group-hover:rotate-12">
            👨‍🍳
          </span>

          {/* Unread notification ping */}
          {hasUnread && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full bg-amber-500 ring-2 ring-white dark:ring-[#252019]" />
            </span>
          )}

          {/* Hover Tooltip Pill */}
          <span className="pointer-events-none absolute right-16 hidden rounded-full bg-[#2B2420] px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block dark:bg-white dark:text-[#2B2420]">
            Ask ChefBot AI ✨
          </span>
        </button>
      )}

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="flex h-[550px] max-h-[85vh] w-[360px] flex-col overflow-hidden rounded-3xl border border-[#EAE0D3] bg-white shadow-2xl transition-all duration-300 animate-in zoom-in-95 sm:w-[410px] dark:border-[#3A332A] dark:bg-[#252019]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#EAE0D3] bg-linear-to-r from-[#FFF9F2] via-white to-[#FFF9F2] px-5 py-4 dark:border-[#3A332A] dark:from-[#1E1914] dark:via-[#252019] dark:to-[#1E1914]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-tr from-[#E85D3D] to-[#F4A340] text-lg text-white shadow-sm">
                👨‍🍳
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                    ChefBot AI
                  </h3>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
                </div>
                <p className="text-[11px] font-medium text-[#8C8276] dark:text-[#A89F93]">
                  Smart Culinary Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reset conversation"
                className="rounded-full p-2 text-stone-400 hover:bg-[#FFF9F2] hover:text-[#E85D3D] dark:hover:bg-[#1A1714] cursor-pointer"
              >
                <ArrowRotateLeft width={15} height={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                className="rounded-full p-2 text-stone-400 hover:bg-[#FFF9F2] hover:text-stone-700 dark:hover:bg-[#1A1714] dark:hover:text-stone-200 cursor-pointer"
              >
                <ChevronDown width={18} height={18} />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Bot Avatar */}
                {msg.sender === "bot" && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E85D3D]/10 text-xs text-[#E85D3D] dark:bg-[#E85D3D]/20">
                    👨‍🍳
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                    msg.sender === "user"
                      ? "rounded-tr-xs bg-[#E85D3D] text-white"
                      : "rounded-tl-xs border border-[#EAE0D3] bg-[#FFF9F2] text-[#2B2420] dark:border-[#3A332A] dark:bg-[#1A1714] dark:text-[#F4EDE4]"
                  }`}
                >
                  {msg.sender === "bot" ? (
                    <div className="space-y-2">{formatBotText(msg.text)}</div>
                  ) : (
                    <p>{msg.text}</p>
                  )}

                  {/* Matched Recipe Cards */}
                  {msg.matchedRecipes && msg.matchedRecipes.length > 0 && (
                    <div className="mt-3 space-y-2 border-t border-[#EAE0D3]/80 pt-2.5 dark:border-[#3A332A]">
                      <p className="text-[11px] font-bold text-[#8C8276] dark:text-[#A89F93]">
                        RECIPES FOUND ON RECIPELY:
                      </p>
                      {msg.matchedRecipes.map((rcp) => (
                        <Link
                          key={rcp.id}
                          href={`/all-recipes/${rcp.id}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2.5 rounded-xl border border-[#EAE0D3] bg-white p-2 transition-all hover:border-[#E85D3D] hover:shadow-xs dark:border-[#3A332A] dark:bg-[#252019]"
                        >
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-800">
                            {rcp.image ? (
                              <Image
                                src={rcp.image}
                                alt={rcp.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <span className="flex h-full w-full items-center justify-center text-xs">
                                🍳
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h5 className="truncate text-xs font-bold text-[#2B2420] dark:text-[#F4EDE4]">
                              {rcp.name}
                            </h5>
                            <p className="text-[10px] text-[#8C8276] dark:text-[#A89F93]">
                              {rcp.category} • {rcp.time || "20 mins"}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  <span
                    className={`mt-1.5 block text-[9px] text-right ${
                      msg.sender === "user" ? "text-white/70" : "text-stone-400"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E85D3D]/10 text-xs text-[#E85D3D]">
                  👨‍🍳
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-xs border border-[#EAE0D3] bg-[#FFF9F2] px-4 py-3 dark:border-[#3A332A] dark:bg-[#1A1714]">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#E85D3D] [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#E85D3D] [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#E85D3D]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestion Chips */}
          <div className="border-t border-[#EAE0D3]/60 bg-[#FFF9F2]/50 px-3 py-2 dark:border-[#3A332A] dark:bg-[#1A1714]/50">
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="shrink-0 rounded-full border border-[#EAE0D3] bg-white px-2.5 py-1 text-[11px] font-medium text-[#6B6155] transition-colors hover:border-[#E85D3D] hover:text-[#E85D3D] dark:border-[#3A332A] dark:bg-[#252019] dark:text-[#B8AFA2] cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 border-t border-[#EAE0D3] bg-white p-3 dark:border-[#3A332A] dark:bg-[#252019]"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Bangla, Banglish ba English-e likhun..."
              disabled={isLoading}
              className="flex-1 rounded-2xl border border-[#EAE0D3] bg-[#FFF9F2] px-4 py-2.5 text-xs sm:text-sm text-[#2B2420] placeholder-stone-400 transition-all focus:border-[#E85D3D] focus:bg-white focus:outline-none dark:border-[#3A332A] dark:bg-[#1A1714] dark:text-[#F4EDE4]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E85D3D] text-white shadow-sm transition-all hover:bg-[#D14E30] disabled:opacity-40 cursor-pointer"
            >
              <PaperPlane width={16} height={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
