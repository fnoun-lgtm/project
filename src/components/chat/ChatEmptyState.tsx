import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ChatEmptyStateProps {
  onSuggestionClick: (text: string) => void;
}

const suggestions = [
  "تطبيق توصيل أكل صحي للموظفين",
  "منصة تعليمية للأطفال",
  "An app for freelancer invoicing",
];

const ChatEmptyState = ({ onSuggestionClick }: ChatEmptyStateProps) => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-8 px-4">
    {/* Animated logo */}
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative"
    >
      <div className="w-24 h-24 rounded-3xl glass-card flex items-center justify-center">
        <Sparkles className="w-10 h-10 text-primary" />
      </div>
      {/* Glow ring */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 border-primary/30"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-3"
    >
      <h2 className="text-3xl font-black">
        أهلاً! وش <span className="text-primary">فكرتك</span>؟ 💡
      </h2>
      <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed text-sm">
        اكتب فكرتك بأي طريقة تبغى — بالعربي أو الإنجليزي — وأنا بساعدك أرتّبها وأحوّلها لتقرير جاهز
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex flex-wrap gap-3 justify-center max-w-lg"
    >
      {suggestions.map((s, i) => (
        <motion.button
          key={s}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + i * 0.1 }}
          onClick={() => onSuggestionClick(s)}
          className="px-5 py-2.5 rounded-2xl glass-card text-sm hover:border-primary/40 transition-all cursor-pointer"
        >
          {s}
        </motion.button>
      ))}
    </motion.div>
  </div>
);

export default ChatEmptyState;
