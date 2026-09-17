/**
 * 数据文件：26 个字母 + 48 个国际音标
 * 所有内容面向零基础的小学低年级学生，中文提示只是"像什么声音"的近似说法，
 * 真正的发音请点卡片上的喇叭听读。
 */

/* ============================================================
 * 一、26 个字母
 *   letter  : 大写字母
 *   lower   : 小写字母
 *   ipa     : 字母名称的音标
 *   nameZh  : 字母名称的中文谐音（帮助记住怎么念）
 *   stroke  : 四线三格里的写法提示
 *   words   : 以这个字母开头的例词
 * ============================================================ */
const LETTERS = [
  {
    letter: 'A', lower: 'a', ipa: '/eɪ/', nameZh: '诶（ei）',
    stroke: '大写 A：先写左斜「\\」，再写右斜「/」，中间加一横，住上面两格。小写 a：先画一个小圆圈，右边加一竖，住在中间格。',
    words: [{ w: 'apple', zh: '苹果', emoji: '🍎' }, { w: 'ant', zh: '蚂蚁', emoji: '🐜' }]
  },
  {
    letter: 'B', lower: 'b', ipa: '/biː/', nameZh: '毕（bi）',
    stroke: '大写 B：一竖，再在右边画上下两个小肚子，住上面两格。小写 b：先写一长竖（顶到第一线），右下方画一个小肚子。',
    words: [{ w: 'bear', zh: '小熊', emoji: '🐻' }, { w: 'ball', zh: '皮球', emoji: '⚽' }]
  },
  {
    letter: 'C', lower: 'c', ipa: '/siː/', nameZh: '西（si）',
    stroke: '大写 C：像一个开口朝右的月牙，从右上起笔往左绕。小写 c：一样的月牙，缩小住在中间格。',
    words: [{ w: 'cat', zh: '小猫', emoji: '🐱' }, { w: 'cake', zh: '蛋糕', emoji: '🎂' }]
  },
  {
    letter: 'D', lower: 'd', ipa: '/diː/', nameZh: '滴（di）',
    stroke: '大写 D：先一竖，再从上到下画一个大肚子。小写 d：先画一个小圆圈，右边加一长竖（顶到第一线）。',
    words: [{ w: 'dog', zh: '小狗', emoji: '🐶' }, { w: 'duck', zh: '小鸭', emoji: '🦆' }]
  },
  {
    letter: 'E', lower: 'e', ipa: '/iː/', nameZh: '衣（i）',
    stroke: '大写 E：一竖加上、中、下三横，像一把小梳子。小写 e：从中间的横线起笔，向左绕一圈。',
    words: [{ w: 'egg', zh: '鸡蛋', emoji: '🥚' }, { w: 'elephant', zh: '大象', emoji: '🐘' }]
  },
  {
    letter: 'F', lower: 'f', ipa: '/ef/', nameZh: '爱抚（ef）',
    stroke: '大写 F：一竖加上面和中间两横。小写 f：先画一条向左弯的钩线（顶到第一线），再加一小横。',
    words: [{ w: 'fish', zh: '小鱼', emoji: '🐟' }, { w: 'flower', zh: '花', emoji: '🌸' }]
  },
  {
    letter: 'G', lower: 'g', ipa: '/dʒiː/', nameZh: '基（ji）',
    stroke: '大写 G：先画月牙 C，再在右边加一小横。小写 g：先画小圆圈，右边一竖伸到第四线，尾巴向左弯。',
    words: [{ w: 'girl', zh: '女孩', emoji: '👧' }, { w: 'goat', zh: '山羊', emoji: '🐐' }]
  },
  {
    letter: 'H', lower: 'h', ipa: '/eɪtʃ/', nameZh: '诶取（eich）',
    stroke: '大写 H：左右各一竖，中间加一横，像小梯子。小写 h：先一长竖（顶到第一线），右边加一个小拱门。',
    words: [{ w: 'hat', zh: '帽子', emoji: '🧢' }, { w: 'hand', zh: '手', emoji: '✋' }]
  },
  {
    letter: 'I', lower: 'i', ipa: '/aɪ/', nameZh: '爱（ai）',
    stroke: '大写 I：上下各一横，中间一竖，像小板凳。小写 i：先一短竖，再在上面点一点。',
    words: [{ w: 'ice', zh: '冰', emoji: '🧊' }, { w: 'ink', zh: '墨水', emoji: '🖋️' }]
  },
  {
    letter: 'J', lower: 'j', ipa: '/dʒeɪ/', nameZh: '这诶（jei）',
    stroke: '大写 J：一竖到下面向左弯个钩，像小拐棍。小写 j：先一竖伸到第四线并向左弯钩，再在上面点一点。',
    words: [{ w: 'juice', zh: '果汁', emoji: '🧃' }, { w: 'jump', zh: '跳', emoji: '🤸' }]
  },
  {
    letter: 'K', lower: 'k', ipa: '/keɪ/', nameZh: '开（kei）',
    stroke: '大写 K：一竖，右边加一个「＜」反过来的小尖角。小写 k：一长竖（顶到第一线），右边加小尖角。',
    words: [{ w: 'kite', zh: '风筝', emoji: '🪁' }, { w: 'key', zh: '钥匙', emoji: '🔑' }]
  },
  {
    letter: 'L', lower: 'l', ipa: '/el/', nameZh: '爱鲁（el）',
    stroke: '大写 L：一竖到底再向右一横，像一个直角。小写 l：就是一条长长的竖线，顶到第一线。',
    words: [{ w: 'lion', zh: '狮子', emoji: '🦁' }, { w: 'leaf', zh: '叶子', emoji: '🍃' }]
  },
  {
    letter: 'M', lower: 'm', ipa: '/em/', nameZh: '爱姆（em）',
    stroke: '大写 M：两竖中间加一个尖尖的「V」，像两座小山。小写 m：一竖加两个小拱门，住在中间格。',
    words: [{ w: 'moon', zh: '月亮', emoji: '🌙' }, { w: 'milk', zh: '牛奶', emoji: '🥛' }]
  },
  {
    letter: 'N', lower: 'n', ipa: '/en/', nameZh: '爱恩（en）',
    stroke: '大写 N：左右两竖，中间加一条斜线。小写 n：一竖加一个小拱门，住在中间格。',
    words: [{ w: 'nose', zh: '鼻子', emoji: '👃' }, { w: 'nine', zh: '九', emoji: '9️⃣' }]
  },
  {
    letter: 'O', lower: 'o', ipa: '/əʊ/', nameZh: '欧（ou）',
    stroke: '大写 O：一个大圆圈，一笔画完不要断开。小写 o：一个小圆圈，住在中间格。',
    words: [{ w: 'orange', zh: '橙子', emoji: '🍊' }, { w: 'owl', zh: '猫头鹰', emoji: '🦉' }]
  },
  {
    letter: 'P', lower: 'p', ipa: '/piː/', nameZh: '披（pi）',
    stroke: '大写 P：一竖，上面右边画一个小肚子。小写 p：一竖伸到第四线，右上方画一个小肚子。',
    words: [{ w: 'pig', zh: '小猪', emoji: '🐷' }, { w: 'pen', zh: '钢笔', emoji: '🖊️' }]
  },
  {
    letter: 'Q', lower: 'q', ipa: '/kjuː/', nameZh: '克优（kiu）',
    stroke: '大写 Q：先画大圆圈，右下加一条小尾巴。小写 q：先画小圆圈，右边一竖伸到第四线。',
    words: [{ w: 'queen', zh: '王后', emoji: '👑' }, { w: 'quilt', zh: '被子', emoji: '🛏️' }]
  },
  {
    letter: 'R', lower: 'r', ipa: '/ɑː(r)/', nameZh: '啊（ar）',
    stroke: '大写 R：像 P 加一条向右下的小腿。小写 r：一竖，右上角伸出一小段像小旗子。',
    words: [{ w: 'rabbit', zh: '兔子', emoji: '🐰' }, { w: 'rain', zh: '雨', emoji: '🌧️' }]
  },
  {
    letter: 'S', lower: 's', ipa: '/es/', nameZh: '爱斯（es）',
    stroke: '大写 S：像一条小蛇，上下各绕一个弯。小写 s：一样的小蛇，缩小住在中间格。',
    words: [{ w: 'sun', zh: '太阳', emoji: '☀️' }, { w: 'star', zh: '星星', emoji: '⭐' }]
  },
  {
    letter: 'T', lower: 't', ipa: '/tiː/', nameZh: '题（ti）',
    stroke: '大写 T：先一横再一竖，像小雨伞。小写 t：先一竖（比一半高一点）再加一小横。',
    words: [{ w: 'tiger', zh: '老虎', emoji: '🐯' }, { w: 'tree', zh: '大树', emoji: '🌳' }]
  },
  {
    letter: 'U', lower: 'u', ipa: '/juː/', nameZh: '优（iu）',
    stroke: '大写 U：像一个大杯子，左竖下去绕上来。小写 u：小杯子加一竖，住在中间格。',
    words: [{ w: 'umbrella', zh: '雨伞', emoji: '☂️' }, { w: 'up', zh: '向上', emoji: '⬆️' }]
  },
  {
    letter: 'V', lower: 'v', ipa: '/viː/', nameZh: '维（vi）',
    stroke: '大写 V：先左斜再右斜，像一个尖尖的小碗。小写 v：一样的写法，住在中间格。',
    words: [{ w: 'van', zh: '面包车', emoji: '🚐' }, { w: 'violin', zh: '小提琴', emoji: '🎻' }]
  },
  {
    letter: 'W', lower: 'w', ipa: '/ˈdʌbljuː/', nameZh: '大布留（dabliu）',
    stroke: '大写 W：两个 V 手拉手，像小波浪。小写 w：一样的写法，住在中间格。',
    words: [{ w: 'water', zh: '水', emoji: '💧' }, { w: 'window', zh: '窗户', emoji: '🪟' }]
  },
  {
    letter: 'X', lower: 'x', ipa: '/eks/', nameZh: '爱克斯（eks）',
    stroke: '大写 X：一条右斜加一条左斜，交叉在中间。小写 x：一样的交叉，住在中间格。',
    words: [{ w: 'box', zh: '盒子', emoji: '📦' }, { w: 'fox', zh: '狐狸', emoji: '🦊' }]
  },
  {
    letter: 'Y', lower: 'y', ipa: '/waɪ/', nameZh: '外（uai）',
    stroke: '大写 Y：上面一个小「V」，下面接一竖。小写 y：先左斜再右斜，右边那笔伸到第四线。',
    words: [{ w: 'yellow', zh: '黄色', emoji: '💛' }, { w: 'yo-yo', zh: '溜溜球', emoji: '🪀' }]
  },
  {
    letter: 'Z', lower: 'z', ipa: '/zed/  /ziː/', nameZh: '在得（zed）／贼（zi）',
    stroke: '大写 Z：上一横、中间斜下、下一横，像小闪电。小写 z：一样的写法，住在中间格。',
    words: [{ w: 'zoo', zh: '动物园', emoji: '🦁' }, { w: 'zebra', zh: '斑马', emoji: '🦓' }]
  }
];

