import { createContext, useContext, useEffect, useState } from 'react';

const translations = {
  en: { overview: 'Overview', wallets: 'Wallets', friends: 'Friends', community: 'Community', profile: 'Profile', budget: 'Budget', settings: 'Settings', theme: 'Theme', light: 'Light', dark: 'Dark', language: 'Language', aiConsultant: 'AI Consultant', logOut: 'Log out', appearance: 'Appearance', preferences: 'Preferences' },
  es: { overview: 'Resumen', wallets: 'Billeteras', friends: 'Amigos', community: 'Comunidad', profile: 'Perfil', budget: 'Presupuesto', settings: 'Ajustes', theme: 'Tema', light: 'Claro', dark: 'Oscuro', language: 'Idioma', aiConsultant: 'Consultor IA', logOut: 'Cerrar sesión', appearance: 'Apariencia', preferences: 'Preferencias' },
  fr: { overview: 'Aperçu', wallets: 'Portefeuilles', friends: 'Amis', community: 'Communauté', profile: 'Profil', budget: 'Budget', settings: 'Paramètres', theme: 'Thème', light: 'Clair', dark: 'Sombre', language: 'Langue', aiConsultant: 'Conseiller IA', logOut: 'Déconnexion', appearance: 'Apparence', preferences: 'Préférences' },
  zh: { overview: '概览', wallets: '钱包', friends: '好友', community: '社区', profile: '个人资料', budget: '预算', settings: '设置', theme: '主题', light: '浅色', dark: '深色', language: '语言', aiConsultant: 'AI顾问', logOut: '退出登录', appearance: '外观', preferences: '偏好' },
  de: { overview: 'Übersicht', wallets: 'Geldbeutel', friends: 'Freunde', community: 'Gemeinschaft', profile: 'Profil', budget: 'Budget', settings: 'Einstellungen', theme: 'Design', light: 'Hell', dark: 'Dunkel', language: 'Sprache', aiConsultant: 'KI-Berater', logOut: 'Abmelden', appearance: 'Erscheinungsbild', preferences: 'Einstellungen' },
  hi: { overview: 'अवलोकन', wallets: 'वॉलेट', friends: 'मित्र', community: 'समुदाय', profile: 'प्रोफ़ाइल', budget: 'बजट', settings: 'सेटिंग्स', theme: 'थीम', light: 'लाइट', dark: 'डार्क', language: 'भाषा', aiConsultant: 'AI सलाहकार', logOut: 'लॉग आउट', appearance: 'रूप', preferences: 'प्राथमिकताएँ' },
  ar: { overview: 'نظرة عامة', wallets: 'محافظ', friends: 'أصدقاء', community: 'مجتمع', profile: 'الملف الشخصي', budget: 'ميزانية', settings: 'الإعدادات', theme: 'المظهر', light: 'فاتح', dark: 'داكن', language: 'اللغة', aiConsultant: 'مستشار الذكاء الاصطناعي', logOut: 'تسجيل خروج', appearance: 'المظهر', preferences: 'التفضيلات' },
  ja: { overview: '概要', wallets: 'ウォレット', friends: 'フレンド', community: 'コミュニティ', profile: 'プロフィール', budget: '予算', settings: '設定', theme: 'テーマ', light: 'ライト', dark: 'ダーク', language: '言語', aiConsultant: 'AIコンサルタント', logOut: 'ログアウト', appearance: '外観', preferences: '設定' },
  id: { overview: 'Ikhtisar', wallets: 'Dompet', friends: 'Teman', community: 'Komunitas', profile: 'Profil', budget: 'Anggaran', settings: 'Pengaturan', theme: 'Tema', light: 'Terang', dark: 'Gelap', language: 'Bahasa', aiConsultant: 'Konsultan AI', logOut: 'Keluar', appearance: 'Tampilan', preferences: 'Preferensi' },
};

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
];

const LanguageContext = createContext({ lang: 'en', setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('pennywise-lang') || 'en');

  useEffect(() => {
    localStorage.setItem('pennywise-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;
  return <LanguageContext.Provider value={{ lang, setLang: setLangState, t }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);