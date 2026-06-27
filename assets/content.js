/*
 * content.js — 学習コンテンツ（初心者〜400点向け）
 * パートのメタ情報・解説・練習問題・単語帳をここに集約。
 * 問題や単語を増やすときはこのファイルを編集するだけでOK。
 */

// パート一覧（表示順）
const PARTS = [
  { id: 'part1', no: 1, title: '写真描写',   skill: 'L', desc: '写真に合う説明文を選ぶ' },
  { id: 'part2', no: 2, title: '応答問題',   skill: 'L', desc: '質問への応答を選ぶ' },
  { id: 'part3', no: 3, title: '会話問題',   skill: 'L', desc: '会話を聞いて答える' },
  { id: 'part4', no: 4, title: '説明文',     skill: 'L', desc: 'アナウンス等を聞く' },
  { id: 'part5', no: 5, title: '短文穴埋め', skill: 'R', desc: '文法・語彙' },
  { id: 'part6', no: 6, title: '長文穴埋め', skill: 'R', desc: '文章の空所補充' },
  { id: 'part7', no: 7, title: '読解',       skill: 'R', desc: '文章を読んで答える' },
];

function getPart(id) { return PARTS.find((p) => p.id === id); }

// 1回の学習で出題する問題数（在庫から日替わりでこの数だけ出す）
const PART_SESSION = 8;

/*
 * 問題スキーマ
 *  audio:   読み上げる英文（リスニング用。なければ null）
 *  scene:   写真の代わりの「場面説明」（Part1用。日本語）
 *  passage: 読む英文（Part3,4,6,7用に表示）
 *  prompt:  設問文（表示）
 *  choices: 選択肢配列
 *  answer:  正解のindex
 *  explain: 解説（やさしい日本語）
 */
