"use client";

import { useEffect, useState } from "react";
import Image from "next/image";


/* ───────────── النصوص ───────────── */

const BRAND = "منصة التعافي";
const FOOTER = "© 2026 منصة التعافي. مساحة آمنة لك.";
const LOGIN_LABEL = "تسجيل الدخول";
const LOGIN_SOON = "خاصية تسجيل الدخول سوف تضاف قريباً";

const HERO = {
  tagline: "خطوتك الأولى نحو حياة خالية من الادمان",
  title: "مرحباً بك في رحلة التعافي من الإدمان",
  subtitle:
    "مساحة آمنة وخاصة تساعدك على فهم عاداتك وبدء طريق التعافي الحقيقي، خطوة بخطوة، بدون حكم.",
  ctaTest: "ابدأ الاختبار",
  ctaAbout: "تعرف علينا",
};

const FEATURES = [
  {
    title: "توجيه ذكي",
    desc: "محادثات حقيقية مع اطباء متخصصين مدعومة باحدث تقنيات الذكاء الصناعي لمساعدك بشكل احترافي في تفكيك العادات السيئة و فهمها . مع مهام يومية لزيادة الانتاجية ",
  },
  {
    title: "متابعة يومية",
    desc: "مؤشرات بسيطة وواضحة تسجل تقدمك، لتشعر بالإنجاز كل يوم.",
  },
  {
    title: "اختبار سري",
    desc: "أسئلة قصيرة تعطيك صورة واقعية عن وضعك، بدون ضغط أو خوف.",
  },
];

const ABOUT = {
  title: "عن المنصة",
  desc: "منصة تعافي مجانية تؤمن بأن كل شخص يستحق فرصة ثانية. نحن هنا لدعمك بالمعلومات والأدوات والتوجيه النفسي، لكن الخطوة الأولى والأهم من عندك. إذا شعرت بأن الأمور تتفاقم، التفت دائماً إلى متخصص نفسي.",
};

const TEST = {
  questions: [
    "هل تشعر أنك لا تستطيع التحكم في استخدامها؟",
    "هل تجد صعوبة في التوقف حتى عندما تريد ذلك بقوة؟",
    "هل أثّرت على دراستك أو عملك أو علاقاتك الشخصية؟",
    "هل تلجأ إليها للهروب من التوتر أو المشاعر السيئة؟",
    "هل تشعر بالذنب أو الندم بعد ممارستها؟",
    "هل حاولت التقليل منها أكثر من مرة وفشلت؟",
    "هل تشعر أن حياتك أصبحت أقل متعة بسببها؟",
    "هل تشعر بالقلق أو التوتر عند التفكير في التوقف؟",
    "هل تؤثر على نومك أو طاقتك اليومية؟",
    "هل تجد نفسك تفكر فيها بشكل متكرر خلال اليوم؟",
    "هل تشعر أنها أصبحت جزءاً من هويتك أو روتينك اليومي؟",
    "هل لاحظت زيادة في الوقت أو الجهد الذي تقضيه فيها مقارنة بالماضي؟",
    "هل تشعر أن حياتك الاجتماعية أو هواياتك قد تضررت بسببها؟",
    "هل تشعر بالضغط من الآخرين للتوقف أو التقليل منها؟",
    "هل صرت تعتمد عليها أكثر من أي وقت مضى للتعامل مع مشاعرك؟",

  ],
  options: ["أبداً", "أحياناً", "غالباً"],
  results: [
    {
      title: "مؤشرات منخفضة",
      desc: "انت بخير  .لا يبدوا انك تعاني من ادمان خطير على صحتك ",
      tone: "text-emerald-400",
    },
    {
      title: "مؤشرات متوسطة",
      desc: "قد تكون هناك بعض المؤشرات التي تستدعي الانتباه. ننصحك بمراجعة متخصص نفسي أو معالج قريباً.",
      tone: "text-amber-400",
    },
    {
      title: "مؤشرات مرتفعة",
      desc: "ننصحك بشدة بالتحدث مع متخصص نفسي أو معالج في أقرب وقت. أنت لست وحدك.",
      tone: "text-rose-400",
    },
  ],
  progress: "السؤال",
  resultLabel: "نتيجتك",
  note: "هذا الاختبار للتوعية فقط وليس تشخيصاً طبياً. إذا شعرت بالقلق، التفت للمتخصصين.",
  retry: "إعادة الاختبار",
  back: "العودة للرئيسية",
};

