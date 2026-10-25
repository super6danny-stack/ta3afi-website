"use client";
import { useEffect, useState } from "react";

type L = "ar" | "en" | "fr";

const T = {
  ar: {
    brand: "منصة التعافي",
    tagline: "خطوتك الأولى نحو حياة أفضل",
    login: "الدخول",
    soon: "خاصية تسجيل الدخول قريباً",
    title: "مرحباً بك في رحلة التعافي",
    subtitle: "مساحة آمنة وخاصة تساعدك على فهم عاداتك وبدء طريق التعافي الحقيقي، خطوة بخطوة، بدون حكم.",
    cta_test: "ابدأ الاختبار",
    cta_about: "تعرف علينا",
    feature_1_title: "توجيه ذكي",
    feature_1_desc: "محادثات حقيقية تساعدك على فهم أسباب عاداتك وكيفية التغلب عليها بطرق عملية.",
    feature_2_title: "متابعة يومية",
    feature_2_desc: "مؤشرات بسيطة وواضحة تسجل تقدمك، لتشعر بالإنجاز كل يوم.",
    feature_3_title: "اختبار سري",
    feature_3_desc: "أسئلة قصيرة تعطيك صورة واقعية عن وضعك، بدون ضغط أو خوف.",
    about_title: "عن المنصة",
    about_desc: "منصة تعافي مجانية تؤمن بأن كل شخص يستحق فرصة ثانية. نحن هنا لدعمك بالمعلومات والأدوات والتوجيه النفسي، لكن الخطوة الأولى والأهم من عندك. إذا شعرت بأن الأمور تتفاقم، التفت دائماً إلى متخصص نفسي.",
    test_q: [
      "هل تجد صعوبة في التوقف عن هذه العادة حتى عندما تريد ذلك بقوة؟",
      "هل أثّرت على دراستك أو عملك أو علاقاتك الشخصية؟",
      "هل تلجأ إليها للهروب من التوتر أو المشاعر السيئة؟",
      "هل تشعر بالذنب أو الندم بعد ممارستها؟",
      "هل حاولت التقليل منها أكثر من مرة وفشلت؟",
    ],
    test_options: ["أبداً", "أحياناً", "غالباً"],
    test_result: "نتيجتك",
    test_results: [
      { title: "مؤشرات منخفضة", desc: "احذر من الانزلاق. حافظ على وعيك بعاداتك وركّز على الأنشطة الصحية والممتعة." },
      { title: "مؤشرات متوسطة", desc: "حان الوقت للعمل. ضع لنفسك خطة واضحة لتقليل العادة، وابحث عن شخص تثق به تشاركه رحلتك." },
      { title: "مؤشرات مرتفعة", desc: "ننصحك بشدة بالتحدث مع متخصص نفسي أو معالج في أقرب وقت. أنت لست وحدك." },
    ],
    test_note: "هذا الاختبار للتوعية فقط وليس تشخيصاً طبياً. إذا شعرت بالقلق، التفت للمتخصصين.",
    test_retry: "إعادة الاختبار",
    test_back: "العودة للرئيسية",
    progress: "السؤال",
    footer: "© 2026 منصة التعافي. مساحة آمنة لك.",
  },
  en: {
    brand: "Recovery Space",
    tagline: "Your first step toward a better life",
    login: "Sign In",
    soon: "Sign in coming soon",
    title: "Welcome to Your Recovery Journey",
    subtitle: "A safe, private space to understand your habits and start real recovery, one step at a time, without judgment.",
    cta_test: "Take the Test",
    cta_about: "Learn About Us",
    feature_1_title: "Smart Guidance",
    feature_1_desc: "Real conversations that help you understand why you do what you do and how to break free with practical tools.",
    feature_2_title: "Daily Check-In",
    feature_2_desc: "Simple, clear indicators to track your progress and feel your wins every single day.",
    feature_3_title: "Honest Assessment",
    feature_3_desc: "Short questions that give you a real picture of where you stand, no pressure, no fear.",
    about_title: "About Us",
    about_desc: "Recovery Space is a free platform built on one belief: everyone deserves a second chance. We're here with information, tools, and guidance—but your first step is up to you. If things get harder, always reach out to a mental health professional.",
    test_q: [
      "Do you find it hard to stop this habit even when you really want to?",
      "Has it affected your studies, work, or relationships?",
      "Do you turn to it to escape stress or bad feelings?",
      "Do you feel guilt or regret afterwards?",
      "Have you tried to cut down and failed more than once?",
    ],
    test_options: ["Never", "Sometimes", "Often"],
    test_result: "Your Result",
    test_results: [
      { title: "Low Indicators", desc: "Stay aware. Keep focusing on healthy habits and activities that make you feel good." },
      { title: "Moderate Indicators", desc: "Time to act. Create a clear plan to reduce the habit and find someone you trust to support you." },
      { title: "High Indicators", desc: "Please talk to a mental health professional or counselor soon. You're not alone in this." },
    ],
    test_note: "This test is for awareness only, not a medical diagnosis. If you're worried, reach out to professionals.",
    test_retry: "Take Again",
    test_back: "Back Home",
    progress: "Question",
    footer: "© 2026 Recovery Space. Your safe space.",
  },
  fr: {
    brand: "Espace de Rétablissement",
    tagline: "Votre premier pas vers une vie meilleure",
    login: "Connexion",
    soon: "Connexion bientôt disponible",
    title: "Bienvenue dans Votre Parcours de Rétablissement",
    subtitle: "Un espace sûr et privé pour comprendre vos habitudes et commencer un vrai rétablissement, pas à pas, sans jugement.",
    cta_test: "Faire le Test",
    cta_about: "À Propos",
    feature_1_title: "Guidance Intelligente",
    feature_1_desc: "Des conversations réelles qui vous aident à comprendre pourquoi et comment vous libérer avec des outils pratiques.",
    feature_2_title: "Suivi Quotidien",
    feature_2_desc: "Des indicateurs simples et clairs pour suivre vos progrès et célébrer vos victoires chaque jour.",
    feature_3_title: "Évaluation Honnête",
    feature_3_desc: "Des questions courtes qui vous donnent une image réelle de votre situation, sans pression ni peur.",
    about_title: "À Propos",
    about_desc: "Espace de Rétablissement est une plateforme gratuite basée sur une conviction : tout le monde mérite une deuxième chance. Nous sommes là avec des informations, des outils et du soutien—mais votre premier pas dépend de vous. Si c'est difficile, parlez toujours à un professionnel de la santé mentale.",
    test_q: [
      "Trouvez-vous difficile d'arrêter cette habitude même si vous le voulez vraiment ?",
      "A-t-elle affecté vos études, votre travail ou vos relations ?",
      "Y recourez-vous pour fuir le stress ou les émotions négatives ?",
      "Ressentez-vous de la culpabilité ou des regrets après ?",
      "Avez-vous essayé de réduire plus d'une fois et échoué ?",
    ],
    test_options: ["Jamais", "Parfois", "Souvent"],
    test_result: "Votre Résultat",
    test_results: [
      { title: "Indicateurs Faibles", desc: "Restez conscient. Continuez à vous concentrer sur les habitudes saines et les activités qui vous font du bien." },
      { title: "Indicateurs Modérés", desc: "C'est le moment d'agir. Créez un plan clair pour réduire l'habitude et trouvez quelqu'un de confiance pour vous soutenir." },
      { title: "Indicateurs Élevés", desc: "Veuillez parler à un professionnel de la santé mentale ou un conseiller très bientôt. Vous n'êtes pas seul." },
    ],
    test_note: "Ce test est à titre informatif uniquement et ne constitue pas un diagnostic médical. Si vous avez des préoccupations, consultez des professionnels.",
    test_retry: "Refaire le Test",
    test_back: "Retour Accueil",
    progress: "Question",
    footer: "© 2026 Espace de Rétablissement. Votre espace sûr.",
  },
};

