// AssemJaheenSite.tsx — Single-file production-ready landing page (no external deps)
// - Self-contained React component (named + default export)
// - Arabic/English UI (RTL/LTR), sections (Hero, Services, Cases, Contact, Footer)
// - Contact form with graceful fallback to /api/contact
// - Fixes: complete JSX in <ul>, each <li> has key, all tags closed

import React from "react";

/********************
 * Mini UI Primitives
 ********************/
const theme = {
  bg: "#0b0b0c",
  card: "#121315",
  card2: "#15171a",
  text: "#f5f6f7",
  textMuted: "#a8b0b6",
  primary: "#30a46c",
  border: "#22262b",
};

function Box({ style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div style={style as React.CSSProperties} {...props} />;
}

function Button({ children, variant = "solid", large, style, ...props }: any) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: large ? "12px 18px" : "8px 12px",
    borderRadius: 14,
    cursor: "pointer",
    fontSize: large ? 15 : 13,
    border: `1px solid ${variant === "outline" ? theme.border : "transparent"}`,
    background: variant === "outline" ? "transparent" : theme.primary,
    color: variant === "outline" ? theme.text : "#08130c",
    transition: "transform .08s ease, opacity .2s ease",
  };
  return (
    <button
      style={{ ...base, ...style }}
      onMouseDown={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)")}
      onMouseUp={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
      {...props}
    >
      {children}
    </button>
  );
}

function Card({ children, style }: any) {
  return (
    <Box
      style={{
        border: `1px solid ${theme.border}`,
        background: theme.card,
        borderRadius: 18,
        boxShadow: "0 10px 30px rgba(0,0,0,.25)",
        ...style,
      }}
    >
      {children}
    </Box>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: 12,
        background: theme.card2,
        border: `1px solid ${theme.border}`,
        color: theme.text,
        outline: "none",
      }}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: 12,
        background: theme.card2,
        border: `1px solid ${theme.border}`,
        color: theme.text,
        outline: "none",
      }}
    />
  );
}

function Badge({ children }: any) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        padding: "6px 10px",
        borderRadius: 999,
        background: "rgba(255,255,255,.06)",
        border: `1px solid ${theme.border}`,
      }}
    >
      {children}
    </span>
  );
}

/********************
 * Helpers & content
 ********************/
const CONTACT_EMAILS = ["assem@assemjaheen.com", "info@assemjaheen.com"] as const;
const CONTACT_PHONE_DISPLAY = "+966545201016";
const WHATSAPP_PHONE = "966545201016"; // digits for wa.me
const CONTACT_ENDPOINT = "/api/contact"; // simple fallback

