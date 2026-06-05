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
];