const NAMES: Record<L, string> = { ar: "العربية", en: "English", fr: "Français" };

function Header({ lang, onLangChange, onLogin }: { lang: L; onLangChange: (l: L) => void; onLogin: () => void }) {
  const t = T[lang];
  const [menu, setMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-amber-900/20 bg-amber-950/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xl font-bold tracking-tight text-amber-100 transition hover:text-amber-50"
        >
          {t.brand}
        </button>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setMenu(!menu)}
              aria-label="Language selector"
              className="rounded-lg border border-amber-900/20 p-2 text-amber-100 transition hover:bg-amber-900/30"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
              </svg>
            </button>
            {menu && (
              <ul className="absolute end-0 mt-2 w-40 overflow-hidden rounded-lg border border-amber-900/30 bg-amber-950/95 shadow-xl backdrop-blur">
                {(Object.keys(NAMES) as L[]).map((k) => (
                  <li key={k}>
                    <button
                      onClick={() => {
                        onLangChange(k);
                        setMenu(false);
                      }}
                      className={`w-full px-4 py-2.5 text-start text-sm transition hover:bg-amber-900/40 ${
                        k === lang ? "bg-amber-900/20 font-semibold text-amber-100" : "text-amber-200"
                      }`}
                    >
                      {NAMES[k]}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={onLogin}
            className="rounded-lg bg-emerald-700/80 px-5 py-2 text-sm font-semibold text-amber-50 transition hover:scale-105 hover:bg-emerald-600 active:scale-95"
          >
            {t.login}
          </button>
        </div>
      </div>
    </header>
  );
}

function HeroSection({ lang, onTestStart }: { lang: L; onTestStart: () => void }) {
  const t = T[lang];
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    setDisplayCount(0);
  }, [lang]);

  useEffect(() => {
    if (displayCount >= t.title.length) return;
    const timer = setTimeout(() => setDisplayCount(displayCount + 1), 60);
    return () => clearTimeout(timer);
  }, [displayCount, t.title]);

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 800px 400px at center top, rgba(107, 155, 111, 0.08), transparent)" }}
      />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="mb-6 text-sm font-semibold tracking-widest text-amber-600/90">{t.tagline}</p>

        <h1 className="mb-6 min-h-[1.2em] text-5xl font-bold leading-tight tracking-tight text-amber-50 md:text-6xl lg:text-7xl">
          {t.title.slice(0, displayCount)}
          <span className="ms-2 inline-block h-14 w-1 animate-pulse bg-emerald-600 align-middle md:h-20" />
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-amber-200/80 md:text-xl">{t.subtitle}</p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={onTestStart}
            className="rounded-xl bg-emerald-700 px-8 py-3.5 text-lg font-bold text-amber-50 shadow-lg shadow-emerald-900/30 transition hover:scale-105 hover:bg-emerald-600"
          >
            {t.cta_test}
          </button>
          <a
            href="#about"
            className="rounded-xl border border-amber-800/60 px-8 py-3.5 text-lg font-bold text-amber-100 transition hover:bg-amber-900/30"
          >
            {t.cta_about}
          </a>
        </div>
      </div>
    </section>
  );
}

