# まいにちTOEIC 📚

英語が苦手な人が「毎日少しずつ」TOEIC対策を続けられる学習教材アプリ。

## 特徴
- 🗓️ 試験日カウントダウン / 🔥 連続学習日数（ストリーク）/ 📅 学習カレンダー
- ✅ 今日のタスク（単語・パート・文法を日替わりで提案）
- 📝 パート別対策 Part 1〜7（在庫から日替わり8問・解説つき）
- 📗 中学文法 復習 7トピック（厚い解説＋確認問題）
- 🗂️ 単語・熟語帳（フラッシュカード／読み上げ）
- 📊 推定スコア推移グラフ / 🎉 完了演出
- 🔊 リスニング読み上げ（Web Speech API、音声ファイル不要）
- 🔐 Googleログイン＋Firestore同期（複数端末で進捗を保存）

## 技術
- HTML + Tailwind CSS（CDN）+ バニラ JavaScript
- データ保存：localStorage（ローカルキャッシュ）＋ Firebase Firestore（クラウド同期）
- 静的サイト（ビルド不要）

## ローカルで動かす
Google ログインのため `file://` ではなくローカルサーバーで開きます。

```bash
python3 -m http.server 8765
# ブラウザで http://localhost:8765/ を開く
```

## 構成
```
index.html              ホーム（ダッシュボード）
settings.html           マイ・設定（試験日 / 目標スコア / ログイン）
vocab.html              単語帳
parts/list.html         パート一覧
parts/part.html?p=part5 パート学習（汎用）
grammar/list.html       中学文法 一覧
grammar/topic.html?g=g1 文法トピック学習（汎用）
assets/                 tw / store / content / grammar / ui / firebase / sync
docs/spec/              仕様書
```

## デプロイ
Vercel に静的サイトとしてデプロイ（Framework Preset: Other、ビルド設定なし）。
デプロイ後、Firebase コンソールの Authentication →「設定」→「承認済みドメイン」に
本番ドメイン（`*.vercel.app` など）を追加するとログインが有効になります。
