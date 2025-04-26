
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";

// Mock conversation data
const mockConversations = [
  {
    id: "conv1",
    user: {
      id: "user1",
      name: "Sarah Miller",
      photoUrl: "https://i.pravatar.cc/150?img=5",
    },
    lastMessage: {
      text: "Is the camera still available for this weekend?",
      timestamp: "10:30 AM",
      isRead: true,
    },
  },
  {
    id: "conv2",
    user: {
      id: "user2",
      name: "James Wilson",
      photoUrl: "https://i.pravatar.cc/150?img=12",
    },
    lastMessage: {
      text: "Great! I'll pick up the tools tomorrow at 5pm.",
      timestamp: "Yesterday",
      isRead: false,
    },
  },
  {
    id: "conv3",
    user: {
      id: "user3",
      name: "Emma Johnson",
      photoUrl: "https://i.pravatar.cc/150?img=9",
    },
    lastMessage: {
      text: "Thanks for the camping gear! Left you a 5-star review.",
      timestamp: "Monday",
      isRead: true,
    },
  },
];

// Mock messages for a conversation
const mockMessages = [
  {
    id: "msg1",
    senderId: "user1", // not current user
    text: "Hi there! I saw your camera listing and I'm interested in renting it.",
    timestamp: "10:15 AM",
  },
  {
    id: "msg2",
    senderId: "currentUser", // current user
    text: "Hello! Yes, it's still available. When would you need it?",
    timestamp: "10:20 AM",
  },
  {
    id: "msg3",
    senderId: "user1", // not current user
    text: "Is the camera still available for this weekend?",
    timestamp: "10:30 AM",
  },
];

const ConversationItem = ({
  conversation,
  isActive,
  onClick,
}: {
  conversation: typeof mockConversations[0];
  isActive: boolean;
  onClick: () => void;
}) => (
  <div
    className={`flex items-center p-3 cursor-pointer ${
      isActive ? "bg-muted" : ""
    }`}
    onClick={onClick}
  >
    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
      <img
        src={conversation.user.photoUrl}
        alt={conversation.user.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{conversation.user.name}</h3>
        <span className="text-xs text-muted-foreground">
          {conversation.lastMessage.timestamp}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <p
          className={`text-sm truncate max-w-[200px] ${
            !conversation.lastMessage.isRead ? "font-semibold" : "text-muted-foreground"
          }`}
        >
          {conversation.lastMessage.text}
        </p>
        {!conversation.lastMessage.isRead && (
          <div className="w-2 h-2 rounded-full bg-primary ml-2"></div>
        )}
      </div>
    </div>
  </div>
);

const MessageBubble = ({
  message,
  isSentByCurrentUser,
}: {
  message: typeof mockMessages[0];
  isSentByCurrentUser: boolean;
}) => (
  <div
    className={`flex mb-4 ${
      isSentByCurrentUser ? "justify-end" : "justify-start"
    }`}
  >
    <div
      className={`max-w-[70%] rounded-2xl py-2 px-4 ${
        isSentByCurrentUser
          ? "bg-primary text-primary-foreground rounded-tr-none"
          : "bg-secondary text-secondary-foreground rounded-tl-none"
      }`}
    >
      <p className="text-sm">{message.text}</p>
      <p
        className={`text-xs mt-1 ${
          isSentByCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground"
        }`}
      >
        {message.timestamp}
      </p>
    </div>
  </div>
);

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Check if a specific conversation was requested via URL params
  useEffect(() => {
    const userId = searchParams.get("user");
    if (userId) {
      const conv = mockConversations.find(c => c.user.id === userId);
      if (conv) {
        setActiveConversation(conv.id);
      }
    }
  }, [searchParams]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // In a real app, you would send this to a backend
    console.log("Sending message:", messageText);
    
    // Clear the input
    setMessageText("");
  };

  return (
    <div className="h-[calc(100vh-64px)]">
      {!activeConversation ? (
        <div className="app-container py-4">
          <h1 className="text-xl font-semibold mb-4">Messages</h1>
          <div className="divide-y">
            {mockConversations.map((conv) => (
              <ConversationItem
                key={conv.id}
                conversation={conv}
                isActive={activeConversation === conv.id}
                onClick={() => setActiveConversation(conv.id)}
              />
            ))}
          </div>
          {mockConversations.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No messages yet</p>
            </div>
          )}
        </div>
      ) : (
        <div className="h-full flex flex-col">
          <div className="border-b p-3 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveConversation(null)}
              className="mr-2"
            >
              <ArrowLeft size={20} />
            </Button>
            {(() => {
              const conv = mockConversations.find(c => c.id === activeConversation);
              return (
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                    <img
                      src={conv?.user.photoUrl}
                      alt={conv?.user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium">{conv?.user.name}</span>
                </div>
              );
            })()}
          </div>
          
          {/* Message list */}
          <div className="flex-1 overflow-y-auto p-4">
            {mockMessages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                isSentByCurrentUser={msg.senderId === "currentUser"}
              />
            ))}
          </div>
          
          {/* Message input */}
          <div className="border-t p-3 flex items-center gap-2">
            <Input
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <Button size="icon" onClick={handleSendMessage}>
              <Send size={18} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