/* ============================================================
 * 二、48 个国际音标
 *   symbol : 音标
 *   type   : vowel（元音）/ consonant（辅音）
 *   group  : 分类名称
 *   hint   : 中文近似提示（只是"像什么"，不是标准发音）
 *   mouth  : 嘴巴、舌头怎么摆
 *   stroke : 写法提示
 *   words  : 含这个音的例词
 * ============================================================ */
const PHONETICS = [
  /* ---------- 元音：单元音 12 个 ---------- */
  {
    symbol: '/iː/', type: 'vowel', group: '单元音（长音）',
    hint: '像汉语「衣」，要拉长：衣——',
    mouth: '嘴角向两边拉开，像在笑，舌头往前顶。',
    stroke: '先写一个小写 i（一竖加一点），右边再加长音号 ː（上下两个点）。',
    words: [{ w: 'bee', zh: '蜜蜂', emoji: '🐝' }, { w: 'tree', zh: '大树', emoji: '🌳' }, { w: 'green', zh: '绿色', emoji: '💚' }]
  },
  {
    symbol: '/ɪ/', type: 'vowel', group: '单元音（短音）',
    hint: '像很短很轻的「衣」：衣！',
    mouth: '嘴巴微微张开，放松，声音短短的。',
    stroke: '像变小的大写 I：上下各一小横，中间一竖。',
    words: [{ w: 'fish', zh: '小鱼', emoji: '🐟' }, { w: 'big', zh: '大的', emoji: '🐘' }, { w: 'sit', zh: '坐下', emoji: '🪑' }]
  },
  {
    symbol: '/e/', type: 'vowel', group: '单元音（短音）',
    hint: '像「诶」，嘴巴扁扁的',
    mouth: '嘴巴张开一点点，舌头放平，声音短。',
    stroke: '就是小写字母 e：从中间横线起笔，向左绕一圈。',
    words: [{ w: 'egg', zh: '鸡蛋', emoji: '🥚' }, { w: 'bed', zh: '小床', emoji: '🛏️' }, { w: 'red', zh: '红色', emoji: '❤️' }]
  },
  {
    symbol: '/æ/', type: 'vowel', group: '单元音（短音）',
    hint: '嘴巴张大，像要咬苹果：ae——',
    mouth: '嘴巴左右拉开又张大，下巴往下掉。',
    stroke: 'a 和 e 手拉手连在一起写。',
    words: [{ w: 'apple', zh: '苹果', emoji: '🍎' }, { w: 'cat', zh: '小猫', emoji: '🐱' }, { w: 'bag', zh: '书包', emoji: '🎒' }]
  },
  {
    symbol: '/ɑː/', type: 'vowel', group: '单元音（长音）',
    hint: '像看医生说「啊——」',
    mouth: '嘴巴张到最大，舌头往后放，声音拉长。',
    stroke: '写一个不带小尾巴的 a（圆肚子加一竖），再加长音号 ː。',
    words: [{ w: 'car', zh: '小汽车', emoji: '🚗' }, { w: 'arm', zh: '胳膊', emoji: '💪' }, { w: 'father', zh: '爸爸', emoji: '👨' }]
  },
  {
    symbol: '/ʌ/', type: 'vowel', group: '单元音（短音）',
    hint: '像很短的「啊」：啊！',
    mouth: '嘴巴半张，舌头放中间，声音又短又有力。',
    stroke: '像倒过来的 v，一个尖尖的小屋顶。',
    words: [{ w: 'cup', zh: '杯子', emoji: '🥤' }, { w: 'sun', zh: '太阳', emoji: '☀️' }, { w: 'duck', zh: '小鸭', emoji: '🦆' }]
  },
  {
    symbol: '/ɒ/', type: 'vowel', group: '单元音（短音）',
    hint: '圆圆的嘴说「哦」，很短',
    mouth: '嘴唇圆圆的，嘴巴张开，声音短。',
    stroke: '像圆圆的 o，左上方多一条小竖弯（倒过来的 a）。',
    words: [{ w: 'dog', zh: '小狗', emoji: '🐶' }, { w: 'box', zh: '盒子', emoji: '📦' }, { w: 'hot', zh: '热的', emoji: '🔥' }]
  },
  {
    symbol: '/ɔː/', type: 'vowel', group: '单元音（长音）',
    hint: '圆嘴说「哦——」，要拉长',
    mouth: '嘴唇收成小圆圈，往前嘟，声音拉长。',
    stroke: '像反过来的 c（开口朝右），再加长音号 ː。',
    words: [{ w: 'ball', zh: '皮球', emoji: '⚽' }, { w: 'door', zh: '门', emoji: '🚪' }, { w: 'four', zh: '四', emoji: '4️⃣' }]
  },
  {
    symbol: '/ʊ/', type: 'vowel', group: '单元音（短音）',
    hint: '像很短的「乌」：乌！',
    mouth: '嘴唇嘟成小圈但不用力，声音短短的。',
    stroke: '像一个开口朝上的小马蹄（变小的大写 U）。',
    words: [{ w: 'book', zh: '书', emoji: '📖' }, { w: 'foot', zh: '脚', emoji: '🦶' }, { w: 'good', zh: '好的', emoji: '👍' }]
  },
  {
    symbol: '/uː/', type: 'vowel', group: '单元音（长音）',
    hint: '像「乌——」，嘴巴嘟起来拉长',
    mouth: '嘴唇嘟成小圆圈往前伸，像小喇叭。',
    stroke: '写一个小写 u，右边加长音号 ː。',
    words: [{ w: 'moon', zh: '月亮', emoji: '🌙' }, { w: 'food', zh: '食物', emoji: '🍚' }, { w: 'blue', zh: '蓝色', emoji: '💙' }]
  },
  {
    symbol: '/ɜː/', type: 'vowel', group: '单元音（长音）',
    hint: '像「额——」，舌头卷一点',
    mouth: '嘴巴微开不动，舌头放平往中间，声音拉长。',
    stroke: '像反过来的数字 3，再加长音号 ː。',
    words: [{ w: 'bird', zh: '小鸟', emoji: '🐦' }, { w: 'girl', zh: '女孩', emoji: '👧' }, { w: 'nurse', zh: '护士', emoji: '👩‍⚕️' }]
  },
  {
    symbol: '/ə/', type: 'vowel', group: '单元音（短音）',
    hint: '轻轻的「额」，最短最轻',
    mouth: '嘴巴放松微微张开，声音轻得像叹气。',
    stroke: '把小写 e 上下翻过来写（倒过来的 e）。',
    words: [{ w: 'banana', zh: '香蕉', emoji: '🍌' }, { w: 'sofa', zh: '沙发', emoji: '🛋️' }, { w: 'teacher', zh: '老师', emoji: '👩‍🏫' }]
  },

  /* ---------- 元音：双元音 8 个 ---------- */
  {
    symbol: '/eɪ/', type: 'vowel', group: '双元音（两个音滑过去）',
    hint: '从「诶」滑到「衣」：诶—衣',
    mouth: '先张开嘴，再慢慢把嘴角拉向两边。',
    stroke: '先写 e，再写 ɪ，两个连在一起。',
    words: [{ w: 'cake', zh: '蛋糕', emoji: '🎂' }, { w: 'name', zh: '名字', emoji: '📛' }, { w: 'rain', zh: '雨', emoji: '🌧️' }]
  },
  {
    symbol: '/aɪ/', type: 'vowel', group: '双元音（两个音滑过去）',
    hint: '从「啊」滑到「衣」：啊—衣（像"爱"）',
    mouth: '先把嘴巴张大，再收小往两边拉。',
    stroke: '先写不带尾巴的 a，再写 ɪ。',
    words: [{ w: 'bike', zh: '自行车', emoji: '🚲' }, { w: 'kite', zh: '风筝', emoji: '🪁' }, { w: 'ice', zh: '冰', emoji: '🧊' }]
  },
  {
    symbol: '/ɔɪ/', type: 'vowel', group: '双元音（两个音滑过去）',
    hint: '从「哦」滑到「衣」：哦—衣',
    mouth: '先圆嘴，再把嘴角拉开。',
    stroke: '先写 ɔ（反过来的 c），再写 ɪ。',
    words: [{ w: 'boy', zh: '男孩', emoji: '👦' }, { w: 'toy', zh: '玩具', emoji: '🧸' }, { w: 'coin', zh: '硬币', emoji: '🪙' }]
  },
  {
    symbol: '/əʊ/', type: 'vowel', group: '双元音（两个音滑过去）',
    hint: '从「欧」滑到「乌」：欧—乌',
    mouth: '先半张嘴，再慢慢把嘴唇嘟圆。',
    stroke: '先写倒过来的 e（ə），再写 ʊ。',
    words: [{ w: 'nose', zh: '鼻子', emoji: '👃' }, { w: 'boat', zh: '小船', emoji: '⛵' }, { w: 'home', zh: '家', emoji: '🏠' }]
  },
  {
    symbol: '/aʊ/', type: 'vowel', group: '双元音（两个音滑过去）',
    hint: '从「啊」滑到「乌」：啊—乌',
    mouth: '嘴巴先张大，再收成小圆圈。',
    stroke: '先写 a，再写 ʊ。',
    words: [{ w: 'cow', zh: '奶牛', emoji: '🐮' }, { w: 'mouth', zh: '嘴巴', emoji: '👄' }, { w: 'house', zh: '房子', emoji: '🏡' }]
  },
  {
    symbol: '/ɪə/', type: 'vowel', group: '双元音（两个音滑过去）',
    hint: '从「衣」滑到「额」：衣—额',
    mouth: '先微笑的嘴形，再放松变松。',
    stroke: '先写 ɪ，再写倒过来的 e。',
    words: [{ w: 'ear', zh: '耳朵', emoji: '👂' }, { w: 'deer', zh: '小鹿', emoji: '🦌' }, { w: 'here', zh: '这里', emoji: '📍' }]
  },
  {
    symbol: '/eə/', type: 'vowel', group: '双元音（两个音滑过去）',
    hint: '从「诶」滑到「额」：诶—额',
    mouth: '嘴巴张开一点，再放松滑过去。',
    stroke: '先写 e，再写倒过来的 e。',
    words: [{ w: 'chair', zh: '椅子', emoji: '🪑' }, { w: 'bear', zh: '小熊', emoji: '🐻' }, { w: 'hair', zh: '头发', emoji: '💇' }]
  },
  {
    symbol: '/ʊə/', type: 'vowel', group: '双元音（两个音滑过去）',
    hint: '从「乌」滑到「额」：乌—额',
    mouth: '先把嘴唇嘟圆，再放松张开。',
    stroke: '先写 ʊ，再写倒过来的 e。',
    words: [{ w: 'tourist', zh: '游客', emoji: '🧳' }, { w: 'sure', zh: '当然', emoji: '👌' }, { w: 'poor', zh: '贫穷的', emoji: '🥲' }]
  },

  /* ---------- 辅音：爆破音 6 个 ---------- */
  {
    symbol: '/p/', type: 'consonant', group: '爆破音（像小气球爆开）',
    hint: '像吹蜡烛「噗」，不出声只出气',
    mouth: '双唇闭紧，憋一下气再突然放开。',
    stroke: '就是小写 p：一竖伸到第四线，右上画一个小肚子。',
    words: [{ w: 'pig', zh: '小猪', emoji: '🐷' }, { w: 'pen', zh: '钢笔', emoji: '🖊️' }, { w: 'panda', zh: '熊猫', emoji: '🐼' }]
  },
  {
    symbol: '/b/', type: 'consonant', group: '爆破音（像小气球爆开）',
    hint: '和 /p/ 一样的嘴形，但要出声「布」',
    mouth: '双唇闭紧后放开，喉咙要振动（摸一摸喉咙有抖动）。',
    stroke: '就是小写 b：一长竖，右下画一个小肚子。',
    words: [{ w: 'bag', zh: '书包', emoji: '🎒' }, { w: 'book', zh: '书', emoji: '📖' }, { w: 'bus', zh: '公交车', emoji: '🚌' }]
  },
  {
    symbol: '/t/', type: 'consonant', group: '爆破音（像小气球爆开）',
    hint: '舌尖顶住上牙床，弹开出气「特」',
    mouth: '舌尖轻碰上牙后面，突然放开，不出声。',
    stroke: '就是小写 t：一竖加一小横。',
    words: [{ w: 'ten', zh: '十', emoji: '🔟' }, { w: 'table', zh: '桌子', emoji: '🪑' }, { w: 'cat', zh: '小猫', emoji: '🐱' }]
  },
  {
    symbol: '/d/', type: 'consonant', group: '爆破音（像小气球爆开）',
    hint: '和 /t/ 一样的嘴形，但要出声「的」',
    mouth: '舌尖顶上牙床后弹开，喉咙振动。',
    stroke: '就是小写 d：小圆圈加右边一长竖。',
    words: [{ w: 'dog', zh: '小狗', emoji: '🐶' }, { w: 'desk', zh: '书桌', emoji: '🪑' }, { w: 'duck', zh: '小鸭', emoji: '🦆' }]
  },
  {
    symbol: '/k/', type: 'consonant', group: '爆破音（像小气球爆开）',
    hint: '喉咙后面轻轻「克」，只出气',
    mouth: '舌头后部抬起碰住上面，再放开出气。',
    stroke: '就是小写 k：一长竖，右边加小尖角。',
    words: [{ w: 'cat', zh: '小猫', emoji: '🐱' }, { w: 'key', zh: '钥匙', emoji: '🔑' }, { w: 'cake', zh: '蛋糕', emoji: '🎂' }]
  },
  {
    symbol: '/ɡ/', type: 'consonant', group: '爆破音（像小气球爆开）',
    hint: '和 /k/ 一样的嘴形，但要出声「哥」',
    mouth: '舌根抬起碰住再放开，喉咙振动。',
    stroke: '单层的 g：一个小圆圈加一条向左弯的尾巴。',
    words: [{ w: 'girl', zh: '女孩', emoji: '👧' }, { w: 'goat', zh: '山羊', emoji: '🐐' }, { w: 'bag', zh: '书包', emoji: '🎒' }]
  },

  /* ---------- 辅音：摩擦音 10 个 ---------- */
  {
    symbol: '/f/', type: 'consonant', group: '摩擦音（像漏气的声音）',
    hint: '上牙轻咬下嘴唇吹气「呼」',
    mouth: '上门牙轻轻放在下唇上，从缝里吹气，不出声。',
    stroke: '就是小写 f：一条向左弯的钩线加一小横。',
    words: [{ w: 'fish', zh: '小鱼', emoji: '🐟' }, { w: 'five', zh: '五', emoji: '5️⃣' }, { w: 'family', zh: '家人', emoji: '👨‍👩‍👧' }]
  },
  {
    symbol: '/v/', type: 'consonant', group: '摩擦音（像漏气的声音）',
    hint: '和 /f/ 一样咬唇，但要出声，嘴唇会痒痒',
    mouth: '上牙咬下唇，出声送气，喉咙振动。',
    stroke: '就是小写 v：一个尖尖的小碗。',
    words: [{ w: 'van', zh: '面包车', emoji: '🚐' }, { w: 'seven', zh: '七', emoji: '7️⃣' }, { w: 'love', zh: '爱', emoji: '❤️' }]
  },
  {
    symbol: '/θ/', type: 'consonant', group: '摩擦音（像漏气的声音）',
    hint: '舌尖放在上下牙中间吹气：丝——（不出声）',
    mouth: '舌尖轻轻伸到两排牙齿之间，从缝里吹气。',
    stroke: '一个椭圆圈，中间加一横（像蛋里插一根小棒）。',
    words: [{ w: 'three', zh: '三', emoji: '3️⃣' }, { w: 'thank', zh: '谢谢', emoji: '🙏' }, { w: 'mouth', zh: '嘴巴', emoji: '👄' }]
  },
  {
    symbol: '/ð/', type: 'consonant', group: '摩擦音（像漏气的声音）',
    hint: '和 /θ/ 一样咬舌，但要出声，舌头会痒痒',
    mouth: '舌尖伸到牙缝间出声，喉咙振动。',
    stroke: '像小写 d，把上面那一竖弯过来再加一小横穿过去。',
    words: [{ w: 'this', zh: '这个', emoji: '👉' }, { w: 'mother', zh: '妈妈', emoji: '👩' }, { w: 'father', zh: '爸爸', emoji: '👨' }]
  },
  {
    symbol: '/s/', type: 'consonant', group: '摩擦音（像漏气的声音）',
    hint: '像小蛇「丝——」，不出声',
    mouth: '牙齿快合上，舌尖靠近上牙床，气从中间出来。',
    stroke: '就是小写 s：一条小蛇形。',
    words: [{ w: 'sun', zh: '太阳', emoji: '☀️' }, { w: 'six', zh: '六', emoji: '6️⃣' }, { w: 'snake', zh: '蛇', emoji: '🐍' }]
  },
  {
    symbol: '/z/', type: 'consonant', group: '摩擦音（像漏气的声音）',
    hint: '像小蜜蜂「兹——」，要出声',
    mouth: '和 /s/ 一样的口型，但喉咙要振动。',
    stroke: '就是小写 z：上一横、中间斜下、下一横。',
    words: [{ w: 'zoo', zh: '动物园', emoji: '🦁' }, { w: 'zero', zh: '零', emoji: '0️⃣' }, { w: 'zebra', zh: '斑马', emoji: '🦓' }]
  },
  {
    symbol: '/ʃ/', type: 'consonant', group: '摩擦音（像漏气的声音）',
    hint: '像让别人安静「嘘——」',
    mouth: '嘴唇嘟一点向前，舌头抬高，长长地送气。',
    stroke: '一条上下都带弯钩的长曲线（像拉长的 f 没有横）。',
    words: [{ w: 'sheep', zh: '绵羊', emoji: '🐑' }, { w: 'ship', zh: '轮船', emoji: '🚢' }, { w: 'fish', zh: '小鱼', emoji: '🐟' }]
  },
  {
    symbol: '/ʒ/', type: 'consonant', group: '摩擦音（像漏气的声音）',
    hint: '和 /ʃ/ 一样的嘴形，但要出声「日」',
    mouth: '嘟嘴送气并让喉咙振动。',
    stroke: '像数字 3 反过来，下面拖一条小尾巴。',
    words: [{ w: 'television', zh: '电视', emoji: '📺' }, { w: 'usually', zh: '通常', emoji: '🕐' }, { w: 'vision', zh: '视力', emoji: '👀' }]
  },
  {
    symbol: '/h/', type: 'consonant', group: '摩擦音（像漏气的声音）',
    hint: '像对手心哈气「哈」',
    mouth: '嘴巴张开，轻轻呼出一口气，不用舌头。',
    stroke: '就是小写 h：一长竖加一个小拱门。',
    words: [{ w: 'hat', zh: '帽子', emoji: '🧢' }, { w: 'hand', zh: '手', emoji: '✋' }, { w: 'house', zh: '房子', emoji: '🏡' }]
  },
  {
    symbol: '/r/', type: 'consonant', group: '摩擦音（像漏气的声音）',
    hint: '舌头卷起来但不碰到嘴，像「日」',
    mouth: '舌尖向上卷但别碰上牙床，嘴唇稍微嘟起。',
    stroke: '就是小写 r：一竖，右上角伸出一小段。',
    words: [{ w: 'red', zh: '红色', emoji: '❤️' }, { w: 'rabbit', zh: '兔子', emoji: '🐰' }, { w: 'rain', zh: '雨', emoji: '🌧️' }]
  },

  /* ---------- 辅音：破擦音 6 个 ---------- */
  {
    symbol: '/tʃ/', type: 'consonant', group: '破擦音（两个音黏在一起）',
    hint: '像打喷嚏前的「七」，不出声',
    mouth: '舌尖顶住上牙床再快速放开，同时送气。',
    stroke: '先写 t，再写 ʃ，连在一起。',
    words: [{ w: 'chair', zh: '椅子', emoji: '🪑' }, { w: 'chicken', zh: '小鸡', emoji: '🐤' }, { w: 'teacher', zh: '老师', emoji: '👩‍🏫' }]
  },
  {
    symbol: '/dʒ/', type: 'consonant', group: '破擦音（两个音黏在一起）',
    hint: '和 /tʃ/ 一样的嘴形，但要出声「基」',
    mouth: '舌尖顶住上牙床放开并出声，喉咙振动。',
    stroke: '先写 d，再写 ʒ，连在一起。',
    words: [{ w: 'juice', zh: '果汁', emoji: '🧃' }, { w: 'jump', zh: '跳', emoji: '🤸' }, { w: 'orange', zh: '橙子', emoji: '🍊' }]
  },
  {
    symbol: '/tr/', type: 'consonant', group: '破擦音（两个音黏在一起）',
    hint: '/t/ 加 /r/ 快快连起来，像「戳」',
    mouth: '先摆 /t/ 的舌位，马上卷舌变成 /r/。',
    stroke: '先写 t，再写 r。',
    words: [{ w: 'tree', zh: '大树', emoji: '🌳' }, { w: 'train', zh: '火车', emoji: '🚂' }, { w: 'truck', zh: '卡车', emoji: '🚚' }]
  },
  {
    symbol: '/dr/', type: 'consonant', group: '破擦音（两个音黏在一起）',
    hint: '/d/ 加 /r/ 快快连起来，要出声',
    mouth: '先摆 /d/ 的舌位，马上卷舌变成 /r/，喉咙振动。',
    stroke: '先写 d，再写 r。',
    words: [{ w: 'dress', zh: '连衣裙', emoji: '👗' }, { w: 'drink', zh: '喝', emoji: '🥤' }, { w: 'dragon', zh: '龙', emoji: '🐉' }]
  },
  {
    symbol: '/ts/', type: 'consonant', group: '破擦音（两个音黏在一起）',
    hint: '像汉语「呲」，不出声',
    mouth: '舌尖顶上牙床放开，接着送出 /s/ 的气。',
    stroke: '先写 t，再写 s。',
    words: [{ w: 'cats', zh: '猫（复数）', emoji: '🐱' }, { w: 'boots', zh: '靴子', emoji: '👢' }, { w: 'lots', zh: '许多', emoji: '🎁' }]
  },
  {
    symbol: '/dz/', type: 'consonant', group: '破擦音（两个音黏在一起）',
    hint: '和 /ts/ 一样的嘴形，但要出声',
    mouth: '舌尖顶上牙床放开并出声，喉咙振动。',
    stroke: '先写 d，再写 z。',
    words: [{ w: 'birds', zh: '鸟（复数）', emoji: '🐦' }, { w: 'hands', zh: '手（复数）', emoji: '✋' }, { w: 'beds', zh: '床（复数）', emoji: '🛏️' }]
  },

  /* ---------- 辅音：鼻音 3 个 ---------- */
  {
    symbol: '/m/', type: 'consonant', group: '鼻音（从鼻子出声）',
    hint: '闭上嘴巴哼「呣——」',
    mouth: '双唇闭紧，声音从鼻子出来，嘴唇会麻麻的。',
    stroke: '就是小写 m：一竖加两个小拱门。',
    words: [{ w: 'mum', zh: '妈妈', emoji: '👩' }, { w: 'moon', zh: '月亮', emoji: '🌙' }, { w: 'milk', zh: '牛奶', emoji: '🥛' }]
  },
  {
    symbol: '/n/', type: 'consonant', group: '鼻音（从鼻子出声）',
    hint: '舌尖顶上牙床哼「呢——」',
    mouth: '舌尖顶住上牙床，声音从鼻子出来。',
    stroke: '就是小写 n：一竖加一个小拱门。',
    words: [{ w: 'nose', zh: '鼻子', emoji: '👃' }, { w: 'nine', zh: '九', emoji: '9️⃣' }, { w: 'name', zh: '名字', emoji: '📛' }]
  },
  {
    symbol: '/ŋ/', type: 'consonant', group: '鼻音（从鼻子出声）',
    hint: '后鼻音「嗯——」，像唱歌的尾巴',
    mouth: '舌根抬起碰住上面，声音全从鼻子出来。',
    stroke: '写一个 n，右腿往下拖一个小钩。',
    words: [{ w: 'sing', zh: '唱歌', emoji: '🎤' }, { w: 'king', zh: '国王', emoji: '👑' }, { w: 'long', zh: '长的', emoji: '📏' }]
  },

  /* ---------- 辅音：舌侧音 1 个 ---------- */
  {
    symbol: '/l/', type: 'consonant', group: '舌侧音',
    hint: '舌尖顶上牙床说「勒」',
    mouth: '舌尖顶住上牙床，声音从舌头两边溜出来。',
    stroke: '就是小写 l：一条长长的竖线。',
    words: [{ w: 'lion', zh: '狮子', emoji: '🦁' }, { w: 'milk', zh: '牛奶', emoji: '🥛' }, { w: 'apple', zh: '苹果', emoji: '🍎' }]
  },

  /* ---------- 辅音：半元音 2 个 ---------- */
  {
    symbol: '/j/', type: 'consonant', group: '半元音',
    hint: '像很快的「衣」，马上滑走',
    mouth: '嘴角向两边拉，舌头抬高，快快滑到下一个音。',
    stroke: '就是小写 j：一竖带钩，上面点一点。',
    words: [{ w: 'yes', zh: '是的', emoji: '✅' }, { w: 'yellow', zh: '黄色', emoji: '💛' }, { w: 'you', zh: '你', emoji: '👉' }]
  },
  {
    symbol: '/w/', type: 'consonant', group: '半元音',
    hint: '像很快的「乌」，嘴巴嘟一下',
    mouth: '嘴唇嘟成小圆圈再快快放开。',
    stroke: '就是小写 w：两个 v 手拉手。',
    words: [{ w: 'water', zh: '水', emoji: '💧' }, { w: 'window', zh: '窗户', emoji: '🪟' }, { w: 'we', zh: '我们', emoji: '🧑‍🤝‍🧑' }]
  }
];
