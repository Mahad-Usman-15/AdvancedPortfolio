import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Chat } from "@/lib/types";
import {
  MessageSquarePlus,
  Menu,
  MoreVertical,
  Pencil,
  Trash2,
  Check,
  X,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";

interface ChatSidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onCreateChat: () => void;
  onDeleteChat: (chatId: string) => void;
  onRenameChat: (chatId: string, newTitle: string) => void;
}

function ChatItem({
  chat,
  isActive,
  onSelect,
  onDelete,
  onRename,
}: {
  chat: Chat;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onRename: (newTitle: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(chat.title);

  const handleSaveRename = () => {
    if (editTitle.trim()) {
      onRename(editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleCancelRename = () => {
    setEditTitle(chat.title);
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        "sidebar-item group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all",
        isActive && "active bg-primary/10"
      )}
      onClick={() => !isEditing && onSelect()}
    >
      <MessageSquare className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
      
      {isEditing ? (
        <div className="flex-1 flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="h-7 text-sm bg-muted/50 border-border/50"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveRename();
              if (e.key === "Escape") handleCancelRename();
            }}
            autoFocus
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleSaveRename}
          >
            <Check className="w-3 h-3 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleCancelRename}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{chat.title}</p>
            <p className="text-[10px] text-muted-foreground">
              {format(new Date(chat.updatedAt), "MMM d, h:mm a")}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass border-border/50">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="gap-2 cursor-pointer"
              >
                <Pencil className="w-4 h-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="gap-2 cursor-pointer text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
}

// Desktop sidebar component
function DesktopSidebar({
  chats,
  activeChatId,
  onSelectChat,
  onCreateChat,
  onDeleteChat,
  onRenameChat,
}: ChatSidebarProps) {
  return (
    <div className="hidden md:flex w-72 flex-col border-r border-border/50 bg-sidebar">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h1 className="font-semibold glow-text">Chat App</h1>
        </div>
        <Button
          onClick={onCreateChat}
          className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 gap-2"
        >
          <MessageSquarePlus className="w-4 h-4" />
          New Chat
        </Button>
      </div>

      {/* Chat list */}
      <ScrollArea className="flex-1 px-2 py-2 scrollbar-thin">
        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center px-4">
            <MessageSquare className="w-8 h-8 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">No chats yet</p>
            <p className="text-xs text-muted-foreground/70">Create a new chat to get started</p>
          </div>
        ) : (
          <div className="space-y-1">
            {chats.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                isActive={chat.id === activeChatId}
                onSelect={() => onSelectChat(chat.id)}
                onDelete={() => onDeleteChat(chat.id)}
                onRename={(newTitle) => onRenameChat(chat.id, newTitle)}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

// Mobile sidebar (Sheet)
function MobileSidebar({
  chats,
  activeChatId,
  onSelectChat,
  onCreateChat,
  onDeleteChat,
  onRenameChat,
}: ChatSidebarProps) {
  const [open, setOpen] = useState(false);

  const handleSelectChat = (chatId: string) => {
    onSelectChat(chatId);
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-3 left-3 z-50 glass glow-border-subtle"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0 bg-sidebar border-border/50">
          <SheetHeader className="p-4 border-b border-border/50">
            <SheetTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="glow-text">Chat App</span>
            </SheetTitle>
          </SheetHeader>

          <div className="p-4 border-b border-border/50">
            <Button
              onClick={() => {
                onCreateChat();
                setOpen(false);
              }}
              className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 gap-2"
            >
              <MessageSquarePlus className="w-4 h-4" />
              New Chat
            </Button>
          </div>

          <ScrollArea className="flex-1 h-[calc(100vh-160px)] px-2 py-2 scrollbar-thin">
            {chats.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                <MessageSquare className="w-8 h-8 text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground">No chats yet</p>
              </div>
            ) : (
              <div className="space-y-1">
                {chats.map((chat) => (
                  <ChatItem
                    key={chat.id}
                    chat={chat}
                    isActive={chat.id === activeChatId}
                    onSelect={() => handleSelectChat(chat.id)}
                    onDelete={() => onDeleteChat(chat.id)}
                    onRename={(newTitle) => onRenameChat(chat.id, newTitle)}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function ChatSidebar(props: ChatSidebarProps) {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  );
}
