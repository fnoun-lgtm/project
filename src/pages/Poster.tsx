import { QRCodeSVG } from "qrcode.react";
import { Sparkles, MessageCircle, Target, BarChart3, Lightbulb, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CHATBOT_URL = "https://think-structure-bot.lovable.app/chat";

const Poster = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8" dir="rtl" style={{ background: "hsl(220, 40%, 13%)" }}>
      {/* Back button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 text-white/70 hover:text-white hover:bg-white/10"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-5 h-5 rotate-180" />
      </Button>

      {/* Poster Card */}
      <div className="w-full max-w-[800px] rounded-3xl overflow-hidden shadow-2xl" style={{ background: "hsl(220, 35%, 18%)" }}>
        {/* Header */}
        <div className="relative p-10 md:p-14 text-center overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(220, 50%, 22%), hsl(217, 60%, 30%))" }}>
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full" style={{ background: "radial-gradient(circle, hsla(210, 80%, 60%, 0.15), transparent)" }} />
            <div className="absolute -bottom-16 -left-8 w-56 h-56 rounded-full" style={{ background: "radial-gradient(circle, hsla(210, 80%, 60%, 0.1), transparent)" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, hsla(217, 70%, 45%, 0.08), transparent)" }} />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-5" style={{ background: "hsla(210, 80%, 65%, 0.15)", color: "hsl(210, 80%, 75%)", border: "1px solid hsla(210, 80%, 65%, 0.2)" }}>
              <Sparkles className="w-4 h-4" />
              مدعوم بالذكاء الاصطناعي
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
              نرتّب فكرتك
            </h1>
            <p className="text-lg md:text-xl max-w-lg mx-auto leading-relaxed" style={{ color: "hsl(210, 30%, 75%)" }}>
              حوّل أفكارك العشوائية إلى مشاريع منظّمة وجاهزة للاستثمار
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 md:p-12 space-y-8">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Lightbulb, title: "اكتب فكرتك بحرية", desc: "بالعربي أو الإنجليزي", accent: "hsl(210, 80%, 65%)" },
              { icon: MessageCircle, title: "أسئلة ذكية توضيحية", desc: "حتى 5 أسئلة لفهم فكرتك", accent: "hsl(200, 75%, 60%)" },
              { icon: Target, title: "تقرير منظّم شامل", desc: "جاهز للعرض على المستثمرين", accent: "hsl(190, 70%, 55%)" },
              { icon: BarChart3, title: "وضع المستثمر", desc: "تحليل السوق والجدوى", accent: "hsl(230, 70%, 65%)" },
            ].map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-4 rounded-2xl p-5 transition-all"
                style={{ background: "hsla(220, 40%, 25%, 0.5)", border: "1px solid hsla(210, 50%, 40%, 0.15)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${f.accent}20` }}
                >
                  <f.icon className="w-5 h-5" style={{ color: f.accent }} />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] text-white">{f.title}</h3>
                  <p className="text-sm mt-0.5" style={{ color: "hsl(210, 20%, 60%)" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Outputs */}
          <div className="rounded-2xl p-6" style={{ background: "hsla(220, 40%, 25%, 0.4)", border: "1px solid hsla(210, 50%, 40%, 0.12)" }}>
            <h2 className="font-bold text-lg mb-4" style={{ color: "hsl(210, 80%, 70%)" }}>مخرجات التقرير</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "تعريف المشكلة",
                "نظرة على الحل",
                "القيمة المقترحة",
                "المستخدمون المستهدفون",
                "مفهوم النموذج الأولي",
                "بطاقة تقييم الجودة",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-white/80">
                  <CheckCircle className="w-4 h-4 shrink-0" style={{ color: "hsl(200, 75%, 60%)" }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full" style={{ background: "linear-gradient(to left, transparent, hsla(210, 60%, 50%, 0.3), transparent)" }} />

          {/* QR Code Section */}
          <div className="flex flex-col items-center gap-5">
            <p className="text-xl font-bold text-white">جرّب الآن! امسح الكود 👇</p>
            <div className="p-5 rounded-2xl" style={{ background: "white", boxShadow: "0 0 40px hsla(210, 80%, 60%, 0.2)" }}>
              <QRCodeSVG
                value={CHATBOT_URL}
                size={180}
                level="H"
                fgColor="hsl(220, 40%, 18%)"
                bgColor="transparent"
              />
            </div>
            <p className="text-sm text-center" style={{ color: "hsl(210, 20%, 55%)" }}>
              أو زر الرابط مباشرة:
              <br />
              <a
                href={CHATBOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline"
                style={{ color: "hsl(210, 80%, 70%)" }}
              >
                think-structure-bot.lovable.app
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 text-center" style={{ background: "hsla(220, 40%, 15%, 0.6)", borderTop: "1px solid hsla(210, 50%, 40%, 0.1)" }}>
          <p className="text-xs" style={{ color: "hsl(210, 20%, 50%)" }}>
            نموذج أولي مبني بدون كود — هاكاثون ٢٠٢٦ 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default Poster;
