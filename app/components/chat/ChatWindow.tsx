import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import type { Chat } from "@/lib/types";
import { RefreshCw, MessageSquarePlus, Sparkles } from "lucide-react";

interface ChatWindowProps {
  chat: Chat | null;
  onSendMessage: (content: string) => Promise<void>;
  onRestartChat: () => void;
  onCreateChat: () => void;
}

export function ChatWindow({
  chat,
  onSendMessage,
  onRestartChat,
  onCreateChat,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  // Empty state when no chat is selected
  if (!chat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="glass glow-border rounded-2xl p-8 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Welcome to Chat</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Start a new conversation or select an existing chat from the sidebar.
          </p>
          <Button
            onClick={onCreateChat}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            <MessageSquarePlus className="w-4 h-4" />
            New Chat
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <h2 className="font-medium truncate max-w-[200px] md:max-w-[400px]">
            {chat.title}
          </h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRestartChat}
          className="text-muted-foreground hover:text-foreground hover:bg-muted/50 gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Restart</span>
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4" ref={scrollRef}>
        <div className="py-4 space-y-4 max-w-4xl mx-auto">
          {chat.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageSquarePlus className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                No messages yet. Start the conversation!
              </p>
            </div>
          ) : (
            chat.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <ChatInput onSend={onSendMessage} />
    </div>
  );
}
