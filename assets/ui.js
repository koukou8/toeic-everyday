/*
 * ui.js — 画面共通のUIヘルパー
 *  - speak(): ブラウザ読み上げ（リスニング音声）
 *  - renderNav(): 下部ナビ
 *  - escapeHtml(): 表示用エスケープ
 */
const UI = (() => {
  // ---- リスニング音声（Web Speech API）----
  function speak(text, opts = {}) {
    if (!('speechSynthesis' in window)) {
      alert('お使いのブラウザは読み上げに対応していません。Chrome / Safari をお試しください。');
      return;
    }
    window.speechSynthesis.cancel(); // 連打対策：前の再生を止める
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = opts.rate ?? 0.95; // 初心者向けに少しゆっくり
    u.pitch = 1;
    // できれば英語の音声を選ぶ
    const voices = window.speechSynthesis.getVoices();
    const en = voices.find((v) => /en[-_]US/i.test(v.lang)) || voices.find((v) => /^en/i.test(v.lang));
    if (en) u.voice = en;
    window.speechSynthesis.speak(u);
  }
  // 音声リストは非同期で読み込まれることがあるので先に呼んでおく
  if ('speechSynthesis' in window) { window.speechSynthesis.getVoices(); }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  // ---- お祝いの紙吹雪 ----
  function celebrate() {
    if (!document.getElementById('conf-style')) {
      const st = document.createElement('style');
      st.id = 'conf-style';
      st.textContent = '@keyframes confFall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}';
      document.head.appendChild(st);
    }
    const colors = ['#4F46E5', '#6366F1', '#22C55E', '#F59E0B', '#EC4899', '#38BDF8'];
    const c = document.createElement('div');
    c.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:60;overflow:hidden';
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div');
      const size = 6 + Math.random() * 8;
      p.style.cssText =
        `position:absolute;top:-24px;left:${Math.random() * 100}%;` +
        `width:${size}px;height:${size * 0.6}px;background:${colors[i % colors.length]};` +
        `opacity:.9;border-radius:2px;transform:rotate(${Math.random() * 360}deg);` +
        `animation:confFall ${1.4 + Math.random() * 1.3}s ${Math.random() * 0.4}s ease-in forwards`;
      c.appendChild(p);
    }
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3200);
  }

  // ---- ナビ（スマホ:下部バー / PC:左サイドバー）----
  function renderNav(active, base = '') {
    const items = [
      { key: 'home',  label: 'ホーム', href: base + 'index.html',    icon: '<path d="M3 10l9-7 9 7v9a2 2 0 0 1-2 2h-3v-6H8v6H5a2 2 0 0 1-2-2z"/>' },
      { key: 'parts', label: 'パート', href: base + 'parts/list.html', icon: '<path d="M4 5h16M4 12h16M4 19h10"/>' },
      { key: 'vocab', label: '単語',   href: base + 'vocab.html',     icon: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>' },
      { key: 'my',    label: 'マイ',   href: base + 'settings.html',  icon: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"/>' },
    ];
    const icon = (it) => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${it.icon}</svg>`;

    // 下部バー（モバイル）— lg 以上では非表示
    const cells = items.map((it) => {
      const on = it.key === active;
      return `<a href="${it.href}" class="flex flex-col items-center gap-1 py-1 ${on ? 'text-brand' : 'text-sub'}">
        ${icon(it)}
        <span class="text-[10px] ${on ? 'font-semibold' : ''}">${it.label}</span>
      </a>`;
    }).join('');
    const bottom = `<nav class="fixed bottom-0 left-1/2 z-20 w-full max-w-[440px] -translate-x-1/2 border-t border-line bg-white/90 backdrop-blur-md lg:hidden">
      <div class="grid grid-cols-4 px-2 py-2">${cells}</div>
    </nav>`;

    // 左サイドバー（PC）— lg 未満では非表示
    const rows = items.map((it) => {
      const on = it.key === active;
      return `<a href="${it.href}" class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] transition ${on ? 'bg-indigo-50 text-brand font-semibold' : 'text-sub hover:bg-slate-50'}">
        ${icon(it)}
        <span>${it.label}</span>
      </a>`;
    }).join('');
    const side = `<aside class="hidden lg:flex fixed left-0 top-0 z-20 h-screen w-60 flex-col border-r border-line bg-white px-4 py-7">
      <a href="${base + 'index.html'}" class="flex items-center gap-2 px-3">
        <span class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand2 text-[18px]">📚</span>
        <span class="leading-tight">
          <span class="block text-[11px] text-sub">まいにち</span>
          <span class="block text-[16px] font-bold tracking-tight">TOEIC</span>
        </span>
      </a>
      <nav class="mt-7 flex flex-col gap-1">${rows}</nav>
    </aside>`;

    return bottom + side;
  }

  // ---- 設問の読み上げテキストを作る ----
  // リスニング問題は audio をそのまま使う。リーディング/文法は本文＋設問から
  // 英文だけ抜き出し、空所(_____)は "blank"、日本語(括弧の補足など)は除去する。
  function questionSpeakText(q) {
    if (q && q.audio) return q.audio;
    const segs = [];
    if (q && q.passage) segs.push(q.passage);
    if (q && q.prompt) segs.push(q.prompt);
    let t = segs.join('. ');
    t = t.replace(/[（(][^()（）]*[ぁ-んァ-ヶ一-龥][^()（）]*[）)]/g, ' '); // 日本語を含む括弧を除去
    t = t.replace(/_{2,}/g, ' blank '); // 空所は blank と読む
    t = t.replace(/[ぁ-んァ-ヶー一-龥、。・「」『』〜：　！？]/g, ' '); // 残った日本語文字を除去
    t = t.replace(/\s+/g, ' ').trim();
    return t;
  }

  // ---- 読み上げボタンのHTML（クリックは [data-audio] のリスナーで処理）----
  function speakButton(text, extraClass) {
    if (!text) return '';
    return `<button data-audio="${escapeHtml(text)}" title="読み上げ" aria-label="読み上げ"
      class="${extraClass || ''} grid h-8 w-8 shrink-0 place-items-center rounded-full bg-indigo-50 text-brand active:scale-95 transition">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.8-1-3.3-2.5-4v8c1.5-.7 2.5-2.2 2.5-4z"/></svg>
    </button>`;
  }

  return { speak, renderNav, escapeHtml, celebrate, questionSpeakText, speakButton };
})();
