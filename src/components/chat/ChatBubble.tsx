import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

interface ChatBubbleProps {
  message: Message;
  index: number;
}

const ChatBubble = ({ message, index }: ChatBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
      className={`flex gap-3 ${isUser ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-1 ${
          isUser
            ? "bg-primary/20 text-primary"
            : "bg-accent/20 text-accent"
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </motion.div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] md:max-w-[70%] px-5 py-3.5 ${
          isUser
            ? "glass-bubble-user rounded-2xl rounded-bl-md"
            : "glass-bubble-ai rounded-2xl rounded-br-md"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none text-inherit prose-headings:text-inherit prose-p:text-inherit prose-li:text-inherit prose-strong:text-inherit">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatBubble;
