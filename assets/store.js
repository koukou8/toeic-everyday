/*
 * Store — アプリのデータ層
 * ------------------------------------------------------------
 * いまは localStorage に保存している。
 * あとで Firebase(Firestore) に差し替えるときは、このファイルの
 *   _read() / _write() の中身だけを書き換えればよい設計にしてある。
 * （画面側は Store.xxx() しか呼ばないので影響を受けない）
 */
const Store = (() => {
  const KEY = 'mainichi-toeic';

  const DEFAULT = {
    examDate: null,        // "2026-09-13" 形式。未設定なら null
    targetScore: 400,
    streak: 0,             // 連続学習日数
    lastStudyDate: null,   // "YYYY-MM-DD"
    studyDates: [],        // 学習した日付の一覧
    dailyDone: {},         // { "YYYY-MM-DD": ["part5","vocab", ...] } その日に完了したタスク
    partProgress: {},      // { part5: { completed: 3, total: 5 } }
    vocabKnown: [],        // 覚えた単語(英語表記)
    scoreLog: [],          // [{ date, score }] 推定スコア推移
    answeredTotal: 0,      // これまでに解いた問題数（推定スコア用）
    correctTotal: 0,       // これまでの正解数
  };

  let state = null;
  let cloudSave = null;     // ログイン時にクラウド保存関数が注入される
  const subs = [];          // データ変化の購読者（画面の再描画用）

  // ---- ローカル永続化 ----
  function _read() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }
  function _persistLocal() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('ローカル保存に失敗しました', e);
    }
  }
  // ------------------------------------------------------------

  function load() {
    state = Object.assign({}, DEFAULT, _read() || {});
    return state;
  }
  // 保存：ローカル＋（ログイン中なら）クラウドへ
  function save() {
    _persistLocal();
    if (cloudSave) { try { cloudSave(state); } catch (e) { console.warn(e); } }
  }
  function get() { return state || load(); }

  // ---- クラウド連携 ----
  function setCloudSave(fn) { cloudSave = fn; }
  function onChange(cb) { subs.push(cb); }
  function notify() { subs.forEach((cb) => { try { cb(); } catch (e) {} }); }
  // クラウドから来たデータで状態を置き換える（ローカルにも反映し、画面に通知）
  function replaceState(obj) {
    state = Object.assign({}, DEFAULT, obj || {});
    _persistLocal();
    notify();
  }
  // ローカルとクラウドを安全にマージ（取りこぼしを防ぐ）
  function merge(local, cloud) {
    if (!cloud) return local;
    if (!local) return cloud;
    const union = (a = [], b = []) => [...new Set([...a, ...b])];
    // パート進捗は completed の大きい方を採用
    const partProgress = {};
    const ids = union(Object.keys(local.partProgress || {}), Object.keys(cloud.partProgress || {}));
    ids.forEach((id) => {
      const lp = local.partProgress?.[id] || { completed: 0, total: 0 };
      const cp = cloud.partProgress?.[id] || { completed: 0, total: 0 };
      partProgress[id] = {
        completed: Math.max(lp.completed || 0, cp.completed || 0),
        total: Math.max(lp.total || 0, cp.total || 0),
      };
    });
    // 連続日数は lastStudyDate が新しい方を信頼
    const newer = (cloud.lastStudyDate || '') >= (local.lastStudyDate || '') ? cloud : local;
    // dailyDone を日付ごとに結合
    const dailyDone = Object.assign({}, local.dailyDone || {});
    Object.entries(cloud.dailyDone || {}).forEach(([d, arr]) => {
      dailyDone[d] = union(dailyDone[d] || [], arr);
    });
    return {
      examDate: cloud.examDate ?? local.examDate ?? null,
      targetScore: cloud.targetScore ?? local.targetScore ?? DEFAULT.targetScore,
      streak: newer.streak || 0,
      lastStudyDate: newer.lastStudyDate || null,
      studyDates: union(local.studyDates, cloud.studyDates),
      dailyDone,
      partProgress,
      vocabKnown: union(local.vocabKnown, cloud.vocabKnown),
      scoreLog: (local.scoreLog || []).concat(cloud.scoreLog || []),
    };
  }

  // ---- 日付ユーティリティ ----
  function todayStr() {
    const d = new Date();
    return ymd(d);
  }
  function ymd(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
  function diffDays(fromStr, toStr) {
    const a = new Date(fromStr + 'T00:00:00');
    const b = new Date(toStr + 'T00:00:00');
    return Math.round((b - a) / 86400000);
  }

  // ---- 試験日 ----
  function setExamDate(dateStr) { get().examDate = dateStr || null; save(); }
  function getExamDate() { return get().examDate; }
  function daysUntilExam() {
    const ex = getExamDate();
    if (!ex) return null;
    return diffDays(todayStr(), ex);
  }

  function setTargetScore(n) { get().targetScore = n; save(); }
  function getTargetScore() { return get().targetScore; }

  // ---- ストリーク（連続日数）----
  function getStreak() {
    const s = get();
    // 最終学習日が「今日」でも「昨日」でもなければ連続は途切れている
    if (!s.lastStudyDate) return 0;
    const gap = diffDays(s.lastStudyDate, todayStr());
    if (gap > 1) return 0;
    return s.streak;
  }

  // タスク完了を記録（ストリーク・学習日・パート進捗を更新）
  function recordDone(taskId, partTotal) {
    const s = get();
    const today = todayStr();

    // ストリーク更新（その日初めての学習のとき）
    if (s.lastStudyDate !== today) {
      const gap = s.lastStudyDate ? diffDays(s.lastStudyDate, today) : 999;
      s.streak = gap === 1 ? (s.streak + 1) : 1;
      s.lastStudyDate = today;
      if (!s.studyDates.includes(today)) s.studyDates.push(today);
    }

    // その日の完了タスク
    if (!s.dailyDone[today]) s.dailyDone[today] = [];
    if (!s.dailyDone[today].includes(taskId)) s.dailyDone[today].push(taskId);

    save();
  }

  // パート進捗の更新（正答数の最大値で記録）
  function setPartProgress(partId, correct, total) {
    const s = get();
    const prev = s.partProgress[partId]?.completed || 0;
    s.partProgress[partId] = { completed: Math.max(prev, correct), total };
    save();
  }
  function getPartProgress(partId) {
    return get().partProgress[partId] || { completed: 0, total: 0 };
  }

  // 全体の進捗(%)：全パートの completed/total を平均
  function overallProgress(partIds) {
    const s = get();
    let done = 0, total = 0;
    partIds.forEach((id) => {
      const p = s.partProgress[id];
      if (p && p.total) { done += p.completed; total += p.total; }
    });
    if (!total) return 0;
    return Math.round((done / total) * 100);
  }

  function isDoneToday(taskId) {
    const s = get();
    return (s.dailyDone[todayStr()] || []).includes(taskId);
  }

  // ---- 推定スコア ----
  // 解いた結果を累積し、全体の正答率からTOEICの目安スコアを推定して記録する。
  // ※公式スコアではなく、伸びを実感するための「目安」。
  function recordScore(correct, total) {
    const s = get();
    s.answeredTotal = (s.answeredTotal || 0) + total;
    s.correctTotal = (s.correctTotal || 0) + correct;
    const acc = s.answeredTotal ? s.correctTotal / s.answeredTotal : 0;
    // 正答率0%→150点, 100%→850点 の目安（5点刻み、10〜990にclamp）
    let score = Math.round((150 + acc * 700) / 5) * 5;
    score = Math.max(10, Math.min(990, score));
    s.scoreLog.push({ date: todayStr(), score });
    if (s.scoreLog.length > 30) s.scoreLog = s.scoreLog.slice(-30); // 直近30件
    save();
    return score;
  }
  function getScoreLog() { return get().scoreLog || []; }
  function latestScore() {
    const l = getScoreLog();
    return l.length ? l[l.length - 1].score : null;
  }

  // ---- 単語 ----
  function markVocabKnown(word, known) {
    const s = get();
    const set = new Set(s.vocabKnown);
    if (known) set.add(word); else set.delete(word);
    s.vocabKnown = [...set];
    save();
  }
  function isVocabKnown(word) { return get().vocabKnown.includes(word); }

  function resetAll() {
    state = Object.assign({}, DEFAULT);
    save();
  }

  load();

  return {
    get, save, load,
    todayStr, ymd, diffDays,
    setExamDate, getExamDate, daysUntilExam,
    setTargetScore, getTargetScore,
    getStreak, recordDone,
    setPartProgress, getPartProgress, overallProgress,
    isDoneToday,
    recordScore, getScoreLog, latestScore,
    markVocabKnown, isVocabKnown,
    resetAll,
    // クラウド連携
    setCloudSave, onChange, replaceState, merge,
  };
})();
