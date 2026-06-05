/*
 * sync.js — Cloud(Firebase) と Store(localStorage) を連携させる
 *  - ログインしたら Firestore からデータを読み、ローカルとマージして同期開始
 *  - 以後の保存は自動でクラウドへ（書き込みすぎ防止に少しまとめる）
 *  - 認証状態の変化は 'auth-changed' イベントで各画面に通知
 */
(function () {
  if (typeof Cloud === 'undefined' || !Cloud.isReady()) {
    // Firebase が使えない場合はローカルのみで動作
    window.dispatchEvent(new CustomEvent('auth-changed', { detail: { user: null, ready: false } }));
    return;
  }

  // クラウド保存（連続操作をまとめて書き込む）
  function makeCloudSaver(uid) {
    let timer = null;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        Cloud.saveDoc(uid, Store.get()).catch((e) => console.warn('クラウド保存に失敗', e));
      }, 600);
    };
  }

  Cloud.onUser(async (user) => {
    if (user) {
      try {
        const cloud = await Cloud.loadDoc(user.uid);
        const merged = Store.merge(Store.get(), cloud);
        Store.replaceState(merged);          // 画面も再描画される
        await Cloud.saveDoc(user.uid, Store.get()); // マージ結果を書き戻す
      } catch (e) {
        console.warn('クラウド読み込みに失敗（ローカルで続行）', e);
      }
      Store.setCloudSave(makeCloudSaver(user.uid));
    } else {
      Store.setCloudSave(null);
    }
    window.dispatchEvent(new CustomEvent('auth-changed', { detail: { user, ready: true } }));
  });
})();