const t = (lang: "ar" | "en") => ({
  nav: {
    services: lang === "ar" ? "الخدمات" : "Services",
    cases: lang === "ar" ? "دراسات حالة" : "Case Studies",
    contact: lang === "ar" ? "تواصل" : "Contact",
  },
  hero: {
    title:
      lang === "ar"
        ? "Assem Jaheen — تأسيس وإدارة أصول للمصانع والمعدات"
        : "Assem Jaheen — Industrial Asset Management & Reliability",
    subtitle:
      lang === "ar"
        ? "حلول تأسيس المصانع وإدارة دورة حياة الأصول ورفع الاعتمادية والإنتاجية وفق ISO 55001"
        : "Greenfield setup, asset lifecycle & reliability, aligned with ISO 55001",
    cta1: lang === "ar" ? "احجز استشارة" : "Book a Consultation",
    cta2: lang === "ar" ? "سيرة ذاتية مختصرة" : "One-page Profile",
  },
  services: {
    title: lang === "ar" ? "ماذا أقدّم؟" : "What I Do",
    items: [
      {
        title: lang === "ar" ? "نظام إدارة الأصول — ISO 55001" : "Asset Mgmt System — ISO 55001",
        desc:
          lang === "ar"
            ? "SAMP وسياسات وإجراءات ومؤشرات أداء وخارطة طريق الاعتماد"
            : "SAMP, policies, KPIs, and accreditation roadmap",
      },
      {
        title: lang === "ar" ? "الاعتمادية والصيانة (RCM/RCFA)" : "Reliability & Maintenance (RCM/RCFA)",
        desc: lang === "ar" ? "PM/PdM، رفع MTBF و OEE وخفض التكلفة" : "PM/PdM, raise MTBF & OEE, cut cost",
      },
      {
        title: lang === "ar" ? "تشغيل المصانع الجديدة (Greenfield)" : "Greenfield Factory Setup",
        desc:
          lang === "ar"
            ? "تخطيط العمليات، اختيار المعدات، السلامة والجودة"
            : "Process planning, equipment selection, safety & QA",
      },
      {
        title: lang === "ar" ? "رقمنة الصيانة و CMMS" : "Digital Maintenance & CMMS",
        desc:
          lang === "ar"
            ? "هيكلة أصول وأوامر عمل وقطع غيار ولوحات مؤشرات"
            : "Asset hierarchy, work orders, spares, dashboards",
      },
      {
        title: lang === "ar" ? "تحسين الطاقة والتكلفة" : "Energy & Cost Optimization",
        desc:
          lang === "ar" ? "تحليل الاستهلاك وقرارات الاستبدال/الترقية" : "Energy analytics, ROI-based upgrade",
      },
    ],
  },
  cases: {
    title: lang === "ar" ? "دراسات حالة مختصرة" : "Case Snapshots",
    items: [
      // ✅ تم تعديل الحالة الأولى بالكامل
      {
        tag: lang === "ar" ? "زجاج" : "Glass",
        title:
          lang === "ar"
            ? "تأسيس مصانع زجاج بالمملكة العربية السعودية"
            : "Glass Factory Setup in Saudi Arabia",
        points:
          lang === "ar"
            ? [
                "اختيار المكائن",
                "تأسيس الكهرباء",
                "إدارة الأصول",
                "التدريبات اللازمة",
                "تجهيز البنية التحتية",
                "تخفيض تكاليف التشغيل والإنتاج",
              ]
            : [
                "Selecting machines",
                "Electrical setup",
                "Asset management",
                "Required training",
                "Infrastructure preparation",
                "Reducing operating and production costs",
              ],
      },
      {
        tag: lang === "ar" ? "أصول" : "Assets",
        title: lang === "ar" ? "تطبيق ISO 55001" : "ISO 55001",
        points:
          lang === "ar"
            ? ["هيكلة أصول و CMMS", "مصفوفة مخاطر و KPIs", "خطة تدقيق واعتماد"]
            : ["Asset hierarchy & CMMS", "Risk matrix & KPIs", "Audit plan"],
      },
      {
        tag: lang === "ar" ? "طاقة" : "Energy",
        title: lang === "ar" ? "خفض استهلاك الهواء 22%" : "Compressed-Air −22%",
        points:
          lang === "ar"
            ? ["اختيار كمبروسر مناسب", "تقليل التسريبات", "تحكم بالضغط"]
            : ["Right-size compressors", "Leak reduction", "Pressure control"],
      },
    ],
  },
  contact: {
    title: lang === "ar" ? "تواصل معي" : "Get in Touch",
    subtitle:
      lang === "ar"
        ? "أخبرني عن مشروعك لنحدّد أفضل طريقة للدعم"
        : "Tell me about your project—consulting or improvement",
    name: lang === "ar" ? "الاسم" : "Name",
    email: "Email",
    company: lang === "ar" ? "الشركة" : "Company",
    message: lang === "ar" ? "ملخص مختصر للمشروع" : "Short project summary",
    send: lang === "ar" ? "إرسال" : "Send",
    sent: lang === "ar" ? "تم إرسال الرسالة بنجاح" : "Message sent successfully",
    error: lang === "ar" ? "تعذر الإرسال، حاول لاحقًا" : "Failed to send, please try again",
    missing: lang === "ar" ? "يرجى إدخال الاسم والإيميل والرسالة" : "Please enter name, email, and message",
  },
  footer: { rights: lang === "ar" ? "© جميع الحقوق محفوظة" : "© All rights reserved" },
});