const PART_CONTENT = {
  part1: {
    lesson: `
      <p><strong>Part 1（写真描写）</strong>は、1枚の写真について4つの英文が読み上げられ、写真に最も合うものを選びます。</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>聞こえてくるのは<strong>「主語＋動詞」</strong>が中心。だれが・何を・どうしているか に集中。</li>
        <li>"is / are + ～ing"（〜している）の形がよく出ます。</li>
        <li>写真に写っていない物・人が出てきたら、その選択肢は不正解。</li>
      </ul>
      <p class="text-sub text-[13px]">💡 コツ：写真を見て「人は何をしている？」「物はどこにある？」を先に日本語で言ってみよう。</p>`,
    questions: [
      { scene: '【写真】カフェのカウンターで、女性がコーヒーを手に持って立っている。',
        audio: 'A, a woman is holding a cup. B, a woman is washing the dishes. C, a woman is reading a book. D, a woman is opening the door.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) A woman is holding a cup.', '(B) A woman is washing the dishes.', '(C) A woman is reading a book.', '(D) A woman is opening the door.'],
        answer: 0, explain: 'hold = 持つ。女性はカップを持っているので (A)。(B)皿を洗う、(C)本を読む、(D)ドアを開ける は写真と合いません。' },

      { scene: '【写真】公園のベンチに男性が座っていて、足元に犬がいる。',
        audio: 'A, a man is running in the park. B, a man is sitting on a bench. C, a man is riding a bike. D, a man is cooking food.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) A man is running in the park.', '(B) A man is sitting on a bench.', '(C) A man is riding a bike.', '(D) A man is cooking food.'],
        answer: 1, explain: 'sit on a bench = ベンチに座る。男性は座っているので (B)。' },

      { scene: '【写真】机の上にノートパソコンが1台置かれている。周りに人はいない。',
        audio: 'A, some people are talking. B, a laptop is on the desk. C, a car is parked outside. D, the lights are turned off.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) Some people are talking.', '(B) A laptop is on the desk.', '(C) A car is parked outside.', '(D) The lights are turned off.'],
        answer: 1, explain: 'laptop = ノートパソコン、on the desk = 机の上に。(B)。人は写っていないので (A) は不正解。' },

      { scene: '【写真】大通りを数人が歩いている。',
        audio: 'A, people are swimming in the sea. B, people are sleeping on the floor. C, people are walking on the street. D, people are painting a wall.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) People are swimming in the sea.', '(B) People are sleeping on the floor.', '(C) People are walking on the street.', '(D) People are painting a wall.'],
        answer: 2, explain: 'walk on the street = 通りを歩く。(C)。' },

      { scene: '【写真】建物の前に車が1台停まっている。',
        audio: 'A, a car is parked in front of a building. B, a man is driving very fast. C, the bus is full of people. D, a bike has fallen down.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) A car is parked in front of a building.', '(B) A man is driving very fast.', '(C) The bus is full of people.', '(D) A bike has fallen down.'],
        answer: 0, explain: 'be parked = 駐車されている。in front of = 〜の前に。(A)。' },

      { scene: '【写真】女性がホワイトボードに字を書いている。',
        audio: 'A, a woman is eating lunch. B, a woman is writing on a whiteboard. C, a woman is closing the window. D, a woman is carrying boxes.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) A woman is eating lunch.', '(B) A woman is writing on a whiteboard.', '(C) A woman is closing the window.', '(D) A woman is carrying boxes.'],
        answer: 1, explain: 'write on a whiteboard = ホワイトボードに書く。(B)。' },

      { scene: '【写真】棚に本が並んでいる。',
        audio: 'A, the books are on the shelf. B, the books are on the floor. C, the books are in a bag. D, the books are under the table.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) The books are on the shelf.', '(B) The books are on the floor.', '(C) The books are in a bag.', '(D) The books are under the table.'],
        answer: 0, explain: 'shelf = 棚。本は棚の上にあるので (A)。場所を表す前置詞に注目。' },

      { scene: '【写真】男性が電話で話している。',
        audio: 'A, a man is playing the guitar. B, a man is washing his car. C, a man is talking on the phone. D, a man is watering the plants.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) A man is playing the guitar.', '(B) A man is washing his car.', '(C) A man is talking on the phone.', '(D) A man is watering the plants.'],
        answer: 2, explain: 'talk on the phone = 電話で話す。(C)。' },

      { scene: '【写真】2人がにこやかに握手をしている。',
        audio: 'A, they are shaking hands. B, they are running a race. C, they are cooking dinner. D, they are reading newspapers.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) They are shaking hands.', '(B) They are running a race.', '(C) They are cooking dinner.', '(D) They are reading newspapers.'],
        answer: 0, explain: 'shake hands = 握手する。(A)。' },

      { scene: '【写真】テーブルにコーヒーカップとノートが置かれている。人はいない。',
        audio: 'A, people are dancing together. B, a dog is sleeping on the sofa. C, the table is completely empty. D, a cup is on the table.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) People are dancing together.', '(B) A dog is sleeping on the sofa.', '(C) The table is completely empty.', '(D) A cup is on the table.'],
        answer: 3, explain: 'カップが置かれているので (D)。テーブルは空ではないので (C) は不正解。' },

      { scene: '【写真】男性が両手で段ボール箱を運んでいる。',
        audio: 'A, a man is carrying some boxes. B, a man is sleeping on a bed. C, a man is reading a map. D, a man is painting a fence.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) A man is carrying some boxes.', '(B) A man is sleeping on a bed.', '(C) A man is reading a map.', '(D) A man is painting a fence.'],
        answer: 0, explain: 'carry = 運ぶ。箱を運んでいるので (A)。' },

      { scene: '【写真】女性が花に水をやっている。',
        audio: 'A, a woman is cooking dinner. B, a woman is watering some flowers. C, a woman is driving a car. D, a woman is singing a song.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) A woman is cooking dinner.', '(B) A woman is watering some flowers.', '(C) A woman is driving a car.', '(D) A woman is singing a song.'],
        answer: 1, explain: 'water（動詞）= 水をやる。(B)。' },

      { scene: '【写真】レストランで人々が食事をしている。',
        audio: 'A, people are cleaning the windows. B, people are waiting for a bus. C, people are eating at a restaurant. D, people are playing soccer.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) People are cleaning the windows.', '(B) People are waiting for a bus.', '(C) People are eating at a restaurant.', '(D) People are playing soccer.'],
        answer: 2, explain: 'eat at a restaurant = レストランで食事する。(C)。' },

      { scene: '【写真】机の上に書類が積み重なっている。',
        audio: 'A, the documents are on the floor. B, the documents are in a car. C, the documents are in the trash. D, the documents are stacked on the desk.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) The documents are on the floor.', '(B) The documents are in a car.', '(C) The documents are in the trash.', '(D) The documents are stacked on the desk.'],
        answer: 3, explain: 'be stacked = 積み重ねられている。on the desk。(D)。' },

      { scene: '【写真】男性が自転車に乗っている。',
        audio: 'A, a man is walking a dog. B, a man is riding a bicycle. C, a man is fixing a car. D, a man is sitting on a chair.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) A man is walking a dog.', '(B) A man is riding a bicycle.', '(C) A man is fixing a car.', '(D) A man is sitting on a chair.'],
        answer: 1, explain: 'ride a bicycle = 自転車に乗る。(B)。' },

      { scene: '【写真】女性がパソコンで作業している。',
        audio: 'A, a woman is washing the dishes. B, a woman is climbing the stairs. C, a woman is typing on a computer. D, a woman is sleeping on a sofa.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) A woman is washing the dishes.', '(B) A woman is climbing the stairs.', '(C) A woman is typing on a computer.', '(D) A woman is sleeping on a sofa.'],
        answer: 2, explain: 'type on a computer = パソコンで入力する。(C)。' },

      { scene: '【写真】男性が脚立に乗って天井の照明を直している。',
        audio: 'A, a man is climbing a ladder. B, a man is sweeping the floor. C, a man is folding clothes. D, a man is closing a window.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) A man is climbing a ladder.', '(B) A man is sweeping the floor.', '(C) A man is folding clothes.', '(D) A man is closing a window.'],
        answer: 0, explain: 'climb a ladder = 脚立（はしご）に登る。男性ははしごに乗っているので (A)。(B)床を掃く、(C)服をたたむ、(D)窓を閉める は写真と合いません。' },

      { scene: '【写真】スーパーの店員が棚に商品を並べている。',
        audio: 'A, a clerk is paying for groceries. B, a clerk is arranging items on a shelf. C, a clerk is mopping the aisle. D, a clerk is locking the entrance.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) A clerk is paying for groceries.', '(B) A clerk is arranging items on a shelf.', '(C) A clerk is mopping the aisle.', '(D) A clerk is locking the entrance.'],
        answer: 1, explain: 'arrange items on a shelf = 棚に商品を並べる。店員は商品を並べているので (B)。clerk = 店員。' },

      { scene: '【写真】海辺に数隻のボートが浮かんでいる。人は写っていない。',
        audio: 'A, some boats are floating on the water. B, some people are swimming in the pool. C, a boat is being repaired. D, the children are building sandcastles.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) Some boats are floating on the water.', '(B) Some people are swimming in the pool.', '(C) A boat is being repaired.', '(D) The children are building sandcastles.'],
        answer: 0, explain: 'float on the water = 水に浮かぶ。ボートが浮かんでいるので (A)。人は写っていないので (B)(D) は不正解。' },

      { scene: '【写真】カフェのテラスで女性がメニューを見ている。',
        audio: 'A, a woman is paying the bill. B, a woman is looking at a menu. C, a woman is clearing the table. D, a woman is taking a photo.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) A woman is paying the bill.', '(B) A woman is looking at a menu.', '(C) A woman is clearing the table.', '(D) A woman is taking a photo.'],
        answer: 1, explain: 'look at a menu = メニューを見る。女性はメニューを見ているので (B)。' },

      { scene: '【写真】駅のホームで人々が電車を待っている。',
        audio: 'A, people are boarding the bus. B, people are buying tickets. C, people are waiting on the platform. D, people are crossing the bridge.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) People are boarding the bus.', '(B) People are buying tickets.', '(C) People are waiting on the platform.', '(D) People are crossing the bridge.'],
        answer: 2, explain: 'wait on the platform = ホームで待つ。人々はホームで待っているので (C)。platform = ホーム。' },

      { scene: '【写真】男性が傘をさして雨の中を歩いている。',
        audio: 'A, a man is opening a gate. B, a man is washing his hands. C, a man is reading a sign. D, a man is holding an umbrella.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) A man is opening a gate.', '(B) A man is washing his hands.', '(C) A man is reading a sign.', '(D) A man is holding an umbrella.'],
        answer: 3, explain: 'hold an umbrella = 傘をさす（持つ）。男性は傘を持っているので (D)。' },

      { scene: '【写真】会議室の壁に時計が掛けられている。',
        audio: 'A, a clock is hanging on the wall. B, a picture has fallen down. C, the chairs are stacked up. D, a man is fixing the wall.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) A clock is hanging on the wall.', '(B) A picture has fallen down.', '(C) The chairs are stacked up.', '(D) A man is fixing the wall.'],
        answer: 0, explain: 'hang on the wall = 壁に掛かっている。時計が壁に掛かっているので (A)。場所を表す前置詞 on に注目。' },

      { scene: '【写真】女性が買い物カートを押している。',
        audio: 'A, a woman is riding an elevator. B, a woman is pushing a shopping cart. C, a woman is trying on a coat. D, a woman is counting money.',
        prompt: '写真に最も合うものを選びましょう。',
        choices: ['(A) A woman is riding an elevator.', '(B) A woman is pushing a shopping cart.', '(C) A woman is trying on a coat.', '(D) A woman is counting money.'],
        answer: 1, explain: 'push a shopping cart = 買い物カートを押す。女性はカートを押しているので (B)。' },
    ],
  },

  part2: {
    lesson: `
      <p><strong>Part 2（応答問題）</strong>は、1つの質問（または発言）に対して、3つの応答から最も自然なものを選びます。<strong>選択肢は印刷されません（音だけ）</strong>。</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>まず質問の<strong>最初の1語</strong>（Where / When / Who / What / How など）を聞き取るのが超重要。</li>
        <li>Where → 場所、When → 時、Who → 人 が答えになります。</li>
        <li>質問と同じ単語が聞こえる選択肢は<strong>ひっかけ</strong>のことが多い。</li>
      </ul>
      <p class="text-sub text-[13px]">💡 このアプリでは練習しやすいよう選択肢も表示しています。慣れたら文字を見ずに音だけで挑戦してみよう。</p>`,
    questions: [
      { audio: 'Where is the meeting room? A, at three o\'clock. B, on the second floor. C, yes, I think so.',
        prompt: '質問に最も自然な応答を選びましょう。（Where = どこ）',
        choices: ['(A) At three o\'clock.（3時に）', '(B) On the second floor.（2階です）', '(C) Yes, I think so.（はい、そう思います）'],
        answer: 1, explain: 'Where（どこ）には場所で答えます。(B)。(A)は時間=When、(C)はYes/No疑問文への答え。' },

      { audio: 'When does the store open? A, at nine in the morning. B, near the station. C, it is a new store.',
        prompt: '質問に最も自然な応答を選びましょう。（When = いつ）',
        choices: ['(A) At nine in the morning.（朝9時に）', '(B) Near the station.（駅の近く）', '(C) It\'s a new store.（新しい店です）'],
        answer: 0, explain: 'When（いつ）には時間で答えます。(A)。' },

      { audio: 'Who is in charge of this project? A, for two weeks. B, Ms. Tanaka is. C, in the meeting room.',
        prompt: '質問に最も自然な応答を選びましょう。（Who = だれ）',
        choices: ['(A) For two weeks.（2週間）', '(B) Ms. Tanaka is.（田中さんです）', '(C) In the meeting room.（会議室で）'],
        answer: 1, explain: 'Who（だれ）には人で答えます。(B)。in charge of = 〜の担当。' },

      { audio: 'How do I get to the airport? A, by taxi. B, it is expensive. C, last night.',
        prompt: '質問に最も自然な応答を選びましょう。（How = どうやって）',
        choices: ['(A) By taxi.（タクシーで）', '(B) It\'s expensive.（高いです）', '(C) Last night.（昨夜）'],
        answer: 0, explain: 'How（手段）には方法で答えます。by taxi = タクシーで。(A)。' },

      { audio: 'What time is the meeting? A, in room five. B, at two p.m. C, with Mr. Kim.',
        prompt: '質問に最も自然な応答を選びましょう。（What time = 何時）',
        choices: ['(A) In room 5.（5号室で）', '(B) At 2 p.m.（午後2時に）', '(C) With Mr. Kim.（キムさんと）'],
        answer: 1, explain: 'What time（何時）には時刻で答えます。(B)。' },

      { audio: 'Why are you late? A, the train was delayed. B, yes, I am. C, to the office.',
        prompt: '質問に最も自然な応答を選びましょう。（Why = なぜ）',
        choices: ['(A) The train was delayed.（電車が遅れました）', '(B) Yes, I am.（はい、そうです）', '(C) To the office.（オフィスへ）'],
        answer: 0, explain: 'Why（理由）には理由で答えます。(A)。delay = 遅れる。' },

      { audio: 'Would you like some coffee? A, yes, please. B, on the desk. C, two days ago.',
        prompt: '質問に最も自然な応答を選びましょう。（勧誘・依頼）',
        choices: ['(A) Yes, please.（はい、お願いします）', '(B) On the desk.（机の上に）', '(C) Two days ago.（2日前）'],
        answer: 0, explain: 'Would you like 〜?（〜はいかが？）には Yes, please / No, thank you。(A)。' },

      { audio: 'Where did you put the keys? A, on the table. B, at six. C, Mr. Lee.',
        prompt: '質問に最も自然な応答を選びましょう。（Where = どこ）',
        choices: ['(A) On the table.（テーブルの上に）', '(B) At six.（6時に）', '(C) Mr. Lee.（リーさん）'],
        answer: 0, explain: 'Where には場所。put = 置く。(A)。' },

      { audio: 'Do you have a pen? A, sorry, I don\'t. B, it is Monday. C, in Tokyo.',
        prompt: '質問に最も自然な応答を選びましょう。（Do you 〜?）',
        choices: ['(A) Sorry, I don\'t.（すみません、ありません）', '(B) It\'s Monday.（月曜です）', '(C) In Tokyo.（東京で）'],
        answer: 0, explain: 'Do you 〜? にはYes/Noで答えます。(A)。' },

      { audio: 'When will the report be ready? A, by tomorrow. B, in the drawer. C, Mr. Sato.',
        prompt: '質問に最も自然な応答を選びましょう。（When = いつ）',
        choices: ['(A) By tomorrow.（明日までに）', '(B) In the drawer.（引き出しの中）', '(C) Mr. Sato.（佐藤さん）'],
        answer: 0, explain: 'When には時を表す答え。by tomorrow = 明日までに。(A)。' },

      { audio: 'What would you like to drink? A, some tea, please. B, in the kitchen. C, yesterday.',
        prompt: '質問に最も自然な応答を選びましょう。（What 〜 drink?）',
        choices: ['(A) Some tea, please.（お茶をお願いします）', '(B) In the kitchen.（台所で）', '(C) Yesterday.（昨日）'],
        answer: 0, explain: '「何を飲みたい？」には飲み物で答えます。(A)。' },

      { audio: 'Where can I buy a ticket? A, over there. B, at eight. C, it is blue.',
        prompt: '質問に最も自然な応答を選びましょう。（Where = どこ）',
        choices: ['(A) Over there.（あちらです）', '(B) At eight.（8時に）', '(C) It\'s blue.（青いです）'],
        answer: 0, explain: 'Where には場所。over there（あちら）。(A)。' },

      { audio: 'How was the meeting? A, it went well. B, in room three. C, two of them.',
        prompt: '質問に最も自然な応答を選びましょう。（How was 〜?）',
        choices: ['(A) It went well.（うまくいきました）', '(B) In room 3.（3号室で）', '(C) Two of them.（2つ）'],
        answer: 0, explain: '「会議はどうだった？」には感想で答えます。(A)。' },

      { audio: 'Can you help me carry this? A, sure, no problem. B, it is heavy snow. C, last Friday.',
        prompt: '質問に最も自然な応答を選びましょう。（依頼）',
        choices: ['(A) Sure, no problem.（もちろん、いいですよ）', '(B) It\'s heavy snow.（大雪です）', '(C) Last Friday.（先週の金曜）'],
        answer: 0, explain: '依頼には承諾/断りで答えます。(A)。' },

      { audio: 'Who wrote this report? A, Mr. Brown did. B, on the shelf. C, very long.',
        prompt: '質問に最も自然な応答を選びましょう。（Who = だれ）',
        choices: ['(A) Mr. Brown did.（ブラウンさんです）', '(B) On the shelf.（棚の上）', '(C) Very long.（とても長い）'],
        answer: 0, explain: 'Who には人。Mr. Brown did。(A)。' },

      { audio: 'Why is the office closed today? A, because of a holiday. B, next to the bank. C, at noon.',
        prompt: '質問に最も自然な応答を選びましょう。（Why = なぜ）',
        choices: ['(A) Because of a holiday.（祝日だからです）', '(B) Next to the bank.（銀行のとなり）', '(C) At noon.（正午に）'],
        answer: 0, explain: 'Why には理由。because of 〜（〜のため）。(A)。' },

      { audio: 'How many people are coming to the party? A, about twenty. B, in the evening. C, it was fun.',
        prompt: '質問に最も自然な応答を選びましょう。（How many = いくつ・何人）',
        choices: ['(A) About twenty.（20人くらい）', '(B) In the evening.（夕方に）', '(C) It was fun.（楽しかった）'],
        answer: 0, explain: 'How many（数）には数で答えます。(A)。(B)は時間=When、(C)は過去の感想。' },

      { audio: 'Whose bag is this? A, it\'s mine. B, on the chair. C, every day.',
        prompt: '質問に最も自然な応答を選びましょう。（Whose = だれの）',
        choices: ['(A) It\'s mine.（私のです）', '(B) On the chair.（椅子の上）', '(C) Every day.（毎日）'],
        answer: 0, explain: 'Whose（だれの）には持ち主で答えます。mine = 私のもの。(A)。' },

      { audio: 'Which color do you prefer, red or blue? A, both are nice. B, the blue one. C, at the store.',
        prompt: '質問に最も自然な応答を選びましょう。（Which = どちら）',
        choices: ['(A) Both are nice.（どちらも素敵）', '(B) The blue one.（青いほう）', '(C) At the store.（店で）'],
        answer: 1, explain: 'Which（どちら）には選んだものを答えます。「赤か青か」と聞かれているので the blue one。(B)。' },

      { audio: 'Could you open the window, please? A, of course. B, it\'s a new one. C, last week.',
        prompt: '質問に最も自然な応答を選びましょう。（依頼）',
        choices: ['(A) Of course.（もちろん）', '(B) It\'s a new one.（新しいものです）', '(C) Last week.（先週）'],
        answer: 0, explain: 'Could you 〜?（〜してくれますか）という依頼には承諾/断りで答えます。(A)。' },

      { audio: 'How long is the flight to London? A, about twelve hours. B, by airplane. C, next Monday.',
        prompt: '質問に最も自然な応答を選びましょう。（How long = どのくらいの時間）',
        choices: ['(A) About twelve hours.（約12時間）', '(B) By airplane.（飛行機で）', '(C) Next Monday.（来週の月曜）'],
        answer: 0, explain: 'How long（どのくらいの長さ・時間）には期間で答えます。(A)。(B)は手段=How、(C)は時=When。' },

      { audio: 'Did you finish the report? A, not yet. B, in the office. C, three of them.',
        prompt: '質問に最も自然な応答を選びましょう。（Did you 〜?）',
        choices: ['(A) Not yet.（まだです）', '(B) In the office.（オフィスで）', '(C) Three of them.（3つ）'],
        answer: 0, explain: 'Did you 〜? にはYes/Noや状況で答えます。Not yet = まだです。(A)。' },

      { audio: 'Let\'s have lunch together. A, sounds good. B, on the menu. C, very tasty.',
        prompt: '質問に最も自然な応答を選びましょう。（勧誘）',
        choices: ['(A) Sounds good.（いいですね）', '(B) On the menu.（メニューに）', '(C) Very tasty.（とてもおいしい）'],
        answer: 0, explain: 'Let\'s 〜（〜しよう）という勧誘には賛成/断りで答えます。Sounds good = いいね。(A)。' },

      { audio: 'What does Mr. Park do? A, he\'s an engineer. B, at noon. C, by train.',
        prompt: '質問に最も自然な応答を選びましょう。（What 〜 do? = 職業）',
        choices: ['(A) He\'s an engineer.（エンジニアです）', '(B) At noon.（正午に）', '(C) By train.（電車で）'],
        answer: 0, explain: 'What does 〜 do? は「職業は何ですか」。職業で答えます。(A)。' },
    ],
  },

  part3: {
    lesson: `
      <p><strong>Part 3（会話問題）</strong>は、2〜3人の短い会話を聞いて、設問に答えます（設問と選択肢は印刷されています）。</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>会話が流れる前に、設問を先読み</strong>しておくと聞き取りが楽になります。</li>
        <li>「だれが・どこで・何の話か」を最初の数秒でつかむ。</li>
        <li>What / Where / Why などの設問の種類を意識しよう。</li>
      </ul>`,
    questions: [
      { passage: 'W: Hi, I\'d like to return this shirt. It\'s too small.\nM: Sure. Do you have the receipt?\nW: Yes, here it is.',
        audio: 'Woman, hi, I would like to return this shirt. It is too small. Man, sure. Do you have the receipt? Woman, yes, here it is.',
        prompt: 'Where is this conversation taking place?（どこでの会話ですか）',
        choices: ['(A) At a store.（店）', '(B) At a hospital.（病院）', '(C) At a library.（図書館）'],
        answer: 0, explain: 'return this shirt（シャツを返品）、receipt（レシート）から店だとわかります。(A)。' },

      { passage: 'M: Excuse me, what time does the next train leave?\nW: It leaves at 10:15.\nM: Thank you very much.',
        audio: 'Man, excuse me, what time does the next train leave? Woman, it leaves at ten fifteen. Man, thank you very much.',
        prompt: 'What time does the next train leave?（次の電車は何時に出ますか）',
        choices: ['(A) 10:15', '(B) 10:50', '(C) 5:10'],
        answer: 0, explain: 'It leaves at 10:15 と言っています。(A)。leave = 出発する。' },

      { passage: 'M: Can I help you?\nW: Yes, I\'m looking for a blue jacket.\nM: They\'re over there.',
        audio: 'Man, can I help you? Woman, yes, I am looking for a blue jacket. Man, they are over there.',
        prompt: 'What is the woman looking for?（女性は何を探していますか）',
        choices: ['(A) A jacket（ジャケット）', '(B) A hat（帽子）', '(C) Shoes（靴）'],
        answer: 0, explain: 'looking for a blue jacket（青いジャケットを探している）。(A)。' },

      { passage: 'W: The printer isn\'t working.\nM: Did you check the paper?\nW: Oh, it\'s empty.',
        audio: 'Woman, the printer is not working. Man, did you check the paper? Woman, oh, it is empty.',
        prompt: 'What is the problem?（何が問題ですか）',
        choices: ['(A) There is no paper.（紙がない）', '(B) There is no ink.（インクがない）', '(C) There is no power.（電源がない）'],
        answer: 0, explain: 'it\'s empty（＝紙が空）と言っているので (A)。' },

      { passage: 'M: Are you free this afternoon?\nW: Sorry, I have a meeting at 3.',
        audio: 'Man, are you free this afternoon? Woman, sorry, I have a meeting at three.',
        prompt: 'Why is the woman busy?（女性はなぜ忙しいですか）',
        choices: ['(A) She has a meeting.（会議がある）', '(B) She is sick.（病気）', '(C) She is traveling.（旅行中）'],
        answer: 0, explain: 'I have a meeting at 3（3時に会議）。(A)。' },

      { passage: 'W: How was your trip?\nM: Great, but the flight was delayed.',
        audio: 'Woman, how was your trip? Man, great, but the flight was delayed.',
        prompt: 'What does the man say about the flight?（男性は飛行機について何と言っていますか）',
        choices: ['(A) It was delayed.（遅れた）', '(B) It was cheap.（安かった）', '(C) It was canceled.（欠航した）'],
        answer: 0, explain: 'the flight was delayed（遅れた）。(A)。' },

      { passage: 'M: I\'d like to book a table for two.\nW: For what time?\nM: Seven o\'clock.',
        audio: 'Man, I would like to book a table for two. Woman, for what time? Man, seven o\'clock.',
        prompt: 'What time is the reservation?（予約は何時ですか）',
        choices: ['(A) 2:00', '(B) 7:00', '(C) 9:00'],
        answer: 1, explain: 'Seven o\'clock = 7時。(B)。book a table = 席を予約する。' },

      { passage: 'W: Where should we have lunch?\nM: How about the new Italian place?\nW: Good idea.',
        audio: 'Woman, where should we have lunch? Man, how about the new Italian place? Woman, good idea.',
        prompt: 'What will they probably do?（2人はおそらく何をしますか）',
        choices: ['(A) Eat Italian food.（イタリア料理を食べる）', '(B) Cook at home.（家で料理する）', '(C) Skip lunch.（昼食を抜く）'],
        answer: 0, explain: 'Italian place に Good idea と賛成。(A)。' },

      { passage: 'M: Excuse me, is this seat taken?\nW: No, go ahead.',
        audio: 'Man, excuse me, is this seat taken? Woman, no, go ahead.',
        prompt: 'What does the man want to do?（男性は何をしたいですか）',
        choices: ['(A) Sit down.（座る）', '(B) Leave.（去る）', '(C) Buy a ticket.（切符を買う）'],
        answer: 0, explain: 'is this seat taken?（この席空いてますか）→座りたい。(A)。' },

      { passage: 'W: Did you finish the report?\nM: Not yet. I\'ll send it by tonight.',
        audio: 'Woman, did you finish the report? Man, not yet. I will send it by tonight.',
        prompt: 'When will the man send the report?（男性はいつ報告書を送りますか）',
        choices: ['(A) By tonight.（今夜までに）', '(B) Tomorrow.（明日）', '(C) Next week.（来週）'],
        answer: 0, explain: 'I\'ll send it by tonight（今夜までに送る）。(A)。' },

      { passage: 'M: Do you know where the post office is?\nW: Yes, it\'s next to the bank.',
        audio: 'Man, do you know where the post office is? Woman, yes, it is next to the bank.',
        prompt: 'Where is the post office?（郵便局はどこですか）',
        choices: ['(A) Next to the bank.（銀行のとなり）', '(B) In the school.（学校の中）', '(C) Far away.（遠く）'],
        answer: 0, explain: 'next to the bank（銀行のとなり）。(A)。next to = 〜のとなり。' },

      { passage: 'W: I\'d like to order a coffee.\nM: For here or to go?\nW: To go, please.',
        audio: 'Woman, I would like to order a coffee. Man, for here or to go? Woman, to go, please.',
        prompt: 'What does the woman want?（女性は何を望んでいますか）',
        choices: ['(A) A coffee to go.（持ち帰りのコーヒー）', '(B) A sandwich.（サンドイッチ）', '(C) A table.（席）'],
        answer: 0, explain: 'to go = 持ち帰り。コーヒーをto goで注文。(A)。' },

      { passage: 'M: The meeting is moved to 3 p.m.\nW: OK, thanks for letting me know.',
        audio: 'Man, the meeting is moved to three p.m. Woman, OK, thanks for letting me know.',
        prompt: 'What has changed?（何が変わりましたか）',
        choices: ['(A) The meeting time.（会議の時間）', '(B) The room.（部屋）', '(C) The date.（日付）'],
        answer: 0, explain: 'moved to 3 p.m.（3時に変更）＝時間の変更。(A)。' },

      { passage: 'W: How much is this shirt?\nM: It\'s twenty dollars.',
        audio: 'Woman, how much is this shirt? Man, it is twenty dollars.',
        prompt: 'How much is the shirt?（シャツはいくらですか）',
        choices: ['(A) $12', '(B) $20', '(C) $22'],
        answer: 1, explain: 'twenty dollars = 20ドル。(B)。' },

      { passage: 'M: Did you book the hotel?\nW: Yes, for two nights.',
        audio: 'Man, did you book the hotel? Woman, yes, for two nights.',
        prompt: 'How long will they stay?（何泊しますか）',
        choices: ['(A) One night.（1泊）', '(B) Two nights.（2泊）', '(C) Three nights.（3泊）'],
        answer: 1, explain: 'for two nights（2泊）。(B)。' },

      { passage: 'W: It\'s raining outside.\nM: Let\'s take a taxi then.',
        audio: 'Woman, it is raining outside. Man, let us take a taxi then.',
        prompt: 'What will they probably do?（2人はおそらく何をしますか）',
        choices: ['(A) Take a taxi.（タクシーに乗る）', '(B) Walk.（歩く）', '(C) Cancel the plan.（予定を中止する）'],
        answer: 0, explain: 'Let\'s take a taxi（タクシーにしよう）。(A)。' },

      { passage: 'M: Excuse me, where can I find the milk?\nW: It\'s in aisle five, at the back.\nM: Thanks a lot.',
        audio: 'Man, excuse me, where can I find the milk? Woman, it is in aisle five, at the back. Man, thanks a lot.',
        prompt: 'Where is the milk?（牛乳はどこですか）',
        choices: ['(A) In aisle five.（5番通路）', '(B) At the entrance.（入口）', '(C) Near the door.（ドアの近く）'],
        answer: 0, explain: 'in aisle five（5番通路に）と言っています。(A)。aisle = （店の）通路。' },

      { passage: 'W: My computer is so slow today.\nM: Did you try restarting it?\nW: Not yet. I\'ll do that now.',
        audio: 'Woman, my computer is so slow today. Man, did you try restarting it? Woman, not yet. I will do that now.',
        prompt: 'What will the woman do next?（女性は次に何をしますか）',
        choices: ['(A) Restart the computer.（パソコンを再起動する）', '(B) Buy a new one.（新しいのを買う）', '(C) Call support.（サポートに電話する）'],
        answer: 0, explain: 'restarting（再起動）にI\'ll do that now（今やる）と答えています。(A)。' },

      { passage: 'M: Hello, I have a reservation under Smith.\nW: Welcome. Your room is on the third floor.\nM: Great, thank you.',
        audio: 'Man, hello, I have a reservation under Smith. Woman, welcome. Your room is on the third floor. Man, great, thank you.',
        prompt: 'Where is this conversation taking place?（どこでの会話ですか）',
        choices: ['(A) At a hotel.（ホテル）', '(B) At a bank.（銀行）', '(C) At a school.（学校）'],
        answer: 0, explain: 'reservation（予約）、Your room（あなたの部屋）からホテルです。(A)。' },

      { passage: 'W: Are you ready to order?\nM: Yes, I\'ll have the chicken salad.\nW: Anything to drink?',
        audio: 'Woman, are you ready to order? Man, yes, I will have the chicken salad. Woman, anything to drink?',
        prompt: 'What does the man order?（男性は何を注文しますか）',
        choices: ['(A) A chicken salad.（チキンサラダ）', '(B) A steak.（ステーキ）', '(C) A pizza.（ピザ）'],
        answer: 0, explain: 'I\'ll have the chicken salad（チキンサラダにします）。(A)。' },

      { passage: 'M: Could you send me the file by email?\nW: Sure, what\'s your address?\nM: It\'s tom@abc.com.',
        audio: 'Man, could you send me the file by email? Woman, sure, what is your address? Man, it is tom at a b c dot com.',
        prompt: 'What does the man ask the woman to do?（男性は女性に何を頼んでいますか）',
        choices: ['(A) Send a file.（ファイルを送る）', '(B) Print a document.（書類を印刷する）', '(C) Make a call.（電話する）'],
        answer: 0, explain: 'send me the file by email（メールでファイルを送って）。(A)。' },

      { passage: 'W: Hi, I\'d like to pick up my package.\nM: Can I see your ID, please?\nW: Of course, here you go.',
        audio: 'Woman, hi, I would like to pick up my package. Man, can I see your I D, please? Woman, of course, here you go.',
        prompt: 'What does the man ask for?（男性は何を求めていますか）',
        choices: ['(A) Her ID.（身分証）', '(B) Her phone number.（電話番号）', '(C) Her receipt.（レシート）'],
        answer: 0, explain: 'Can I see your ID?（身分証を見せて）。(A)。pick up = 受け取る。' },

      { passage: 'M: This bus goes downtown, right?\nW: No, you need the number 8 bus.\nM: Oh, thank you for telling me.',
        audio: 'Man, this bus goes downtown, right? Woman, no, you need the number eight bus. Man, oh, thank you for telling me.',
        prompt: 'Which bus should the man take?（男性はどのバスに乗るべきですか）',
        choices: ['(A) The number 8 bus.（8番のバス）', '(B) This bus.（このバス）', '(C) The number 18 bus.（18番のバス）'],
        answer: 0, explain: 'you need the number 8 bus（8番が必要）。(A)。downtown = 中心街。' },

      { passage: 'W: Should we meet on Tuesday or Wednesday?\nM: Wednesday works better for me.\nW: OK, let\'s do Wednesday.',
        audio: 'Woman, should we meet on Tuesday or Wednesday? Man, Wednesday works better for me. Woman, OK, let us do Wednesday.',
        prompt: 'When will they meet?（2人はいつ会いますか）',
        choices: ['(A) On Tuesday.（火曜）', '(B) On Wednesday.（水曜）', '(C) On Thursday.（木曜）'],
        answer: 1, explain: 'Wednesday works better（水曜の方がいい）→OK, let\'s do Wednesday。(B)。' },
    ],
  },

  part4: {
    lesson: `
      <p><strong>Part 4（説明文）</strong>は、1人が話すアナウンスや留守電などを聞いて設問に答えます。</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>よく出る場面：店内/空港のアナウンス、留守番電話、天気予報、ツアー案内 など。</li>
        <li>冒頭で「何のアナウンスか」をつかむと一気に楽になります。</li>
        <li>数字（時間・値段・番号）は問われやすいので注意して聞く。</li>
      </ul>`,
    questions: [
      { passage: 'Attention, shoppers. Our store will close in 15 minutes, at 9 p.m. Please bring your items to the checkout counter. Thank you for shopping with us.',
        audio: 'Attention, shoppers. Our store will close in fifteen minutes, at nine p.m. Please bring your items to the checkout counter. Thank you for shopping with us.',
        prompt: 'What time will the store close?（店は何時に閉まりますか）',
        choices: ['(A) 9:00 p.m.', '(B) 9:15 p.m.', '(C) 9:50 p.m.'],
        answer: 0, explain: 'close ... at 9 p.m.（午後9時に閉店）。(A)。in 15 minutes は「あと15分で」。' },

      { passage: 'Thank you for calling Green Dental Clinic. We are open from Monday to Friday, 9 a.m. to 6 p.m. We are closed on weekends.',
        audio: 'Thank you for calling Green Dental Clinic. We are open from Monday to Friday, nine a.m. to six p.m. We are closed on weekends.',
        prompt: 'When is the clinic closed?（クリニックはいつ休みですか）',
        choices: ['(A) On weekends.（週末）', '(B) On Mondays.（月曜）', '(C) In the morning.（午前中）'],
        answer: 0, explain: 'closed on weekends（週末は休み）。(A)。' },

      { passage: 'Welcome aboard flight 202 to Osaka. Please fasten your seatbelt. We will arrive in about 50 minutes.',
        audio: 'Welcome aboard flight two oh two to Osaka. Please fasten your seatbelt. We will arrive in about fifty minutes.',
        prompt: 'Where is this announcement most likely heard?（どこで聞かれるアナウンスですか）',
        choices: ['(A) On a plane.（飛行機）', '(B) On a train.（電車）', '(C) In a hotel.（ホテル）'],
        answer: 0, explain: 'Welcome aboard flight（搭乗ありがとう）、seatbelt から飛行機。(A)。' },

      { passage: 'Good morning. Today will be sunny with a high of 25 degrees. Don\'t forget your sunglasses.',
        audio: 'Good morning. Today will be sunny with a high of twenty-five degrees. Don\'t forget your sunglasses.',
        prompt: 'What is the weather today?（今日の天気は）',
        choices: ['(A) Sunny.（晴れ）', '(B) Rainy.（雨）', '(C) Snowy.（雪）'],
        answer: 0, explain: 'sunny（晴れ）と言っています。(A)。' },

      { passage: 'Thank you for calling City Library. We are open until 8 p.m. on weekdays. Please return books on time.',
        audio: 'Thank you for calling City Library. We are open until eight p.m. on weekdays. Please return books on time.',
        prompt: 'What time does the library close on weekdays?（平日は何時に閉まりますか）',
        choices: ['(A) 6 p.m.', '(B) 8 p.m.', '(C) 10 p.m.'],
        answer: 1, explain: 'open until 8 p.m.（8時まで開いている）。(B)。' },

      { passage: 'Attention passengers. The train to Tokyo is delayed by 10 minutes. We are sorry for the inconvenience.',
        audio: 'Attention passengers. The train to Tokyo is delayed by ten minutes. We are sorry for the inconvenience.',
        prompt: 'What is the problem?（何が問題ですか）',
        choices: ['(A) A delay.（遅れ）', '(B) A cancellation.（欠航・運休）', '(C) A price change.（料金変更）'],
        answer: 0, explain: 'delayed by 10 minutes（10分遅れ）。(A)。' },

      { passage: 'Hello, this is Tom from ABC Company. Please call me back at 555-1234. Thank you.',
        audio: 'Hello, this is Tom from A B C Company. Please call me back at five five five, one two three four. Thank you.',
        prompt: 'What does Tom want?（トムは何を望んでいますか）',
        choices: ['(A) A call back.（折り返しの電話）', '(B) A meeting.（会議）', '(C) An email.（メール）'],
        answer: 0, explain: 'call me back（折り返してください）。(A)。' },

      { passage: 'Our restaurant is offering a lunch special this week: pasta for only 800 yen.',
        audio: 'Our restaurant is offering a lunch special this week: pasta for only eight hundred yen.',
        prompt: 'What is the special price for pasta?（パスタの特別価格は）',
        choices: ['(A) 800 yen', '(B) 1,000 yen', '(C) 1,500 yen'],
        answer: 0, explain: 'pasta for only 800 yen。(A)。' },

      { passage: 'The museum will close early today at 4 p.m. for a special event.',
        audio: 'The museum will close early today at four p.m. for a special event.',
        prompt: 'Why will the museum close early?（なぜ早く閉まりますか）',
        choices: ['(A) For an event.（イベントのため）', '(B) For repairs.（修理のため）', '(C) For a holiday.（祝日のため）'],
        answer: 0, explain: 'for a special event（特別なイベントのため）。(A)。' },

      { passage: 'Please remember our store will be closed on January 1st for the New Year holiday.',
        audio: 'Please remember our store will be closed on January first for the New Year holiday.',
        prompt: 'When is the store closed?（店はいつ休みですか）',
        choices: ['(A) January 1st.（1月1日）', '(B) December 25th.（12月25日）', '(C) Every Monday.（毎週月曜）'],
        answer: 0, explain: 'closed on January 1st。(A)。' },

      { passage: 'Welcome to City Zoo. The zoo closes at 5 p.m. Please do not feed the animals.',
        audio: 'Welcome to City Zoo. The zoo closes at five p.m. Please do not feed the animals.',
        prompt: 'What are visitors asked NOT to do?（来園者は何をしないよう求められていますか）',
        choices: ['(A) Feed the animals.（動物にエサをやる）', '(B) Take photos.（写真を撮る）', '(C) Bring food.（食べ物を持ち込む）'],
        answer: 0, explain: 'do not feed the animals（動物にエサをやらないで）。(A)。feed = エサをやる。' },

      { passage: 'This is a reminder that the library books are due next Monday. Please return them on time.',
        audio: 'This is a reminder that the library books are due next Monday. Please return them on time.',
        prompt: 'When are the books due?（本の返却期限はいつですか）',
        choices: ['(A) Next Monday.（来週の月曜）', '(B) Today.（今日）', '(C) Next Friday.（来週の金曜）'],
        answer: 0, explain: 'due next Monday（期限は来週月曜）。(A)。due = 締め切り。' },

      { passage: 'Thank you for shopping at FreshMart. Today, all vegetables are 20% off.',
        audio: 'Thank you for shopping at Fresh Mart. Today, all vegetables are twenty percent off.',
        prompt: 'What is on sale today?（今日は何が安いですか）',
        choices: ['(A) Vegetables.（野菜）', '(B) Meat.（肉）', '(C) Fruit.（果物）'],
        answer: 0, explain: 'all vegetables are 20% off（野菜が20%オフ）。(A)。' },

      { passage: 'The train to Nagoya will depart from platform 3 in five minutes.',
        audio: 'The train to Nagoya will depart from platform three in five minutes.',
        prompt: 'Which platform will the train leave from?（電車はどのホームから出ますか）',
        choices: ['(A) Platform 3', '(B) Platform 5', '(C) Platform 2'],
        answer: 0, explain: 'depart from platform 3（3番ホームから出発）。(A)。depart = 出発する。' },

      { passage: 'Good evening. Tomorrow will be cloudy with a chance of rain in the afternoon.',
        audio: 'Good evening. Tomorrow will be cloudy with a chance of rain in the afternoon.',
        prompt: 'What will tomorrow\'s weather be?（明日の天気は）',
        choices: ['(A) Cloudy with possible rain.（くもり、雨の可能性）', '(B) Sunny.（晴れ）', '(C) Snowy.（雪）'],
        answer: 0, explain: 'cloudy with a chance of rain（くもりで雨の可能性）。(A)。' },

      { passage: 'Our restaurant will be closed on Sunday for a private event. We open again on Monday.',
        audio: 'Our restaurant will be closed on Sunday for a private event. We open again on Monday.',
        prompt: 'When is the restaurant closed?（レストランはいつ休みですか）',
        choices: ['(A) Sunday.（日曜）', '(B) Monday.（月曜）', '(C) Saturday.（土曜）'],
        answer: 0, explain: 'closed on Sunday（日曜は休み）。(A)。' },

      { passage: 'Good afternoon, passengers. This is the express bus to the airport. Our next stop is Central Station. Please hold on to the handrail.',
        audio: 'Good afternoon, passengers. This is the express bus to the airport. Our next stop is Central Station. Please hold on to the handrail.',
        prompt: 'Where is this announcement most likely heard?（どこで聞かれるアナウンスですか）',
        choices: ['(A) On a bus.（バス）', '(B) On a ship.（船）', '(C) In a store.（店）'],
        answer: 0, explain: 'This is the express bus（これは特急バスです）。(A)。handrail = 手すり。' },

      { passage: 'Attention, all staff. The monthly meeting will be held in Room B at 2 p.m. today. Please bring your reports.',
        audio: 'Attention, all staff. The monthly meeting will be held in Room B at two p.m. today. Please bring your reports.',
        prompt: 'What are staff asked to bring?（スタッフは何を持って来るよう求められていますか）',
        choices: ['(A) Their reports.（報告書）', '(B) Their laptops.（ノートパソコン）', '(C) Their lunch.（昼食）'],
        answer: 0, explain: 'Please bring your reports（報告書を持って来て）。(A)。' },

      { passage: 'Hi, this is Lisa. I\'m calling to cancel my appointment on Friday. Could you call me back to reschedule? Thanks.',
        audio: 'Hi, this is Lisa. I am calling to cancel my appointment on Friday. Could you call me back to reschedule? Thanks.',
        prompt: 'Why is Lisa calling?（リサはなぜ電話していますか）',
        choices: ['(A) To cancel an appointment.（予約をキャンセルするため）', '(B) To order food.（食べ物を注文するため）', '(C) To ask for directions.（道を聞くため）'],
        answer: 0, explain: 'I\'m calling to cancel my appointment（予約をキャンセルするため）。(A)。reschedule = 予定を変更する。' },

      { passage: 'Welcome to the art museum. Photography is allowed, but please do not use flash. Enjoy your visit.',
        audio: 'Welcome to the art museum. Photography is allowed, but please do not use flash. Enjoy your visit.',
        prompt: 'What are visitors asked NOT to do?（来館者は何をしないよう求められていますか）',
        choices: ['(A) Use flash.（フラッシュを使う）', '(B) Take photos.（写真を撮る）', '(C) Talk loudly.（大声で話す）'],
        answer: 0, explain: 'Photography is allowed（撮影はOK）but do not use flash（フラッシュは禁止）。(A)。' },

      { passage: 'Thank you for calling Sunshine Gym. New members can join for free this month. Visit our website for details.',
        audio: 'Thank you for calling Sunshine Gym. New members can join for free this month. Visit our website for details.',
        prompt: 'What is special this month?（今月は何が特別ですか）',
        choices: ['(A) Free membership for new members.（新規会員は無料）', '(B) A new pool.（新しいプール）', '(C) Longer hours.（営業時間延長）'],
        answer: 0, explain: 'New members can join for free（新規会員は無料で入会できる）。(A)。' },

      { passage: 'Attention, shoppers. A blue wallet has been found near the exit. Please come to the information desk to pick it up.',
        audio: 'Attention, shoppers. A blue wallet has been found near the exit. Please come to the information desk to pick it up.',
        prompt: 'What has been found?（何が見つかりましたか）',
        choices: ['(A) A wallet.（財布）', '(B) A phone.（電話）', '(C) A bag.（かばん）'],
        answer: 0, explain: 'A blue wallet has been found（青い財布が見つかった）。(A)。information desk = 案内所。' },

      { passage: 'This is your captain speaking. Due to bad weather, we will land about 20 minutes late. We apologize for the delay.',
        audio: 'This is your captain speaking. Due to bad weather, we will land about twenty minutes late. We apologize for the delay.',
        prompt: 'Why will the plane be late?（飛行機はなぜ遅れますか）',
        choices: ['(A) Because of bad weather.（悪天候のため）', '(B) Because of a broken engine.（エンジンの故障のため）', '(C) Because of many passengers.（乗客が多いため）'],
        answer: 0, explain: 'Due to bad weather（悪天候のため）。(A)。land = 着陸する。' },

      { passage: 'Good morning, students. The school trip is on June 10th. Please bring lunch and wear comfortable shoes.',
        audio: 'Good morning, students. The school trip is on June tenth. Please bring lunch and wear comfortable shoes.',
        prompt: 'When is the school trip?（遠足はいつですか）',
        choices: ['(A) June 10th.（6月10日）', '(B) June 1st.（6月1日）', '(C) July 10th.（7月10日）'],
        answer: 0, explain: 'The school trip is on June 10th（遠足は6月10日）。(A)。comfortable = 快適な。' },
    ],
  },

  part5: {
    lesson: `
      <p><strong>Part 5（短文穴埋め）</strong>は、1文の空所に合う語を4つから選びます。文法と語彙の問題です。<strong>初心者が点を取りやすい</strong>パートなので、まずはここから！</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>空所の<strong>前後だけ</strong>を見て解けることが多い（全部訳さなくてOK）。</li>
        <li>品詞（名詞・動詞・形容詞・副詞）を見分けるのが基本。</li>
        <li>選択肢が似た形（go / goes / going / gone）なら<strong>文法問題</strong>のサイン。</li>
      </ul>
      <p class="text-sub text-[13px]">💡 名詞の前は形容詞、動詞を説明するのは副詞、と覚えておこう。</p>`,
    questions: [
      { prompt: 'The meeting will _____ at 10 a.m. tomorrow.',
        choices: ['(A) begin', '(B) began', '(C) begun', '(D) beginning'], answer: 0,
        explain: 'will のあとは動詞の原形。(A) begin。tomorrow（未来）とも合います。' },
      { prompt: 'She is a very _____ worker and finishes everything on time.',
        choices: ['(A) care', '(B) careful', '(C) carefully', '(D) cares'], answer: 1,
        explain: '名詞 worker の前なので形容詞。(B) careful。carefully は副詞で×。' },
      { prompt: 'Please send the report _____ Friday.',
        choices: ['(A) in', '(B) on', '(C) at', '(D) to'], answer: 1,
        explain: '曜日の前は on。(B)。時刻は at、月・年は in。' },
      { prompt: 'The new phone is _____ than the old one.',
        choices: ['(A) cheap', '(B) cheaper', '(C) cheapest', '(D) cheaply'], answer: 1,
        explain: 'than があるので比較級。cheap → cheaper。(B)。' },
      { prompt: 'I usually _____ to work by bus.',
        choices: ['(A) go', '(B) goes', '(C) going', '(D) gone'], answer: 0,
        explain: '主語 I は go。usually（ふだん）＝現在形。(A)。' },
      { prompt: 'This book is _____ than that one.',
        choices: ['(A) interesting', '(B) more interesting', '(C) most interesting', '(D) interest'], answer: 1,
        explain: '長い形容詞の比較級は more 〜。than があるので (B)。' },
      { prompt: 'She works _____ to finish on time.',
        choices: ['(A) quick', '(B) quickly', '(C) quicker', '(D) quickness'], answer: 1,
        explain: '動詞 works を説明するので副詞。(B) quickly。' },
      { prompt: 'We need _____ information before deciding.',
        choices: ['(A) many', '(B) much', '(C) a few', '(D) number'], answer: 1,
        explain: 'information は数えられない名詞。量は much。(B)。' },
      { prompt: 'He has worked here _____ 2015.',
        choices: ['(A) since', '(B) for', '(C) during', '(D) about'], answer: 0,
        explain: 'since + 過去のある時点（2015年から）。(A)。for は期間（for 5 years）。' },
      { prompt: 'There are _____ apples in the basket.',
        choices: ['(A) much', '(B) a little', '(C) some', '(D) any'], answer: 2,
        explain: 'apples は数えられる複数。肯定文で「いくつか」は some。(C)。' },
      { prompt: 'The report must be finished _____ Friday.（金曜までに）',
        choices: ['(A) until', '(B) by', '(C) for', '(D) since'], answer: 1,
        explain: '「〜までに（期限）」は by。by Friday。' },
      { prompt: 'Both managers _____ attending the conference.',
        choices: ['(A) is', '(B) are', '(C) was', '(D) has'], answer: 1,
        explain: 'Both managers は複数なので are。be動詞＋ing で進行形。' },
      { prompt: 'She is interested _____ learning Japanese.',
        choices: ['(A) in', '(B) on', '(C) at', '(D) of'], answer: 0,
        explain: 'be interested in 〜（〜に興味がある）。決まった形。(A)。' },
      { prompt: 'If it rains tomorrow, we _____ stay home.',
        choices: ['(A) will', '(B) are', '(C) were', '(D) been'], answer: 0,
        explain: '未来の予定。will＋原形 stay。(A)。' },
      { prompt: 'The bakery sells _____ kinds of bread.',
        choices: ['(A) much', '(B) many', '(C) a little', '(D) any'], answer: 1,
        explain: 'kinds は数えられる複数。many kinds（多くの種類）。(B)。' },
      { prompt: 'He is the _____ worker on the team.',
        choices: ['(A) hard', '(B) harder', '(C) hardest', '(D) hardly'], answer: 2,
        explain: 'the ＋ -est は最上級。hardest（最も熱心な）。hardly は「ほとんど〜ない」で別物。' },
      { prompt: 'The store _____ at 9 a.m. every morning.',
        choices: ['(A) open', '(B) opens', '(C) opening', '(D) to open'], answer: 1,
        explain: '主語 The store は三人称単数。現在形は opens。every morning（ふだんのこと）と合います。(B)。' },
      { prompt: 'I have a friend _____ lives in Osaka.',
        choices: ['(A) who', '(B) which', '(C) what', '(D) whose'], answer: 0,
        explain: '人（a friend）を説明する関係代名詞は who。(A)。物のときは which。' },
      { prompt: 'You _____ wear a helmet when you ride a bike.',
        choices: ['(A) should', '(B) am', '(C) are', '(D) being'], answer: 0,
        explain: '「〜すべき」という助動詞は should。あとは動詞の原形 wear。(A)。' },
      { prompt: 'Please wait here _____ I come back.',
        choices: ['(A) until', '(B) by', '(C) during', '(D) for'], answer: 0,
        explain: '「〜するまで（ずっと）」は until。until I come back。by は「〜までに（期限）」で別物。(A)。' },
      { prompt: 'I was tired, _____ I went to bed early.',
        choices: ['(A) but', '(B) so', '(C) or', '(D) because'], answer: 1,
        explain: '「疲れていた、だから早く寝た」と理由→結果なので so。(B)。because は後ろに理由が来ます。' },
      { prompt: 'This is the _____ movie I have ever seen.',
        choices: ['(A) good', '(B) better', '(C) best', '(D) well'], answer: 2,
        explain: 'good の最上級は best。the best（いちばん良い）。ever（今まで）とも合います。(C)。' },
      { prompt: 'There is too _____ noise in this room.',
        choices: ['(A) many', '(B) much', '(C) few', '(D) number'], answer: 1,
        explain: 'noise は数えられない名詞。量が多いは much。too much noise（うるさすぎる）。(B)。' },
      { prompt: 'The children stayed quiet _____ the movie.',
        choices: ['(A) while', '(B) during', '(C) since', '(D) until'], answer: 1,
        explain: 'during ＋ 名詞（the movie）で「〜の間」。while は後ろに文が来ます。(B)。' },
      { prompt: 'We are looking _____ a new apartment near the station.',
        choices: ['(A) at', '(B) for', '(C) after', '(D) up'], answer: 1,
        explain: 'look for 〜（〜を探す）。決まった形。(B)。look at は「〜を見る」で別物。' },
      { prompt: 'Could you _____ me how to use this machine?',
        choices: ['(A) speak', '(B) say', '(C) tell', '(D) talk'], answer: 2,
        explain: '「〈人〉に〜を教える・伝える」は tell ＋ 人。tell me how to 〜。(C)。say や speak は人を直接続けられません。' },
    ],
  },

  part6: {
    lesson: `
      <p><strong>Part 6（長文穴埋め）</strong>は、メールやお知らせなどの文章にある空所を埋めます。Part 5 に「文の流れ」が加わったイメージ。</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>基本は Part 5 と同じ（文法・語彙）。＋ <strong>前後の文とのつながり</strong>を見る問題もある。</li>
        <li>接続語（However, Therefore, For example など）は流れを表すヒント。</li>
        <li>時制（過去・現在・未来）は文章全体の話に合わせる。</li>
      </ul>`,
    questions: [
      { passage: 'Dear Mr. Lee,\nThank you for your order. Your package _____ shipped today and will arrive in three days.\nBest regards, ABC Store',
        audio: null, prompt: '空所に入る語を選びましょう。',
        choices: ['(A) was', '(B) is', '(C) are', '(D) were'], answer: 0,
        explain: 'package は単数。「発送された」受け身＋過去で was shipped。(A)。today があるので過去でOK。' },
      { passage: 'Our office will be closed next Monday for a holiday. _____, we will reopen on Tuesday as usual.',
        audio: null, prompt: '空所に入る語を選びましょう。',
        choices: ['(A) However', '(B) Because', '(C) For example', '(D) Therefore'], answer: 0,
        explain: '「月曜は休み。でも火曜は通常」逆の流れをつなぐ However（しかし）。(A)。' },

      { passage: 'Dear Ms. Carter,\nThank you for your _____. We will ship your order tomorrow.\nBest, Shop',
        audio: null, prompt: '(1) 空所に入る語を選びましょう。',
        choices: ['(A) order', '(B) ordered', '(C) ordering', '(D) orders'], answer: 0,
        explain: 'your のあとは名詞。your order（ご注文）。(A)。' },
      { passage: 'Dear Ms. Carter,\nThank you for your order. If you have any questions, please _____ us anytime.\nBest, Shop',
        audio: null, prompt: '(2) 空所に入る語を選びましょう。',
        choices: ['(A) contact', '(B) contacts', '(C) contacted', '(D) contacting'], answer: 0,
        explain: 'please のあとは動詞の原形。please contact us（ご連絡ください）。(A)。' },

      { passage: 'Our gym will be closed for _____ next week. We will reopen on Monday. Thank you.',
        audio: null, prompt: '(1) 空所に入る語を選びましょう。',
        choices: ['(A) clean', '(B) cleaning', '(C) cleaned', '(D) cleans'], answer: 1,
        explain: '前置詞 for のあとは名詞/動名詞。for cleaning（清掃のため）。(B)。' },
      { passage: 'Our gym will be closed next week. We _____ on Monday. Thank you.',
        audio: null, prompt: '(2) 空所に入る語を選びましょう。',
        choices: ['(A) will reopen', '(B) reopens', '(C) reopened', '(D) reopening'], answer: 0,
        explain: '来週の予定なので未来。will reopen（再開します）。(A)。' },

      { passage: 'The new café opened last week. It _____ coffee and cakes. Please come and try it.',
        audio: null, prompt: '(1) 空所に入る語を選びましょう。',
        choices: ['(A) serve', '(B) serves', '(C) serving', '(D) served'], answer: 1,
        explain: '主語 It（3人称単数）＋現在の事実。serves。(B)。' },
      { passage: 'Please _____ the door when you leave. Also, turn off the lights. Thank you for your help.',
        audio: null, prompt: '(1) 空所に入る語を選びましょう。',
        choices: ['(A) lock', '(B) locks', '(C) locked', '(D) locking'], answer: 0,
        explain: 'Please のあとは原形。please lock the door（ドアに鍵を）。(A)。' },
      { passage: 'Please lock the door when you leave. _____, turn off the lights before going home.',
        audio: null, prompt: '(2) 空所に入る語を選びましょう。',
        choices: ['(A) Also', '(B) Because', '(C) However', '(D) Instead'], answer: 0,
        explain: '指示を追加する流れなので Also（また）。(A)。' },

      { passage: 'All employees _____ attend the safety training on May 5. It is required for everyone.',
        audio: null, prompt: '(1) 空所に入る語を選びましょう。',
        choices: ['(A) must', '(B) musts', '(C) musting', '(D) to must'], answer: 0,
        explain: '助動詞 must は形が変わらず、後ろは原形 attend。required（必須）とも合う。(A)。' },
      { passage: 'The safety training will start at 10 a.m. It _____ take about two hours.',
        audio: null, prompt: '(2) 空所に入る語を選びましょう。',
        choices: ['(A) will', '(B) is', '(C) are', '(D) been'], answer: 0,
        explain: 'これからの予定なので will take（かかるでしょう）。(A)。' },

      { passage: 'Thank you for _____ our hotel. Our staff will do their best to help you.',
        audio: null, prompt: '(1) 空所に入る語を選びましょう。',
        choices: ['(A) choose', '(B) chose', '(C) choosing', '(D) chooses'], answer: 2,
        explain: '前置詞 for のあとは動名詞。for choosing（選んでくれて）。(C)。' },
      { passage: 'We hope you _____ your stay at our hotel. Please tell us if you need anything.',
        audio: null, prompt: '(2) 空所に入る語を選びましょう。',
        choices: ['(A) enjoy', '(B) enjoyed', '(C) enjoying', '(D) to enjoy'], answer: 0,
        explain: 'hope (that) you enjoy 〜（楽しんでもらえたら）。現在形 enjoy。(A)。' },

      { passage: 'The parking lot will be closed _____ construction next week.',
        audio: null, prompt: '(1) 空所に入る語を選びましょう。',
        choices: ['(A) because', '(B) because of', '(C) so', '(D) but'], answer: 1,
        explain: '後ろが名詞(construction)なので because of（〜のため）。because は後ろに文が必要。(B)。' },
      { passage: 'The parking lot is closed. Please park _____ the street near the entrance.',
        audio: null, prompt: '(2) 空所に入る語を選びましょう。',
        choices: ['(A) on', '(B) in', '(C) at', '(D) of'], answer: 0,
        explain: '「通りに（面して）停める」は on the street。(A)。' },

      { passage: 'Dear Customer,\nThe item you ordered is now out of stock. _____, we will send you a refund within five days.\nThank you for your patience.\nABC Store',
        audio: null, prompt: '空所に入る語を選びましょう。',
        choices: ['(A) Therefore', '(B) For example', '(C) However', '(D) Although'], answer: 0,
        explain: '「在庫切れ。だから返金します」という結果の流れ。Therefore（だから）。(A)。' },
      { passage: 'Thank you for your interest in our company. We are looking _____ talented people to join our team.',
        audio: null, prompt: '(1) 空所に入る語を選びましょう。',
        choices: ['(A) for', '(B) at', '(C) on', '(D) to'], answer: 0,
        explain: 'look for 〜 で「〜を探す」。be looking for（探しています）。(A)。' },
      { passage: 'We are looking for talented people. If you are interested _____ working here, please send us your resume.',
        audio: null, prompt: '(2) 空所に入る語を選びましょう。',
        choices: ['(A) in', '(B) on', '(C) of', '(D) for'], answer: 0,
        explain: 'be interested in 〜ing で「〜に興味がある」。interested in working（働くことに興味がある）。(A)。' },
      { passage: 'The annual company meeting _____ held in the main hall next Friday. All staff should attend.',
        audio: null, prompt: '空所に入る語を選びましょう。',
        choices: ['(A) will be', '(B) will', '(C) is being', '(D) has'], answer: 0,
        explain: '会議は「開かれる」側なので受け身。未来＋受け身で will be held（開催されます）。next Friday があるので未来。(A)。' },
      { passage: 'Please read the instructions _____ before using the machine. Then press the green button to start.',
        audio: null, prompt: '空所に入る語を選びましょう。',
        choices: ['(A) careful', '(B) carefully', '(C) care', '(D) caring'], answer: 1,
        explain: '動詞 read を説明するのは副詞。read carefully（注意深く読む）。(B)。care は名詞、careful は形容詞。' },
      { passage: 'The store will be very busy _____ the holiday season. Please be ready to help many customers.',
        audio: null, prompt: '空所に入る語を選びましょう。',
        choices: ['(A) during', '(B) while', '(C) when', '(D) since'], answer: 0,
        explain: '後ろが名詞のかたまり(the holiday season)なので during（〜の間）。while や when は後ろに文が必要。(A)。' },
      { passage: 'Our new website _____ been updated. You can now check your order status online anytime.',
        audio: null, prompt: '空所に入る語を選びましょう。',
        choices: ['(A) has', '(B) have', '(C) is', '(D) was'], answer: 0,
        explain: '主語 website は単数。現在完了 has been updated（更新されました）。(A)。have は複数主語用。' },
      { passage: 'Our café now offers many healthy choices. _____, we have fresh salads, fruit, and yogurt every morning.',
        audio: null, prompt: '空所に入る語を選びましょう。',
        choices: ['(A) For example', '(B) However', '(C) Instead', '(D) Therefore'], answer: 0,
        explain: '「健康的な選択肢。たとえばサラダや果物」と具体例を挙げる流れ。For example（たとえば）。(A)。' },
    ],
  },

  part7: {
    lesson: `
      <p><strong>Part 7（読解）</strong>は、メール・広告・記事などを読んで設問に答えます。TOEICで一番量が多いパート。</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>先に設問を読んでから</strong>本文を探すと速く解けます。</li>
        <li>答えは本文に必ず書いてある。想像で答えない。</li>
        <li>最初に「何の文書か（メール？広告？）」をチェック。</li>
      </ul>
      <p class="text-sub text-[13px]">💡 全部を完璧に訳さなくてOK。設問に関係する所だけ拾い読みしよう。</p>`,
    questions: [
      { passage: 'SUMMER SALE!\nGreen Sports Shop\nGet 30% off all running shoes.\nSale period: July 1 – July 7\nOpen 10 a.m. – 8 p.m.\nVisit us at 5 Park Street.',
        audio: null, prompt: 'What is being advertised?（何が宣伝されていますか）',
        choices: ['(A) A discount on shoes.（靴の割引）', '(B) A new restaurant.（新しいレストラン）', '(C) A job opening.（求人）'],
        answer: 0, explain: '30% off all running shoes（靴が30%オフ）。(A)。' },
      { passage: 'SUMMER SALE!\nGreen Sports Shop\nGet 30% off all running shoes.\nSale period: July 1 – July 7\nOpen 10 a.m. – 8 p.m.\nVisit us at 5 Park Street.',
        audio: null, prompt: 'When does the sale end?（セールはいつ終わりますか）',
        choices: ['(A) July 1', '(B) July 7', '(C) July 8'],
        answer: 1, explain: 'Sale period: July 1 – July 7。終わりは July 7。(B)。' },

      { passage: 'To: staff@abc.com\nSubject: Office Party\nHi everyone, We will have an office party on Friday, June 20, at 6 p.m. in the main hall. Please bring a small dish to share. Drinks will be provided. RSVP to Lisa by June 15.',
        audio: null, prompt: 'What is the email about?（メールは何についてですか）',
        choices: ['(A) An office party.（社内パーティー）', '(B) A new project.（新しい企画）', '(C) A holiday.（休暇）'],
        answer: 0, explain: 'Subject: Office Party、an office party。(A)。' },
      { passage: 'To: staff@abc.com\nSubject: Office Party\nWe will have an office party on Friday, June 20. Please bring a small dish to share. Drinks will be provided. RSVP to Lisa by June 15.',
        audio: null, prompt: 'What should staff bring?（社員は何を持参すべきですか）',
        choices: ['(A) A small dish.（料理）', '(B) Drinks.（飲み物）', '(C) Money.（お金）'],
        answer: 0, explain: 'bring a small dish（料理を持参）。飲み物は提供される。(A)。' },
      { passage: 'To: staff@abc.com\nSubject: Office Party\nWe will have an office party on Friday, June 20. RSVP to Lisa by June 15.',
        audio: null, prompt: 'By when should they reply?（いつまでに返事すべきですか）',
        choices: ['(A) June 15', '(B) June 20', '(C) June 6'],
        answer: 0, explain: 'RSVP ... by June 15（6月15日までに返事を）。(A)。RSVP = 出欠の返事。' },

      { passage: 'NOTICE: The elevator on the 2nd floor will be under repair from March 3 to March 5. Please use the stairs or the elevator on the 1st floor. We apologize for the inconvenience.',
        audio: null, prompt: 'What is the notice about?（お知らせは何についてですか）',
        choices: ['(A) Elevator repair.（エレベーターの修理）', '(B) A sale.（セール）', '(C) A meeting.（会議）'],
        answer: 0, explain: 'elevator ... under repair（エレベーター修理中）。(A)。' },
      { passage: 'NOTICE: The elevator on the 2nd floor will be under repair from March 3 to March 5. Please use the stairs or the elevator on the 1st floor.',
        audio: null, prompt: 'What can people use instead?（代わりに何を使えますか）',
        choices: ['(A) The stairs.（階段）', '(B) The escalator.（エスカレーター）', '(C) Nothing.（何もない）'],
        answer: 0, explain: 'Please use the stairs（階段を使って）。(A)。' },

      { passage: 'COOKING CLASS!\nLearn to make Japanese food.\nEvery Saturday, 2 p.m. – 4 p.m.\nOnly 3,000 yen per class.\nBeginners welcome! Call 090-1234-5678 to join.',
        audio: null, prompt: 'When is the class held?（教室はいつ開かれますか）',
        choices: ['(A) Saturday.（土曜）', '(B) Sunday.（日曜）', '(C) Monday.（月曜）'],
        answer: 0, explain: 'Every Saturday（毎週土曜）。(A)。' },
      { passage: 'COOKING CLASS!\nEvery Saturday, 2 p.m. – 4 p.m.\nOnly 3,000 yen per class.\nBeginners welcome!',
        audio: null, prompt: 'Who is welcome to join?（だれが参加歓迎ですか）',
        choices: ['(A) Beginners.（初心者）', '(B) Only chefs.（プロの料理人のみ）', '(C) Children only.（子供のみ）'],
        answer: 0, explain: 'Beginners welcome!（初心者歓迎）。(A)。' },

      { passage: 'GRAND OPENING!\nSunny Bakery opens on March 10.\nFree coffee for the first 50 customers.\nOpen daily 7 a.m. – 7 p.m.\nLocated at 12 Main Street.',
        audio: null, prompt: 'What is the notice about?（このお知らせは何についてですか）',
        choices: ['(A) A bakery opening.（パン屋の開店）', '(B) A coffee farm.（コーヒー農園）', '(C) A school event.（学校行事）'],
        answer: 0, explain: 'Sunny Bakery opens（パン屋が開店）。(A)。' },
      { passage: 'GRAND OPENING!\nSunny Bakery opens on March 10.\nFree coffee for the first 50 customers.\nOpen daily 7 a.m. – 7 p.m.',
        audio: null, prompt: 'What do the first 50 customers get?（最初の50人は何をもらえますか）',
        choices: ['(A) Free coffee.（無料のコーヒー）', '(B) Free bread.（無料のパン）', '(C) A discount card.（割引カード）'],
        answer: 0, explain: 'Free coffee for the first 50 customers（最初の50人に無料コーヒー）。(A)。' },
      { passage: 'GRAND OPENING!\nSunny Bakery opens on March 10.\nOpen daily 7 a.m. – 7 p.m.\nLocated at 12 Main Street.',
        audio: null, prompt: 'What time does the bakery open?（パン屋は何時に開きますか）',
        choices: ['(A) 7 a.m.', '(B) 10 a.m.', '(C) 12 p.m.'],
        answer: 0, explain: 'Open daily 7 a.m. – 7 p.m.（毎日7時開店）。(A)。' },

      { passage: 'To: David\nSubject: Schedule change\nHi David, The team meeting on Wednesday has been moved to Thursday at 10 a.m. Please update your calendar.\nThanks, Mia',
        audio: null, prompt: 'Why did Mia write the email?（ミアはなぜメールを書きましたか）',
        choices: ['(A) To announce a schedule change.（予定変更の連絡）', '(B) To cancel a project.（企画の中止）', '(C) To ask for a day off.（休暇の申請）'],
        answer: 0, explain: 'Subject: Schedule change、moved to Thursday。予定変更の連絡。(A)。' },
      { passage: 'To: David\nSubject: Schedule change\nThe team meeting on Wednesday has been moved to Thursday at 10 a.m.\nThanks, Mia',
        audio: null, prompt: 'When is the meeting now?（会議は今いつですか）',
        choices: ['(A) Wednesday', '(B) Thursday', '(C) Friday'],
        answer: 1, explain: 'moved to Thursday（木曜に変更）。(B)。' },
      { passage: 'To: David\nSubject: Schedule change\nThe meeting has been moved to Thursday at 10 a.m. Please update your calendar.\nThanks, Mia',
        audio: null, prompt: 'What should David do?（デイビッドは何をすべきですか）',
        choices: ['(A) Update his calendar.（予定表を更新する）', '(B) Call a client.（顧客に電話する）', '(C) Book a room.（部屋を予約する）'],
        answer: 0, explain: 'Please update your calendar（予定表を更新して）。(A)。' },

      { passage: 'NOW HIRING!\nBlue Wave Cafe\nWe are looking for a part-time waiter.\nHours: 4 p.m. – 9 p.m., Monday to Friday\nPay: 1,200 yen per hour\nNo experience needed. We will train you.\nEmail your name to jobs@bluewave.com.',
        audio: null, prompt: 'What kind of job is offered?（どんな仕事の募集ですか）',
        choices: ['(A) A waiter.（ウェイター）', '(B) A cook.（料理人）', '(C) A driver.（運転手）'],
        answer: 0, explain: 'looking for a part-time waiter（ウェイターを募集）。(A)。' },
      { passage: 'NOW HIRING!\nBlue Wave Cafe\nWe are looking for a part-time waiter.\nHours: 4 p.m. – 9 p.m., Monday to Friday\nPay: 1,200 yen per hour\nNo experience needed. We will train you.\nEmail your name to jobs@bluewave.com.',
        audio: null, prompt: 'What is needed to apply?（応募に何が必要ですか）',
        choices: ['(A) Five years of experience.（5年の経験）', '(B) Nothing special; they will train you.（特になし。研修あり）', '(C) A college degree.（大学の学位）'],
        answer: 1, explain: 'No experience needed. We will train you.（経験不要、研修する）。(B)。' },

      { passage: 'LIBRARY EVENT\nStory Time for Kids\nDate: Saturday, May 18\nTime: 11 a.m. – 11:45 a.m.\nPlace: 2nd floor reading room\nFree for all children.\nParents are welcome to join.',
        audio: null, prompt: 'Who is this event for?（このイベントは誰のためですか）',
        choices: ['(A) Children.（子供）', '(B) Teachers.（先生）', '(C) Business owners.（経営者）'],
        answer: 0, explain: 'Story Time for Kids、Free for all children（子供向け）。(A)。' },
      { passage: 'LIBRARY EVENT\nStory Time for Kids\nDate: Saturday, May 18\nTime: 11 a.m. – 11:45 a.m.\nPlace: 2nd floor reading room\nFree for all children.\nParents are welcome to join.',
        audio: null, prompt: 'How much does it cost?（費用はいくらですか）',
        choices: ['(A) It is free.（無料）', '(B) 500 yen.（500円）', '(C) 1,000 yen.（1,000円）'],
        answer: 0, explain: 'Free for all children（子供は無料）。(A)。' },

      { passage: 'To: sarah@mail.com\nSubject: Your Hotel Booking\nDear Sarah,\nThank you for booking with Sea View Hotel.\nCheck-in: August 3, after 3 p.m.\nCheck-out: August 5, before 11 a.m.\nBreakfast is included.\nPlease show this email at the front desk.',
        audio: null, prompt: 'What is the email about?（メールは何についてですか）',
        choices: ['(A) A hotel booking.（ホテルの予約）', '(B) A flight ticket.（航空券）', '(C) A job offer.（仕事の依頼）'],
        answer: 0, explain: 'Subject: Your Hotel Booking（ホテル予約）。(A)。' },
      { passage: 'To: sarah@mail.com\nSubject: Your Hotel Booking\nDear Sarah,\nThank you for booking with Sea View Hotel.\nCheck-in: August 3, after 3 p.m.\nCheck-out: August 5, before 11 a.m.\nBreakfast is included.\nPlease show this email at the front desk.',
        audio: null, prompt: 'What is included in the price?（料金に何が含まれますか）',
        choices: ['(A) Breakfast.（朝食）', '(B) Parking.（駐車場）', '(C) A tour.（ツアー）'],
        answer: 0, explain: 'Breakfast is included（朝食込み）。(A)。' },

      { passage: 'WEEKEND SPECIAL\nMama\'s Kitchen\nEnjoy our pizza set for only 990 yen!\nIncludes one pizza and a free drink.\nAvailable Saturday and Sunday only.\nDine in or take out.',
        audio: null, prompt: 'When is the special available?（特別メニューはいつ利用できますか）',
        choices: ['(A) On weekends only.（週末のみ）', '(B) Every day.（毎日）', '(C) On weekdays only.（平日のみ）'],
        answer: 0, explain: 'Available Saturday and Sunday only（土日のみ）。(A)。' },
      { passage: 'WEEKEND SPECIAL\nMama\'s Kitchen\nEnjoy our pizza set for only 990 yen!\nIncludes one pizza and a free drink.\nAvailable Saturday and Sunday only.\nDine in or take out.',
        audio: null, prompt: 'What comes with the pizza?（ピザに何が付きますか）',
        choices: ['(A) A free drink.（無料の飲み物）', '(B) A free dessert.（無料のデザート）', '(C) A coupon.（クーポン）'],
        answer: 0, explain: 'Includes one pizza and a free drink（飲み物が無料で付く）。(A)。' },
    ],
  },
};

