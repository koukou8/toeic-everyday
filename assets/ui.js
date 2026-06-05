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

  // ---- 下部ナビ ----
  function renderNav(active, base = '') {
    const items = [
      { key: 'home',  label: 'ホーム', href: base + 'index.html',    icon: '<path d="M3 10l9-7 9 7v9a2 2 0 0 1-2 2h-3v-6H8v6H5a2 2 0 0 1-2-2z"/>' },
      { key: 'parts', label: 'パート', href: base + 'parts/list.html', icon: '<path d="M4 5h16M4 12h16M4 19h10"/>' },
      { key: 'vocab', label: '単語',   href: base + 'vocab.html',     icon: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>' },
      { key: 'my',    label: 'マイ',   href: base + 'settings.html',  icon: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"/>' },
    ];
    const cells = items.map((it) => {
      const on = it.key === active;
      return `<a href="${it.href}" class="flex flex-col items-center gap-1 py-1 ${on ? 'text-brand' : 'text-sub'}">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${it.icon}</svg>
        <span class="text-[10px] ${on ? 'font-semibold' : ''}">${it.label}</span>
      </a>`;
    }).join('');
    return `<nav class="fixed bottom-0 left-1/2 z-20 w-full max-w-[440px] -translate-x-1/2 border-t border-line bg-white/90 backdrop-blur-md">
      <div class="grid grid-cols-4 px-2 py-2">${cells}</div>
    </nav>`;
  }

  return { speak, renderNav, escapeHtml, celebrate };
})();
