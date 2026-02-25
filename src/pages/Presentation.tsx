import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  AlertTriangle,
  Cpu,
  BarChart3,
  Target,
  Globe,
  Rocket,
  Code2,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: "title",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-8">
        <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center">
          <Lightbulb className="w-14 h-14 text-primary" />
        </div>
        <div>
          <h1 className="text-6xl md:text-7xl font-black text-foreground leading-tight mb-4">
            نرتّب <span className="text-primary">فكرتك</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            حوّل أفكارك العشوائية إلى مشاريع منظّمة وجاهزة للاستثمار
          </p>
          <p className="text-base text-muted-foreground/60 mt-4">
            Transform messy ideas into structured, investment-ready projects
          </p>
        </div>
        <div className="flex items-center gap-2 bg-accent/10 text-accent px-5 py-2.5 rounded-full text-sm font-bold">
          <Cpu className="w-4 h-4" />
          AI-Powered · No-Code Prototype
        </div>
      </div>
    ),
  },
  {
    id: "problem",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black">المشكلة</h2>
        </div>
        <p className="text-lg text-muted-foreground">The Problem</p>
        <div className="grid gap-5">
          {[
            { ar: "كثير من السعوديين عندهم أفكار مبتكرة لكن ما يقدرون يوصّلوها بشكل واضح", en: "Many Saudis have innovative ideas but can't articulate them clearly" },
            { ar: "صعوبة تعريف المشكلة وهيكلة الحل بطريقة مقنعة", en: "Difficulty defining the problem and structuring a convincing solution" },
            { ar: "الأفكار تموت بدري لأنها ما تتقدّم بشكل جاهز للاستثمار", en: "Ideas die early because they're not presented in an investment-ready format" },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
              <span className="text-2xl font-black text-destructive/40 shrink-0">{i + 1}</span>
              <div>
                <p className="font-bold text-lg">{item.ar}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.en}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "solution",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black">الحل</h2>
        </div>
        <p className="text-lg text-muted-foreground">The Solution</p>
        <div className="bg-card border border-border rounded-2xl p-8">
          <p className="text-xl leading-relaxed font-medium mb-4">
            منصة ذكية تحوّل الأفكار العشوائية إلى مشاريع منظّمة وجاهزة للعرض على المستثمرين من خلال تجربة شات بوت موجّهة.
          </p>
          <p className="text-muted-foreground">
            An AI-powered platform that structures messy ideas into clear, organized, investment-ready project concepts using a guided chatbot experience.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: MessageCircle, ar: "اكتب فكرتك بحرية", en: "Write your idea freely" },
            { icon: Target, ar: "أسئلة ذكية توضيحية", en: "Smart clarification questions" },
            { icon: BarChart3, ar: "تقرير منظّم جاهز", en: "Structured report ready" },
          ].map((item, i) => (
            <div key={i} className="bg-primary/5 border border-primary/10 rounded-2xl p-5 text-center">
              <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-bold text-sm">{item.ar}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.en}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "how",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <Cpu className="w-6 h-6 text-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black">كيف يشتغل؟</h2>
        </div>
        <p className="text-lg text-muted-foreground">How It Works</p>
        <div className="space-y-6">
          {[
            { step: "١", ar: "المستخدم يكتب فكرته بأي لغة وبأي طريقة", en: "User writes their idea in any language, any format", icon: "✍️" },
            { step: "٢", ar: "البوت يكتشف اللغة تلقائياً ويبدأ يسأل أسئلة توضيحية (حتى 5 أسئلة)", en: "Bot detects language and asks up to 5 clarification questions", icon: "🤖" },
            { step: "٣", ar: "النظام يولّد تقرير شامل ومنظّم", en: "System generates a comprehensive structured report", icon: "📊" },
            { step: "٤", ar: "المستخدم يراجع، يعدّل، وينسخ أو يشارك التقرير", en: "User reviews, edits, copies, or shares the report", icon: "✅" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-6 bg-card border border-border rounded-2xl p-5">
              <span className="text-4xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-lg">{item.ar}</p>
                <p className="text-sm text-muted-foreground">{item.en}</p>
              </div>
              <span className="text-5xl font-black text-muted-foreground/10">{item.step}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "outputs",
    content: (
      <div className="flex flex-col justify-center h-full gap-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black">مخرجات التقرير</h2>
        </div>
        <p className="text-lg text-muted-foreground">Core Report Outputs</p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { emoji: "🎯", ar: "تعريف المشكلة", en: "Problem Statement", sub: "مع مستوى الثقة" },
            { emoji: "💡", ar: "نظرة عامة على الحل", en: "Solution Overview", sub: "مع التبرير" },
            { emoji: "💎", ar: "عرض القيمة", en: "Value Proposition", sub: "" },
            { emoji: "👥", ar: "الفئة المستهدفة", en: "Target Users", sub: "" },
            { emoji: "🛠️", ar: "مفهوم النموذج الأولي", en: "Prototype Concept", sub: "" },
            { emoji: "📊", ar: "بطاقة الجودة", en: "Quality Scorecard", sub: "وضوح، منطق، جدوى" },
            { emoji: "💰", ar: "جاهزية الاستثمار", en: "Investor Mode", sub: "" },
            { emoji: "⚠️", ar: "فحص الواقع", en: "Reality Check", sub: "" },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-start gap-3">
              <span className="text-2xl">{item.emoji}</span>
              <div>
                <p className="font-bold text-sm">{item.ar}</p>
                <p className="text-xs text-muted-foreground">{item.en}</p>
                {item.sub && <p className="text-xs text-primary mt-1">{item.sub}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "saudi",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black">السوق السعودي</h2>
        </div>
        <p className="text-lg text-muted-foreground">Saudi Market Relevance</p>
        <div className="grid grid-cols-2 gap-5">
          {[
            { ar: "نسبة تبنّي رقمي عالية", en: "High digital adoption rate", emoji: "📱" },
            { ar: "بيئة ريادية ومنظومة ابتكار قوية", en: "Strong startup & innovation ecosystem", emoji: "🚀" },
            { ar: "المستخدم السعودي يقدّر البساطة والوضوح", en: "Saudi users value simplicity & clarity", emoji: "✨" },
            { ar: "المستثمرون يركّزون على وضوح المشكلة والقابلية للتوسع", en: "Investors focus on problem clarity & scalability", emoji: "💼" },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
              <span className="text-3xl">{item.emoji}</span>
              <div>
                <p className="font-bold">{item.ar}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.en}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "impact",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <Rocket className="w-6 h-6 text-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black">الأثر</h2>
        </div>
        <p className="text-lg text-muted-foreground">Impact & Value</p>
        <div className="grid gap-5">
          {[
            { ar: "يقلّل خسارة الأفكار في مراحلها الأولى", en: "Reduces idea loss in early stages", icon: "🛡️" },
            { ar: "يمكّن المؤسسين غير التقنيين", en: "Empowers non-technical founders", icon: "💪" },
            { ar: "يسرّع التحول من فكرة إلى مشروع", en: "Speeds up idea-to-project transformation", icon: "⚡" },
            { ar: "يدعم ريادة الأعمال والابتكار", en: "Supports entrepreneurship & innovation", icon: "🌱" },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 flex items-center gap-5">
              <span className="text-4xl">{item.icon}</span>
              <div>
                <p className="font-bold text-lg">{item.ar}</p>
                <p className="text-sm text-muted-foreground">{item.en}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "hackathon",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Code2 className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black">ليش هاكاثون؟</h2>
        </div>
        <p className="text-lg text-muted-foreground">Why Hackathon & Vibe Coding</p>
        <div className="grid grid-cols-2 gap-5">
          {[
            { ar: "نموذج أولي بدون كود — مدعوم بالذكاء الاصطناعي", en: "No-code, AI-powered prototype", emoji: "🤖" },
            { ar: "التركيز على التفكير وتجربة المستخدم مو البرمجة", en: "Focus on thinking & UX, not coding", emoji: "🧠" },
            { ar: "مناسب للمشاركين التقنيين وغير التقنيين", en: "Suitable for technical & non-technical participants", emoji: "🤝" },
            { ar: "سرعة في البناء — من فكرة إلى نموذج في ساعات", en: "Fast build — idea to prototype in hours", emoji: "🏃" },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
              <span className="text-3xl">{item.emoji}</span>
              <div>
                <p className="font-bold">{item.ar}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.en}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-muted/50 border border-border rounded-xl p-4 text-center">
          <p className="text-sm text-muted-foreground">
            ⚠️ هذا نموذج أولي لهاكاثون — أداة لهيكلة الأفكار وليست خدمة استشارية مهنية
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            This is a hackathon prototype — an idea-structuring tool, not professional advisory
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "cta",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-10">
        <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center">
          <MessageCircle className="w-14 h-14 text-primary" />
        </div>
        <div>
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            جاهز تجرّب؟
          </h2>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            ابدأ الحين وحوّل فكرتك إلى مشروع منظّم
          </p>
          <p className="text-base text-muted-foreground/60 mt-2">
            Ready to try? Start now and transform your idea.
          </p>
        </div>
        <a href="/chat">
          <Button size="lg" className="gap-3 text-xl px-12 h-16 rounded-2xl">
            <MessageCircle className="w-6 h-6" />
            جرّب الآن
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </a>
      </div>
    ),
  },
];

const Presentation = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  const go = (dir: number) => {
    const next = current + dir;
    if (next < 0 || next >= slides.length) return;
    setDirection(dir);
    setCurrent(next);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
          العودة للرئيسية
        </Button>
        <span className="text-sm text-muted-foreground font-medium">
          {current + 1} / {slides.length}
        </span>
      </div>

      {/* Slide area */}
      <div className="flex-1 relative overflow-hidden px-6 md:px-16 py-8">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={slides[current].id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0 px-6 md:px-16 py-8"
          >
            {slides[current].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border">
        <Button
          variant="outline"
          onClick={() => go(-1)}
          disabled={current === 0}
          className="gap-2"
        >
          <ChevronRight className="w-4 h-4" />
          السابق
        </Button>

        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? "bg-primary w-6" : "bg-border hover:bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          onClick={() => go(1)}
          disabled={current === slides.length - 1}
          className="gap-2"
        >
          التالي
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Presentation;