// 単語・熟語帳（初心者向け頻出語）
const VOCAB = [
  { en: 'available',   ja: '利用できる、空いている', ex: 'The room is available now.' },
  { en: 'attend',      ja: '〜に出席する',           ex: 'I will attend the meeting.' },
  { en: 'receipt',     ja: 'レシート、領収書',       ex: 'Keep your receipt, please.' },
  { en: 'discount',    ja: '割引',                   ex: 'We offer a 10% discount.' },
  { en: 'schedule',    ja: '予定、スケジュール',     ex: 'Check the schedule, please.' },
  { en: 'delay',       ja: '遅れ、遅らせる',         ex: 'The train had a delay.' },
  { en: 'customer',    ja: '客、顧客',               ex: 'The customer is waiting.' },
  { en: 'invoice',     ja: '請求書',                 ex: 'Please send the invoice.' },
  { en: 'apply',       ja: '応募する、申し込む',     ex: 'You can apply online.' },
  { en: 'colleague',   ja: '同僚',                   ex: 'She is my colleague.' },
  { en: 'deliver',     ja: '配達する',               ex: 'We deliver every day.' },
  { en: 'reserve',     ja: '予約する',               ex: 'I want to reserve a table.' },
  { en: 'increase',    ja: '増える、増やす',         ex: 'Sales will increase.' },
  { en: 'reduce',      ja: '減らす',                 ex: 'We need to reduce costs.' },
  { en: 'approve',     ja: '承認する',               ex: 'The boss will approve it.' },
  { en: 'replace',     ja: '取り替える',             ex: 'Please replace the part.' },
  { en: 'estimate',    ja: '見積もり、見積もる',     ex: 'Here is the estimate.' },
  { en: 'department',  ja: '部署',                   ex: 'I work in the sales department.' },
  { en: 'instead',     ja: '代わりに',               ex: 'Use this one instead.' },
  { en: 'arrange',     ja: '手配する、整える',       ex: 'I will arrange a meeting.' },
  { en: 'maintenance', ja: '保守、メンテナンス',     ex: 'The system is under maintenance.' },
  { en: 'recommend',   ja: '推薦する、勧める',       ex: 'I recommend this book.' },
  { en: 'purchase',    ja: '購入、購入する',         ex: 'Thank you for your purchase.' },
  { en: 'refund',      ja: '返金',                   ex: 'You can get a refund.' },
  { en: 'confirm',     ja: '〜を確認する、確定する',     ex: 'Please confirm your order by email.' },
  { en: 'cancel',      ja: '〜を取り消す、キャンセルする', ex: 'I need to cancel my reservation.' },
  { en: 'deadline',    ja: '締め切り、納期',             ex: 'The deadline is next Friday.' },
  { en: 'budget',      ja: '予算',                       ex: 'We have a small budget this year.' },
  { en: 'client',      ja: '顧客、依頼人',               ex: 'The client will visit us tomorrow.' },
  { en: 'manager',     ja: '管理者、部長',               ex: 'My manager is in a meeting now.' },
  { en: 'employee',    ja: '従業員、社員',               ex: 'Every employee gets a free lunch.' },
  { en: 'supplier',    ja: '供給業者、仕入先',           ex: 'We found a new supplier in Japan.' },
  { en: 'warehouse',   ja: '倉庫',                       ex: 'The boxes are in the warehouse.' },
  { en: 'shipment',    ja: '発送、積み荷',               ex: 'The shipment will arrive on Monday.' },
  { en: 'payment',     ja: '支払い、入金',               ex: 'We received your payment yesterday.' },
  { en: 'charge',      ja: '料金、請求する',             ex: 'There is no extra charge for delivery.' },
  { en: 'fee',         ja: '料金、手数料',               ex: 'The service fee is ten dollars.' },
  { en: 'contract',    ja: '契約、契約書',               ex: 'Please sign the contract here.' },
  { en: 'negotiate',   ja: '交渉する',                   ex: 'We will negotiate the price tomorrow.' },
  { en: 'hire',        ja: '〜を雇う',                   ex: 'They want to hire two new workers.' },
  { en: 'salary',      ja: '給料、給与',                 ex: 'She gets a good salary every month.' },
  { en: 'branch',      ja: '支店、支社',                 ex: 'Our company has a branch in Osaka.' },
  { en: 'complaint',   ja: '苦情、クレーム',             ex: 'We got a complaint from a customer.' },
  { en: 'request',     ja: '依頼、要求する',             ex: 'I will send you the request today.' },
  { en: 'submit',      ja: '〜を提出する',               ex: 'Please submit the report by noon.' },
  { en: 'attach',      ja: '〜を添付する',               ex: 'I will attach the file to the email.' },
  { en: 'postpone',    ja: '〜を延期する',               ex: 'We had to postpone the meeting.' },
  { en: 'inventory',   ja: '在庫、棚卸し',               ex: 'Please check the inventory today.' },
];

