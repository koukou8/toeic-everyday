/*
 * grammar.js — 中学英語の文法復習コンテンツ（初心者向け・解説厚め）
 * TOEIC（特にPart5・6）に効く基礎文法を、効果の高い順にトピック化。
 * 各トピック: 厚めの解説（ルール＋例文＋よくある間違い＋TOEICヒント）＋確認問題8問。
 * 問題スキーマはPartと共通（prompt / choices / answer / explain）。
 */

// 解説用の小さなUI部品（見た目を統一）
const _ex = (rows) =>
  `<div class="rounded-xl bg-slate-50 border border-line p-3 text-[13px] space-y-1">
     <p class="font-bold text-brand mb-1">例文</p>${rows.map((r) => `<p>${r}</p>`).join('')}
   </div>`;
const _mistake = (html) =>
  `<div class="rounded-xl bg-rose-50 border border-rose-100 p-3 text-[13px] text-rose-900">
     <p class="font-bold mb-1">⚠️ よくある間違い</p>${html}
   </div>`;
const _tip = (html) => `<p class="text-sub text-[13px]">💡 <strong>TOEICでは</strong>：${html}</p>`;

const GRAMMAR = [
  {
    id: 'g1', no: 1, title: '品詞の見分け', icon: '🧩', tag: '最優先',
    desc: '名詞・動詞・形容詞・副詞',
    lesson: `
      <p>英単語には<strong>役割（品詞）</strong>があります。Part 5 は「空所に入る品詞」を当てるだけで解ける問題がとても多いです。</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>名詞</strong>＝もの・こと（book, idea）。文の<u>主語・目的語</u>になる。</li>
        <li><strong>動詞</strong>＝動作・状態（go, is, have）。</li>
        <li><strong>形容詞</strong>＝名詞を説明（big, useful）。<u>名詞の前</u>か <u>be動詞の後</u>。</li>
        <li><strong>副詞</strong>＝動詞・形容詞・文全体を説明（quickly）。多くは <u>-ly</u>。</li>
      </ul>
      <div class="rounded-xl bg-slate-50 border border-line p-3 text-[13px]">
        <p class="font-bold text-brand mb-1">語尾でわかるサイン</p>
        <p>-tion / -ment / -ness → <b>名詞</b>（information, payment）</p>
        <p>-ful / -ous / -ive → <b>形容詞</b>（useful, famous）</p>
        <p>-ly → <b>副詞</b>（quickly, easily）</p>
        <p>-ize / -ate → <b>動詞</b>（realize, create）</p>
      </div>
      ${_ex([
        'a <b>useful</b> book（名詞 book の前 → 形容詞）',
        'He works <b>hard</b>.（動詞 works を説明 → 副詞）',
        '<b>Success</b> takes time.（主語 → 名詞）',
      ])}
      ${_mistake('語尾が <b>-ly</b> でも副詞とは限りません。friendly / lovely は<b>形容詞</b>。最後は「文中の位置」で判断しましょう。')}
      ${_tip('空所の<b>前後の品詞</b>を見るだけで正解が決まります。文全体を訳す必要はありません。')}`,
    questions: [
      { prompt: 'That was a _____ idea.（名詞 idea の前）',
        choices: ['(A) success', '(B) successful', '(C) successfully', '(D) succeed'], answer: 1,
        explain: '名詞の前は形容詞。successful（成功した）。success＝名詞、successfully＝副詞、succeed＝動詞。' },
      { prompt: 'He finished the work _____.（動詞 finished を説明）',
        choices: ['(A) quick', '(B) quickly', '(C) quickness', '(D) quicker'], answer: 1,
        explain: '動詞を説明するのは副詞。quickly（すばやく）。-ly は副詞のサイン。' },
      { prompt: '_____ is very important for children.（文の主語）',
        choices: ['(A) Educate', '(B) Educated', '(C) Education', '(D) Educationally'], answer: 2,
        explain: '主語になるのは名詞。Education（教育）。Educate は動詞なので主語になれません。' },
      { prompt: 'The movie was really _____.（be動詞 was の後）',
        choices: ['(A) bore', '(B) boring', '(C) boredom', '(D) bores'], answer: 1,
        explain: 'be動詞の後で様子を表すのは形容詞。boring（退屈な）。boredom は名詞。' },
      { prompt: 'The company reported a _____ increase in sales.（名詞 increase の前）',
        choices: ['(A) signify', '(B) significant', '(C) significantly', '(D) signification'], answer: 1,
        explain: '名詞の前は形容詞。significant（大きな・著しい）。significantly は副詞で×。' },
      { prompt: 'Please handle the products _____.（動詞 handle を説明）',
        choices: ['(A) care', '(B) careful', '(C) carefully', '(D) caring'], answer: 2,
        explain: '動詞を説明するのは副詞。carefully（注意深く）。careful は形容詞。' },
      { prompt: 'The _____ of the project pleased everyone.（the と of に挟まれた主語）',
        choices: ['(A) complete', '(B) completely', '(C) completion', '(D) completed'], answer: 2,
        explain: '「the ___ of …」の形は名詞が入ります。completion（完成）。' },
      { prompt: 'The new plan looks _____.（look + 様子）',
        choices: ['(A) perfect', '(B) perfectly', '(C) perfection', '(D) perfectness'], answer: 0,
        explain: 'look（〜に見える）の後は形容詞。perfect。perfectly は副詞なので×。' },
      { prompt: 'The manager gave a clear _____ to the team.（冠詞と動詞に挟まれた目的語）',
        choices: ['(A) explain', '(B) explained', '(C) explanation', '(D) explanatory'], answer: 2,
        explain: '「a clear ___」の後は名詞が入ります。explanation（説明）。explain は動詞、explanatory は形容詞。' },
      { prompt: 'The staff responded _____ to the request.（動詞 responded を説明）',
        choices: ['(A) quick', '(B) quickness', '(C) quickly', '(D) quicker'], answer: 2,
        explain: '動詞を説明するのは副詞。quickly（すばやく）。-ly は副詞のサインです。' },
      { prompt: 'Our new product is very _____.（be動詞 is の後）',
        choices: ['(A) popularity', '(B) popular', '(C) popularly', '(D) popularize'], answer: 1,
        explain: 'be動詞の後で様子を表すのは形容詞。popular（人気のある）。popularity は名詞。' },
      { prompt: '_____ is the key to good service.（文の主語）',
        choices: ['(A) Kind', '(B) Kindly', '(C) Kindness', '(D) Kinder'], answer: 2,
        explain: '主語になるのは名詞。Kindness（親切）。Kind は形容詞なので主語になれません。' },
      { prompt: 'The team worked _____ to finish on time.（動詞 worked を説明）',
        choices: ['(A) efficient', '(B) efficiently', '(C) efficiency', '(D) efficiencies'], answer: 1,
        explain: '動詞を説明するのは副詞。efficiently（効率よく）。efficient は形容詞、efficiency は名詞。' },
      { prompt: 'The team made a _____ decision.（名詞 decision の前）',
        choices: ['(A) wise', '(B) wisely', '(C) wisdom', '(D) wisest'], answer: 0,
        explain: '名詞の前は形容詞。wise（賢い）。wisely＝副詞、wisdom＝名詞。' },
      { prompt: 'The engineer solved the problem _____.（動詞 solved を説明）',
        choices: ['(A) easy', '(B) ease', '(C) easily', '(D) easier'], answer: 2,
        explain: '動詞を説明するのは副詞。easily（簡単に）。-ly は副詞のサイン。' },
      { prompt: '_____ between teams improves results.（文の主語）',
        choices: ['(A) Cooperate', '(B) Cooperative', '(C) Cooperation', '(D) Cooperatively'], answer: 2,
        explain: '主語になるのは名詞。Cooperation（協力）。Cooperate は動詞なので主語になれません。' },
      { prompt: 'The instructions were very _____.（be動詞 were の後）',
        choices: ['(A) clarity', '(B) clear', '(C) clearly', '(D) clarify'], answer: 1,
        explain: 'be動詞の後で様子を表すのは形容詞。clear（明確な）。clarity は名詞。' },
      { prompt: 'They found a _____ solution to the issue.（名詞 solution の前）',
        choices: ['(A) create', '(B) creative', '(C) creatively', '(D) creativity'], answer: 1,
        explain: '名詞の前は形容詞。creative（独創的な）。creatively は副詞で×。' },
      { prompt: 'The _____ of the new system took two weeks.（the と of に挟まれた主語）',
        choices: ['(A) install', '(B) installed', '(C) installation', '(D) installable'], answer: 2,
        explain: '「the ___ of …」の形は名詞が入ります。installation（設置）。' },
      { prompt: 'The guests arrived _____ at the party.（動詞 arrived を説明）',
        choices: ['(A) late', '(B) lately', '(C) lateness', '(D) later'], answer: 0,
        explain: 'arrive を説明し「遅れて」の意味は late。lately は「最近」で意味が違います。' },
    ],
  },

  {
    id: 'g2', no: 2, title: '動詞と時制', icon: '⏱️', tag: '頻出',
    desc: 'be動詞・三単現・過去・未来・進行・完了',
    lesson: `
      <p>「いつの話か（時制）」で動詞の形が変わります。文中の<strong>時を表す語</strong>がヒントになります。</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>現在</strong>：習慣・事実。主語が he/she/it のとき動詞に <b>s</b>（goes）。<span class="text-sub">→ every day, usually</span></li>
        <li><strong>過去</strong>：went, saw（多くは -ed）。<span class="text-sub">→ yesterday, last week, ago</span></li>
        <li><strong>未来</strong>：<b>will</b> ＋ 原形 / be going to。<span class="text-sub">→ tomorrow, next 〜</span></li>
        <li><strong>現在進行</strong>：be ＋ 〜ing（今〜している）。<span class="text-sub">→ now, Look!</span></li>
        <li><strong>現在完了</strong>：have/has ＋ 過去分詞。<span class="text-sub">→ since, for, already, yet, ever</span></li>
      </ul>
      ${_ex([
        'She <b>goes</b> to work by train.（習慣・三単現）',
        'I <b>saw</b> him yesterday.（過去）',
        'It <b>is raining</b> now.（今・進行）',
        'I <b>have lived</b> here for ten years.（継続・現在完了）',
      ])}
      ${_mistake('① 三単現の <b>s</b> 付け忘れ（He <s>go</s> → <b>goes</b>）。② <b>since</b>（〜から：時点）と <b>for</b>（〜の間：期間）の混同。since 2010 / for five years。')}
      ${_tip('文中の <b>yesterday / now / since 2010</b> などの語が時制を決めます。まずそれを探しましょう。')}`,
    questions: [
      { prompt: 'She _____ to school every day.',
        choices: ['(A) go', '(B) goes', '(C) going', '(D) gone'], answer: 1,
        explain: 'every day＝習慣（現在）。主語 She は3人称単数なので goes。' },
      { prompt: 'I _____ him at the station yesterday.',
        choices: ['(A) see', '(B) saw', '(C) seen', '(D) seeing'], answer: 1,
        explain: 'yesterday＝過去。see の過去形 saw。' },
      { prompt: 'We _____ visit Kyoto next month.',
        choices: ['(A) will', '(B) are', '(C) did', '(D) were'], answer: 0,
        explain: 'next month＝未来。will＋原形 visit。' },
      { prompt: 'Look! It _____ now.',
        choices: ['(A) rains', '(B) is raining', '(C) rained', '(D) rain'], answer: 1,
        explain: 'Look! / now → 今まさに起きている＝現在進行。is raining。' },
      { prompt: 'I have lived here _____ 2010.',
        choices: ['(A) since', '(B) for', '(C) ago', '(D) in'], answer: 0,
        explain: '現在完了＋「ある時点から」は since。since 2010。for は期間につきます。' },
      { prompt: 'I have known her _____ five years.',
        choices: ['(A) since', '(B) for', '(C) in', '(D) ago'], answer: 1,
        explain: '「5年間」という期間なので for。for five years。' },
      { prompt: 'He _____ not work on weekends.',
        choices: ['(A) do', '(B) does', '(C) is', '(D) did'], answer: 1,
        explain: '主語 He の現在の否定は does not。一般動詞の否定は do/does を使います。' },
      { prompt: 'I have _____ finished my report, so I can relax.',
        choices: ['(A) yet', '(B) already', '(C) since', '(D) ago'], answer: 1,
        explain: '「もう終えた」完了の意味は already。yet は否定・疑問で使います。' },
      { prompt: 'My brother _____ TV every evening.',
        choices: ['(A) watch', '(B) watches', '(C) watching', '(D) watched'], answer: 1,
        explain: 'every evening＝習慣（現在）。主語 My brother は3人称単数なので watches。' },
      { prompt: 'They _____ a new office last year.',
        choices: ['(A) open', '(B) opens', '(C) opened', '(D) opening'], answer: 2,
        explain: 'last year＝過去。open の過去形 opened。' },
      { prompt: 'She is _____ a letter right now.',
        choices: ['(A) write', '(B) writes', '(C) writing', '(D) wrote'], answer: 2,
        explain: 'right now＝今まさに。be動詞 is ＋ 〜ing の現在進行。writing。' },
      { prompt: 'We _____ already eaten lunch.',
        choices: ['(A) have', '(B) has', '(C) had', '(D) having'], answer: 0,
        explain: 'already ＋ 過去分詞 eaten は現在完了。主語 We には have。' },
      { prompt: 'He has worked here _____ three years.',
        choices: ['(A) since', '(B) for', '(C) ago', '(D) at'], answer: 1,
        explain: '「3年間」という期間なので for。for three years。since は時点につきます。' },
      { prompt: 'My sister _____ the piano every weekend.',
        choices: ['(A) play', '(B) plays', '(C) playing', '(D) played'], answer: 1,
        explain: 'every weekend＝習慣（現在）。主語 My sister は3人称単数なので plays。' },
      { prompt: 'They _____ the bridge two years ago.',
        choices: ['(A) build', '(B) builds', '(C) built', '(D) building'], answer: 2,
        explain: 'ago＝過去。build の過去形 built。' },
      { prompt: 'I _____ call you when the meeting ends.',
        choices: ['(A) will', '(B) am', '(C) did', '(D) was'], answer: 0,
        explain: '「〜するつもり（未来）」は will＋原形 call。' },
      { prompt: 'Be quiet! The baby _____ now.',
        choices: ['(A) sleeps', '(B) is sleeping', '(C) slept', '(D) sleep'], answer: 1,
        explain: 'now → 今まさに起きている＝現在進行。is sleeping。' },
      { prompt: 'We have been friends _____ high school.',
        choices: ['(A) since', '(B) for', '(C) ago', '(D) on'], answer: 0,
        explain: '現在完了＋「ある時点から」は since。since high school。' },
      { prompt: 'It has not rained _____ several weeks.',
        choices: ['(A) since', '(B) for', '(C) in', '(D) ago'], answer: 1,
        explain: '「数週間」という期間なので for。for several weeks。' },
      { prompt: 'My parents _____ not like spicy food.',
        choices: ['(A) does', '(B) do', '(C) is', '(D) was'], answer: 1,
        explain: '主語 My parents（複数）の現在の否定は do not。一般動詞の否定は do/does を使います。' },
    ],
  },

  {
    id: 'g3', no: 3, title: '前置詞', icon: '📍', tag: '頻出',
    desc: 'in / on / at と by / during / for',
    lesson: `
      <p>時と場所の前置詞は、TOEIC で何度も問われます。まず核となる3つ。</p>
      <div class="rounded-xl bg-slate-50 border border-line p-3 text-[13px] space-y-1">
        <p class="font-bold text-brand mb-1">時の at / on / in</p>
        <p><b>at</b> ＋ 時刻（at 7:00, at noon）</p>
        <p><b>on</b> ＋ 曜日・日付（on Monday, on July 5）</p>
        <p><b>in</b> ＋ 月・年・季節（in July, in 2020, in summer）</p>
      </div>
      <div class="rounded-xl bg-slate-50 border border-line p-3 text-[13px] space-y-1">
        <p class="font-bold text-brand mb-1">場所の at / on / in</p>
        <p><b>at</b> ＝ 地点（at the station）</p>
        <p><b>on</b> ＝ 接している面（on the desk, on the wall）</p>
        <p><b>in</b> ＝ 中・広い場所（in the box, in Tokyo）</p>
      </div>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>by</strong>：〜までに（期限）。submit it <b>by</b> Friday</li>
        <li><strong>until</strong>：〜までずっと（継続）。wait <b>until</b> 5</li>
        <li><strong>during</strong>：〜の間（＋名詞）。<b>during</b> the meeting</li>
        <li><strong>for</strong>：〜の間（＋期間）。<b>for</b> two hours</li>
      </ul>
      ${_mistake('<b>by</b>（期限：その時までに一度）と <b>until</b>（継続：その時までずっと）は別物。<br><b>during</b>（＋名詞: during summer）と <b>while</b>（＋文: while I slept）も混同注意。')}
      ${_tip('「狭い→at、面→on、広い/中→in」とイメージ。空所の後ろの語（時刻？曜日？場所？）で決まります。')}`,
    questions: [
      { prompt: 'The class starts _____ 9 o\'clock.',
        choices: ['(A) in', '(B) on', '(C) at'], answer: 2,
        explain: '時刻には at。at 9 o\'clock。' },
      { prompt: 'Let\'s meet _____ Monday morning.',
        choices: ['(A) in', '(B) on', '(C) at'], answer: 1,
        explain: '曜日には on。on Monday。' },
      { prompt: 'My birthday is _____ July.',
        choices: ['(A) in', '(B) on', '(C) at'], answer: 0,
        explain: '月には in。in July。' },
      { prompt: 'The keys are _____ the box.',
        choices: ['(A) in', '(B) on', '(C) at'], answer: 0,
        explain: '「箱の中」は in。on なら箱の上、at は地点。' },
      { prompt: 'Please submit the report _____ Friday.（金曜までに）',
        choices: ['(A) until', '(B) by', '(C) during', '(D) for'], answer: 1,
        explain: '「〜までに（期限）」は by。提出は一度きりなので until ではありません。' },
      { prompt: 'He fell asleep _____ the movie.',
        choices: ['(A) while', '(B) during', '(C) for', '(D) since'], answer: 1,
        explain: '後ろが名詞(the movie)なので during。while は後ろに文が必要です。' },
      { prompt: 'We waited _____ two hours.',
        choices: ['(A) since', '(B) for', '(C) during', '(D) at'], answer: 1,
        explain: '「2時間（期間）」は for。for two hours。' },
      { prompt: 'I\'ll meet you _____ the station.',
        choices: ['(A) in', '(B) on', '(C) at'], answer: 2,
        explain: '待ち合わせの「地点」は at。at the station。' },
      { prompt: 'The meeting is _____ Wednesday.',
        choices: ['(A) in', '(B) on', '(C) at'], answer: 1,
        explain: '曜日には on。on Wednesday。' },
      { prompt: 'The company was founded _____ 1995.',
        choices: ['(A) in', '(B) on', '(C) at'], answer: 0,
        explain: '年には in。in 1995。' },
      { prompt: 'There is a picture _____ the wall.',
        choices: ['(A) in', '(B) on', '(C) at'], answer: 1,
        explain: '壁に「接している面」は on。on the wall。' },
      { prompt: 'Please stay here _____ I come back.（私が戻るまでずっと）',
        choices: ['(A) by', '(B) until', '(C) during'], answer: 1,
        explain: '「〜までずっと（継続）」は until。by は「〜までに（期限）」で意味が違います。' },
      { prompt: 'She took many notes _____ the lecture.',
        choices: ['(A) while', '(B) during', '(C) for'], answer: 1,
        explain: '後ろが名詞(the lecture)なので during。while は後ろに文が必要です。' },
      { prompt: 'The shop opens _____ 8 a.m.',
        choices: ['(A) in', '(B) on', '(C) at'], answer: 2,
        explain: '時刻には at。at 8 a.m。' },
      { prompt: 'The festival is held _____ October.',
        choices: ['(A) in', '(B) on', '(C) at'], answer: 0,
        explain: '月には in。in October。' },
      { prompt: 'The cat is sleeping _____ the sofa.',
        choices: ['(A) in', '(B) on', '(C) at'], answer: 1,
        explain: '「ソファに接した面」は on。on the sofa。' },
      { prompt: 'Please finish the task _____ noon.（正午までに）',
        choices: ['(A) until', '(B) by', '(C) during', '(D) for'], answer: 1,
        explain: '「〜までに（期限）」は by。完了は一度きりなので until ではありません。' },
      { prompt: 'The store stays open _____ midnight.（深夜までずっと）',
        choices: ['(A) by', '(B) until', '(C) during'], answer: 1,
        explain: '「〜までずっと（継続）」は until。by は「〜までに（期限）」で意味が違います。' },
      { prompt: 'No one spoke _____ the presentation.',
        choices: ['(A) while', '(B) during', '(C) for'], answer: 1,
        explain: '後ろが名詞(the presentation)なので during。while は後ろに文が必要です。' },
      { prompt: 'I have studied English _____ many years.',
        choices: ['(A) since', '(B) for', '(C) during'], answer: 1,
        explain: '「長年（期間）」は for。for many years。' },
    ],
  },

  {
    id: 'g4', no: 4, title: '比較', icon: '📊', tag: '頻出',
    desc: '比較級・最上級・as ... as',
    lesson: `
      <p>2つを比べる<strong>比較級</strong>、3つ以上で一番の<strong>最上級</strong>、同じくらいの <strong>as ... as</strong>。</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>比較級</strong>：短い語＋<b>-er</b>（taller）／長い語は <b>more</b> 〜。後ろに <b>than</b>（〜より）。</li>
        <li><strong>最上級</strong>：<b>the</b> 〜<b>est</b>（the tallest）／<b>the most</b> 〜。</li>
        <li><strong>同等</strong>：<b>as</b> 〜 <b>as</b>（as tall as ＝同じくらい背が高い）。</li>
      </ul>
      <div class="rounded-xl bg-slate-50 border border-line p-3 text-[13px] space-y-1">
        <p class="font-bold text-brand mb-1">不規則変化（暗記）</p>
        <p>good / well － <b>better</b> － <b>best</b></p>
        <p>bad － <b>worse</b> － <b>worst</b></p>
        <p>many / much － <b>more</b> － <b>most</b></p>
      </div>
      ${_ex([
        'This bag is <b>cheaper than</b> that one.（比較級）',
        'Mt. Fuji is the <b>highest</b> mountain in Japan.（最上級）',
        'He is <b>as old as</b> me.（同じくらい）',
        'This is <b>much better</b>.（much で比較級を強調）',
      ])}
      ${_mistake('① <b>more bigger</b> のような二重比較は×（bigger だけ）。② <b>than</b>（〜より）と <b>then</b>（そのとき）の混同。')}
      ${_tip('空所の近くに <b>than</b> があれば比較級、<b>the</b> ＋ 〜est や in/of があれば最上級のサインです。')}`,
    questions: [
      { prompt: 'He is taller _____ me.',
        choices: ['(A) than', '(B) then', '(C) as'], answer: 0,
        explain: '比較級のあとは than（〜より）。then は「そのとき」で意味が違います。' },
      { prompt: 'This bag is _____ than that one.',
        choices: ['(A) big', '(B) bigger', '(C) biggest'], answer: 1,
        explain: 'than があるので比較級 bigger。' },
      { prompt: 'Mt. Fuji is the _____ mountain in Japan.',
        choices: ['(A) high', '(B) higher', '(C) highest'], answer: 2,
        explain: 'the ＋ -est は最上級。in Japan（範囲）も最上級のサイン。highest。' },
      { prompt: 'good - better - _____',
        choices: ['(A) goodest', '(B) best', '(C) more good'], answer: 1,
        explain: 'good は不規則変化。good - better - best。' },
      { prompt: 'She is as tall _____ her brother.',
        choices: ['(A) as', '(B) than', '(C) to'], answer: 0,
        explain: '「as 〜 as（同じくらい）」の形。as tall as。' },
      { prompt: 'This is the _____ expensive item in the store.',
        choices: ['(A) more', '(B) most', '(C) very'], answer: 1,
        explain: 'the ＋ most ＋ 長い形容詞 ＝ 最上級。the most expensive。' },
      { prompt: 'My score is _____ than yours.（bad の比較級）',
        choices: ['(A) badder', '(B) worse', '(C) worst'], answer: 1,
        explain: 'bad は不規則。bad - worse - worst。than があるので worse。' },
      { prompt: 'This plan is _____ better than the old one.（比較級の強調）',
        choices: ['(A) very', '(B) much', '(C) more'], answer: 1,
        explain: '比較級を強める語は much（ずっと）。very は比較級を強められません。' },
      { prompt: 'Today is _____ than yesterday.（warm の比較級）',
        choices: ['(A) warm', '(B) warmer', '(C) warmest'], answer: 1,
        explain: 'than があるので比較級 warmer。' },
      { prompt: 'This is the _____ restaurant in town.（good の最上級）',
        choices: ['(A) better', '(B) best', '(C) goodest'], answer: 1,
        explain: 'good は不規則変化。good - better - best。the best。' },
      { prompt: 'This question is _____ difficult as that one.',
        choices: ['(A) as', '(B) than', '(C) more'], answer: 0,
        explain: '「as 〜 as（同じくらい）」の形。as difficult as。' },
      { prompt: 'This phone is _____ expensive than mine.',
        choices: ['(A) more', '(B) most', '(C) much'], answer: 0,
        explain: '長い形容詞の比較級は more ＋ 形容詞。than があるので more expensive。' },
      { prompt: 'Winter is the _____ season of the year.（cold の最上級）',
        choices: ['(A) colder', '(B) coldest', '(C) more cold'], answer: 1,
        explain: 'the ＋ -est は最上級。of the year（範囲）も最上級のサイン。coldest。' },
      { prompt: 'This road is _____ than the old one.',
        choices: ['(A) wide', '(B) wider', '(C) widest'], answer: 1,
        explain: 'than があるので比較級 wider。' },
      { prompt: 'Tokyo is the _____ city in Japan.',
        choices: ['(A) large', '(B) larger', '(C) largest'], answer: 2,
        explain: 'the ＋ -est は最上級。in Japan（範囲）も最上級のサイン。largest。' },
      { prompt: 'This summer is as hot _____ last summer.',
        choices: ['(A) as', '(B) than', '(C) to'], answer: 0,
        explain: '「as 〜 as（同じくらい）」の形。as hot as。' },
      { prompt: 'This is the _____ interesting movie of the year.',
        choices: ['(A) more', '(B) most', '(C) very'], answer: 1,
        explain: 'the ＋ most ＋ 長い形容詞 ＝ 最上級。the most interesting。' },
      { prompt: 'The traffic today is _____ than usual.（bad の比較級）',
        choices: ['(A) badder', '(B) worse', '(C) worst'], answer: 1,
        explain: 'bad は不規則。bad - worse - worst。than があるので worse。' },
      { prompt: 'Her new car is _____ faster than the old one.（比較級の強調）',
        choices: ['(A) very', '(B) much', '(C) more'], answer: 1,
        explain: '比較級を強める語は much（ずっと）。very は比較級を強められません。' },
      { prompt: 'Health is the _____ thing of all.（good の最上級）',
        choices: ['(A) better', '(B) best', '(C) goodest'], answer: 1,
        explain: 'good は不規則変化。good - better - best。the best。' },
    ],
  },

  {
    id: 'g5', no: 5, title: '冠詞・名詞', icon: '🔤', tag: '基礎',
    desc: 'a / the と可算・不可算',
    lesson: `
      <p>名詞の前の <strong>a / an / the</strong> と、その名詞が<strong>数えられるか</strong>がポイント。</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>a / an</strong>：はじめて出る「1つの」。<u>音が母音(a,i,u,e,o)で始まる</u>語は <b>an</b>（an apple）。</li>
        <li><strong>the</strong>：すでに分かっている／世界に1つ（the sun, the door）。</li>
        <li><strong>無冠詞</strong>：一般的な複数（I like dogs.）や不可算名詞。</li>
      </ul>
      <div class="rounded-xl bg-slate-50 border border-line p-3 text-[13px] space-y-1">
        <p class="font-bold text-brand mb-1">数えられない名詞（s を付けない）</p>
        <p>information / advice / furniture / money / water / news</p>
        <p class="mt-1"><b>量の表し方</b>：可算→ many / few、不可算→ much / little、両方→ some / a lot of</p>
      </div>
      ${_ex([
        'I bought <b>an</b> umbrella.（母音の音 → an）',
        'Please close <b>the</b> window.（その特定の窓）',
        'He gave me some useful <b>advice</b>.（不可算：advices にしない）',
      ])}
      ${_mistake('発音で決まります：<b>an</b> hour（h は無音）、<b>a</b> university（「ユ」は子音の音）。<br>informations / advices のような複数形は<b>ない</b>。')}
      ${_tip('空所の名詞が「数えられる単数」なら a/an、特定なら the。many/much の選択は可算・不可算で決まります。')}`,
    questions: [
      { prompt: 'I bought _____ apple at the store.',
        choices: ['(A) a', '(B) an', '(C) the'], answer: 1,
        explain: 'apple は母音の音で始まるので an。' },
      { prompt: 'I don\'t have much _____.',
        choices: ['(A) book', '(B) water', '(C) apple'], answer: 1,
        explain: 'much は数えられない名詞につく。water。book/apple は可算。' },
      { prompt: 'There are three _____ on the desk.',
        choices: ['(A) book', '(B) books', '(C) bookes'], answer: 1,
        explain: '可算名詞の複数は -s。three books。' },
      { prompt: 'Please close _____ door.（目の前の特定のドア）',
        choices: ['(A) a', '(B) an', '(C) the'], answer: 2,
        explain: '特定のものには the。the door。' },
      { prompt: 'I\'ll be back in _____ hour.',
        choices: ['(A) a', '(B) an', '(C) the'], answer: 1,
        explain: 'hour の h は無音で母音の音。だから an hour。つづりでなく発音で判断。' },
      { prompt: 'There are _____ people in the room.',
        choices: ['(A) much', '(B) many', '(C) a little'], answer: 1,
        explain: 'people は可算（複数）。可算には many。' },
      { prompt: 'He gave me some useful _____.',
        choices: ['(A) advice', '(B) advices', '(C) an advice'], answer: 0,
        explain: 'advice は不可算。複数形 advices や an advice にはしません。' },
      { prompt: 'She goes to _____ university in Tokyo.',
        choices: ['(A) a', '(B) an', '(C) the'], answer: 0,
        explain: 'university は「ユ」＝子音の音で始まるので a。発音で a/an を決めます。' },
      { prompt: 'She is reading _____ interesting article.',
        choices: ['(A) a', '(B) an', '(C) the'], answer: 1,
        explain: 'interesting は母音の音で始まるので an。an interesting article。' },
      { prompt: 'I need to send some important _____.',
        choices: ['(A) information', '(B) informations', '(C) an information'], answer: 0,
        explain: 'information は不可算。複数形 informations や an information にはしません。' },
      { prompt: 'How many _____ do you have?',
        choices: ['(A) money', '(B) friend', '(C) friends'], answer: 2,
        explain: 'many は数えられる名詞の複数につく。friends。money は不可算で×。' },
      { prompt: 'Please turn off _____ light before you leave.（その特定の照明）',
        choices: ['(A) a', '(B) an', '(C) the'], answer: 2,
        explain: '特定のものには the。the light。' },
      { prompt: 'There is too _____ noise in this room.',
        choices: ['(A) many', '(B) much', '(C) few'], answer: 1,
        explain: 'noise は数えられない名詞。不可算には much。many や few は可算用です。' },
      { prompt: 'She wrote _____ email to her teacher.',
        choices: ['(A) a', '(B) an', '(C) the'], answer: 1,
        explain: 'email は母音の音で始まるので an。an email。' },
      { prompt: 'There isn\'t much _____ left in the bottle.',
        choices: ['(A) juice', '(B) cup', '(C) apple'], answer: 0,
        explain: 'much は数えられない名詞につく。juice。cup/apple は可算。' },
      { prompt: 'I saw five _____ in the garden.',
        choices: ['(A) child', '(B) childs', '(C) children'], answer: 2,
        explain: 'child の複数は不規則で children。childs にはしません。' },
      { prompt: 'Please pass me _____ salt on the table.（その特定の塩）',
        choices: ['(A) a', '(B) an', '(C) the'], answer: 2,
        explain: '特定のものには the。the salt。' },
      { prompt: 'How many _____ are in your class?',
        choices: ['(A) student', '(B) students', '(C) homework'], answer: 1,
        explain: 'many は数えられる名詞の複数につく。students。homework は不可算で×。' },
      { prompt: 'We don\'t have _____ time before the train leaves.',
        choices: ['(A) many', '(B) much', '(C) few'], answer: 1,
        explain: 'time は数えられない名詞。不可算には much。many や few は可算用です。' },
      { prompt: 'He bought some new _____ for the office.',
        choices: ['(A) furniture', '(B) furnitures', '(C) a furniture'], answer: 0,
        explain: 'furniture は不可算。複数形 furnitures や a furniture にはしません。' },
    ],
  },

  {
    id: 'g6', no: 6, title: '助動詞', icon: '🛟', tag: '基礎',
    desc: 'can / will / should / must',
    lesson: `
      <p>動詞に意味を足す言葉。最重要ルールは<strong>「助動詞のあとは必ず動詞の原形」</strong>。</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>can</strong>：〜できる（能力）／〜してよい（許可）。過去・丁寧は <b>could</b>。</li>
        <li><strong>will</strong>：〜するつもり／〜だろう。丁寧は <b>would</b>。</li>
        <li><strong>should</strong>：〜すべき（アドバイス）。</li>
        <li><strong>must / have to</strong>：〜しなければならない（義務）。must は強い推量「〜にちがいない」も。</li>
        <li><strong>may / might</strong>：〜かもしれない／〜してよい。</li>
      </ul>
      ${_ex([
        'You <b>should take</b> a rest.（should ＋ 原形）',
        '<b>Could</b> you help me?（丁寧な依頼）',
        'It <b>may</b> rain tomorrow.（〜かもしれない）',
      ])}
      ${_mistake('① あとは<b>原形</b>（× should to go / × can speaks → ◯ should go / can speak）。<br>② <b>must not</b>（〜してはいけない＝禁止）と <b>don\'t have to</b>（〜しなくてよい＝不要）は意味が逆。')}
      ${_tip('空所が助動詞なら、後ろは必ず原形。意味（できる/べき/かもしれない）で語を選びます。')}`,
    questions: [
      { prompt: 'You should _____ a rest.',
        choices: ['(A) take', '(B) takes', '(C) took', '(D) taking'], answer: 0,
        explain: '助動詞 should のあとは原形 take。' },
      { prompt: 'I _____ swim very well.',
        choices: ['(A) can', '(B) am', '(C) do'], answer: 0,
        explain: '「〜できる（能力）」は can。' },
      { prompt: 'You look sick. You _____ see a doctor.',
        choices: ['(A) should', '(B) will', '(C) can'], answer: 0,
        explain: 'アドバイス「〜した方がいい」は should。' },
      { prompt: 'It _____ rain tomorrow, so take an umbrella.',
        choices: ['(A) may', '(B) must', '(C) should'], answer: 0,
        explain: '「〜かもしれない」推量は may。' },
      { prompt: 'You _____ wear a helmet here. It\'s the rule.',
        choices: ['(A) may', '(B) must', '(C) might'], answer: 1,
        explain: 'ルール＝義務「〜しなければならない」は must。' },
      { prompt: '_____ you open the window, please?（丁寧な依頼）',
        choices: ['(A) Could', '(B) Should', '(C) Must'], answer: 0,
        explain: '丁寧な依頼は Could you 〜?。' },
      { prompt: 'It\'s free, so you _____ pay.（払う必要がない）',
        choices: ['(A) mustn\'t', '(B) don\'t have to', '(C) should'], answer: 1,
        explain: '「〜しなくてよい（不要）」は don\'t have to。mustn\'t は「〜してはいけない（禁止）」で意味が逆。' },
      { prompt: 'He can _____ three languages.',
        choices: ['(A) speak', '(B) speaks', '(C) speaking', '(D) to speak'], answer: 0,
        explain: '助動詞 can のあとは原形 speak。speaks や to speak は×。' },
      { prompt: 'You must _____ your seatbelt.',
        choices: ['(A) wear', '(B) wears', '(C) wearing'], answer: 0,
        explain: '助動詞 must のあとは原形 wear。' },
      { prompt: 'I _____ help you with your bags.（〜しましょうか）',
        choices: ['(A) can', '(B) am', '(C) do'], answer: 0,
        explain: '「〜できる／〜しましょうか」は can。can help。' },
      { prompt: 'You _____ save your file before closing.（アドバイス）',
        choices: ['(A) should', '(B) may', '(C) will'], answer: 0,
        explain: 'アドバイス「〜した方がいい」は should。' },
      { prompt: 'She _____ be tired after the long trip.（〜にちがいない）',
        choices: ['(A) may', '(B) must', '(C) can'], answer: 1,
        explain: '強い推量「〜にちがいない」は must。' },
      { prompt: 'We _____ to finish the report by Friday.（〜しなければならない）',
        choices: ['(A) must', '(B) have', '(C) should'], answer: 1,
        explain: '「〜しなければならない」を have で表すときは have to。must to とは言いません。' },
      { prompt: 'You _____ borrow my umbrella if you want.（許可）',
        choices: ['(A) can', '(B) must', '(C) should'], answer: 0,
        explain: '「〜してよい（許可）」は can。can borrow。' },
      { prompt: 'Students must _____ quiet in the library.',
        choices: ['(A) be', '(B) are', '(C) being'], answer: 0,
        explain: '助動詞 must のあとは原形。be動詞の原形は be。' },
      { prompt: 'You _____ check your spelling before sending.（アドバイス）',
        choices: ['(A) should', '(B) may', '(C) will'], answer: 0,
        explain: 'アドバイス「〜した方がいい」は should。' },
      { prompt: 'The keys _____ be in the drawer. I\'m not sure.（〜かもしれない）',
        choices: ['(A) might', '(B) must', '(C) should'], answer: 0,
        explain: '「〜かもしれない」推量は might。' },
      { prompt: '_____ I borrow your pen, please?（丁寧な許可の依頼）',
        choices: ['(A) May', '(B) Should', '(C) Must'], answer: 0,
        explain: '丁寧に許可を求めるときは May I 〜?。' },
      { prompt: 'It\'s a holiday, so we _____ go to work.（行く必要がない）',
        choices: ['(A) mustn\'t', '(B) don\'t have to', '(C) should'], answer: 1,
        explain: '「〜しなくてよい（不要）」は don\'t have to。mustn\'t は「〜してはいけない（禁止）」で意味が逆。' },
      { prompt: 'Visitors _____ to sign in at the front desk.（〜しなければならない）',
        choices: ['(A) must', '(B) have', '(C) should'], answer: 1,
        explain: '「〜しなければならない」を have で表すときは have to。must to とは言いません。' },
    ],
  },

  {
    id: 'g7', no: 7, title: '代名詞・関係代名詞', icon: '🔗', tag: '基礎',
    desc: 'me/my/mine、who/which/whose',
    lesson: `
      <p>人やものを指す代名詞と、2文をつなぐ関係代名詞の基礎。</p>
      <div class="rounded-xl bg-slate-50 border border-line p-3 text-[13px] space-y-1">
        <p class="font-bold text-brand mb-1">人称代名詞（I の変化）</p>
        <p>主格 <b>I</b>（〜は）／ 所有格 <b>my</b>（〜の＋名詞）</p>
        <p>目的格 <b>me</b>（〜を/に）／ 所有代名詞 <b>mine</b>（〜のもの）</p>
        <p class="text-sub mt-1">同様に：he-his-him-his / they-their-them-theirs</p>
      </div>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>who</strong>：人を説明（The man <b>who</b> lives here）。</li>
        <li><strong>which</strong>：ものを説明（a book <b>which</b> is new）。</li>
        <li><strong>whose</strong>：「〜の」を表す（the man <b>whose</b> car is red）。</li>
        <li><strong>that</strong>：人・もの両方に使える。</li>
      </ul>
      ${_ex([
        'Please call <b>me</b> later.（目的格）',
        'This is <b>my</b> bag. ＝ This bag is <b>mine</b>.',
        'The woman <b>who</b> called you is my boss.（人）',
      ])}
      ${_mistake('① <b>I</b>（〜は）と <b>me</b>（〜を/に）の使い分け（× Call I → ◯ Call me）。<br>② <b>its</b>（それの）と <b>it\'s</b>（it is）は別物。')}
      ${_tip('空所の後ろが名詞なら所有格(my)、動詞の目的語なら目的格(me)。説明する相手が人なら who、ものなら which。')}`,
    questions: [
      { prompt: 'Please call _____ later.',
        choices: ['(A) I', '(B) me', '(C) my'], answer: 1,
        explain: 'call の目的語なので目的格 me。' },
      { prompt: 'This is _____ favorite book.',
        choices: ['(A) I', '(B) me', '(C) my'], answer: 2,
        explain: '名詞 book の前は所有格 my。' },
      { prompt: 'The man _____ lives next door is kind.',
        choices: ['(A) who', '(B) which', '(C) where'], answer: 0,
        explain: '人(The man)を説明する関係代名詞は who。' },
      { prompt: 'I read a book _____ is very interesting.',
        choices: ['(A) who', '(B) which', '(C) when'], answer: 1,
        explain: 'もの(book)を説明する関係代名詞は which。' },
      { prompt: 'This bag is _____.（私のものだ）',
        choices: ['(A) my', '(B) mine', '(C) me'], answer: 1,
        explain: '「私のもの」は所有代名詞 mine。my の後ろには名詞が必要です。' },
      { prompt: 'I know a man _____ car is very old.',
        choices: ['(A) who', '(B) whose', '(C) which'], answer: 1,
        explain: '「その人の車」と所有を表すので whose。whose ＋ 名詞。' },
      { prompt: '_____ are my best friends.',
        choices: ['(A) Them', '(B) They', '(C) Their'], answer: 1,
        explain: '文の主語なので主格 They。Them は目的格。' },
      { prompt: 'The movie _____ we watched was great.',
        choices: ['(A) who', '(B) which', '(C) when'], answer: 1,
        explain: 'もの(movie)を説明し目的語の働きをするので which（that も可）。who は人用。' },
      { prompt: 'These books are _____.（彼らのものだ）',
        choices: ['(A) their', '(B) theirs', '(C) them'], answer: 1,
        explain: '「彼らのもの」は所有代名詞 theirs。their の後ろには名詞が必要です。' },
      { prompt: 'Can you help _____ with this task?',
        choices: ['(A) we', '(B) us', '(C) our'], answer: 1,
        explain: 'help の目的語なので目的格 us。we は主格です。' },
      { prompt: 'The woman _____ works here is very friendly.',
        choices: ['(A) who', '(B) which', '(C) whose'], answer: 0,
        explain: '人(The woman)を説明する関係代名詞は who。' },
      { prompt: 'I bought a watch _____ was made in Japan.',
        choices: ['(A) who', '(B) which', '(C) where'], answer: 1,
        explain: 'もの(watch)を説明する関係代名詞は which。' },
      { prompt: 'He is the writer _____ books are famous.',
        choices: ['(A) who', '(B) whose', '(C) which'], answer: 1,
        explain: '「その人の本」と所有を表すので whose。whose ＋ 名詞。' },
      { prompt: 'Can you give _____ a hand?',
        choices: ['(A) I', '(B) me', '(C) my'], answer: 1,
        explain: 'give の目的語なので目的格 me。' },
      { prompt: 'She forgot _____ password again.',
        choices: ['(A) she', '(B) her', '(C) hers'], answer: 1,
        explain: '名詞 password の前は所有格 her。' },
      { prompt: 'The student _____ won the prize is my classmate.',
        choices: ['(A) who', '(B) which', '(C) where'], answer: 0,
        explain: '人(The student)を説明する関係代名詞は who。' },
      { prompt: 'This is the house _____ has a red roof.',
        choices: ['(A) who', '(B) which', '(C) when'], answer: 1,
        explain: 'もの(house)を説明する関係代名詞は which。' },
      { prompt: 'That umbrella is _____.（彼のものだ）',
        choices: ['(A) he', '(B) his', '(C) him'], answer: 1,
        explain: '「彼のもの」は所有代名詞 his。him は目的格です。' },
      { prompt: 'I met a girl _____ brother is a famous singer.',
        choices: ['(A) who', '(B) whose', '(C) which'], answer: 1,
        explain: '「その人の兄」と所有を表すので whose。whose ＋ 名詞。' },
      { prompt: 'Please wait for _____ at the entrance.',
        choices: ['(A) we', '(B) us', '(C) our'], answer: 1,
        explain: '前置詞 for の後は目的格 us。we は主格です。' },
    ],
  },
];

function getGrammar(id) { return GRAMMAR.find((g) => g.id === id); }
