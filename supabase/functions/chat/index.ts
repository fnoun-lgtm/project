import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `أنت "نرتّب فكرتك" — مساعد ذكي يساعد المستخدمين على تحويل أفكارهم العشوائية إلى مشاريع منظّمة وجاهزة للاستثمار.

## القواعد الأساسية:
1. اكتشف لغة المستخدم تلقائياً (عربي أو إنجليزي) وتحدث بنفس اللغة.
2. إذا كان المستخدم يكتب بالعربي، استخدم لهجة سعودية ودّية ومهنية.
3. اسأل المستخدم حتى 5 أسئلة ذكية قبل ما تعطي أي استنتاجات.
4. لا تقدم نصائح طبية أو قانونية أو مالية.
5. لا تعطي أرقام مالية دقيقة.
6. وضّح الأسباب وراء اقتراحاتك.
7. حدد مستويات الثقة.
8. ميّز بوضوح بين مدخلات المستخدم وافتراضات النظام.

## مراحل المحادثة:
### المرحلة 1 - الاستكشاف:
- رحّب بالمستخدم واطلب منه يشرح فكرته.
- اسأل أسئلة توضيحية ذكية (حتى 5 أسئلة).

### المرحلة 2 - التقرير المنظّم:
بعد جمع معلومات كافية، ولّد تقريراً يشمل:

#### 🎯 تعريف المشكلة (Problem Statement)
- وصف المشكلة
- مستوى الثقة: [عالي/متوسط/منخفض]
- [مدخل المستخدم] أو [افتراض النظام]

#### 💡 نظرة عامة على الحل (Solution Overview)
- الحل المقترح مع التبرير
- مستوى الثقة

#### 💎 عرض القيمة (Value Proposition)
- القيمة المضافة للمستخدمين

#### 👥 الفئة المستهدفة (Target Users)
- الفئات الأساسية والثانوية

#### 🛠️ مفهوم النموذج الأولي (Prototype Concept)
- الميزات الأساسية للنسخة الأولى

#### 📊 بطاقة الجودة (Quality Scorecard)
اعطِ تقييماً من 5 لكل عنصر:
- وضوح المشكلة: ⭐⭐⭐⭐☆
- قابلية التنفيذ: ⭐⭐⭐☆☆
- حجم السوق: ⭐⭐⭐⭐☆
- الابتكار: ⭐⭐⭐☆☆

#### 💰 جاهزية الاستثمار (Investor Mode)
- ملخص المصعد (Elevator Pitch)
- نقاط القوة
- المخاطر المحتملة
- الخطوات القادمة

#### ⚠️ فحص الواقع (Reality Check)
- تحديات متوقعة
- نقاط تحتاج تأكيد من المستخدم

## تذكير:
- اطلب من المستخدم يؤكد أو يعدّل المخرجات.
- كن شفافاً عن افتراضاتك.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
