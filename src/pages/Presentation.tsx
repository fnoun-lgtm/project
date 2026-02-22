import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const slides = [
  {
    title: "المشكلة",
    subtitle: "Why Ideas Fail",
    content: (
      <div className="space-y-8">
        <p className="text-2xl leading-relaxed text-muted-foreground">
          أغلب الأفكار الريادية لا تفشل بسبب ضعفها، بل بسبب عدم ترتيبها.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "🧩", text: "الفكرة غير واضحة في ذهن صاحبها" },
            { icon: "📉", text: "لا يوجد هيكل منطقي للعرض" },
            { icon: "🚫", text: "المستثمر لا يفهم القيمة الحقيقية" },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 text-center">
              <span className="text-4xl mb-4 block">{item.icon}</span>
              <p className="text-lg">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "الحل",
    subtitle: "How نرتّب فكرتك Works",
    content: (
      <div className="space-y-8">
        <p className="text-2xl leading-relaxed text-muted-foreground">
          منصة ذكية تحوّل أفكارك العشوائية إلى مشروع منظّم وجاهز للعرض.
        </p>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          {[
            { step: "١", text: "اكتب فكرتك بحرية" },
            { step: "٢", text: "نسألك أسئلة ذكية" },
            { step: "٣", text: "نولّد تقريراً منظّماً" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shrink-0">
                {item.step}
              </div>
              <p className="text-xl">{item.text}</p>
              {i < 2 && <ChevronLeft className="hidden md:block text-muted-foreground w-6 h-6 shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "كيف يعمل؟",
    subtitle: "Chat-Based Journey",
    content: (
      <div className="space-y-6">
        <p className="text-xl text-muted-foreground">تجربة محادثة بسيطة تقودك خطوة بخطوة</p>
        <div className="max-w-lg mx-auto bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="chat-bubble-user px-4 py-3 mr-auto max-w-[80%]">
            عندي فكرة تطبيق توصيل أكل صحي للموظفين
          </div>
          <div className="chat-bubble-ai px-4 py-3 ml-auto max-w-[80%]">
            فكرة ممتازة! 💡 خلني أسألك كم سؤال عشان نرتّبها...
          </div>
          <div className="chat-bubble-ai px-4 py-3 ml-auto max-w-[80%]">
            مين الفئة المستهدفة بالضبط؟ موظفين حكومة؟ قطاع خاص؟
          </div>
          <div className="chat-bubble-user px-4 py-3 mr-auto max-w-[80%]">
            موظفين القطاع الخاص في الرياض
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "المخرجات الأساسية",
    subtitle: "Core Outputs",
    content: (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { icon: "🎯", title: "تعريف المشكلة", sub: "Problem Statement" },
          { icon: "💡", title: "نظرة عامة على الحل", sub: "Solution Overview" },
          { icon: "💎", title: "عرض القيمة", sub: "Value Proposition" },
          { icon: "🛠️", title: "مفهوم النموذج", sub: "Prototype Concept" },
          { icon: "📊", title: "بطاقة الجودة", sub: "Quality Scorecard" },
          { icon: "💰", title: "جاهزية الاستثمار", sub: "Investor Mode" },
        ].map((item, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-5 text-center hover:border-primary transition-colors">
            <span className="text-3xl mb-3 block">{item.icon}</span>
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{item.sub}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "الفئة المستهدفة",
    subtitle: "Target Users",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {[
          { icon: "🚀", title: "روّاد الأعمال المبتدئين", desc: "اللي عندهم فكرة بس ما يعرفون من وين يبدأون" },
          { icon: "🎓", title: "طلاب الجامعات", desc: "اللي يحتاجون يقدّمون مشاريع تخرّج احترافية" },
          { icon: "🏆", title: "المشاركين في الهاكاثونات", desc: "اللي يحتاجون يرتّبون فكرتهم بسرعة" },
          { icon: "💼", title: "أصحاب الأعمال الصغيرة", desc: "اللي يبغون يوسّعون أو يحسّنون مشاريعهم" },
        ].map((item, i) => (
          <div key={i} className="flex gap-4 items-start bg-card border border-border rounded-xl p-5">
            <span className="text-3xl">{item.icon}</span>
            <div>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "الأثر والقيمة",
    subtitle: "Impact & Value",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: "٧٠٪", text: "من الأفكار تحتاج إعادة هيكلة قبل العرض" },
            { num: "٥ دقائق", text: "كافية لتحويل فكرة فوضوية إلى مشروع منظّم" },
            { num: "∞", text: "لا حدود للأفكار التي يمكن ترتيبها" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl font-black text-primary mb-3">{item.num}</div>
              <p className="text-lg text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "لماذا يناسب الهاكاثونات؟",
    subtitle: "Vibe Coding & Hackathons",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            { icon: "⚡", text: "بُني بالكامل بدون كود — No-Code / AI-Powered" },
            { icon: "🎯", text: "يحل مشكلة حقيقية يعاني منها كل رائد أعمال" },
            { icon: "🌍", text: "يدعم العربية والإنجليزية تلقائياً" },
            { icon: "📱", text: "واجهة بسيطة وسهلة الاستخدام" },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-center bg-card border border-border rounded-xl p-5">
              <span className="text-3xl">{item.icon}</span>
              <p className="text-lg">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="text-center pt-4">
          <p className="text-2xl font-bold text-primary">نرتّب فكرتك — لأن كل فكرة تستاهل فرصة</p>
        </div>
      </div>
    ),
  },
];

const Presentation = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const slide = slides[current];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h1 className="text-xl font-bold text-primary">نرتّب فكرتك</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{current + 1} / {slides.length}</span>
          <Button size="sm" onClick={() => navigate("/chat")} className="gap-2">
            <Play className="w-4 h-4" />
            جرّب الآن
          </Button>
        </div>
      </div>

      {/* Slide */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div key={current} className="slide-enter w-full max-w-4xl text-center space-y-8">
          <div>
            <p className="text-sm font-medium text-accent uppercase tracking-wide mb-2">{slide.subtitle}</p>
            <h2 className="text-5xl font-black">{slide.title}</h2>
          </div>
          <div>{slide.content}</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 pb-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? "bg-primary w-8" : "bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrent(Math.min(slides.length - 1, current + 1))}
          disabled={current === slides.length - 1}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default Presentation;
