/* ==========================================================
   英语音标乐园 · 交互逻辑
   依赖：js/data.js 里的 LETTERS 和 PHONETICS
   发音使用浏览器自带的 Web Speech API，不需要任何音频文件
   ========================================================== */
(function () {
  'use strict';

  const IPA_FONT = '"Charis SIL", "Doulos SIL", "DejaVu Sans", "Lucida Grande", Arial, sans-serif';

  /* ========================================================
   * 1. 发音模块
   * ====================================================== */
  const synth = window.speechSynthesis || null;
  let enVoice = null;
  let speakQueue = [];   // 连续朗读队列
  let queueRunning = false;

  if (!synth) {
    const warn = document.getElementById('speech-warning');
    if (warn) warn.hidden = false;
  }

  function pickVoice() {
    if (!synth) return;
    const voices = synth.getVoices() || [];
    enVoice =
      voices.find(v => /^en[-_]US/i.test(v.lang) && /samantha|female|zira|aria|jenny/i.test(v.name)) ||
      voices.find(v => /^en[-_]US/i.test(v.lang)) ||
      voices.find(v => /^en[-_]GB/i.test(v.lang)) ||
      voices.find(v => /^en/i.test(v.lang)) ||
      null;
  }

  if (synth) {
    pickVoice();
    // 有些浏览器需要等 voices 异步加载完
    synth.addEventListener
      ? synth.addEventListener('voiceschanged', pickVoice)
      : (synth.onvoiceschanged = pickVoice);
  }

  /**
   * 朗读一段英文
   * @param {string} text 要读的内容
   * @param {object} opt  { rate, onend, keepQueue }
   */
  function speak(text, opt) {
    opt = opt || {};
    if (!synth) { if (opt.onend) opt.onend(); return; }
    if (!opt.keepQueue) { speakQueue = []; queueRunning = false; }
    stopAudio();   // 语音朗读和音素录音互斥，后触发的接管播放
    synth.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.lang = (enVoice && enVoice.lang) || 'en-US';
    if (enVoice) u.voice = enVoice;
    u.rate = opt.rate || 0.85;   // 慢一点，方便小朋友跟读
    u.pitch = 1.1;
    u.volume = 1;
    if (opt.onend) u.onend = opt.onend;
    if (opt.onend) u.onerror = opt.onend;
    synth.speak(u);
  }

  /** 依次朗读一串内容 */
  function speakList(list, opt) {
    opt = opt || {};
    if (!synth || !list.length) return;
    synth.cancel();
    speakQueue = list.slice();
    queueRunning = true;

    function next() {
      if (!queueRunning || !speakQueue.length) {
        queueRunning = false;
        if (opt.onDone) opt.onDone();
        return;
      }
      const item = speakQueue.shift();
      if (opt.onEach) opt.onEach(item);
      speak(item, {
        rate: opt.rate || 0.8,
        keepQueue: true,
        onend: () => setTimeout(next, opt.gap || 350)
      });
    }
    next();
  }

  function stopSpeak() {
    speakQueue = [];
    queueRunning = false;
    if (synth) synth.cancel();
    stopAudio();
  }

  /* ========================================================
   * 音标发音（真人录音，本地文件，不依赖网络）
   *
   * 浏览器语音引擎无法朗读 IPA 符号本身，所以音标一律播放本地音素录音。
   * 音源：audio/phonemes/（KK 美式音标音素录音，按音标重命名后存放）。
   *
   * 三点说明：
   * 1. 大部分音标都有独立录音，点一下播一个文件，按录音原速播放。
   * 2. /eɪ/ /əʊ/ 和中央双元音 /ɪə/ /eə/ /ʊə/、以及 /tr/ /dr/ /ts/ /dz/
   *    没有独立录音，按组成音素依次连播。
   * 3. /ɒ/ 用 [ɑ] 的录音 —— 美音里 lot（/ɒ/）和 palm（/ɑː/）已合并成同一个音，
   *    KK 音标体系里没有单独的 /ɒ/。
   * ====================================================== */
  const IPA_AUDIO_DIR = 'audio/phonemes/';

  // 48 个音标 → 音素录音文件名（不含 .mp3，文件在 audio/phonemes/ 下）
  // 单文件直接播放；少数没有独立录音的组合音，按组成音素依次连播。
  const PHONEME_SEQUENCE = {
    // ---- 单元音 12 ----
    '/iː/': ['i'], '/ɪ/': ['ih'], '/e/': ['eh'], '/æ/': ['ae'],
    '/ɑː/': ['aa'], '/ʌ/': ['wedge'], '/ɒ/': ['aa'], '/ɔː/': ['oh'],
    '/ʊ/': ['uh'], '/uː/': ['u'], '/ɜː/': ['er'], '/ə/': ['schwa'],
    // ---- 双元音 8 ----
    // /aɪ/ /aʊ/ /ɔɪ/ 有独立录音，直接播放
    '/aɪ/': ['ai'], '/aʊ/': ['au'], '/ɔɪ/': ['oi'],
    // 其余按组成音素连播
    '/eɪ/': ['e', 'ih'], '/əʊ/': ['o', 'uh'],
    '/ɪə/': ['ih', 'schwar'], '/eə/': ['eh', 'schwar'], '/ʊə/': ['uh', 'schwar'],
    // ---- 爆破音 6 ----
    '/p/': ['p'], '/b/': ['b'], '/t/': ['t'], '/d/': ['d'],
    '/k/': ['k'], '/ɡ/': ['g'],
    // ---- 摩擦音 10 ----
    '/f/': ['f'], '/v/': ['v'], '/θ/': ['th'], '/ð/': ['dh'],
    '/s/': ['s'], '/z/': ['z'], '/ʃ/': ['sh'], '/ʒ/': ['zh'],
    '/h/': ['h'], '/r/': ['r'],
    // ---- 破擦音 6（tʃ dʒ 有独立录音，其余按组成音素连播）----
    '/tʃ/': ['ch'], '/dʒ/': ['dzh'], '/tr/': ['t', 'r'],
    '/dr/': ['d', 'r'], '/ts/': ['t', 's'], '/dz/': ['d', 'z'],
    // ---- 鼻音 3 + 舌侧音 1 + 半元音 2 ----
    '/m/': ['m'], '/n/': ['n'], '/ŋ/': ['ng'], '/l/': ['l'],
    '/j/': ['y'], '/w/': ['w']
  };

  // 26 个字母名称的真人录音，文件名就是小写字母（audio/letters/a.mp3 …）
  // 原文件是 2 秒、后段全是静音，已裁剪成 0.55~0.81 秒并统一峰值音量。
  const LETTER_AUDIO_DIR = 'audio/letters/';

  // 已创建过的音频对象，避免每次点击都重新加载。key 用文件相对路径。
  const audioCache = {};
  let activeAudio = null;
  let audioRunId = 0;

  function getAudio(src) {
    if (!audioCache[src]) {
      const a = new Audio(src);
      a.preload = 'auto';
      audioCache[src] = a;
    }
    return audioCache[src];
  }

  function stopAudio() {
    audioRunId++;
    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
      activeAudio = null;
    }
  }

  /**
   * 依次播放一串录音，按每段录音本身的时长自然衔接。
   * @param {string[]} clips 音频文件路径
   * @param {object}   opt   { onEach(index), gap 段间隔毫秒（默认 0） }
   */
  function playClips(clips, opt) {
    opt = opt || {};
    stopSpeak();
    const runId = audioRunId;

    function playAt(i) {
      if (runId !== audioRunId || i >= clips.length) { activeAudio = null; return; }
      const audio = getAudio(clips[i]);
      activeAudio = audio;
      audio.currentTime = 0;
      if (opt.onEach) opt.onEach(i);
      const next = () => {
        if (runId !== audioRunId) return;
        if (opt.gap) setTimeout(() => playAt(i + 1), opt.gap);
        else playAt(i + 1);
      };
      audio.onended = next;
      audio.onerror = () => {
        console.warn('录音加载失败：' + clips[i]);
        next();
      };
      const p = audio.play();
      if (p && p.catch) p.catch(() => { /* 需要用户先交互，再点一次即可 */ });
    }
    playAt(0);
  }

  /** 点击音标：只发这个音标本身的音 */
  function playPhoneme(item) {
    const tokens = PHONEME_SEQUENCE[item.symbol];
    if (!tokens || !tokens.length) {
      console.warn('没有配置音素序列：' + item.symbol);
      return;
    }
    playClips(tokens.map(t => IPA_AUDIO_DIR + t + '.mp3'));
  }

  /** 播放一个字母名称的录音（item 是 LETTERS 里的一项） */
  function playLetter(item) {
    playClips([LETTER_AUDIO_DIR + item.lower + '.mp3']);
  }

  /* ========================================================
   * 2. 导航切换
   * ====================================================== */
  const tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  const panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));

  function showPanel(name) {
    stopSpeak();
    // 离开字母歌面板时把视频暂停，避免声音在后台继续播放
    if (name !== 'song') pauseSong();
    tabs.forEach(t => t.classList.toggle('is-active', t.dataset.panel === name));
    panels.forEach(p => p.classList.toggle('is-active', p.id === 'panel-' + name));
    if (name === 'game' && !gameStarted) startGame();
    if (name === 'trace') redrawTrace();
  }

  tabs.forEach(t => t.addEventListener('click', () => showPanel(t.dataset.panel)));

  /* ========================================================
   * 3. 26 个字母
   * ====================================================== */
  const lettersGrid = document.getElementById('letters-grid');

  function wordButton(word) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'word-btn';
    b.innerHTML =
      '<span class="word-emoji">' + word.emoji + '</span>' +
      '<span class="word-en">' + word.w + '</span>' +
      '<span class="word-zh">' + word.zh + '</span>';
    b.addEventListener('click', e => {
      e.stopPropagation();
      speak(word.w, { rate: 0.75 });
    });
    return b;
  }

  function buildLetterCards() {
    LETTERS.forEach(item => {
      const card = document.createElement('article');
      card.className = 'card';
      card.dataset.letter = item.letter;

      // 字母区域：单独可点击，正常语速读一遍字母名称
      // 朗读文本统一用小写字母：浏览器系统语音朗读孤立的大写字母时，
      // 很多引擎会自动加上"capital"前缀（如读成"capital C"），
      // 而字母名称本身不区分大小写，用小写文本可以干净地只读出字母音。
      const head = document.createElement('button');
      head.type = 'button';
      head.className = 'card-letter';
      head.textContent = item.letter + item.lower;
      head.setAttribute('aria-label', '播放字母 ' + item.letter + ' 的读音');
      head.addEventListener('click', e => {
        e.stopPropagation();
        highlight(card);
        playLetter(item);
      });

      // 音标区域：单独可点击。字母的音标标的就是这个字母名称的读音，
      // 所以播放的是同一条字母录音（不用音素拼接，拼起来不像字母名）。
      const ipa = document.createElement('button');
      ipa.type = 'button';
      ipa.className = 'card-ipa';
      ipa.textContent = item.ipa;
      ipa.setAttribute('aria-label', '播放音标 ' + item.ipa + ' 的读音');
      ipa.addEventListener('click', e => {
        e.stopPropagation();
        highlight(card);
        playLetter(item);
      });

      const zh = document.createElement('div');
      zh.className = 'card-zh';
      zh.textContent = '读音像：' + item.nameZh;

      const stroke = document.createElement('div');
      stroke.className = 'card-stroke';
      stroke.innerHTML = '<b>怎么写：</b>' + item.stroke;

      const words = document.createElement('div');
      words.className = 'card-words';
      item.words.forEach(w => words.appendChild(wordButton(w)));

      const traceBtn = document.createElement('button');
      traceBtn.type = 'button';
      traceBtn.className = 'card-trace-link';
      traceBtn.textContent = '✏️ 去描红';
      traceBtn.addEventListener('click', e => {
        e.stopPropagation();
        gotoTrace('letter', item.letter);
      });

      card.appendChild(head);
      card.appendChild(ipa);
      card.appendChild(zh);
      card.appendChild(words);
      card.appendChild(stroke);
      card.appendChild(traceBtn);

      lettersGrid.appendChild(card);
    });
  }

  let highlightTimer = null;
  function highlight(el) {
    document.querySelectorAll('.card.is-speaking')
      .forEach(c => c.classList.remove('is-speaking'));
    el.classList.add('is-speaking');
    clearTimeout(highlightTimer);
    highlightTimer = setTimeout(() => el.classList.remove('is-speaking'), 1400);
  }

  document.getElementById('btn-read-alphabet').addEventListener('click', () => {
    // 从 A 读到 Z：依次播放 26 条字母录音，每读一个就高亮并滚到那张卡片
    playClips(
      LETTERS.map(l => LETTER_AUDIO_DIR + l.lower + '.mp3'),
      {
        gap: 250,
        onEach: (i) => {
          const card = lettersGrid.querySelector('[data-letter="' + LETTERS[i].letter + '"]');
          if (card) {
            highlight(card);
            card.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
        }
      }
    );
  });

  document.getElementById('btn-stop-alphabet').addEventListener('click', stopSpeak);

  /* ========================================================
   * 4. 音标卡片（元音 / 辅音）
   * ====================================================== */
  function buildPhoneticCard(item) {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.symbol = item.symbol;

    // 只有音标符号区域负责播放音标；点卡片空白、讲解或写法均不发音。
    const sym = document.createElement('button');
    sym.type = 'button';
    sym.className = 'card-symbol';
    sym.textContent = item.symbol;
    sym.setAttribute('aria-label', '播放音标 ' + item.symbol);
    sym.addEventListener('click', e => {
      e.stopPropagation();
      highlight(card);
      playPhoneme(item);
    });

    const hint = document.createElement('div');
    hint.className = 'card-hint';
    hint.textContent = item.hint;

    const mouth = document.createElement('div');
    mouth.className = 'card-mouth';
    mouth.textContent = item.mouth;

    const words = document.createElement('div');
    words.className = 'card-words';
    item.words.forEach(w => words.appendChild(wordButton(w)));

    const stroke = document.createElement('div');
    stroke.className = 'card-stroke';
    stroke.innerHTML = '<b>怎么写：</b>' + item.stroke;

    const traceBtn = document.createElement('button');
    traceBtn.type = 'button';
    traceBtn.className = 'card-trace-link';
    traceBtn.textContent = '✏️ 去描红';
    traceBtn.addEventListener('click', e => {
      e.stopPropagation();
      gotoTrace(item.type, item.symbol);
    });

    card.appendChild(sym);
    card.appendChild(hint);
    card.appendChild(mouth);
    card.appendChild(words);
    card.appendChild(stroke);
    card.appendChild(traceBtn);

    return card;
  }

  function buildPhoneticPanel(type, mountId) {
    const mount = document.getElementById(mountId);
    const list = PHONETICS.filter(p => p.type === type);
    const groups = [];
    list.forEach(p => {
      let g = groups.find(x => x.name === p.group);
      if (!g) { g = { name: p.group, items: [] }; groups.push(g); }
      g.items.push(p);
    });

    groups.forEach(g => {
      const block = document.createElement('section');
      block.className = 'group-block';

      const title = document.createElement('h3');
      title.className = 'group-title';
      title.textContent = g.name + '（' + g.items.length + ' 个）';

      const grid = document.createElement('div');
      grid.className = 'card-grid';
      g.items.forEach(item => grid.appendChild(buildPhoneticCard(item)));

      block.appendChild(title);
      block.appendChild(grid);
      mount.appendChild(block);
    });
  }

  /* ========================================================
   * 5. 描红练习
   * ====================================================== */
  const canvas = document.getElementById('trace-canvas');
  const ctx = canvas.getContext('2d');

  // 逻辑坐标系尺寸（描红范例、四线三格全部按这个坐标系计算，与屏幕分辨率无关）
  const LOGICAL_W = canvas.width;   // 900
  const LOGICAL_H = canvas.height;  // 300

  // 提升画布的物理像素分辨率，避免在手机等高分屏（Retina）上描红笔迹发虚。
  // 把画布缓冲区按设备像素比放大后，用 ctx.scale 把坐标系缩回逻辑单位，
  // 这样上面/下面所有绘制代码仍然按 LOGICAL_W × LOGICAL_H 计算，不用改动。
  (function setupHiDpiCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = LOGICAL_W * dpr;
    canvas.height = LOGICAL_H * dpr;
    ctx.scale(dpr, dpr);
  })();
  const traceItemsBox = document.getElementById('trace-items');
  const traceSymbolEl = document.getElementById('trace-symbol');
  const traceNameEl = document.getElementById('trace-name');
  const traceStrokeEl = document.getElementById('trace-stroke');
  const colorInput = document.getElementById('trace-color');
  const guideBtn = document.getElementById('btn-trace-guide');

  // 四线三格的位置
  const GRID = { top: 30, gap: 80, cells: 3 };
  const LINE_Y = [GRID.top, GRID.top + GRID.gap, GRID.top + GRID.gap * 2, GRID.top + GRID.gap * 3];
  const BASELINE = LINE_Y[2];      // 第三线，字母站的那条线

  let traceKind = 'letter';        // letter / vowel / consonant
  let traceCurrent = null;         // 当前选中的数据对象
  let showGuide = true;
  let strokes = [];                // 小朋友画的笔迹
  let drawing = false;

  function traceListOf(kind) {
    if (kind === 'letter') return LETTERS;
    return PHONETICS.filter(p => p.type === kind);
  }

  function keyOf(kind, item) {
    return kind === 'letter' ? item.letter : item.symbol;
  }

  function buildTraceChips() {
    traceItemsBox.innerHTML = '';
    traceListOf(traceKind).forEach(item => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip';
      chip.dataset.key = keyOf(traceKind, item);
      chip.textContent = traceKind === 'letter'
        ? item.letter + item.lower
        : item.symbol;
      chip.addEventListener('click', () => selectTrace(item));
      traceItemsBox.appendChild(chip);
    });
  }

  function selectTrace(item) {
    traceCurrent = item;
    const key = keyOf(traceKind, item);
    traceItemsBox.querySelectorAll('.chip')
      .forEach(c => c.classList.toggle('is-active', c.dataset.key === key));

    if (traceKind === 'letter') {
      traceSymbolEl.textContent = item.letter + item.lower;
      traceNameEl.textContent = '字母 ' + item.letter + item.lower + '　' + item.ipa;
      traceStrokeEl.textContent = item.stroke;
    } else {
      traceSymbolEl.textContent = item.symbol;
      traceNameEl.textContent = '音标 ' + item.symbol + '　' + item.hint;
      traceStrokeEl.textContent = item.stroke;
    }
    strokes = [];
    redrawTrace();
  }

  function gotoTrace(kind, key) {
    traceKind = kind;
    document.querySelectorAll('#trace-kind .chip')
      .forEach(c => c.classList.toggle('is-active', c.dataset.kind === kind));
    buildTraceChips();
    const item = traceListOf(kind).find(x => keyOf(kind, x) === key);
    if (item) selectTrace(item);
    showPanel('trace');
    document.getElementById('panel-trace').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.querySelectorAll('#trace-kind .chip').forEach(btn => {
    btn.addEventListener('click', () => {
      traceKind = btn.dataset.kind;
      document.querySelectorAll('#trace-kind .chip')
        .forEach(c => c.classList.toggle('is-active', c === btn));
      buildTraceChips();
      selectTrace(traceListOf(traceKind)[0]);
    });
  });

  /* ---- 画四线三格 ---- */
  function drawGuideLines() {
    ctx.save();
    ctx.fillStyle = '#fffdf8';
    ctx.fillRect(0, 0, LOGICAL_W, LOGICAL_H);

    // 三个练习格的分隔虚线
    ctx.strokeStyle = '#f0e2cd';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 8]);
    for (let i = 1; i < GRID.cells; i++) {
      const x = (LOGICAL_W / GRID.cells) * i;
      ctx.beginPath();
      ctx.moveTo(x, LINE_Y[0]);
      ctx.lineTo(x, LINE_Y[3]);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // 四条横线，第三线（基线）画粗一点
    LINE_Y.forEach((y, i) => {
      ctx.beginPath();
      ctx.strokeStyle = i === 2 ? '#f2a65a' : '#9fd0ef';
      ctx.lineWidth = i === 2 ? 4 : 2;
      if (i === 1) { ctx.setLineDash([10, 8]); } else { ctx.setLineDash([]); }
      ctx.moveTo(10, y);
      ctx.lineTo(LOGICAL_W - 10, y);
      ctx.stroke();
    });
    ctx.setLineDash([]);
    ctx.restore();
  }

  /** 按目标高度算出合适的字号 */
  function fontSizeFor(refText, targetAscent) {
    const base = 100;
    ctx.font = base + 'px ' + IPA_FONT;
    const m = ctx.measureText(refText);
    const asc = m.actualBoundingBoxAscent || base * 0.7;
    return base * (targetAscent / asc);
  }

  /** 得到当前要描的字形列表：[{ text, size }] */
  function templateGlyphs() {
    if (!traceCurrent) return [];
    if (traceKind === 'letter') {
      const upperSize = fontSizeFor(traceCurrent.letter, GRID.gap * 2 - 6);
      const lowerSize = fontSizeFor('x', GRID.gap - 6);
      return [
        { text: traceCurrent.letter, size: upperSize },
        { text: traceCurrent.lower, size: lowerSize }
      ];
    }
    const text = traceCurrent.symbol.replace(/\//g, '');
    let size = fontSizeFor(text, GRID.gap * 1.6);
    // 太宽的话缩小一点，保证一个格子放得下
    const cellW = LOGICAL_W / GRID.cells - 30;
    ctx.font = size + 'px ' + IPA_FONT;
    const w = ctx.measureText(text).width;
    if (w > cellW) size = size * (cellW / w);
    return [{ text: text, size: size }];
  }

  function drawTemplate() {
    const glyphs = templateGlyphs();
    if (!glyphs.length) return;
    const cellW = LOGICAL_W / GRID.cells;

    ctx.save();
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#e2dad0';

    for (let c = 0; c < GRID.cells; c++) {
      // 先量总宽度，好居中
      let total = 0;
      glyphs.forEach((g, i) => {
        ctx.font = g.size + 'px ' + IPA_FONT;
        total += ctx.measureText(g.text).width;
        if (i < glyphs.length - 1) total += 18;
      });
      let x = c * cellW + (cellW - total) / 2;
      glyphs.forEach((g, i) => {
        ctx.font = g.size + 'px ' + IPA_FONT;
        ctx.fillText(g.text, x, BASELINE);
        x += ctx.measureText(g.text).width + (i < glyphs.length - 1 ? 18 : 0);
      });
    }
    ctx.restore();
  }

  function drawStrokes() {
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    strokes.forEach(s => {
      if (s.points.length < 2) {
        // 单击也画一个小点
        const p = s.points[0];
        if (!p) return;
        ctx.beginPath();
        ctx.fillStyle = s.color;
        ctx.arc(p.x, p.y, s.width / 2, 0, Math.PI * 2);
        ctx.fill();
        return;
      }
      ctx.beginPath();
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width;
      ctx.moveTo(s.points[0].x, s.points[0].y);
      for (let i = 1; i < s.points.length; i++) {
        ctx.lineTo(s.points[i].x, s.points[i].y);
      }
      ctx.stroke();
    });
    ctx.restore();
  }

  function redrawTrace() {
    drawGuideLines();
    if (showGuide) drawTemplate();
    drawStrokes();
  }

  function pointOf(e) {
    const r = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (LOGICAL_W / r.width),
      y: (e.clientY - r.top) * (LOGICAL_H / r.height)
    };
  }

  canvas.addEventListener('pointerdown', e => {
    drawing = true;
    canvas.setPointerCapture(e.pointerId);
    strokes.push({ color: colorInput.value, width: 9, points: [pointOf(e)] });
    redrawTrace();
  });

  canvas.addEventListener('pointermove', e => {
    if (!drawing) return;
    strokes[strokes.length - 1].points.push(pointOf(e));
    redrawTrace();
  });

  ['pointerup', 'pointercancel', 'pointerleave'].forEach(type => {
    canvas.addEventListener(type, () => { drawing = false; });
  });

  document.getElementById('btn-trace-clear').addEventListener('click', () => {
    strokes = [];
    redrawTrace();
  });

  guideBtn.addEventListener('click', () => {
    showGuide = !showGuide;
    guideBtn.textContent = showGuide ? '👀 隐藏范例' : '👀 显示范例';
    redrawTrace();
  });

  document.getElementById('btn-trace-say').addEventListener('click', () => {
    if (!traceCurrent) return;
    if (traceKind === 'letter') {
      // 描红页只播当前字母的录音，不连读任何例词。
      playLetter(traceCurrent);
    } else {
      // 描红页只播放当前独立音标录音，不播放卡片中的例词。
      playPhoneme(traceCurrent);
    }
  });

  /* ========================================================
   * 6. 听音小游戏
   * ====================================================== */
  const gameOptions = document.getElementById('game-options');
  const gameQuestion = document.getElementById('game-question');
  const gameFeedback = document.getElementById('game-feedback');
  const nextBtn = document.getElementById('btn-game-next');
  const scoreRightEl = document.getElementById('score-right');
  const scoreWrongEl = document.getElementById('score-wrong');

  let gameMode = 'letter';
  let gameStarted = false;
  let current = null;   // { answerKey, play(), tip, reveal, options }
  let score = { right: 0, wrong: 0 };

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function pickQuestion() {
    if (gameMode === 'letter') {
      const pool = shuffle(LETTERS);
      const answer = pool[0];
      const options = shuffle(pool.slice(0, 4));
      return {
        answerKey: answer.letter,
        // 听字母用真人录音，跨浏览器读音一致
        play: () => playLetter(answer),
        tip: '刚刚读的是哪个字母呢？',
        reveal: '是 ' + answer.letter + answer.lower + '　' + answer.ipa,
        options: options.map(o => ({ key: o.letter, label: o.letter + o.lower }))
      };
    }
    const pool = shuffle(PHONETICS.filter(p => p.type === gameMode));
    const answer = pool[0];
    const word = answer.words[Math.floor(Math.random() * answer.words.length)];
    const options = shuffle(pool.slice(0, 4));
    return {
      answerKey: answer.symbol,
      // 元音/辅音题目读的是例词，例词没有录音，仍用语音合成
      play: () => speak(word.w, { rate: 0.7 }),
      tip: '<span class="q-emoji">' + word.emoji + '</span>这个词（' + word.zh +
        '）里面有哪个音标？',
      reveal: '答案是 ' + answer.symbol + '，' + word.w + '（' + word.zh + '）',
      options: options.map(o => ({ key: o.symbol, label: o.symbol }))
    };
  }

  function renderQuestion() {
    current = pickQuestion();
    gameQuestion.innerHTML = current.tip;
    gameFeedback.textContent = '\u00a0';
    gameFeedback.className = 'game-feedback';
    nextBtn.hidden = true;
    gameOptions.innerHTML = '';

    current.options.forEach(opt => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'option';
      b.textContent = opt.label;
      b.dataset.key = opt.key;
      b.addEventListener('click', () => answerClicked(b, opt.key));
      gameOptions.appendChild(b);
    });

    playCurrent();
  }

  function playCurrent() {
    if (current && current.play) current.play();
  }

  function answerClicked(btn, key) {
    const buttons = Array.prototype.slice.call(gameOptions.querySelectorAll('.option'));
    if (buttons.some(b => b.disabled)) return;   // 已经答过了
    buttons.forEach(b => { b.disabled = true; });

    if (key === current.answerKey) {
      btn.classList.add('is-right');
      score.right++;
      gameFeedback.textContent = '🎉 太棒了！' + current.reveal;
      gameFeedback.className = 'game-feedback ok';
    } else {
      btn.classList.add('is-wrong');
      buttons.forEach(b => {
        if (b.dataset.key === current.answerKey) b.classList.add('is-right');
      });
      score.wrong++;
      gameFeedback.textContent = '😊 再试试看！' + current.reveal;
      gameFeedback.className = 'game-feedback no';
    }
    scoreRightEl.textContent = score.right;
    scoreWrongEl.textContent = score.wrong;
    nextBtn.hidden = false;
  }

  function startGame() {
    gameStarted = true;
    renderQuestion();
  }

  document.querySelectorAll('#game-mode .chip').forEach(btn => {
    btn.addEventListener('click', () => {
      gameMode = btn.dataset.mode;
      document.querySelectorAll('#game-mode .chip')
        .forEach(c => c.classList.toggle('is-active', c === btn));
      renderQuestion();
    });
  });

  document.getElementById('btn-game-play').addEventListener('click', playCurrent);
  nextBtn.addEventListener('click', renderQuestion);
  document.getElementById('btn-score-reset').addEventListener('click', () => {
    score = { right: 0, wrong: 0 };
    scoreRightEl.textContent = '0';
    scoreWrongEl.textContent = '0';
    renderQuestion();
  });

  /* ========================================================
   * 6.5 字母歌视频
   * 视频文件：audio/songs/ABC_The_Alphabet_Song.mp4
   * ====================================================== */
  const songVideo = document.getElementById('song-video');

  /** 暂停字母歌（切换面板 / 开始朗读时调用） */
  function pauseSong() {
    if (songVideo && !songVideo.paused) songVideo.pause();
  }

  if (songVideo) {
    const songPlayBtn = document.getElementById('btn-song-play');
    const songRestartBtn = document.getElementById('btn-song-restart');
    const songRateSel = document.getElementById('song-rate');

    // 视频开始播放时，把字母/音标录音和朗读都停掉，避免两个声音打架
    songVideo.addEventListener('play', stopSpeak);

    songPlayBtn.addEventListener('click', () => {
      if (songVideo.paused) {
        const p = songVideo.play();
        if (p && p.catch) p.catch(() => { /* 需要用户交互，再点一次即可 */ });
      } else {
        songVideo.pause();
      }
    });

    songRestartBtn.addEventListener('click', () => {
      songVideo.currentTime = 0;
      const p = songVideo.play();
      if (p && p.catch) p.catch(() => { });
    });

    songRateSel.addEventListener('change', () => {
      songVideo.playbackRate = parseFloat(songRateSel.value) || 1;
    });

    songVideo.addEventListener('error', () => {
      console.warn('字母歌视频加载失败：audio/songs/ABC_The_Alphabet_Song.mp4');
    });

    // 切到后台（锁屏、切 App）时自动暂停
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pauseSong();
    });
  }

  /* ========================================================
   * 7. 启动
   * ====================================================== */
  buildLetterCards();
  buildPhoneticPanel('vowel', 'vowels-groups');
  buildPhoneticPanel('consonant', 'consonants-groups');
  buildTraceChips();
  selectTrace(LETTERS[0]);

  // 页面第一次被点击时"唤醒"语音引擎（部分浏览器要求用户先交互）
  document.addEventListener('click', function warmUp() {
    if (synth) { pickVoice(); }
    document.removeEventListener('click', warmUp);
  }, { once: true });
})();
