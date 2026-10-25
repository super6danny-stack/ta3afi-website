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
