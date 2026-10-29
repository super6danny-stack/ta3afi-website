"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

/* ───────────── النصوص ───────────── */

const BRAND = "منصة التعافي";
const FOOTER = "© 2026 منصة التعافي. مساحة آمنة لك.";
const LOGIN_LABEL = "تسجيل الدخول";
const LOGOUT_LABEL = "خروج";
const SETTINGS_LABEL = "الإعدادات";
const TEST_LABEL = "الاختبار";

const NAME_MODAL = {
  title: "اختر اسمك",
  desc: "هذا الاسم سيظهر لك في الموقع، ويمكنك تغييره لاحقاً من الإعدادات.",
  placeholder: "اكتب اسمك هنا",
  save: "حفظ",
  cancel: "إلغاء",
};

const NAME_MAX_LENGTH = 24;
const nameStorageKey = (email: string) => `username:${email}`;

/* ───── الترحيب بعد الدخول ───── */

const WELCOME = {
  title: (name: string) => `أهلاً بك يا ${name} 👋`,
  motivational: [
    "اليوم يوم جديد، وأنت أقوى مما كنت أمس.",
    "كل خطوة صغيرة في الاتجاه الصحيح تُحسب.",
    "التعافي ليس خطاً مستقيماً، المهم أنك لا تتوقف.",
    "أنت هنا، وهذا يعني أنك تختار نفسك. استمر.",
    "لا تُقارن نفسك بأحد، قارن نفسك بمن كنت عليه بالأمس.",
  ],
};

/* ───── أسئلة التعارف (تُعرض بعد الدخول وتُحفظ إجاباتها) ───── */
/* لاحقاً يقرأها نموذج الذكاء الاصطناعي كسياق لبداية الحوار. */

const ONBOARDING = {
  title: "لنتعرّف عليك",
  desc: "بضعة أسئلة قصيرة، إجاباتك تُحفظ خصيصاً لك وتستخدمها المساعدة الذكية لاحقاً.",
  done: "تم حفظ إجاباتك، يمكنك تعديلها في أي وقت من الإعدادات.",
  skip: "تخطي",
  next: "التالي",
  prev: "السابق",
  finish: "إنهاء",
  edit: "تعديل الإجابات",
  questions: [
    "ما الذي دفعك للانضمام إلى المنصة الآن؟",
    "ما العادة أو الإدمان الذي تريد التعافي منه؟",
    "منذ متى وأنت تعاني من هذه المشكلة؟",
    "ما أصعب موقف واجهك بسببها؟",
    "هل سبق أن حاولت التوقف؟ ماذا حدث؟",
    "من الأشخاص الداعمون لك في هذه الرحلة؟",
    "ما الهدف الذي تحلم به بعد التعافي؟",
    "كيف تصف حالتك النفسية هذه الفترة؟",
    "ما الذي يشعرك بالرغبة أو الضغط غالباً؟",
    "ما الرسالة التي تريد أن تقولها لنفسك في يوم التعافي؟",
  ],
};

/* ───── قسم التقدم ───── */

const PROGRESS = {
  title: "تقدّمك",
  desc: "سجلّ زياراتك وأيامك الجيدة يُحفظ على جهازك فقط.",
  daysVisited: "أيام زيارتك للموقع",
  goodDays: "أيام أديتَ فيها بشكل جيد",
  streak: "أيام متتالية",
  markToday: "أنهيت اليوم بشكل جيد ✅",
  marked: "تم تسجيل اليوم، أحسنت!",
  perWeek: "زيارات آخر 7 أيام",
};

/* ───── الدردشة (سيتم ربطها بنموذج ذكاء اصطناعي لاحقاً) ───── */

