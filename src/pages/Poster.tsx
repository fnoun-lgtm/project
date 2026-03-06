import { QRCodeSVG } from "qrcode.react";
import { Sparkles, MessageCircle, Target, BarChart3, Lightbulb, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CHATBOT_URL = "https://think-structure-bot.lovable.app/chat";

const Poster = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8" dir="rtl">
      {/* Back button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-5 h-5 rotate-180" />
      </Button>

      {/* Poster Card */}
      <div className="w-full max-w-[800px] bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-l from-primary to-accent p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-8 w-20 h-20 rounded-full border-2 border-primary-foreground" />
            <div className="absolute bottom-4 left-12 w-32 h-32 rounded-full border-2 border-primary-foreground" />
            <div className="absolute top-12 left-1/3 w-12 h-12 rounded-full border border-primary-foreground" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              مدعوم بالذكاء الاصطناعي
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-primary-foreground mb-3">
              نرتّب فكرتك
            </h1>
            <p className="text-primary-foreground/90 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
              حوّل أفكارك العشوائية إلى مشاريع منظّمة وجاهزة للاستثمار
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 md:p-12 space-y-8">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Lightbulb, title: "اكتب فكرتك بحرية", desc: "بالعربي أو الإنجليزي" },
              { icon: MessageCircle, title: "أسئلة ذكية توضيحية", desc: "حتى 5 أسئلة لفهم فكرتك" },
              { icon: Target, title: "تقرير منظّم شامل", desc: "جاهز للعرض على المستثمرين" },
              { icon: BarChart3, title: "وضع المستثمر", desc: "تحليل السوق والجدوى" },
            ].map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-3 bg-secondary/50 rounded-xl p-4"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{f.title}</h3>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Outputs */}
          <div className="bg-secondary/30 rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-3 text-primary">مخرجات التقرير</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                "تعريف المشكلة",
                "نظرة على الحل",
                "القيمة المقترحة",
                "المستخدمون المستهدفون",
                "مفهوم النموذج الأولي",
                "بطاقة تقييم الجودة",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* QR Code Section */}
          <div className="flex flex-col items-center gap-4 pt-4 border-t border-border">
            <p className="text-lg font-bold text-foreground">جرّب الآن! امسح الكود 👇</p>
            <div className="bg-primary-foreground p-4 rounded-2xl shadow-lg border-4 border-primary/20">
              <QRCodeSVG
                value={CHATBOT_URL}
                size={180}
                level="H"
                fgColor="hsl(217, 72%, 48%)"
                bgColor="transparent"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              أو زر الرابط مباشرة:
              <br />
              <a
                href={CHATBOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                think-structure-bot.lovable.app
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-secondary/30 px-8 py-4 text-center">
          <p className="text-xs text-muted-foreground">
            نموذج أولي مبني بدون كود — هاكاثون ٢٠٢٦ 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default Poster;
