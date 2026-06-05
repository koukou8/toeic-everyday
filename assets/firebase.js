/*
 * firebase.js — Firebase 初期化 ＋ クラウド層(Cloud)
 * compat SDK（グローバル firebase）を使う。HTML側で先に SDK を読み込むこと。
 */
const firebaseConfig = {
  apiKey: "AIzaSyBTvBUZcK2v9NvyKNu-k_QXVxH6Ex86WSQ",
  authDomain: "toeic-everyday.firebaseapp.com",
  projectId: "toeic-everyday",
  storageBucket: "toeic-everyday.firebasestorage.app",
  messagingSenderId: "161576160799",
  appId: "1:161576160799:web:671931e40de77dc79c8f2a",
};

const Cloud = (() => {
  let ready = false;     // SDKが使えるか
  let fbAuth = null, fbDb = null;

  try {
    if (typeof firebase !== 'undefined' && firebase.initializeApp) {
      if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
      fbAuth = firebase.auth();
      fbDb = firebase.firestore();
      ready = true;
    }
  } catch (e) {
    console.warn('Firebase 初期化に失敗しました（オフラインで続行）', e);
  }

  let _user = null;
  let _known = false;     // 認証状態を一度でも受け取ったか
  const userCbs = [];

  if (ready) {
    fbAuth.onAuthStateChanged((u) => {
      _user = u; _known = true;
      userCbs.forEach((cb) => cb(u));
    });
  }

  function onUser(cb) {
    userCbs.push(cb);
    if (_known) cb(_user); // すでに判明していれば即実行
  }
  function currentUser() { return _user; }
  function isReady() { return ready; }

  async function signInWithGoogle() {
    if (!ready) throw new Error('Firebase 未初期化');
    const provider = new firebase.auth.GoogleAuthProvider();
    return fbAuth.signInWithPopup(provider);
  }
  function signOut() { return ready ? fbAuth.signOut() : Promise.resolve(); }

  async function loadDoc(uid) {
    const snap = await fbDb.collection('users').doc(uid).get();
    return snap.exists ? snap.data() : null;
  }
  async function saveDoc(uid, data) {
    await fbDb.collection('users').doc(uid).set(data, { merge: true });
  }

  return { isReady, onUser, currentUser, signInWithGoogle, signOut, loadDoc, saveDoc };
})();