function Features({ lang }: { lang: L }) {
  const t = T[lang];
  const items = [
    [t.feature_1_title, t.feature_1_desc],
    [t.feature_2_title, t.feature_2_desc],
    [t.feature_3_title, t.feature_3_desc],
  ];
  return (
    <section className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-3">
      {items.map(([title, desc]) => (
        <div key={title} className="rounded-2xl border border-amber-900/30 bg-amber-950/30 p-7">
          <h2 className="mb-3 text-xl font-bold text-amber-100">{title}</h2>
          <p className="leading-relaxed text-amber-200/70">{desc}</p>
        </div>
      ))}
    </section>
  );
}

function About({ lang }: { lang: L }) {
  const t = T[lang];
  return (
    <section id="about" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-24 text-center">
      <h2 className="mb-5 text-3xl font-bold text-amber-50 md:text-4xl">{t.about_title}</h2>
      <p className="text-lg leading-loose text-amber-200/80">{t.about_desc}</p>
    </section>
  );
}

function TestSection({ lang, onBack }: { lang: L; onBack: () => void }) {
  const t = T[lang];
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const total = t.test_q.length;
  const done = step >= total;
  const level = score <= 3 ? 0 : score <= 6 ? 1 : 2;
  const res = t.test_results[level];
  const tone = ["text-emerald-400", "text-amber-400", "text-rose-400"][level];

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <div className="rounded-2xl border border-amber-900/30 bg-amber-950/40 p-8">
        {!done ? (
          <>
            <div className="mb-6 h-2 overflow-hidden rounded-full bg-amber-900/30">
              <div className="h-full bg-emerald-600 transition-all" style={{ width: `${(step / total) * 100}%` }} />
            </div>
            <p className="text-sm text-amber-300/60">
              {t.progress} {step + 1} / {total}
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-relaxed text-amber-50">{t.test_q[step]}</h2>
            <div className="mt-8 grid gap-3">
              {t.test_options.map((label, v) => (
                <button
                  key={label}
                  onClick={() => {
                    setScore(score + v);
                    setStep(step + 1);
                  }}
                  className="rounded-xl border border-amber-800/50 px-5 py-3 text-start text-amber-100 transition hover:border-emerald-600 hover:bg-amber-900/30"
                >
                  {label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-amber-300/60">{t.test_result}</p>
            <h2 className={`mt-2 text-3xl font-bold ${tone}`}>{res.title}</h2>
            <p className="mt-4 text-lg leading-loose text-amber-100/90">{res.desc}</p>
            <p className="mt-6 text-sm text-amber-300/50">{t.test_note}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setStep(0);
                  setScore(0);
                }}
                className="rounded-xl bg-emerald-700 px-6 py-2.5 font-bold text-amber-50 transition hover:bg-emerald-600"
              >
                {t.test_retry}
              </button>
              <button
                onClick={onBack}
                className="rounded-xl border border-amber-800/60 px-6 py-2.5 font-bold text-amber-100 transition hover:bg-amber-900/30"
              >
                {t.test_back}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

const EXTRA: Record<
  L,
  {
    checkinTitle: string;
    checkinDesc: string;
    moodQuestion: string;
    moods: string[];
    cravingTitle: string;
    cravingDesc: string;
    cravingSteps: string[];
    startPause: string;
    stopPause: string;
    pauseDone: string;
    safetyTitle: string;
    safetyText: string;
    urgent: string;
    localHelp: string;
  }
> = {
  ar: {
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
  },
  en: {
    checkinTitle: "Daily check-in",
    checkinDesc: "How are you feeling right now? Your choice stays in this session and is not saved.",
    moodQuestion: "Choose what feels closest",
    moods: ["Calm", "Stressed", "Tired", "I need support"],
    cravingTitle: "When an urge feels strong",
    cravingDesc: "You don't have to solve everything right now. Try one small, safe step:",
    cravingSteps: [
      "If it is safe, step away from the place or situation that is triggering you.",
      "Contact someone you trust and ask them to stay with you or talk.",
      "Change what you are doing: move to a shared space or take a short, safe walk.",
    ],
    startPause: "Start a one-minute pause",
    stopPause: "Stop",
    pauseDone: "The minute is over. What small next step could help?",
    safetyTitle: "Important",
    safetyText:
      "This site offers awareness and support, not diagnosis or treatment. If you drink heavily or regularly use sedatives, speak with a clinician before stopping suddenly; withdrawal can be dangerous.",
    urgent:
      "If you are in immediate danger or thinking of harming yourself, contact local emergency services or go to the nearest emergency department, and stay with someone you trust.",
    localHelp: "Find local health support",
  },
  fr: {
    checkinTitle: "Petit bilan du jour",
    checkinDesc: "Comment vous sentez-vous maintenant ? Votre choix reste dans cette session et n'est pas enregistré.",
    moodQuestion: "Choisissez ce qui vous correspond le mieux",
    moods: ["Calme", "Stressé(e)", "Épuisé(e)", "J’ai besoin de soutien"],
    cravingTitle: "Quand l’envie devient forte",
    cravingDesc: "Vous n’avez pas à tout régler maintenant. Essayez une petite étape sûre :",
    cravingSteps: [
      "Si vous pouvez le faire sans danger, éloignez-vous du lieu ou de la situation déclenchante.",
      "Contactez une personne de confiance et demandez-lui de rester avec vous ou de vous parler.",
      "Changez d’activité : rejoignez un espace commun ou faites une courte promenade sans risque.",
    ],
    startPause: "Faire une pause d’une minute",
    stopPause: "Arrêter",
    pauseDone: "La minute est terminée. Quelle petite étape pourrait vous aider maintenant ?",
    safetyTitle: "Important",
    safetyText:
      "Ce site informe et soutient, mais ne remplace ni un diagnostic ni un traitement. En cas de consommation importante d’alcool ou d’usage régulier de sédatifs, consultez un professionnel avant tout arrêt brutal : le sevrage peut être dangereux.",
    urgent:
      "En cas de danger immédiat ou d’idées de vous faire du mal, contactez les services d’urgence locaux ou rendez-vous aux urgences, et restez avec une personne de confiance.",
    localHelp: "Trouver une aide près de chez vous",
  },
};

function SupportTools({ lang }: { lang: L }) {
  const x = EXTRA[lang];
  const [mood, setMood] = useState<number | null>(null);
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  const isArabic = lang === "ar";

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
    if (seconds === 0) setSeconds(60);
    setRunning((current) => !current);
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-amber-900/30 bg-amber-950/30 p-7">
          <h2 className="text-xl font-bold text-amber-100">{x.checkinTitle}</h2>
          <p className="mt-2 leading-relaxed text-amber-200/70">{x.checkinDesc}</p>
          <p className="mt-5 text-sm text-amber-200/80">{x.moodQuestion}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {x.moods.map((label, index) => (
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
          <h2 className="text-xl font-bold text-amber-100">{x.cravingTitle}</h2>
          <p className="mt-2 leading-relaxed text-amber-200/70">{x.cravingDesc}</p>
          <ol className={`mt-4 list-inside list-decimal space-y-2 text-amber-100/90 ${isArabic ? "text-right" : "text-left"}`}>
            {x.cravingSteps.map((step) => <li key={step}>{step}</li>)}
          </ol>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={togglePause}
              className="rounded-xl bg-emerald-700 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-600"
            >
              {running ? x.stopPause : x.startPause}
            </button>
            <span aria-live="polite" className="text-amber-200">
              {seconds === 0
                ? x.pauseDone
                : running
                  ? `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`
                  : ""}
            </span>
          </div>
        </div>
      </div>

      <aside className="mt-6 rounded-2xl border border-rose-900/40 bg-rose-950/20 p-6" role="note">
        <h2 className="font-bold text-rose-200">{x.safetyTitle}</h2>
        <p className="mt-2 leading-relaxed text-amber-100/80">{x.safetyText}</p>
        <p className="mt-3 leading-relaxed text-amber-100/80">{x.urgent}</p>
        <a
          href="https://findahelpline.com/"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-sm font-semibold text-emerald-300 underline underline-offset-4 hover:text-emerald-200"
        >
          {x.localHelp}
        </a>
      </aside>
    </section>
  );
}

export default function Home() {
  const [lang, setLang] = useState<L>("ar");
  const [view, setView] = useState<"home" | "test">("home");
  const [toast, setToast] = useState(false);
  const t = T[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const login = () => {
    setToast(true);
    window.setTimeout(() => setToast(false), 2500);
  };

  const goHome = () => {
    setView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-[#17140f] text-amber-50"
    >
      <Header lang={lang} onLangChange={setLang} onLogin={login} />

      <main>
        {view === "home" ? (
          <>
            <HeroSection lang={lang} onTestStart={() => {
              setView("test");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }} />
            <SupportTools lang={lang} />
            <Features lang={lang} />
            <About lang={lang} />
          </>
        ) : (
          <TestSection lang={lang} onBack={goHome} />
        )}
      </main>

      <footer className="border-t border-amber-900/30 px-6 py-6 text-center text-sm text-amber-200/60">
        {t.footer}
      </footer>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-amber-800/40 bg-amber-950 px-5 py-3 text-amber-100 shadow-xl"
        >
          {t.soon}
        </div>
      )}
    </div>
  );
}
