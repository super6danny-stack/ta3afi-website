"use client";
import { useEffect, useState } from "react";

const text = "مرحباً بك في رحلة التعافي";

// 1. واجهة لوحة التحكم الرئيسية بعد الضغط على زر الدخول
function Dashboard() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 p-8 text-right" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="border-b border-zinc-800 pb-4">
          <h1 className="text-3xl font-extrabold text-emerald-400">منصة التعافي الرقمية</h1>
          <p className="mt-2 text-zinc-400">مرحباً بك انا داني. من هنا يمكنك البدء في رحلة التعافي من الادمان , الموقع قيد الانشاء حاليا كما ترى.</p>
        </header>

        {/* قسم كروت المحتوى التجريبية للتصميم */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition">
            <h2 className="text-xl font-bold text-zinc-100 mb-2">توجيه ذكي</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              نظام محادثة وتوجيه مخصص لمساعدة الأشخاص للتغلب على العادات الإدمانية والتواصل معهم بخصوصية تامة.
            </p>
          </div>

          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition">
            <h2 className="text-xl font-bold text-zinc-100 mb-2">أدوات المتابعة</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              إحصائيات ومؤشرات يومية تساعد المستخدم على تتبع تقدمه والالتزام بخطته العلاجية.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

// 2. الصفحة الترحيبية الأساسية مع تأثير الكتابة الحية
export default function Home() {
  const [count, setCount] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [entered, setEntered] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);
  
  const done = count >= text.length;

  // إصلاح الخطأ: قمنا بإزالة [done] من المصفوفة ليبقى حجمها ثابتاً ويعتمد فقط على التعداد
  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => setCount(count + 1), 120);
    return () => clearTimeout(t);
  }, [count]); 

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setShowButton(true), 800);
    return () => clearTimeout(t);
  }, [done]);

  useEffect(() => {
    const i = setInterval(() => setCursorOn((v) => !v), 500);
    return () => clearInterval(i);
  }, []);

  if (entered) return <Dashboard />;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-950 text-zinc-50 p-4 text-right" dir="rtl">
      <div className="text-center space-y-6 max-w-lg">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl text-zinc-100 min-h-[60px]">
          {text.slice(0, count)}
          <span className={`inline-block w-[3px] h-[35px] bg-emerald-400 font-normal ${cursorOn ? "opacity-100" : "opacity-0"} ml-1 align-middle`}></span>
        </h1>

        <div className="min-h-[50px] flex items-center justify-center">
          {showButton && (
            <button
              onClick={() => setEntered(true)}
              className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold px-8 py-3 text-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-emerald-500/10"
            >
              ابدأ رحلتك الآن
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
