import { useNavigate } from "react-router-dom";
import { MessageCircle, Sparkles, Target, BarChart3, Lightbulb, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Lightbulb, title: "اكتب فكرتك بحرية", desc: "بالعربي أو الإنجليزي — بأي طريقة تبغى" },
  { icon: Target, title: "أسئلة ذكية", desc: "نسألك أسئلة توضيحية عشان نفهم فكرتك أكثر" },
  { icon: BarChart3, title: "تقرير منظّم", desc: "تحصل تقرير جاهز للعرض على المستثمرين" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6" dir="rtl">
      <div className="max-w-xl w-full text-center space-y-8 animate-fade-in">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mx-auto">
          <Sparkles className="w-4 h-4" />
          مدعوم بالذكاء الاصطناعي
        </div>

        {/* Title */}
        <div>
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4">
            نرتّب <span className="text-primary">فكرتك</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
            حوّل أفكارك العشوائية إلى مشاريع منظّمة وجاهزة للعرض على المستثمرين — في دقائق
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-4 text-start">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-4 bg-card border border-border rounded-xl p-4">
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

        {/* CTA */}
        <div className="flex justify-center">
          <Button size="lg" className="gap-2 text-lg px-10 h-14" onClick={() => navigate("/chat")}>
            <MessageCircle className="w-5 h-5" />
            جرّب الآن
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
