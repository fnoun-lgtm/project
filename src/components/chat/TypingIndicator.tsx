import { motion } from "framer-motion";
import { Bot } from "lucide-react";

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex gap-3 flex-row-reverse"
  >
    <div className="w-9 h-9 rounded-xl bg-accent/20 text-accent flex items-center justify-center shrink-0 mt-1">
      <Bot className="w-4 h-4" />
    </div>
    <div className="glass-bubble-ai rounded-2xl rounded-br-md px-5 py-4 flex gap-1.5 items-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-muted-foreground/60"
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  </motion.div>
);

export default TypingIndicator;
