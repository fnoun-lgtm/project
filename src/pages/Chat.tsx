import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { motion } from "framer-motion";
import ChatBackground from "@/components/chat/ChatBackground";
import ChatBubble from "@/components/chat/ChatBubble";
import ChatEmptyState from "@/components/chat/ChatEmptyState";
import ChatInput from "@/components/chat/ChatInput";
import TypingIndicator from "@/components/chat/TypingIndicator";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (resp.status === 429) { onError("عدد الطلبات كثير، حاول مرة ثانية بعد شوي ⏳"); return; }
  if (resp.status === 402) { onError("الرصيد خلص، تحتاج تشحن رصيدك 💳"); return; }
  if (!resp.ok || !resp.body) { onError("حصل خطأ، حاول مرة ثانية 🔄"); return; }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let done = false;

  while (!done) {
    const { done: readerDone, value } = await reader.read();
    if (readerDone) break;
    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { done = true; break; }
      try {
        const parsed = JSON.parse(json);
        const c = parsed.choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch {
        buffer = line + "\n" + buffer;
        break;
      }
    }
  }

  if (buffer.trim()) {
    for (let raw of buffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (!raw.startsWith("data: ")) continue;
      const json = raw.slice(6).trim();
      if (json === "[DONE]") continue;
      try {
        const p = JSON.parse(json);
        const c = p.choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch {}
    }
  }
  onDone();
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Detect when report is ready (assistant messages > 4 and last message is long)
  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const canShowReport = lastAssistant && lastAssistant.content.length > 500 && !isLoading;

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let soFar = "";
    const upsert = (chunk: string) => {
      soFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: soFar } : m));
        }
        return [...prev, { role: "assistant", content: soFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: upsert,
        onDone: () => setIsLoading(false),
        onError: (msg) => {
          setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
          setIsLoading(false);
        },
      });
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "حصل خطأ، حاول مرة ثانية 🔄" }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" dir="rtl">
      <ChatBackground />

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex items-center justify-between px-5 py-3 glass-card mx-4 mt-4 rounded-2xl"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-base font-bold text-primary">نرتّب فكرتك</h1>
            <p className="text-[11px] text-muted-foreground">حوّل فكرتك إلى مشروع منظّم</p>
          </div>
        </div>
        {canShowReport && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowReport(!showReport)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium"
          >
            <FileText className="w-3.5 h-3.5" />
            {showReport ? "المحادثة" : "عرض التقرير"}
          </motion.button>
        )}
      </motion.div>

      {/* Messages or Report */}
      {showReport && lastAssistant ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 overflow-y-auto p-6 relative z-10"
        >
          <div className="max-w-3xl mx-auto glass-card rounded-3xl p-8 space-y-4">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/30">
              <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold">تقرير الفكرة</h2>
                <p className="text-xs text-muted-foreground">تم إنشاؤه بالذكاء الاصطناعي</p>
              </div>
            </div>
            <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground">
              <ReactMarkdownWrapper content={lastAssistant.content} />
            </div>
          </div>
        </motion.div>
      ) : (
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5 relative z-10">
          {messages.length === 0 && <ChatEmptyState onSuggestionClick={setInput} />}

          {messages.map((msg, i) => (
            <ChatBubble key={i} message={msg} index={i} />
          ))}

          {isLoading && messages[messages.length - 1]?.role !== "assistant" && <TypingIndicator />}
        </div>
      )}

      {/* Input */}
      <ChatInput input={input} isLoading={isLoading} onInputChange={setInput} onSend={send} />
    </div>
  );
};

// Small wrapper to avoid importing ReactMarkdown in the main file twice
import ReactMarkdown from "react-markdown";
const ReactMarkdownWrapper = ({ content }: { content: string }) => (
  <ReactMarkdown>{content}</ReactMarkdown>
);

export default Chat;