// ===== シャドーイング教材（運転中・ハンズフリー想定） =====
// 各レッスン10項目。{ en: 英文, ja: 和訳 }
const SHADOWING = [
  {
    id: 'part2',
    title: 'Part 2 応答',
    desc: '質問とその応答',
    items: [
      { en: 'Where should I put these documents?', ja: 'この書類はどこに置けばいいですか？' },
      { en: 'You can leave them on my desk.',       ja: '私の机に置いておいてください。' },
      { en: 'When does the next train leave?',      ja: '次の電車はいつ出発しますか？' },
      { en: 'It leaves at nine fifteen.',           ja: '9時15分に出発します。' },
      { en: 'Who is in charge of this project?',    ja: 'このプロジェクトの担当は誰ですか？' },
      { en: 'Ms. Tanaka is handling it.',           ja: '田中さんが担当しています。' },
      { en: 'How can I get to the station?',        ja: '駅にはどう行けばいいですか？' },
      { en: 'Go straight and turn left.',           ja: 'まっすぐ行って左に曲がってください。' },
      { en: 'Would you like some coffee?',          ja: 'コーヒーはいかがですか？' },
      { en: 'Yes, that would be great.',            ja: 'はい、ぜひお願いします。' },
    ],
  },
  {
    id: 'part34',
    title: 'Part 3/4 短文',
    desc: 'アナウンス・電話応対',
    items: [
      { en: 'Thank you for calling Green Hotel.',     ja: 'グリーンホテルにお電話ありがとうございます。' },
      { en: 'Our store will close in ten minutes.',   ja: '当店はあと10分で閉店します。' },
      { en: 'Please bring your items to the counter.', ja: '商品をカウンターまでお持ちください。' },
      { en: 'The meeting has been moved to Room B.',  ja: '会議はB室に変更になりました。' },
      { en: 'Attention, passengers on flight 202.',   ja: '202便にご搭乗のお客様にお知らせします。' },
      { en: 'We are sorry for the delay.',            ja: '遅れて申し訳ございません。' },
      { en: 'The elevator is out of order today.',     ja: '本日エレベーターは故障しています。' },
      { en: 'Please take the stairs instead.',        ja: '代わりに階段をご利用ください。' },
      { en: 'May I take a message for him?',          ja: '彼にご伝言を承りましょうか？' },
      { en: 'He will call you back this afternoon.',   ja: '彼は今日の午後に折り返します。' },
    ],
  },
  {
    id: 'biz',
    title: 'ビジネス頻出',
    desc: '会議・依頼の定型表現',
    items: [
      { en: 'Could you send me the report by Friday?',     ja: '金曜までに報告書を送っていただけますか？' },
      { en: 'I will get back to you as soon as possible.',  ja: 'できるだけ早くご返信します。' },
      { en: 'Let us schedule a meeting for next week.',     ja: '来週、会議を設定しましょう。' },
      { en: 'Please let me know if you have any questions.', ja: 'ご質問があればお知らせください。' },
      { en: 'We need to finish this by the deadline.',      ja: '締め切りまでにこれを終える必要があります。' },
      { en: 'Thank you for your quick response.',           ja: '迅速なご対応ありがとうございます。' },
      { en: 'I am afraid I cannot make it tomorrow.',       ja: 'あいにく明日は都合がつきません。' },
      { en: 'Can we reschedule the appointment?',           ja: '予約を変更できますか？' },
      { en: 'I will attach the file to my email.',          ja: 'メールにファイルを添付します。' },
      { en: 'Let me confirm the details with my manager.',  ja: '上司に詳細を確認させてください。' },
    ],
  },
];