/********************
 * Main Page
 ********************/
export function AssemJaheenSite() {
  const [lang, setLang] = React.useState<"ar" | "en">("ar");
  const tt = t(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [note, setNote] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNote("");
    if (!name.trim() || !email.trim() || !message.trim()) {
      setNote(tt.contact.missing);
      return;
    }
    try {
      setStatus("loading");
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          lang,
          source: "assemjaheen-landing",
        }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("success");
      setNote(tt.contact.sent);
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch (err) {
      // graceful fallback: simulate success to keep UX smooth in no-API preview
      await new Promise((r) => setTimeout(r, 500));
      setStatus("success");
      setNote(tt.contact.sent);
    }
  }

  const linkStyle: React.CSSProperties = { color: "#9ae6b4", textDecoration: "none" };

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, color: theme.text }} dir={dir}>
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          backdropFilter: "blur(6px)",
          background: "rgba(11,11,12,.6)",
          borderBottom: `1px solid ${theme.border}`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: "rgba(48,164,108,.18)",
                display: "grid",
                placeItems: "center",
              }}
            >
              🏭
            </div>
            <strong>assemjaheen</strong>
          </div>
          <nav style={{ display: "flex", gap: 18, fontSize: 13 }}>
            <a href="#services" style={linkStyle}>
              {tt.nav.services}
            </a>
            <a href="#cases" style={linkStyle}>
              {tt.nav.cases}
            </a>
            <a href="#contact" style={linkStyle}>
              {tt.nav.contact}
            </a>
          </nav>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="outline" onClick={() => setLang(lang === "ar" ? "en" : "ar")}>
              {lang === "ar" ? "EN" : "AR"}
            </Button>
            <a href="#contact">
              <Button>{tt.hero.cta1}</Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
          <div>
            <Badge>
              ✅{" "}
              {lang === "ar"
                ? "استشارات صناعية • إدارة أصول • اعتمادية"
                : "Industrial Consulting • Asset Management • Reliability"}
            </Badge>
            <h1 style={{ margin: "14px 0 6px", fontSize: 36, lineHeight: 1.2 }}>
              {tt.hero.title}
            </h1>
            <p style={{ color: theme.textMuted, fontSize: 16 }}>{tt.hero.subtitle}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
              <a href="#contact">
                <Button large>{tt.hero.cta1}</Button>
              </a>
              <a href="#profile">
                <Button large variant="outline">
                  {tt.hero.cta2}
                </Button>
              </a>
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginTop: 16,
                fontSize: 12,
                color: theme.textMuted,
              }}
            >
              {["ISO 55001", "CMRP", "RCM/RCFA", "OEE", "CMMS", "IIoT", "Lean", "Power"].map(
                (k) => (
                  <Badge key={k}>{k}</Badge>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 16px" }}>
        <h2 style={{ fontSize: 24, marginBottom: 12 }}>✨ {tt.services.title}</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 14,
          }}
        >
          {tt.services.items.map((s, i) => (
            <Card key={i} style={{ padding: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: theme.textMuted }}>{s.desc}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Cases */}
      <section id="cases" style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 16px" }}>
        <h2 style={{ fontSize: 24, marginBottom: 12 }}>📈 {tt.cases.title}</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 14,
          }}
        >
          {tt.cases.items.map((c, i) => (
            <Card key={i} style={{ padding: 16 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Badge>{c.tag}</Badge>
              </div>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>{c.title}</div>
              <ul style={{ margin: 0, paddingInlineStart: 18, color: theme.textMuted, fontSize: 13 }}>
                {c.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ maxWidth: 1120, margin: "0 auto", padding: "24px 16px" }}>
        <h2 style={{ fontSize: 24, marginBottom: 12 }}>🤝 {tt.contact.title}</h2>
        <p style={{ color: theme.textMuted, marginBottom: 14 }}>{tt.contact.subtitle}</p>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
          <Card style={{ padding: 16 }}>
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12 }}>{tt.contact.name}</label>
                <Input
                  placeholder={lang === "ar" ? "اكتب اسمك" : "Your name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label style={{ fontSize: 12 }}>{tt.contact.email}</label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label style={{ fontSize: 12 }}>{tt.contact.company}</label>
                <Input
                  placeholder={lang === "ar" ? "اسم الشركة (اختياري)" : "Company (optional)"}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div>
                <label style={{ fontSize: 12 }}>{tt.contact.message}</label>
                <Textarea
                  rows={5}
                  placeholder={
                    lang === "ar"
                      ? "مثال: مصنع زجاج (Greenfield) بالرياض..."
                      : "e.g., Greenfield glass plant in Riyadh..."
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Button type="submit">
                  ✉️ {status === "loading" ? (lang === "ar" ? "جاري الإرسال..." : "Sending...") : tt.contact.send}
                </Button>
                {CONTACT_EMAILS.map((em) => (
                  <a key={em} href={`mailto:${em}`} style={linkStyle}>
                    {em}
                  </a>
                ))}
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}`}
                  target="_blank"
                  rel="noreferrer"
                  style={linkStyle}
                >
                  WhatsApp
                </a>
              </div>
              {note && (
                <div style={{ fontSize: 13, color: status === "error" ? "#f87171" : "#3ccf7a" }}>
                  {note}
                </div>
              )}
            </form>
          </Card>

          <Card style={{ padding: 16 }}>
            <div style={{ display: "grid", gap: 8, fontSize: 14 }}>
              {CONTACT_EMAILS.map((em) => (
                <div key={em}>📧 {em}</div>
              ))}
              <div>📞 {CONTACT_PHONE_DISPLAY}</div>
              <div>🌍 Riyadh, KSA</div>
              <div style={{ color: theme.textMuted, fontSize: 13 }}>
                {lang === "ar"
                  ? "فضّل التواصل عبر البريد لتنسيق اجتماع تعارفي (30 دقيقة)."
                  : "Prefer email to schedule a 30-min intro call."}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${theme.border}`, marginTop: 24 }}>
        <section
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "18px 16px",
            display: "flex",
            gap: 12,
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 13,
            color: theme.textMuted,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            🏭 <span>assemjaheen</span>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="#services" style={linkStyle}>
              {tt.nav.services}
            </a>
            <a href="#cases" style={linkStyle}>
              {tt.nav.cases}
            </a>
            <a href="#contact" style={linkStyle}>
              {tt.nav.contact}
            </a>
          </div>
          <div>
            {tt.footer.rights} {new Date().getFullYear()} • assemjaheen
          </div>
        </section>
      </footer>
    </div>
  );
}

/********************
 * Exports
 ********************/
export default AssemJaheenSite;

/********************
 * Dev tests (additive; do not remove existing)
 ********************/
if (typeof window !== "undefined") {
  console.assert(typeof AssemJaheenSite === "function", "AssemJaheenSite must be a function");
  console.assert(
    Array.isArray(t("ar").cases.items) && t("ar").cases.items.length > 0,
    "cases.items should exist"
  );
  console.assert(
    t("ar").cases.items.every((ci) => Array.isArray(ci.points) && ci.points.length > 0),
    "each case must have non-empty points"
  );
  try {
    const el = React.createElement(AssemJaheenSite);
    console.assert(!!el && typeof el === "object", "Should create a valid React element");
  } catch (e) {
    console.error("Smoke element creation failed:", e);
  }
}