const SUPPORT = {
  checkinTitle: "وقفة يومية",
  checkinDesc: "كيف تشعر الآن؟ اختيارك يبقى في هذه الجلسة ولا يُحفظ.",
  moodQuestion: "اختر الوصف الأقرب لشعورك",
  moods: ["هادئ", "متوتر", "مرهق", "أحتاج دعماً"],
  cravingTitle: "عندما تشتد الرغبة",
  cravingDesc: "لا يلزم أن تحل كل شيء الآن. جرّب خطوة صغيرة وآمنة:",
  cravingSteps: [
    "ابتعد مؤقتاً عن المكان أو الموقف المحفّز، إن كان ذلك آمناً.",
    "تواصل مع شخص تثق به واطلب منه البقاء معك أو التحدث إليك.",
    "غيّر ما تفعله الآن: انتقل إلى مكان مشترك أو اخرج في نزهة قصيرة آمنة.",
  ],
  startPause: "ابدأ دقيقة تهدئة",
  stopPause: "إيقاف",
  pauseDone: "انتهت الدقيقة. ما الخطوة الصغيرة التالية التي ستساعدك؟",
  safetyTitle: "تنبيه مهم",
  safetyText:
    "هذا الموقع للتوعية والدعم، وليس للتشخيص أو العلاج. إذا كنت تستخدم الكحول بكثرة أو مهدئات بانتظام، استشر مختصاً قبل التوقف المفاجئ؛ فقد يكون الانسحاب خطيراً.",
  urgent:
    "إذا كنت في خطر فوري، أو تفكر في إيذاء نفسك، اتصل بخدمات الطوارئ المحلية أو اذهب إلى أقرب قسم طوارئ، وابقَ مع شخص تثق به.",
  localHelp: "ابحث عن مساعدة صحية محلية",
  helpUrl: "https://findahelpline.com/",
};

const PAUSE_SECONDS = 60;
const TYPING_DELAY_MS = 60;
const TOAST_DURATION_MS = 2500;

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

/* ───────────── المكوّنات ───────────── */

function Header({ onLogin }: { onLogin: () => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-900/20 bg-amber-950/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={scrollToTop}
          className="flex items-center gap-3 text-xl font-bold tracking-tight text-amber-100 transition hover:text-amber-50"
       >
         <Image src="/logo.png" alt={BRAND} width={36} height={36} />
           {BRAND}
       </button>

        <button
          onClick={onLogin}
          className="rounded-lg bg-emerald-700/80 px-5 py-2 text-sm font-semibold text-amber-50 transition hover:scale-105 hover:bg-emerald-600 active:scale-95"
        >
          {LOGIN_LABEL}
        </button>
      </div>
    </header>
  );
}

function HeroSection({ onTestStart }: { onTestStart: () => void }) {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (displayCount >= HERO.title.length) return;
    const timer = setTimeout(() => setDisplayCount((c) => c + 1), TYPING_DELAY_MS);
    return () => clearTimeout(timer);
  }, [displayCount]);

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 800px 400px at center top, rgba(107, 155, 111, 0.08), transparent)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="mb-6 text-sm font-semibold tracking-widest text-amber-600/90">
          {HERO.tagline}
        </p>

        <h1 className="mb-6 min-h-[1.2em] text-5xl font-bold leading-tight tracking-tight text-amber-50 md:text-6xl lg:text-7xl">
          {HERO.title.slice(0, displayCount)}
          <span className="ms-2 inline-block h-14 w-1 animate-pulse bg-emerald-600 align-middle md:h-20" />
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-amber-200/80 md:text-xl">
          {HERO.subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={onTestStart}
            className="rounded-xl bg-emerald-700 px-8 py-3.5 text-lg font-bold text-amber-50 shadow-lg shadow-emerald-900/30 transition hover:scale-105 hover:bg-emerald-600"
          >
            {HERO.ctaTest}
          </button>
          <a
            href="#about"
            className="rounded-xl border border-amber-800/60 px-8 py-3.5 text-lg font-bold text-amber-100 transition hover:bg-amber-900/30"
          >
            {HERO.ctaAbout}
          </a>
        </div>
      </div>
    </section>
  );
}

