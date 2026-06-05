// 共有 Tailwind 設定（全ページで読み込む）
// CDN の tailwind.config をここで一括定義し、デザインを統一する。
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', '"Inter"', 'sans-serif'],
        num: ['"Inter"', 'sans-serif'],
      },
      colors: {
        ink: '#0F172A',
        sub: '#64748B',
        line: '#EAECEF',
        brand: '#4F46E5',
        brand2: '#6366F1',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)',
        soft: '0 1px 2px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.05)',
      },
    },
  },
};