const CHAT = {
  button: "دردشة",
  title: "المساعدة الذكية",
  desc: "قريباً: محادثة مع نموذج ذكاء اصطناعي يعرف قصتك من إجاباتك.",
  contextLabel: "معلوماتك التي سيعرفها المساعد:",
  noContext: "أكمل أسئلة التعارف أولاً ليعرف المساعد قصتك.",
  inputPlaceholder: "اكتب رسالتك... (سيُفعّل النموذج قريباً)",
  send: "إرسال",
  soon: "نموذج الذكاء الاصطناعي سيتم ربطه هنا قريباً.",
  back: "العودة للرئيسية",
};

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
      desc: "قد تكون هناك بعض المؤشرات التي تستدعي الانتباه. ننصحك بمراجعة متخصص نفسي أو معالج قريباً و ان تسجل دخولك في موقعنا لتلقي الدعم و التوجيه النفسي",
      tone: "text-amber-400",
    },
    {
      title: "مؤشرات مرتفعة",
      desc: "لديك مؤشرات ادمان مرتفعة ،يستحسن ان تزور اخصائيا نفسيا في اقرب وقت ممكن و ان تسجل دخولك في موقعنا لتلقي الدعم و التوجيه النفسي و المهام اليومية التي تساعدك على التعافي",
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

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

/* ───── أدوات التخزين ───── */

const todayKey = () => new Date().toISOString().slice(0, 10);

const readJSON = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJSON = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

/* ───────────── المكوّنات ───────────── */

function Header({
  onLogin,
  onLogout,
  onSettings,
  onTest,
  loading,
  userName,
}: {
  onLogin: () => void;
  onLogout: () => void;
  onSettings: () => void;
  onTest: () => void;
  loading: boolean;
  userName: string | null;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-900/20 bg-amber-950/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-4">
        <button
          onClick={scrollToTop}
          className="flex items-center gap-3 text-xl font-bold tracking-tight text-amber-100 transition hover:text-amber-50"
        >
          <Image src="/logo.png" alt={BRAND} width={36} height={36} />
          {BRAND}
        </button>

        {loading ? null : userName ? (
          <div className="flex items-center gap-4">
            <button
              onClick={onTest}
              className="rounded-lg border border-amber-800/60 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-900/30"
            >
              {TEST_LABEL}
            </button>
            <span className="text-sm font-semibold text-amber-100">{userName}</span>
            <button
              onClick={onSettings}
              className="rounded-lg border border-amber-800/60 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-900/30"
            >
              {SETTINGS_LABEL}
            </button>
            <button
              onClick={onLogout}
              className="rounded-lg border border-amber-800/60 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-900/30"
            >
              {LOGOUT_LABEL}
            </button>
          </div>
        ) : (
          <button
            onClick={onLogin}
            className="rounded-lg bg-emerald-700/80 px-5 py-2 text-sm font-semibold text-amber-50 transition hover:scale-105 hover:bg-emerald-600 active:scale-95"
          >
            {LOGIN_LABEL}
          </button>
        )}
      </div>
    </header>
  );
}

/* ───── الترحيب بعد الدخول ───── */

function WelcomeBanner({ name }: { name: string }) {
  const dayIndex = new Date().getDate() % WELCOME.motivational.length;
  return (
    <section className="mx-auto max-w-4xl px-6 pt-10">
      <div className="rounded-2xl border border-emerald-800/40 bg-emerald-950/30 p-8 text-center">
        <h2 className="text-3xl font-bold text-amber-50 md:text-4xl">
          {WELCOME.title(name)}
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-emerald-200/90">
          {WELCOME.motivational[dayIndex]}
        </p>
      </div>
    </section>
  );
}

/* ───── قسم التقدم ───── */

function ProgressSection({
  visits,
  goodDays,
  onMarkGood,
  markedToday,
}: {
  visits: string[];
  goodDays: string[];
  onMarkGood: () => void;
  markedToday: boolean;
}) {
  const streak = useMemo(() => {
    const set = new Set(visits);
    let count = 0;
    const d = new Date();
    while (set.has(d.toISOString().slice(0, 10))) {
      count++;
      d.setDate(d.getDate() - 1);
    }
    return count;
  }, [visits]);

  const weekCount = useMemo(() => {
    const set = new Set(visits);
    let count = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      if (set.has(d.toISOString().slice(0, 10))) count++;
    }
    return count;
  }, [visits]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="text-center text-3xl font-bold text-amber-50">{PROGRESS.title}</h2>
      <p className="mt-2 text-center text-amber-200/70">{PROGRESS.desc}</p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-amber-900/30 bg-amber-950/30 p-7 text-center">
          <p className="text-4xl font-bold text-emerald-400">{visits.length}</p>
          <p className="mt-2 text-amber-200/80">{PROGRESS.daysVisited}</p>
          <p className="mt-1 text-sm text-amber-300/50">
            {PROGRESS.perWeek}: {weekCount}
          </p>
        </div>
        <div className="rounded-2xl border border-amber-900/30 bg-amber-950/30 p-7 text-center">
          <p className="text-4xl font-bold text-emerald-400">{goodDays.length}</p>
          <p className="mt-2 text-amber-200/80">{PROGRESS.goodDays}</p>
          <p className="mt-1 text-sm text-amber-300/50">{PROGRESS.streak}: {streak}</p>
        </div>
        <div className="rounded-2xl border border-amber-900/30 bg-amber-950/30 p-7 text-center">
          <button
            onClick={onMarkGood}
            disabled={markedToday}
            className="rounded-xl bg-emerald-700 px-6 py-3 font-bold text-amber-50 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {markedToday ? PROGRESS.marked : PROGRESS.markToday}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ───── أسئلة التعارف ───── */

type OnboardingAnswers = Record<number, string>;

function OnboardingFlow({
  initial,
  onDone,
  onSkip,
}: {
  initial: OnboardingAnswers;
  onDone: (answers: OnboardingAnswers) => void;
  onSkip?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>(initial);

  const total = ONBOARDING.questions.length;
  const isLast = index === total - 1;
  const canNext = (answers[index] ?? "").trim().length > 0;

  const finish = () => onDone(answers);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-6">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-lg rounded-2xl border border-amber-900/40 bg-[#17140f] p-8"
      >
        <h2 className="text-2xl font-bold text-amber-50">{ONBOARDING.title}</h2>
        <p className="mt-2 leading-relaxed text-amber-200/70">{ONBOARDING.desc}</p>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-amber-900/30">
          <div
            className="h-full bg-emerald-600 transition-all"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-amber-300/60">
          {index + 1} / {total}
        </p>

        <h3 className="mt-4 text-xl font-semibold leading-relaxed text-amber-100">
          {ONBOARDING.questions[index]}
        </h3>
        <textarea
          autoFocus
          rows={3}
          value={answers[index] ?? ""}
          placeholder="اكتب إجابتك بحرية..."
          onChange={(e) => setAnswers((a) => ({ ...a, [index]: e.target.value }))}
          className="mt-4 w-full resize-none rounded-xl border border-amber-800/50 bg-amber-950/40 px-4 py-3 text-amber-50 outline-none focus:border-emerald-600"
        />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-3">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="rounded-xl border border-amber-800/60 px-5 py-2.5 font-bold text-amber-100 transition hover:bg-amber-900/30 disabled:opacity-40"
            >
              {ONBOARDING.prev}
            </button>
            {isLast ? (
              <button
                onClick={finish}
                className="rounded-xl bg-emerald-700 px-6 py-2.5 font-bold text-amber-50 transition hover:bg-emerald-600"
              >
                {ONBOARDING.finish}
              </button>
            ) : (
              <button
                onClick={() => canNext && setIndex((i) => i + 1)}
                disabled={!canNext}
                className="rounded-xl bg-emerald-700 px-6 py-2.5 font-bold text-amber-50 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {ONBOARDING.next}
              </button>
            )}
          </div>
          {onSkip && (
            <button onClick={onSkip} className="text-sm text-amber-300/60 hover:text-amber-200">
              {ONBOARDING.skip}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───── الدردشة (زر + لوحة، سيتم ربطها بالنموذج لاحقاً) ───── */

function ChatPage({
  answers,
  onBack,
}: {
  answers: OnboardingAnswers;
  onBack: () => void;
}) {
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");

  const hasContext = Object.values(answers).some((a) => a?.trim());

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }, { from: "bot", text: CHAT.soon }]);
    setInput("");
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-200px)] max-w-3xl flex-col px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-amber-50">{CHAT.title}</h1>
        <button
          onClick={onBack}
          className="rounded-xl border border-amber-800/60 px-5 py-2.5 font-bold text-amber-100 transition hover:bg-amber-900/30"
        >
          {CHAT.back}
        </button>
      </div>
      <p className="mt-2 text-amber-200/70">{CHAT.desc}</p>

      <div className="mt-6 rounded-2xl border border-amber-900/30 bg-amber-950/30 p-5">
        <p className="text-sm font-semibold text-amber-100">{CHAT.contextLabel}</p>
        {hasContext ? (
          <ul className="mt-2 max-h-40 space-y-1.5 overflow-y-auto text-sm leading-relaxed text-amber-200/80">
            {ONBOARDING.questions.map((q, i) =>
              answers[i]?.trim() ? (
                <li key={i}>
                  <span className="text-amber-300/60">{q}</span> — {answers[i]}
                </li>
              ) : null
            )}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-amber-300/50">{CHAT.noContext}</p>
        )}
      </div>

      <div className="mt-6 flex-1 space-y-3 overflow-y-auto rounded-2xl border border-amber-900/30 bg-amber-950/20 p-5">
        {messages.length === 0 ? (
          <p className="pt-10 text-center text-amber-300/50">{CHAT.soon}</p>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={m.from === "user" ? "text-left" : "text-right"}>
              <span
                className={`inline-block max-w-[80%] rounded-xl px-4 py-2 text-sm leading-relaxed ${
                  m.from === "user"
                    ? "bg-emerald-800/60 text-amber-50"
                    : "bg-amber-900/40 text-amber-100"
                }`}
              >
                {m.text}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={CHAT.inputPlaceholder}
          className="flex-1 rounded-xl border border-amber-800/50 bg-amber-950/40 px-4 py-3 text-amber-50 outline-none focus:border-emerald-600"
        />
        <button
          onClick={send}
          className="rounded-xl bg-emerald-700 px-6 py-3 font-bold text-amber-50 transition hover:bg-emerald-600"
        >
          {CHAT.send}
        </button>
      </div>
    </section>
  );
}

function ChatButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3.5 font-bold text-amber-50 shadow-lg shadow-emerald-900/40 transition hover:scale-105 hover:bg-emerald-600 active:scale-95"
    >
      <span aria-hidden>💬</span>
      {CHAT.button}
    </button>
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
  const ratio = score / (total * 2);
  const level = ratio <= 0.3 ? 0 : ratio <= 0.6 ? 1 : 2;
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

function NameModal({
  initial,
  onSave,
  onCancel,
}: {
  initial: string;
  onSave: (name: string) => void;
  onCancel?: () => void;
}) {
  const [value, setValue] = useState(initial);
  const clean = value.trim();

  const submit = () => {
    if (clean) onSave(clean);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-6">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl border border-amber-900/40 bg-[#17140f] p-8"
      >
        <h2 className="text-2xl font-bold text-amber-50">{NAME_MODAL.title}</h2>
        <p className="mt-2 leading-relaxed text-amber-200/70">{NAME_MODAL.desc}</p>
        <input
          autoFocus
          value={value}
          maxLength={NAME_MAX_LENGTH}
          placeholder={NAME_MODAL.placeholder}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          className="mt-6 w-full rounded-xl border border-amber-800/50 bg-amber-950/40 px-4 py-3 text-amber-50 outline-none focus:border-emerald-600"
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={submit}
            disabled={!clean}
            className="rounded-xl bg-emerald-700 px-6 py-2.5 font-bold text-amber-50 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {NAME_MODAL.save}
          </button>
          {onCancel && (
            <button
              onClick={onCancel}
              className="rounded-xl border border-amber-800/60 px-6 py-2.5 font-bold text-amber-100 transition hover:bg-amber-900/30"
            >
              {NAME_MODAL.cancel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────────── الصفحة الرئيسية ───────────── */

export default function Home() {
  const [view, setView] = useState<"home" | "test" | "chat">("home");
  const { data: session, status } = useSession();
  const email = session?.user?.email ?? null;

  const [username, setUsername] = useState<string | null>(null);
  const [nameModal, setNameModal] = useState<"first" | "edit" | null>(null);
  const [onboardingModal, setOnboardingModal] = useState(false);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [visits, setVisits] = useState<string[]>([]);
  const [goodDays, setGoodDays] = useState<string[]>([]);
  const [markedToday, setMarkedToday] = useState(false);

  useEffect(() => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }, []);

  /* عند الدخول: الاسم، أسئلة التعارف، وتسجيل زيارة اليوم */
  useEffect(() => {
    if (!email) {
      setUsername(null);
      setNameModal(null);
      setOnboardingModal(false);
      setAnswers({});
      setVisits([]);
      setGoodDays([]);
      setMarkedToday(false);
      return;
    }

    let savedName: string | null = null;
    try {
      savedName = localStorage.getItem(nameStorageKey(email));
    } catch {}
    setUsername(savedName);
    setNameModal(savedName ? null : "first");

    const savedAnswers = readJSON<OnboardingAnswers>(`onboarding:${email}`, {});
    setAnswers(savedAnswers);
    setOnboardingModal(Object.keys(savedAnswers).length === 0);

    const visitKey = `visits:${email}`;
    const visitList = readJSON<string[]>(visitKey, []);
    const today = todayKey();
    const newVisits = visitList.includes(today) ? visitList : [...visitList, today];
    setVisits(newVisits);
    writeJSON(visitKey, newVisits);

    const goodList = readJSON<string[]>(`gooddays:${email}`, []);
    setGoodDays(goodList);
    setMarkedToday(goodList.includes(today));
  }, [email]);

  const saveName = (name: string) => {
    if (email) {
      try {
        localStorage.setItem(nameStorageKey(email), name);
      } catch {}
    }
    setUsername(name);
    setNameModal(null);
  };

  const saveOnboarding = (a: OnboardingAnswers) => {
    if (email) writeJSON(`onboarding:${email}`, a);
    setAnswers(a);
    setOnboardingModal(false);
  };

  const markGoodDay = () => {
    if (!email || markedToday) return;
    const today = todayKey();
    const newGood = [...goodDays, today];
    setGoodDays(newGood);
    setMarkedToday(true);
    writeJSON(`gooddays:${email}`, newGood);
  };

  const login = () => signIn("google");
  const logout = () => signOut();

  const startTest = () => {
    setView("test");
    scrollToTop();
  };

  const goHome = () => {
    setView("home");
    scrollToTop();
  };

  const loggedIn = Boolean(email);

  return (
    <div dir="rtl" className="min-h-screen bg-[#17140f] text-amber-50">
      <Header
        onLogin={login}
        onLogout={logout}
        onSettings={() => setNameModal("edit")}
        onTest={startTest}
        loading={status === "loading"}
        userName={username ?? session?.user?.name ?? null}
      />

      <main>
        {view === "home" ? (
          <>
            {loggedIn && username && <WelcomeBanner name={username} />}

            <HeroSection onTestStart={startTest} />

            {loggedIn && (
              <ProgressSection
                visits={visits}
                goodDays={goodDays}
                onMarkGood={markGoodDay}
                markedToday={markedToday}
              />
            )}

            {loggedIn && (
              <section className="mx-auto max-w-6xl px-6 pb-4 text-center">
                <button
                  onClick={() => setOnboardingModal(true)}
                  className="rounded-xl border border-amber-800/60 px-6 py-2.5 font-bold text-amber-100 transition hover:bg-amber-900/30"
                >
                  {ONBOARDING.edit}
                </button>
              </section>
            )}

            <SupportTools />
            <Features />
            <About />
          </>
        ) : view === "test" ? (
          <TestSection onBack={goHome} />
        ) : (
          <ChatPage answers={answers} onBack={goHome} />
        )}
      </main>

      <footer className="border-t border-amber-900/30 px-6 py-6 text-center text-sm text-amber-200/60">
        {FOOTER}
      </footer>

      {loggedIn && view !== "chat" && (
        <ChatButton onClick={() => { setView("chat"); scrollToTop(); }} />
      )}

      {nameModal && (
        <NameModal
          initial={username ?? ""}
          onSave={saveName}
          onCancel={nameModal === "edit" ? () => setNameModal(null) : undefined}
        />
      )}

      {onboardingModal && (
        <OnboardingFlow
          initial={answers}
          onDone={saveOnboarding}
          onSkip={() => setOnboardingModal(false)}
        />
      )}
    </div>
  );
}