function SupportTools() {
  const [mood, setMood] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(PAUSE_SECONDS);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const timer = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running]);

  const togglePause = () => {
    if (seconds === 0) setSeconds(PAUSE_SECONDS);
    setRunning((current) => !current);
  };

  const timerText =
    seconds === 0
      ? SUPPORT.pauseDone
      : running
        ? `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`
        : "";

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-amber-900/30 bg-amber-950/30 p-7">
          <h2 className="text-xl font-bold text-amber-100">{SUPPORT.checkinTitle}</h2>
          <p className="mt-2 leading-relaxed text-amber-200/70">{SUPPORT.checkinDesc}</p>
          <p className="mt-5 text-sm text-amber-200/80">{SUPPORT.moodQuestion}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUPPORT.moods.map((label, index) => (
              <button
                key={label}
                type="button"
                aria-pressed={mood === index}
                onClick={() => setMood(index)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  mood === index
                    ? "border-emerald-500 bg-emerald-800/50 text-white"
                    : "border-amber-800/50 text-amber-100 hover:bg-amber-900/40"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-amber-900/30 bg-amber-950/30 p-7">
          <h2 className="text-xl font-bold text-amber-100">{SUPPORT.cravingTitle}</h2>
          <p className="mt-2 leading-relaxed text-amber-200/70">{SUPPORT.cravingDesc}</p>
          <ol className="mt-4 list-inside list-decimal space-y-2 text-right text-amber-100/90">
            {SUPPORT.cravingSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={togglePause}
              className="rounded-xl bg-emerald-700 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-600"
            >
              {running ? SUPPORT.stopPause : SUPPORT.startPause}
            </button>
            <span aria-live="polite" className="text-amber-200">
              {timerText}
            </span>
          </div>
        </div>
      </div>

      <aside className="mt-6 rounded-2xl border border-rose-900/40 bg-rose-950/20 p-6" role="note">
        <h2 className="font-bold text-rose-200">{SUPPORT.safetyTitle}</h2>
        <p className="mt-2 leading-relaxed text-amber-100/80">{SUPPORT.safetyText}</p>
        <p className="mt-3 leading-relaxed text-amber-100/80">{SUPPORT.urgent}</p>
        <a
          href={SUPPORT.helpUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-sm font-semibold text-emerald-300 underline underline-offset-4 hover:text-emerald-200"
        >
          {SUPPORT.localHelp}
        </a>
      </aside>
    </section>
  );
}

function Features() {
  return (
    <section className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-3">
      {FEATURES.map(({ title, desc }) => (
        <div key={title} className="rounded-2xl border border-amber-900/30 bg-amber-950/30 p-7">
          <h2 className="mb-3 text-xl font-bold text-amber-100">{title}</h2>
          <p className="leading-relaxed text-amber-200/70">{desc}</p>
        </div>
      ))}
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-24 text-center">
      <h2 className="mb-5 text-3xl font-bold text-amber-50 md:text-4xl">{ABOUT.title}</h2>
      <p className="text-lg leading-loose text-amber-200/80">{ABOUT.desc}</p>
    </section>
  );
}

function TestSection({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const total = TEST.questions.length;
  const done = step >= total;
  const level = score <= 3 ? 0 : score <= 6 ? 1 : 2;
  const result = TEST.results[level];

  const answer = (value: number) => {
    setScore((s) => s + value);
    setStep((s) => s + 1);
  };

  const restart = () => {
    setStep(0);
    setScore(0);
  };

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <div className="rounded-2xl border border-amber-900/30 bg-amber-950/40 p-8">
        {!done ? (
          <>
            <div className="mb-6 h-2 overflow-hidden rounded-full bg-amber-900/30">
              <div
                className="h-full bg-emerald-600 transition-all"
                style={{ width: `${(step / total) * 100}%` }}
              />
            </div>
            <p className="text-sm text-amber-300/60">
              {TEST.progress} {step + 1} / {total}
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-relaxed text-amber-50">
              {TEST.questions[step]}
            </h2>
            <div className="mt-8 grid gap-3">
              {TEST.options.map((label, value) => (
                <button
                  key={label}
                  onClick={() => answer(value)}
                  className="rounded-xl border border-amber-800/50 px-5 py-3 text-start text-amber-100 transition hover:border-emerald-600 hover:bg-amber-900/30"
                >
                  {label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-amber-300/60">{TEST.resultLabel}</p>
            <h2 className={`mt-2 text-3xl font-bold ${result.tone}`}>{result.title}</h2>
            <p className="mt-4 text-lg leading-loose text-amber-100/90">{result.desc}</p>
            <p className="mt-6 text-sm text-amber-300/50">{TEST.note}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={restart}
                className="rounded-xl bg-emerald-700 px-6 py-2.5 font-bold text-amber-50 transition hover:bg-emerald-600"
              >
                {TEST.retry}
              </button>
              <button
                onClick={onBack}
                className="rounded-xl border border-amber-800/60 px-6 py-2.5 font-bold text-amber-100 transition hover:bg-amber-900/30"
              >
                {TEST.back}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ───────────── الصفحة الرئيسية ───────────── */

export default function Home() {
  const [view, setView] = useState<"home" | "test">("home");
  const [toast, setToast] = useState(false);

  useEffect(() => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }, []);

  const login = () => {
    setToast(true);
    window.setTimeout(() => setToast(false), TOAST_DURATION_MS);
  };

  const startTest = () => {
    setView("test");
    scrollToTop();
  };

  const goHome = () => {
    setView("home");
    scrollToTop();
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#17140f] text-amber-50">
      <Header onLogin={login} />

      <main>
        {view === "home" ? (
          <>
            <HeroSection onTestStart={startTest} />
            <SupportTools />
            <Features />
            <About />
          </>
        ) : (
          <TestSection onBack={goHome} />
        )}
      </main>

      <footer className="border-t border-amber-900/30 px-6 py-6 text-center text-sm text-amber-200/60">
        {FOOTER}
      </footer>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-amber-800/40 bg-amber-950 px-5 py-3 text-amber-100 shadow-xl"
        >
          {LOGIN_SOON}
        </div>
      )}
    </div>
  );
}
