"use client";

import { useState } from "react";
import { Globe, X, BookOpen, HeartHandshake, ShieldAlert } from "lucide-react";

interface LanguageGuide {
  code: string;
  name: string;
  flag: string;
  welcome: string;
  greeting: string;
  keyPhrases: { vi: string; phonetic: string; meaning: string }[];
  culturalTips: string[];
}

const GUIDES: LanguageGuide[] = [
  {
    code: "fr",
    name: "Français",
    flag: "🇫🇷",
    welcome: "Bienvenue à Hanoï, la capitale millénaire du Vietnam !",
    greeting: "Guide rapide et conseils essentiels pour les voyageurs francophones.",
    keyPhrases: [
      { vi: "Xin chào", phonetic: "[Sin chow]", meaning: "Bonjour" },
      { vi: "Cảm ơn", phonetic: "[Kahm ern]", meaning: "Merci" },
      { vi: "Bao nhiêu tiền?", phonetic: "[Bow nyew tyen?]", meaning: "Combien ça coûte ?" },
      { vi: "Ngon quá!", phonetic: "[Ngon kwah!]", meaning: "C'est délicieux !" },
      { vi: "Không đường", phonetic: "[Khom derng]", meaning: "Sans sucre (pour le café)" },
    ],
    culturalTips: [
      "Habillez-vous modestement (épaules et genoux couverts) lors de la visite des temples et pagodes.",
      "Retirez toujours vos chaussures avant d'entrer dans les maisons traditionnelles ou sanctuaires sacrés.",
      "Traversez la rue d'un pas régulier et confiant ; la marée de scooters vous évitera naturellement.",
    ],
  },
  {
    code: "ja",
    name: "日本語",
    flag: "🇯🇵",
    welcome: "千年の都・ハノイへようこそ！",
    greeting: "日本人旅行者のための基本会話と安心トラベルガイド。",
    keyPhrases: [
      { vi: "Xin chào", phonetic: "[シン チャオ]", meaning: "こんにちは" },
      { vi: "Cảm ơn", phonetic: "[カム オン]", meaning: "ありがとう" },
      { vi: "Bao nhiêu tiền?", phonetic: "[バオ ニュー ティエン？]", meaning: "いくらですか？" },
      { vi: "Ngon quá!", phonetic: "[ゴン クア！]", meaning: "とても美味しい！" },
      { vi: "Không rau mùi", phonetic: "[コン ザウ ムイ]", meaning: "パクチー抜きで" },
    ],
    culturalTips: [
      "寺院や文廟を訪れる際は、肩や膝が隠れる服装を心がけましょう。",
      "エッグコーヒー（Cà phê trứng）やハノイフォーは旧市街で必食の伝統名物です。",
      "道路を横断する際は、走らず一定のペースで堂々と歩くのが安全のコツです。",
    ],
  },
  {
    code: "ko",
    name: "한국어",
    flag: "🇰🇷",
    welcome: "천년의 고도 하노이에 오신 것을 환영합니다!",
    greeting: "한국인 여행객을 위한 필수 베트남어 회화 및 문화 에티켓.",
    keyPhrases: [
      { vi: "Xin chào", phonetic: "[씬 짜오]", meaning: "안녕하세요" },
      { vi: "Cảm ơn", phonetic: "[깜 온]", meaning: "감사합니다" },
      { vi: "Bao nhiêu tiền?", phonetic: "[바오 니에우 띠엔?]", meaning: "얼마인가요?" },
      { vi: "Ngon quá!", phonetic: "[응온 꾸아!]", meaning: "정말 맛있어요!" },
      { vi: "Không cay", phonetic: "[컴 까이]", meaning: "맵지 않게 해주세요" },
    ],
    culturalTips: [
      "사원 및 문묘 방문 시 민소매와 짧은 반바지는 피하고 단정한 복장을 착용하세요.",
      "호안끼엠 호수 주변은 주말 저녁 차 없는 거리(야시장)로 운영되어 산책하기 좋습니다.",
      "하노이 분짜(Bún chả)와 반미는 현지 길거리 식당에서 본연의 맛을 즐겨보세요.",
    ],
  },
  {
    code: "zh",
    name: "中文",
    flag: "🇨🇳",
    welcome: "欢迎来到千年古都——河内！",
    greeting: "为华语旅客准备的实用河内旅行须知与经典体验。",
    keyPhrases: [
      { vi: "Xin chào", phonetic: "[新朝]", meaning: "你好" },
      { vi: "Cảm ơn", phonetic: "[感恩]", meaning: "谢谢" },
      { vi: "Bao nhiêu tiền?", phonetic: "[包纽钱？]", meaning: "多少钱？" },
      { vi: "Ngon quá!", phonetic: "[昂瓜！]", meaning: "很好吃！" },
      { vi: "Tính tiền", phonetic: "[ tính tiền ]", meaning: "结账买单" },
    ],
    culturalTips: [
      "进入寺庙、文庙及古迹内部请保持庄重，勿大声喧哗，衣着勿暴露。",
      "品尝正宗河内牛肉粉（Phở Bát Đàn）与鸡蛋咖啡（Giảng Café）是老街区的不可错过之选。",
      "乘坐正规出租车（Mai Linh绿车或Grab打车软件）以确保计费透明规范。",
    ],
  },
];

