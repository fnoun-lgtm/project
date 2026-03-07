import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (val: string) => void;
  onSend: () => void;
}

const ChatInput = ({ input, isLoading, onInputChange, onSend }: ChatInputProps) => (
  <div className="relative z-10 p-4 pb-6">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSend();
      }}
      className="max-w-3xl mx-auto"
    >
      <div className="glass-card rounded-2xl p-1.5 flex gap-2 items-end">
        <input
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="اكتب فكرتك هنا..."
          className="flex-1 bg-transparent border-none px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60"
          disabled={isLoading}
        />
        <motion.button
          type="submit"
          disabled={isLoading || !input.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>
    </form>
  </div>
);

export default ChatInput;
