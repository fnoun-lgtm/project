import { useNavigate } from "react-router-dom";
import { Presentation, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <div className="animate-fade-in space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              مدعوم بالذكاء الاصطناعي
            </div>
            <h1 className="text-6xl md:text-7xl font-black leading-tight">
              نرتّب
              <span className="text-primary"> فكرتك</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              حوّل أفكارك العشوائية إلى مشاريع منظّمة وجاهزة للعرض على المستثمرين — في دقائق
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 text-lg px-8 h-14" onClick={() => navigate("/chat")}>
                <MessageCircle className="w-5 h-5" />
                ابدأ الآن
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 h-14" onClick={() => navigate("/presentation")}>
                <Presentation className="w-5 h-5" />
                العرض التقديمي
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