export function InternationalWelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("fr");

  const guide = GUIDES.find((g) => g.code === activeLang) ?? GUIDES[0];

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-surface px-3 py-1 text-xs font-medium text-muted-foreground hover:border-secondary hover:text-secondary transition-colors"
        title="International Visitor Quick Guide"
      >
        <Globe className="size-3.5" />
        <span>FR · 日本語 · 한국어 · 中文</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-2xl rounded-3xl bg-surface border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-foreground">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-brand-emerald-dark text-brand-cream border-b border-amber-500/30">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                  <Globe className="size-5" />
                </span>
                <div>
                  <h3 className="font-serif font-bold text-base text-white">
                    International Visitor Pocket Guide
                  </h3>
                  <p className="text-xs text-amber-300/90">
                    Hanoi Capital City Welcome & Etiquette
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex size-8 items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Language Selector Pills */}
            <div className="flex items-center gap-2 px-6 py-3 border-b border-border bg-muted/40 overflow-x-auto no-scrollbar">
              {GUIDES.map((g) => (
                <button
                  key={g.code}
                  type="button"
                  onClick={() => setActiveLang(g.code)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    activeLang === g.code
                      ? "bg-brand-emerald-dark text-brand-cream shadow"
                      : "bg-surface border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{g.flag}</span>
                  <span>{g.name}</span>
                </button>
              ))}
            </div>

            {/* Content Body */}
            <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6">
              {/* Welcome message */}
              <div className="rounded-2xl bg-brand-emerald-dark/5 border border-brand-emerald-dark/15 p-4">
                <h4 className="font-serif font-bold text-base text-foreground">{guide.welcome}</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {guide.greeting}
                </p>
              </div>

              {/* Useful Phrases */}
              <div>
                <h5 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary mb-3">
                  <BookOpen className="size-4" />
                  <span>Essential Vietnamese Phrases</span>
                </h5>
                <div className="grid gap-2 sm:grid-cols-2">
                  {guide.keyPhrases.map((phrase) => (
                    <div
                      key={phrase.vi}
                      className="rounded-xl border border-border bg-muted/30 p-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-foreground text-[13px]">{phrase.vi}</span>
                        <span className="text-secondary font-mono text-[11px]">
                          {phrase.phonetic}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-[11px] mt-0.5">{phrase.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural Etiquette */}
              <div>
                <h5 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary mb-3">
                  <HeartHandshake className="size-4" />
                  <span>Cultural Etiquette & Tips</span>
                </h5>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {guide.culturalTips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-secondary mt-0.5 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Emergency Contacts */}
              <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4">
                <h5 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
                  <ShieldAlert className="size-4" />
                  <span>Emergency & Tourist Support Numbers</span>
                </h5>
                <div className="grid gap-2 sm:grid-cols-3 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Tourist Police:</span>
                    <a href="tel:1800556896" className="font-bold text-rose-600 dark:text-rose-400 hover:underline">
                      1800 556 896
                    </a>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Ambulance:</span>
                    <a href="tel:115" className="font-bold text-rose-600 dark:text-rose-400 hover:underline">
                      115
                    </a>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Police:</span>
                    <a href="tel:113" className="font-bold text-rose-600 dark:text-rose-400 hover:underline">
                      113
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-border bg-muted/30 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl bg-brand-emerald-dark px-4 py-2 text-xs font-semibold text-brand-cream hover:bg-brand-emerald-light transition-colors"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
