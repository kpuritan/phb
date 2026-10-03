/**
 * Puritan Heritage Books (PHB) - Core Library
 * Shared state, Firebase synchronization, Shopping Cart, Modals & UI Components
 */

// 1. Firebase Initialization
const firebaseConfig = {
  apiKey: "AIzaSyCJbOaiElCypwgtPgbwdnudn3VC737fMrs",
  authDomain: "kpuritan-home.firebaseapp.com",
  projectId: "kpuritan-home",
  storageBucket: "kpuritan-home.firebasestorage.app",
  messagingSenderId: "1071220455502",
  appId: "1:1071220455502:web:7f6f59b48c48a73437f8f0"
};

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (e) {
    console.warn("Firebase init warning:", e);
  }
}

const db = (typeof firebase !== 'undefined' && firebase.firestore) ? firebase.firestore() : null;
const storage = (typeof firebase !== 'undefined' && firebase.storage) ? firebase.storage() : null;

// 2. Default Seed Catalog Data (18 Definitive Classics)
const DEFAULT_BOOKS_DATA = [
  {
    id: 'phb-001',
    title: '개혁주의 조직신학 전집 (전4권 세트)',
    originalTitle: 'Reformed Systematic Theology (4 Volumes Set)',
    author: '조엘 비키 & 폴 스몰리',
    translator: '조계광, 손현선 공역',
    series: '개혁교의학 대계 (Reformed Dogmatics Series)',
    category: 'dogmatics',
    subCategory: 'set',
    isNew: true,
    isPreorder: true,
    isHardcover: true,
    isEbook: false,
    price: 198000,
    originalPrice: 220000,
    discountRate: 10,
    pages: '4,480쪽',
    isbn: '979-11-984501-0-1',
    pubDate: '2026. 10. 15 (출간예정)',
    tagline: '신학과 경건, 학문성과 목회적 적용이 완벽하게 융화된 21세기 최고의 개혁주의 교의학 기념비적 대작',
    coverGradient: 'from-[#1a1c20] via-[#2d1b24] to-[#121417]',
    confessionTag: '웨스트민스터 신앙고백서 1~33장 전편 해설',
    description: '역사적 개혁주의 전통과 청교도 체험적 영성을 평생 연구해 온 조엘 비키 박사와 폴 스몰리 교수가 완성한 4부작 조직신학 전집입니다. 계시론과 신론, 인간론과 기독론, 구원론과 교회론, 종말론에 이르는 기독교 교리 전체를 개혁신학적 정합성과 청교도적 영성으로 풀어내었습니다.',
    toc: [
      '제1권: 계시론과 신론 (Revelation and God)',
      '제2권: 인간론과 기독론 (Man and Christ)',
      '제3권: 성령론과 구원론 (Holy Spirit and Salvation)',
      '제4권: 교회론과 종말론 (Church and Last Things)'
    ],
    excerpt: '“신학이란 하나님을 아는 지식이며, 그분을 경외하고 사랑함으로 예배에 이르게 하는 가장 거룩한 학문이다. 머리로만 체계화된 교리는 죽은 정통에 불과하지만, 성령의 조명 안에서 마음을 뜨겁게 달구는 참된 교의는 영혼을 살리고 하나님을 찬양하게 만든다.”'
  },
  {
    id: 'phb-002',
    title: '죄와 유혹 (청교도 정본 완역판)',
    originalTitle: 'Overcoming Sin and Temptation',
    author: '존 오웬',
    translator: '서문강 역',
    series: '오늘을 위한 청교도 보화 01',
    category: 'christian-life',
    subCategory: 'sanctification',
    isNew: false,
    isPreorder: false,
    isHardcover: true,
    isEbook: true,
    price: 31500,
    originalPrice: 35000,
    discountRate: 10,
    pages: '584쪽',
    isbn: '979-11-984501-1-8',
    pubDate: '2026. 03. 20',
    tagline: '영적 전쟁과 신자의 내면을 해부하는 청교도 최고의 영혼의 외과의사 존 오웬의 불후의 고전',
    coverGradient: 'from-[#4a121c] via-[#2a0b11] to-[#170508]',
    confessionTag: 'WCF 제13장 성화 / 하이델베르크 제126~127문',
    description: '존 오웬의 3대 영적 전쟁 명저인 『신자 안에 남아있는 죄』, 『죄 죽이기』, 『유혹론』을 한 권으로 엮은 정본 완역판입니다. 신자가 구원받은 이후에도 날마다 육신의 부패성과 싸워야 하는 실제적 영적 원리와 복음의 은혜를 명쾌하게 제시합니다.',
    toc: [
      '제1부 신자 안에 거하는 죄의 권세와 속임수',
      '제2부 육신의 행실을 죽이는 성령의 사역',
      '제3부 유혹의 본질과 파수하는 경건의 방책'
    ],
    excerpt: '“죄를 죽이지 않으면 죄가 당신을 죽일 것이다. 성령의 권능 없이 자신의 결단이나 도덕적 노력만으로 죄와 싸우려는 자는 풀을 베어 독초를 박멸하려는 어리석은 농부와 같다.”'
  },
  {
    id: 'phb-003',
    title: '신자의 위로 (하나님의 모든 섭리)',
    originalTitle: 'A Divine Cordial (All Things for Good)',
    author: '토마스 왓슨',
    translator: '백금산 역',
    series: '오늘을 위한 청교도 보화 02',
    category: 'christian-life',
    subCategory: 'comfort',
    isNew: false,
    isPreorder: false,
    isHardcover: true,
    isEbook: true,
    price: 19800,
    originalPrice: 22000,
    discountRate: 10,
    pages: '272쪽',
    isbn: '979-11-984501-2-5',
    pubDate: '2026. 01. 10',
    tagline: '“하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라” (로마서 8:28 강해)',
    coverGradient: 'from-[#12242e] via-[#0c181f] to-[#060c10]',
    confessionTag: 'WCF 제5장 하나님의 섭리 / 도르트 신조 제1헤드',
    description: '환난과 슬픔의 파도 속에서도 하나님의 영원한 언약적 자비와 섭리가 어떻게 신자의 궁극적 유익을 위하여 일하는지를 청교도 특유의 유려하고 따뜻한 문체로 전해주는 위로의 책입니다.',
    toc: [
      '제1장 최상의 약재: 신자에게 유익이 되는 최선의 일들',
      '제2장 섭리의 신비: 신자에게 유익이 되는 최악의 일들(고난, 유혹)',
      '제3장 참된 성도의 특징: 하나님을 사랑하는 자란 누구인가?'
    ],
    excerpt: '“하나님께서 성도에게 주시는 고난의 잔 밑바닥에는 언제나 꿀이 고여 있다. 섭리의 수레바퀴는 때로 어둡고 위험해 보이지만 그 중심축은 영원한 사랑으로 고정되어 있다.”'
  },
  {
    id: 'phb-004',
    title: '가정예배 성경 가이드 (양장본 완역)',
    originalTitle: 'Family Worship Bible Guide',
    author: '조엘 비키, 마이클 바렛 공저',
    translator: 'PHB 편집부 역',
    series: '개혁주의 가정과 영성 시리즈 01',
    category: 'christian-life',
    subCategory: 'family',
    isNew: false,
    isPreorder: false,
    isHardcover: true,
    isEbook: false,
    price: 49500,
    originalPrice: 55000,
    discountRate: 10,
    pages: '1,024쪽',
    isbn: '979-11-984501-3-2',
    pubDate: '2025. 11. 15',
    tagline: '창세기부터 요한계시록까지 신구약 성경 1,189장 전편의 핵심 교리와 실천적 가정예배 나눔 질문 수록',
    coverGradient: 'from-[#2e2612] via-[#1a150a] to-[#0d0a05]',
    confessionTag: 'WCF 제21장 종교적 예배와 안식일',
    description: '매일 가정에서 성경을 읽고 묵상하며 온 가족이 함께 신앙을 나눌 수 있도록 창세기부터 요한계시록까지 모든 장에 대한 청교도적 해설과 나눔 질문을 집대성한 가정 제단의 필독서입니다.',
    toc: [
      '제1부 모세오경 및 역사서 (창세기~에스더)',
      '제2부 시가서 및 선지서 (욥기~말라기)',
      '제3부 복음서 및 사도행전 (마태복음~사도행전)',
      '제4부 서신서 및 요한계시록 (로마서~요한계시록)'
    ],
    excerpt: '“가정예배는 교회의 기초석이며 다음 세대를 향한 가장 위대한 영적 유산입니다. 부모가 자녀의 손을 잡고 말씀 앞에 무릎 꿇는 거룩한 식탁이 회복될 때 교회는 결코 쇠퇴하지 않을 것입니다.”'
  },
  {
    id: 'phb-005',
    title: '상한 갈대 (The Bruised Reed)',
    originalTitle: 'The Bruised Reed and Smoking Flax',
    author: '리처드 십스',
    translator: '이태복 역',
    series: '오늘을 위한 청교도 보화 03',
    category: 'christian-life',
    subCategory: 'comfort',
    isNew: false,
    isPreorder: false,
    isHardcover: true,
    isEbook: true,
    price: 16200,
    originalPrice: 18000,
    discountRate: 10,
    pages: '216쪽',
    isbn: '979-11-984501-4-9',
    pubDate: '2025. 12. 01',
    tagline: '“상한 갈대를 꺾지 아니하며 꺼져가는 심지를 끄지 아니하기를 심판하여 이길 때까지 하리니” (이사야 42:3)',
    coverGradient: 'from-[#1e2a22] via-[#101712] to-[#080d09]',
    confessionTag: 'WCF 제14장 구원에 이르는 신앙',
    description: '스펄전과 로이드존스가 ‘내 영혼을 소생시킨 책’으로 손꼽은 청교도 최고의 명저. 죄책감과 연약함으로 낙심한 영혼을 안아주시는 그리스도의 무한한 온유함과 자비를 전합니다.',
    toc: [
      '제1장 상한 갈대: 하나님께서 꺾지 않으시는 자',
      '제2장 꺼져가는 심지: 은혜의 작은 불꽃을 소중히 여기시는 주님',
      '제3장 그리스도의 긍휼과 온유: 시험받는 신자의 위로'
    ],
    excerpt: '“그리스도께서는 상한 갈대를 꺾지 않으시며 꺼져가는 심지를 끄지 않으신다. 우리의 가장 연약한 믿음조차 그분의 크신 자비 안에 안식한다.”'
  },
  {
    id: 'phb-006',
    title: '언약신학 탐구 (The Economy of Covenants)',
    originalTitle: 'The Economy of the Covenants Between God and Man',
    author: '헤르만 위트시우스',
    translator: '조계광 역',
    series: '개혁교의학 대계 02',
    category: 'dogmatics',
    subCategory: 'soteriology',
    isNew: true,
    isPreorder: false,
    isHardcover: true,
    isEbook: true,
    price: 67500,
    originalPrice: 75000,
    discountRate: 10,
    pages: '1,120쪽',
    isbn: '979-11-984501-5-6',
    pubDate: '2026. 02. 15',
    tagline: '행위언약과 은혜언약의 유기적 통일성을 학문성과 영성으로 집대성한 17세기 네덜란드 제2종교개혁의 기념비적 언약신학 명저',
    coverGradient: 'from-[#2b1820] via-[#1a0e13] to-[#0d070a]',
    confessionTag: '웨스트민스터 신앙고백서 제7장 언약론',
    description: '하나님과 인간 사이의 구속사적 경륜을 언약의 관점에서 정밀하게 규명한 17세기 네덜란드 언약신학의 최고봉입니다.',
    toc: [
      '제1권 행위언약 (The Covenant of Works)',
      '제2권 구속언약 (The Covenant of Redemption)',
      '제3권 은혜언약과 구원의 서정',
      '제4권 구약과 신약의 언약 경륜'
    ],
    excerpt: '“언약이란 하나님께서 무한한 사랑 가운데 지극히 낮아지사 인간을 당신의 영원한 벗으로 삼으시는 지극히 거룩한 교통의 언약이다.”'
  },
  {
    id: 'phb-007',
    title: '거룩과 확신 (Holiness & Assurance)',
    originalTitle: 'Holiness: Its Nature, Hindrances, Difficulties, and Roots',
    author: 'J. C. 라일',
    translator: '서문강 역',
    series: '오늘을 위한 청교도 보화 04',
    category: 'christian-life',
    subCategory: 'sanctification',
    isNew: false,
    isPreorder: false,
    isHardcover: true,
    isEbook: true,
    price: 28800,
    originalPrice: 32000,
    discountRate: 10,
    pages: '540쪽',
    isbn: '979-11-984501-6-3',
    pubDate: '2025. 10. 10',
    tagline: '“거룩함이 없이는 아무도 주를 보지 못하리라” (히브리서 12:14) — 참된 성화의 표지와 구원의 확신',
    coverGradient: 'from-[#162032] via-[#0d1420] to-[#060a10]',
    confessionTag: 'WCF 제18장 은혜와 구원의 확신',
    description: '칭의의 은혜 위에 세워지는 실제적이고 참된 성화의 길을 밝힌 J. C. 라일 주교의 대표 저작입니다.',
    toc: [
      '제1장 죄의 본질과 기만성',
      '제2장 참된 거룩함의 특성',
      '제3장 구원의 확신과 영적 싸움',
      '제4장 그리스도를 아는 가장 고상한 지식'
    ],
    excerpt: '“성화 없는 칭의는 결코 성경에 없다. 그리스도의 피로 죄 씻음을 받은 자는 반드시 성령의 능력으로 거룩한 삶을 열망하게 된다.”'
  },
  {
    id: 'phb-008',
    title: '그리스도의 영광 (The Glory of Christ)',
    originalTitle: 'Meditations and Discourses on the Glory of Christ',
    author: '존 오웬',
    translator: '손현선 역',
    series: '오늘을 위한 청교도 보화 05',
    category: 'dogmatics',
    subCategory: 'christology',
    isNew: false,
    isPreorder: false,
    isHardcover: true,
    isEbook: true,
    price: 22500,
    originalPrice: 25000,
    discountRate: 10,
    pages: '360쪽',
    isbn: '979-11-984501-7-0',
    pubDate: '2026. 04. 05',
    tagline: '임종을 앞둔 청교도 신학의 거장 존 오웬이 남긴 영혼의 마지막 백조의 노래이자 기독론의 극치',
    coverGradient: 'from-[#3a2012] via-[#22130a] to-[#110905]',
    confessionTag: 'WCF 제8장 중보자 그리스도',
    description: '오웬이 세상을 떠나기 직전 시력을 잃어가면서도 믿음의 눈으로 그리스도의 영광과 인격, 중보의 탁월함을 묵상하며 남긴 거룩한 유언과 같은 책입니다.',
    toc: [
      '제1부 성육신하신 그리스도의 인격 안에 나타난 영광',
      '제2부 중보자로서 하늘 보좌에서 발하시는 영광',
      '제3부 믿음으로 바라보는 영광과 장차 누릴 지복직관'
    ],
    excerpt: '“우리가 그리스도를 바라보는 시선만큼 우리 영혼은 그분의 형상으로 변화된다. 그분을 아는 지식이야말로 영생의 샘물이다.”'
  },
  {
    id: 'phb-009',
    title: '매튜 풀 성경주석 완간 세트 (신구약 전3권)',
    originalTitle: 'Matthew Poole\'s Commentary on the Holy Bible (3 Vols)',
    author: '매튜 풀',
    translator: 'PHB 주석번역위원회 역',
    series: '개혁주의 성경주석 총서 01',
    category: 'commentary',
    subCategory: 'set',
    isNew: true,
    isPreorder: true,
    isHardcover: true,
    isEbook: false,
    price: 261000,
    originalPrice: 290000,
    discountRate: 10,
    pages: '3,200쪽',
    isbn: '979-11-984501-8-7',
    pubDate: '2026. 11. 20 (예약판매)',
    tagline: '원어와 역사적 배경, 교의학적 정합성을 겸비한 17세기 청교도 최고의 기념비적 성경주석 정본',
    coverGradient: 'from-[#14232c] via-[#0b141a] to-[#050a0d]',
    confessionTag: 'WCF 제1장 성경의 무오성과 명료성',
    description: '칼빈과 매튜 헨리와 함께 종교개혁과 청교도 시대가 낳은 가장 정확하고 신실한 성경 원어 주석 대작입니다.',
    toc: [
      '제1권 창세기 ~ 욥기',
      '제2권 시편 ~ 말라기',
      '제3권 마태복음 ~ 요한계시록'
    ],
    excerpt: '“성경은 성령의 감동으로 기록되었으므로 성경을 올바르게 해석하는 유일한 열쇠는 성경으로 성경을 해석하는 일관된 개혁주의 원리이다.”'
  },
  {
    id: 'phb-010',
    title: '시편 강해: 다윗의 보고 (전3권 세트)',
    originalTitle: 'The Treasury of David (3 Volumes Set)',
    author: '찰스 스펄전',
    translator: '이원택 역',
    series: '개혁주의 성경주석 총서 02',
    category: 'commentary',
    subCategory: 'ot',
    isNew: false,
    isPreorder: false,
    isHardcover: true,
    isEbook: false,
    price: 162000,
    originalPrice: 180000,
    discountRate: 10,
    pages: '2,800쪽',
    isbn: '979-11-984501-9-4',
    pubDate: '2025. 09. 15',
    tagline: '스펄전이 평생에 걸쳐 청교도들의 시편 주석과 경건 묵상을 집대성한 시편 해석의 영원한 금자탑',
    coverGradient: 'from-[#2a1a1f] via-[#1a0f13] to-[#0c0709]',
    confessionTag: 'WCF 제21장 시편 찬송과 기도',
    description: '스펄전 목사가 20여 년간 시편 150편 전체를 본문별로 강해하고, 수백 명의 청교도 신학자들의 주석을 한자리에 모은 시편 연구의 필독서입니다.',
    toc: [
      '제1권 시편 1편 ~ 52편',
      '제2권 시편 53편 ~ 103편',
      '제3권 시편 104편 ~ 150편'
    ],
    excerpt: '“시편은 성도의 모든 기쁨과 슬픔, 찬송과 눈물이 거룩한 하나님의 보좌 앞에 상달되는 영혼의 해부학 책이다.”'
  },
  {
    id: 'phb-011',
    title: '히브리서 주석 정본 (전7권 완간 세트)',
    originalTitle: 'An Exposition of the Epistle to the Hebrews (7 Vols)',
    author: '존 오웬',
    translator: 'PHB 청교도원전번역위원회 역',
    series: '개혁주의 성경주석 총서 03',
    category: 'commentary',
    subCategory: 'nt',
    isNew: true,
    isPreorder: false,
    isHardcover: true,
    isEbook: false,
    price: 378000,
    originalPrice: 420000,
    discountRate: 10,
    pages: '5,600쪽',
    isbn: '979-11-984502-0-0',
    pubDate: '2026. 08. 30',
    tagline: '그리스도의 대제사장 직무와 더 좋은 언약의 영광을 논증한 기독교 2천 년 역사상 최고의 서신서 주석 대작',
    coverGradient: 'from-[#172221] via-[#0d1413] to-[#060a0a]',
    confessionTag: 'WCF 제8장 중보자 그리스도의 제사장 직분',
    description: '존 오웬이 16년간 집필하여 히브리서의 심오한 신학적 구조와 그리스도의 영원한 속죄를 완벽히 주해한 걸작입니다.',
    toc: [
      '제1~2권 히브리서 총론 및 유대교 의식 제도 연구',
      '제3~4권 그리스도의 신성과 인격 (히브리서 1~5장)',
      '제5~7권 멜기세덱의 반차와 새 언약 (히브리서 6~13장)'
    ],
    excerpt: '“그리스도는 옛 언약의 모든 그림자를 성취하시고 단번에 영원한 제사를 드리신 참된 대제사장이시다.”'
  },
  {
    id: 'phb-012',
    title: '하나님의 존재와 속성 (전2권 완역 세트)',
    originalTitle: 'Discourses upon the Existence and Attributes of God (2 Vols)',
    author: '스티븐 차녹',
    translator: '조계광 역',
    series: '개혁교의학 대계 03',
    category: 'dogmatics',
    subCategory: 'theology-proper',
    isNew: false,
    isPreorder: false,
    isHardcover: true,
    isEbook: true,
    price: 99000,
    originalPrice: 110000,
    discountRate: 10,
    pages: '1,840쪽',
    isbn: '979-11-984502-1-7',
    pubDate: '2025. 12. 20',
    tagline: '하나님의 영원성, 전능성, 거룩성, 지혜, 자비를 웅장한 신학적 필치로 논증한 신론(Theology Proper)의 독보적 대작',
    coverGradient: 'from-[#2e2316] via-[#1a130a] to-[#0c0804]',
    confessionTag: 'WCF 제2장 하나님과 거룩하신 삼위일체',
    description: '스티븐 차녹이 하나님의 본질과 모든 신적 속성을 성경적 주해와 청교도적 영성으로 탐구한 신론 분야의 불후의 고전입니다.',
    toc: [
      '제1권 하나님의 존재, 영성, 무한성, 영원성, 불변성, 전능성',
      '제2권 하나님의 지혜, 거룩성, 공의, 선하심, 지배권, 인내하심'
    ],
    excerpt: '“하나님의 거룩하심은 그분의 모든 속성의 광채이며, 하나님의 영원하심은 모든 피조물의 덧없음을 비추는 영원한 빛이다.”'
  },
  {
    id: 'phb-013',
    title: '인간의 사중 상태 (Human Nature in Its Fourfold State)',
    originalTitle: 'Human Nature in Its Fourfold State',
    author: '토마스 보스턴',
    translator: '서문강 역',
    series: '오늘을 위한 청교도 보화 06',
    category: 'dogmatics',
    subCategory: 'anthropology',
    isNew: false,
    isPreorder: false,
    isHardcover: true,
    isEbook: true,
    price: 27000,
    originalPrice: 30000,
    discountRate: 10,
    pages: '480쪽',
    isbn: '979-11-984502-2-4',
    pubDate: '2026. 01. 25',
    tagline: '원초적 무죄 상태, 전적 타락 상태, 은혜의 회복 상태, 영원한 영광/심판 상태로 조명하는 성경적 인간론',
    coverGradient: 'from-[#241c2c] via-[#140e1a] to-[#08050c]',
    confessionTag: 'WCF 제6장 인간의 타락과 죄와 형벌 / 제9장 자유의지',
    description: '스코틀랜드 개혁파 청교도 토마스 보스턴이 인간 본성의 본질과 구속사적 변화를 4가지 상태로 명쾌하게 정리한 대표작입니다.',
    toc: [
      '제1상태: 원초적 무죄 상태 (Innocence)',
      '제2상태: 전적 타락 상태 (Nature)',
      '제3상태: 은혜 아래 회복된 상태 (Grace)',
      '제4상태: 영원한 영광 혹은 비참의 상태 (Eternal State)'
    ],
    excerpt: '“아담 안에서 타락한 인간은 스스로 구원할 능력을 상실하였으나, 둘째 아담이신 그리스도 안에서 새로운 피조물로 온전히 회복된다.”'
  },
  {
    id: 'phb-014',
    title: '개혁교회론과 성례전 (Reformed Ecclesiology)',
    originalTitle: 'The Church of Christ: A Treatise on Its Nature and Powers',
    author: '제임스 배너만',
    translator: '손현선 역',
    series: '개혁교의학 대계 04',
    category: 'dogmatics',
    subCategory: 'ecclesiology',
    isNew: true,
    isPreorder: false,
    isHardcover: true,
    isEbook: true,
    price: 81000,
    originalPrice: 90000,
    discountRate: 10,
    pages: '1,320쪽',
    isbn: '979-11-984502-3-1',
    pubDate: '2026. 05. 20',
    tagline: '참된 교회의 표지, 영적 권세, 직원, 그리고 세례와 성찬의 은혜를 집대성한 역사적 개혁교회론의 최고 권위서',
    coverGradient: 'from-[#17252f] via-[#0d161d] to-[#060b0e]',
    confessionTag: 'WCF 제25장 교회 / 제27~29장 성례전',
    description: '스코틀랜드 자유교회의 석학 제임스 배너만이 교회의 본질, 영적 통치, 권징, 그리고 말씀과 성례의 은혜 수단을 철저히 성경적으로 논증한 대작입니다.',
    toc: [
      '제1부 교회의 본질과 표지',
      '제2부 교회의 영적 권세와 직무',
      '제3부 은혜의 외적 수단: 말씀과 성례전',
      '제4부 국가와 교회의 정당한 관계'
    ],
    excerpt: '“교회의 유일한 머리는 주 예수 그리스도시며, 교회의 모든 권세는 오직 하나님의 말씀에 복종할 때에만 참된 영적 권위를 갖는다.”'
  },
  {
    id: 'phb-015',
    title: '성도의 영원한 안식 (The Saints\' Everlasting Rest)',
    originalTitle: 'The Saints\' Everlasting Rest',
    author: '리처드 백스터',
    translator: '조계광 역',
    series: '오늘을 위한 청교도 보화 07',
    category: 'dogmatics',
    subCategory: 'eschatology',
    isNew: false,
    isPreorder: false,
    isHardcover: true,
    isEbook: true,
    price: 32400,
    originalPrice: 36000,
    discountRate: 10,
    pages: '640쪽',
    isbn: '979-11-984502-4-8',
    pubDate: '2025. 08. 20',
    tagline: '장차 그리스도와 함께 누릴 천국의 영광스러운 안식과 부활의 소망을 사모하게 하는 종말론적 경건의 정수',
    coverGradient: 'from-[#2c1d2e] via-[#1c111e] to-[#0e070f]',
    confessionTag: 'WCF 제32장 사후 상태와 부활 / 제33장 최후 심판',
    description: '질병으로 생사의 기로에 섰던 백스터가 천국의 지복직관(Beatific Vision)과 그리스도인의 궁극적 소망을 영혼의 벅찬 감격으로 써내려간 걸작입니다.',
    toc: [
      '제1부 성도들에게 예비된 영원한 안식의 탁월함',
      '제2부 이 안식을 잃어버리는 자들의 비참과 경고',
      '제3부 천국 안식을 사모하며 누리는 영혼의 훈련',
      '제4부 믿음의 눈으로 바라보는 영광스러운 부활의 날'
    ],
    excerpt: '“우리의 순례길이 험난할수록 저 영원한 본향에서 기다리고 있는 안식은 더욱 달콤할 것이다. 마음의 닻을 천국 보좌에 굳게 내리라.”'
  },
  {
    id: 'phb-016',
    title: '16세기 종교개혁사 (전5권 세트)',
    originalTitle: 'History of the Reformation in the Sixteenth Century (5 Vols)',
    author: 'J. H. 메를 도비녜',
    translator: '이원택 역',
    series: '역사신학 대계 01',
    category: 'historical',
    subCategory: 'reformation',
    isNew: true,
    isPreorder: false,
    isHardcover: true,
    isEbook: false,
    price: 225000,
    originalPrice: 250000,
    discountRate: 10,
    pages: '3,400쪽',
    isbn: '979-11-984502-5-5',
    pubDate: '2026. 06. 10',
    tagline: '루터, 츠빙글리, 칼빈으로 이어지는 종교개혁의 불꽃과 섭리의 역사를 웅장한 필치로 기록한 역사신학의 불후의 고전',
    coverGradient: 'from-[#3a2818] via-[#24170c] to-[#120a05]',
    confessionTag: '오직 성경, 오직 은혜, 오직 믿음 (Five Solas)',
    description: '스위스 제네바의 개혁주의 교회사학자 도비녜가 방대한 1차 사료를 바탕으로 하나님의 주권적 손길이 역사의 물줄기를 바꾼 종교개혁의 파노라마를 생생히 복원합니다.',
    toc: [
      '제1~2권 루터와 독일 종교개혁의 여명 (보름스 제국의회)',
      '제3권 츠빙글리와 스위스 종교개혁의 발흥',
      '제4권 칼빈과 제네바의 거룩한 개혁',
      '제5권 영국 종교개혁과 순교자들의 믿음'
    ],
    excerpt: '“종교개혁은 인간의 작품이 아니라 하나님의 말씀이 세상을 다시 정복해 가는 성령의 역사였다.”'
  },
  {
    id: 'phb-017',
    title: '존 오웬 전집 (The Works of John Owen, 전16권 완간 세트)',
    originalTitle: 'The Works of John Owen (16 Volumes Complete Set)',
    author: '존 오웬',
    translator: 'PHB 청교도원전번역위원회 역',
    series: '청교도저작 전집 대계 01',
    category: 'puritan-works',
    subCategory: 'owen',
    isNew: true,
    isPreorder: true,
    isHardcover: true,
    isEbook: false,
    price: 720000,
    originalPrice: 800000,
    discountRate: 10,
    pages: '10,800쪽',
    isbn: '979-11-984502-6-2',
    pubDate: '2026. 12. 15 (한정판 사전예약)',
    tagline: '영국 최고의 신학자 존 오웬의 교의학, 성령론, 성화론, 교회론 문헌 전체를 망라한 역사적 정본 전집',
    coverGradient: 'from-[#22161b] via-[#160d11] to-[#0b0508]',
    confessionTag: '웨스트민스터 총회 신학의 정점',
    description: '삼위일체론, 성령론 대작, 그리스도의 죽으심의 효능, 죄 죽이기, 배교론 등 오웬이 남긴 16권의 전집 전체를 17세기 원문 대조로 정밀하게 완역한 한국 출판 사상 초유의 기념비적 전집입니다.',
    toc: [
      '제1~3권 기독론 및 삼위일체 하나님과의 교제',
      '제4~5권 성령론 대계 (The Holy Spirit)',
      '제6~7권 성화론과 영적 전쟁 (죄 죽이기, 유혹, 내주하는 죄)',
      '제8~9권 그리스도의 구속 사역의 완전성 (제한속죄론)',
      '제10~16권 교회론, 배교론 및 학술 논단'
    ],
    excerpt: '“우리가 그리스도를 닮아가는 유일한 길은 날마다 믿음의 눈으로 그분의 영광을 바라보는 것이다. 이 바라봄이 우리 영혼을 변화시킨다.”'
  },
  {
    id: 'phb-018',
    title: '토마스 굿윈 전집 (Works of Thomas Goodwin, 전12권 세트)',
    originalTitle: 'The Works of Thomas Goodwin (12 Volumes Set)',
    author: '토마스 굿윈',
    translator: 'PHB 청교도원전번역위원회 공역',
    series: '청교도저작 전집 대계 02',
    category: 'puritan-works',
    subCategory: 'goodwin',
    isNew: true,
    isPreorder: false,
    isHardcover: true,
    isEbook: false,
    price: 540000,
    originalPrice: 600000,
    discountRate: 10,
    pages: '8,400쪽',
    isbn: '979-11-984502-7-9',
    pubDate: '2026. 09. 30',
    tagline: '하늘에 계신 그리스도의 마음과 성령의 인치심, 영원한 선택의 영광을 가장 깊이 있게 논증한 청교도 거장의 전집',
    coverGradient: 'from-[#1c2230] via-[#111722] to-[#070b12]',
    confessionTag: '웨스트민스터 독립파 위원 대표작',
    description: '웨스트민스터 총회 핵심 주역이자 옥스퍼드 모들린 칼리지 학장이었던 토마스 굿윈의 에베소서 강해, 그리스도의 심장, 성령의 사역, 지혜론 등을 총망라한 전집입니다.',
    toc: [
      '제1~2권 에베소서 강해 (창세 전 선택과 예정의 영광)',
      '제3~4권 하늘에 계신 그리스도의 심장과 중보의 사랑',
      '제5~7권 성령의 역사와 신자의 인치심, 구원의 확신',
      '제8~12권 의인의 보상, 정당한 권징과 개혁교회 질서'
    ],
    excerpt: '“그리스도의 마음은 지금도 하늘 보좌에서 상처 입고 연약한 지상 성도들을 향해 가장 부드럽고 긍휼한 사랑으로 박동하고 있다.”'
  }
];

// 3. Books Dynamic Loading & Persistence
function getUnifiedBooks() {
  const localList = localStorage.getItem('phb_books_list') || localStorage.getItem('phb_custom_books') || localStorage.getItem('phb_books');
  if (localList) {
    try {
      const parsed = JSON.parse(localList);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {
      console.warn("Error parsing local books, using fallback:", e);
    }
  }
  return DEFAULT_BOOKS_DATA.slice();
}

let CURRENT_BOOKS = getUnifiedBooks();

async function syncDynamicBooks(onUpdateCallback) {
  CURRENT_BOOKS = getUnifiedBooks();
  if (typeof onUpdateCallback === 'function') onUpdateCallback(CURRENT_BOOKS);

  if (db) {
    try {
      const snapshot = await db.collection("phb_books").get();
      if (!snapshot.empty) {
        const firestoreBooks = [];
        snapshot.forEach(doc => {
          firestoreBooks.push({ id: doc.id, ...doc.data() });
        });
        if (firestoreBooks.length > 0) {
          CURRENT_BOOKS = firestoreBooks;
          localStorage.setItem('phb_books_list', JSON.stringify(CURRENT_BOOKS));
          localStorage.setItem('phb_custom_books', JSON.stringify(CURRENT_BOOKS));
          localStorage.setItem('phb_books', JSON.stringify(CURRENT_BOOKS));
          if (typeof onUpdateCallback === 'function') onUpdateCallback(CURRENT_BOOKS);
        }
      }
    } catch (err) {
      console.warn("Firestore sync offline mode:", err);
    }
  }
}

// 4. Shopping Cart State & Management
function getCart() {
  try {
    const saved = localStorage.getItem('phb_cart');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  // Default sample cart
  const b1 = CURRENT_BOOKS[0] || DEFAULT_BOOKS_DATA[0];
  const b2 = CURRENT_BOOKS[1] || DEFAULT_BOOKS_DATA[1];
  return [
    { book: b1, quantity: 1 },
    { book: b2, quantity: 1 }
  ];
}

let cart = getCart();

function saveCart() {
  try {
    localStorage.setItem('phb_cart', JSON.stringify(cart));
  } catch (e) {}
  updateHeaderCartCount();
  renderCartDrawer();
}

function updateHeaderCartCount() {
  const countEl = document.getElementById('header-cart-count');
  if (!countEl) return;
  const total = cart.reduce((acc, item) => acc + item.quantity, 0);
  countEl.innerText = total;
  countEl.style.display = total > 0 ? 'flex' : 'none';
}

function addToCart(bookId) {
  const target = CURRENT_BOOKS.find(b => b.id === bookId);
  if (!target) return;
  const existing = cart.find(item => item.book.id === bookId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ book: target, quantity: 1 });
  }
  saveCart();
  showToast(`『${target.title.split('(')[0]}』 도서를 장바구니에 담았습니다.`);
  toggleCart(true);
}

function removeFromCart(bookId) {
  cart = cart.filter(item => item.book.id !== bookId);
  saveCart();
}

function updateCartQty(bookId, delta) {
  const item = cart.find(i => i.book.id === bookId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(bookId);
  } else {
    saveCart();
  }
}

function toggleCart(isOpen) {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;
  if (isOpen) {
    renderCartDrawer();
    drawer.classList.remove('hidden');
  } else {
    drawer.classList.add('hidden');
  }
}

function renderCartDrawer() {
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const discountEl = document.getElementById('cart-discount');
  const totalEl = document.getElementById('cart-total');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center space-y-3">
        <div class="w-12 h-12 mx-auto rounded-full bg-[#FAF8F5] border border-[#E4DFD7] flex items-center justify-center text-[#5E6470]">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        </div>
        <p class="text-xs text-[#5E6470] font-medium">장바구니가 비어 있습니다.</p>
        <button onclick="toggleCart(false)" class="text-xs text-[#6E1B2A] hover:underline font-semibold">도서 둘러보기 &rarr;</button>
      </div>
    `;
    if (subtotalEl) subtotalEl.innerText = '0원';
    if (discountEl) discountEl.innerText = '-0원';
    if (totalEl) totalEl.innerText = '0원';
    return;
  }

  let subtotal = 0;
  let originalTotal = 0;

  container.innerHTML = cart.map(item => {
    const b = item.book;
    const itemTotal = b.price * item.quantity;
    const itemOrig = (b.originalPrice || b.price) * item.quantity;
    subtotal += itemTotal;
    originalTotal += itemOrig;

    const coverSrc = b.coverUrl || b.coverImage;

    return `
      <div class="flex items-center space-x-3 py-3 border-b border-[#E4DFD7] text-xs">
        <div class="w-12 h-16 bg-gradient-to-br ${b.coverGradient || 'from-[#1a1c20] to-[#121417]'} rounded shadow shrink-0 flex items-center justify-center p-1 text-center border border-[#C39738]/30 overflow-hidden relative">
          ${coverSrc ? `<img src="${coverSrc}" alt="${b.title}" class="absolute inset-0 w-full h-full object-cover">` : `
            <span class="text-[5px] font-cinzel text-[#DFC075] uppercase block truncate">${(b.series || 'PHB').split('(')[0]}</span>
            <span class="text-[7px] font-serifKr font-bold text-white block line-clamp-2">${b.title.split('(')[0]}</span>
          `}
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="font-serifKr font-bold text-[#17191C] truncate">${b.title}</h4>
          <p class="text-[10px] text-[#7E8694] truncate">${b.author}</p>
          <div class="flex items-center justify-between mt-1">
            <span class="font-semibold text-[#17191C]">${b.price.toLocaleString()}원</span>
            <div class="flex items-center border border-[#E4DFD7] rounded bg-white">
              <button onclick="updateCartQty('${b.id}', -1)" class="px-2 py-0.5 text-[#5E6470] hover:bg-[#FAF8F5]">-</button>
              <span class="px-2 font-bold text-[11px]">${item.quantity}</span>
              <button onclick="updateCartQty('${b.id}', 1)" class="px-2 py-0.5 text-[#5E6470] hover:bg-[#FAF8F5]">+</button>
            </div>
          </div>
        </div>
        <button onclick="removeFromCart('${b.id}')" class="text-[#A6ADB8] hover:text-[#6E1B2A] p-1" title="삭제">&times;</button>
      </div>
    `;
  }).join('');

  const discount = originalTotal - subtotal;
  if (subtotalEl) subtotalEl.innerText = originalTotal.toLocaleString() + '원';
  if (discountEl) discountEl.innerText = '-' + discount.toLocaleString() + '원';
  if (totalEl) totalEl.innerText = subtotal.toLocaleString() + '원';
}

// 5. Book Preview Modal Controller
function openBookPreview(bookId) {
  const book = CURRENT_BOOKS.find(b => b.id === bookId);
  if (!book) return;
  const modal = document.getElementById('book-preview-modal');
  if (!modal) return;

  const titleEl = document.getElementById('preview-title');
  const origTitleEl = document.getElementById('preview-orig-title');
  const seriesEl = document.getElementById('preview-series');
  const authorEl = document.getElementById('preview-author');
  const translatorEl = document.getElementById('preview-translator');
  const priceEl = document.getElementById('preview-price');
  const origPriceEl = document.getElementById('preview-orig-price');
  const discountEl = document.getElementById('preview-discount');
  const pagesEl = document.getElementById('preview-pages');
  const pubDateEl = document.getElementById('preview-pubdate');
  const isbnEl = document.getElementById('preview-isbn');
  const confessionEl = document.getElementById('preview-confession');
  const descEl = document.getElementById('preview-description');
  const tocEl = document.getElementById('preview-toc');
  const excerptEl = document.getElementById('preview-excerpt');
  const coverBox = document.getElementById('preview-cover-box');
  const modalAddCartBtn = document.getElementById('preview-add-cart-btn');

  if (titleEl) titleEl.innerText = book.title;
  if (origTitleEl) origTitleEl.innerText = book.originalTitle || '';
  if (seriesEl) seriesEl.innerText = book.series || 'PHB 정본 총서';
  if (authorEl) authorEl.innerText = book.author;
  if (translatorEl) translatorEl.innerText = book.translator || 'PHB 번역위원회';
  if (priceEl) priceEl.innerText = book.price.toLocaleString() + '원';
  if (origPriceEl) origPriceEl.innerText = (book.originalPrice || book.price).toLocaleString() + '원';
  if (discountEl) discountEl.innerText = (book.discountRate || 10) + '% 할인';
  if (pagesEl) pagesEl.innerText = book.pages || '480쪽';
  if (pubDateEl) pubDateEl.innerText = book.pubDate || '2026. 10. 15';
  if (isbnEl) isbnEl.innerText = book.isbn || '979-11-984501-0-1';
  if (confessionEl) confessionEl.innerText = book.confessionTag || '개혁주의 표준문서 연계';
  if (descEl) descEl.innerText = book.description || '';
  if (excerptEl) excerptEl.innerText = book.excerpt || '';

  if (tocEl && Array.isArray(book.toc)) {
    tocEl.innerHTML = book.toc.map(item => `<li>${item}</li>`).join('');
  }

  if (coverBox) {
    const coverSrc = book.coverUrl || book.coverImage;
    coverBox.className = `w-36 h-52 bg-gradient-to-br ${book.coverGradient || 'from-[#1a1c20] to-[#121417]'} rounded shadow-book p-3 flex flex-col justify-between text-center relative overflow-hidden`;
    if (coverSrc) {
      coverBox.innerHTML = `
        <img src="${coverSrc}" alt="${book.title}" class="absolute inset-0 w-full h-full object-cover">
      `;
    } else {
      coverBox.innerHTML = `
        <span class="text-[7px] font-cinzel text-[#DFC075] tracking-wider uppercase block">${(book.series || 'PHB').split('(')[0]}</span>
        <h4 class="text-xs font-serifKr font-bold text-white leading-snug">${book.title.split('(')[0]}</h4>
        <span class="text-[8px] font-serifKr text-[#E4DFD7]">${book.author}</span>
      `;
    }
  }

  if (modalAddCartBtn) {
    modalAddCartBtn.onclick = () => {
      addToCart(book.id);
      closeBookPreview();
    };
  }

  // Update store direct links
  const smartstoreLink = document.getElementById('preview-store-smartstore');
  const kyoboLink = document.getElementById('preview-store-kyobo');
  const aladinLink = document.getElementById('preview-store-aladin');
  const yes24Link = document.getElementById('preview-store-yes24');
  const query = encodeURIComponent(`퓨리탄헤리티지북스 ${book.title.split('(')[0]}`);

  if (smartstoreLink) smartstoreLink.href = `https://smartstore.naver.com`;
  if (kyoboLink) kyoboLink.href = `https://search.kyobobook.co.kr/search?keyword=${query}`;
  if (aladinLink) aladinLink.href = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchWord=${query}`;
  if (yes24Link) yes24Link.href = `https://www.yes24.com/Product/Search?domain=ALL&query=${query}`;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeBookPreview() {
  const modal = document.getElementById('book-preview-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// 6. Online Bookstore Checkout Modal Controller
function openStoreCheckout() {
  const modal = document.getElementById('store-checkout-modal');
  const listContainer = document.getElementById('store-checkout-items-list');
  if (!modal || !listContainer) return;

  if (cart.length === 0) {
    showToast('장바구니에 담긴 도서가 없습니다.');
    return;
  }

  listContainer.innerHTML = cart.map(item => {
    const b = item.book;
    const query = encodeURIComponent(`퓨리탄헤리티지북스 ${b.title.split('(')[0]}`);
    return `
      <div class="p-3.5 bg-[#FAF8F5] rounded-lg border border-[#E4DFD7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <div class="font-bold text-[#17191C] font-serifKr">${b.title}</div>
          <div class="text-[11px] text-[#7E8694]">${b.author} | 수량: ${item.quantity}권 (${(b.price * item.quantity).toLocaleString()}원)</div>
        </div>
        <div class="flex flex-wrap gap-1.5 shrink-0">
          <a href="https://smartstore.naver.com" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1.5 bg-[#03C75A] text-white rounded font-bold hover:opacity-90 transition-opacity">스마트스토어</a>
          <a href="https://search.kyobobook.co.kr/search?keyword=${query}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1.5 bg-[#2653AF] text-white rounded font-bold hover:opacity-90 transition-opacity">교보문고</a>
          <a href="https://www.aladin.co.kr/search/wsearchresult.aspx?SearchWord=${query}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1.5 bg-[#EE4B2B] text-white rounded font-bold hover:opacity-90 transition-opacity">알라딘</a>
          <a href="https://www.yes24.com/Product/Search?domain=ALL&query=${query}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1.5 bg-[#0080FF] text-white rounded font-bold hover:opacity-90 transition-opacity">YES24</a>
        </div>
      </div>
    `;
  }).join('');

  toggleCart(false);
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeStoreCheckoutModal() {
  const modal = document.getElementById('store-checkout-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// 7. Admin & Auth Controller
function handleAdminTriggerClick() {
  const isAdmin = localStorage.getItem('phb_is_admin') === 'true' || localStorage.getItem('isAdmin') === 'true';
  if (isAdmin) {
    window.location.href = 'admin.html';
  } else {
    openAdminLoginModal();
  }
}

function openAdminLoginModal() {
  const modal = document.getElementById('admin-login-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeAdminLoginModal() {
  const modal = document.getElementById('admin-login-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function handleAdminLogin(e) {
  if (e) e.preventDefault();
  const id = document.getElementById('admin-login-id')?.value.trim();
  const pw = document.getElementById('admin-login-pw')?.value.trim();

  if (id === 'admin' && pw === '1234') {
    localStorage.setItem('isAdmin', 'true');
    localStorage.setItem('phb_is_admin', 'true');
    localStorage.setItem('phb_admin_auth', 'true');
    closeAdminLoginModal();
    showToast('관리자 인증이 완료되었습니다. 관리 페이지로 이동합니다.');
    setTimeout(() => {
      window.location.href = 'admin.html';
    }, 600);
  } else {
    alert('아이디 또는 비밀번호가 일치하지 않습니다.');
  }
}

function updateAdminUI() {
  const isAdmin = localStorage.getItem('phb_is_admin') === 'true' || localStorage.getItem('isAdmin') === 'true';
  const triggerText = document.getElementById('top-admin-trigger-text');
  if (triggerText) {
    triggerText.innerText = isAdmin ? '관리자 대시보드' : '관리자 모드';
  }
}

// 8. Auth Modal (Member Login/Signup)
function openAuthModal(mode = 'login') {
  const modal = document.getElementById('auth-modal');
  const title = document.getElementById('auth-modal-title');
  const nameField = document.getElementById('auth-name-field');
  const submitBtn = document.getElementById('auth-submit-btn');
  if (!modal) return;

  if (mode === 'signup') {
    if (title) title.innerText = '회원가입 (신규 독자 등록)';
    if (nameField) nameField.classList.remove('hidden');
    if (submitBtn) submitBtn.innerText = '회원가입 완료';
  } else {
    if (title) title.innerText = '로그인 (독자 회원)';
    if (nameField) nameField.classList.add('hidden');
    if (submitBtn) submitBtn.innerText = '로그인';
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function handleAuthSubmit(e) {
  if (e) e.preventDefault();
  const email = document.getElementById('auth-email')?.value.trim();
  if (!email) return;
  localStorage.setItem('phb_user_email', email);
  closeAuthModal();
  showToast(`${email} 님 환영합니다!`);
  updateHeaderUserUI();
}

function logout() {
  localStorage.removeItem('phb_user_email');
  showToast('로그아웃되었습니다.');
  updateHeaderUserUI();
}

function updateHeaderUserUI() {
  const user = localStorage.getItem('phb_user_email');
  const userContainer = document.getElementById('header-user-container');
  if (!userContainer) return;

  if (user) {
    userContainer.innerHTML = `
      <span class="text-xs text-[#6E1B2A] font-bold font-serifKr">${user.split('@')[0]}님</span>
      <span class="text-[#E4DFD7]">|</span>
      <button onclick="logout()" class="text-xs text-[#5E6470] hover:text-[#17191C]">로그아웃</button>
    `;
  } else {
    userContainer.innerHTML = `
      <button onclick="openAuthModal('login')" class="text-[#17191C] hover:text-[#6E1B2A] px-2 py-1.5 rounded transition-colors whitespace-nowrap font-medium">로그인</button>
      <span class="text-[#E4DFD7]">|</span>
      <button onclick="openAuthModal('signup')" class="bg-[#6E1B2A] hover:bg-[#8C2538] text-white px-3 py-1.5 rounded text-xs font-semibold transition-all shadow-xs hover:shadow whitespace-nowrap border border-[#8C2538]">회원가입</button>
    `;
  }
}

// 9. Mobile Menu Navigation
function toggleMobileMenu(show) {
  const drawer = document.getElementById('mobile-menu-drawer');
  if (!drawer) return;
  if (show) {
    drawer.classList.remove('hidden');
  } else {
    drawer.classList.add('hidden');
  }
}

function toggleMobileAccordion(name) {
  const sub = document.getElementById(`mobile-sub-${name}`);
  const arrow = document.getElementById(`mobile-arrow-${name}`);
  if (!sub || !arrow) return;
  const isOpen = !sub.classList.contains('hidden');
  if (isOpen) {
    sub.classList.add('hidden');
    arrow.classList.remove('rotate-180');
  } else {
    sub.classList.remove('hidden');
    arrow.classList.add('rotate-180');
  }
}

// 10. Toast Notification
function showToast(msg) {
  let toast = document.getElementById('toast');
  let text = document.getElementById('toast-message');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'fixed bottom-6 right-6 z-50 bg-[#17191C] text-white px-5 py-3 rounded-lg shadow-2xl border-l-4 border-[#C39738] transform transition-all duration-300 opacity-0 translate-y-4 pointer-events-none flex items-center space-x-3 text-xs sm:text-sm font-sans';
    toast.innerHTML = `<span class="text-[#DFC075] text-base">✦</span><span id="toast-message">${msg}</span>`;
    document.body.appendChild(toast);
    text = document.getElementById('toast-message');
  }
  text.innerText = msg;
  toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
  toast.classList.add('opacity-100', 'translate-y-0');
  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
  }, 3200);
}

// 11. Book Card Component Generator
function generateBookCardHtml(book) {
  const coverSrc = book.coverUrl || book.coverImage;
  const originalPriceFormatted = (book.originalPrice || book.price).toLocaleString() + '원';
  const priceFormatted = book.price.toLocaleString() + '원';

  return `
    <div class="bg-white rounded-lg border border-[#E4DFD7] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <!-- Top Cover Visual Area -->
      <div class="p-6 bg-[#F8F7F4] flex justify-center items-center relative border-b border-[#E4DFD7] overflow-hidden">
        <div onclick="openBookPreview('${book.id}')" class="cursor-pointer w-44 h-64 bg-gradient-to-br ${book.coverGradient || 'from-[#1a1c20] to-[#121417]'} rounded-r-md rounded-l-xs shadow-book book-spine-effect p-4 flex flex-col justify-between transform transition-all duration-300 group-hover:scale-105 group-hover:-rotate-1 relative overflow-hidden">
          ${coverSrc ? `
            <img src="${coverSrc}" alt="${book.title}" class="absolute inset-0 w-full h-full object-cover z-0" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none z-10"></div>
            <div class="absolute inset-2 border border-[#C39738]/30 pointer-events-none z-20"></div>
          ` : `
            <div class="relative z-10 text-center">
              <span class="font-cinzel text-[8px] tracking-wider text-[#DFC075] uppercase block truncate">
                ${(book.series || 'PHB CLASSICS').split('(')[0]}
              </span>
            </div>

            <div class="relative z-10 text-center my-auto space-y-1">
              <h3 class="font-serifKr text-base font-bold text-white leading-snug">
                ${(book.title || '').split('(')[0]}
              </h3>
              <p class="italic text-[9px] text-[#DFC075]/70 truncate">
                ${book.originalTitle || ''}
              </p>
            </div>

            <div class="relative z-10 text-center border-t border-[#C39738]/20 pt-2">
              <p class="text-[10px] text-[#E4DFD7] font-medium">
                ${book.author || ''}
              </p>
              <span class="font-cinzel text-[7px] text-[#A6ADB8] tracking-widest">
                PHB CLASSICS
              </span>
            </div>
          `}
        </div>

        <!-- Badges on top left -->
        <div class="absolute top-3 left-3 flex flex-col gap-1 z-20">
          ${book.isPreorder ? '<span class="bg-[#6E1B2A] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">사전예약</span>' : ''}
          ${book.isNew ? '<span class="bg-[#C39738] text-[#17191C] text-[9px] font-bold px-2 py-0.5 rounded shadow">신간</span>' : ''}
          ${book.isHardcover ? '<span class="bg-[#17191C] text-[#DFC075] text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#C39738]/40 shadow">양장</span>' : ''}
          ${book.isEbook ? '<span class="bg-[#2D333B] text-white text-[9px] font-medium px-1.5 py-0.5 rounded shadow">PDF</span>' : ''}
        </div>
      </div>

      <!-- Book Info Area -->
      <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span class="text-[11px] font-semibold text-[#8C2538] block mb-1">
            ${book.series || '개혁주의 정본'}
          </span>
          <h3 onclick="openBookPreview('${book.id}')" class="font-serifKr text-base font-bold text-[#17191C] group-hover:text-[#6E1B2A] transition-colors line-clamp-1 cursor-pointer" title="${book.title}">
            ${book.title}
          </h3>
          <p class="text-[11px] text-[#7E8694] italic truncate mt-0.5">
            ${book.originalTitle || ''}
          </p>
          <div class="flex items-center space-x-2 text-xs text-[#5E6470] mt-2">
            <span>${book.author}</span>
            ${book.translator ? `<span>•</span><span>${book.translator}</span>` : ''}
          </div>
        </div>

        <div class="pt-3 border-t border-[#EAE5DC]">
          <div class="flex items-baseline space-x-2 mb-3">
            <span class="text-base font-bold text-[#17191C]">${priceFormatted}</span>
            ${book.originalPrice > book.price ? `<span class="text-xs text-[#7E8694] line-through">${originalPriceFormatted}</span>` : ''}
            ${book.discountRate ? `<span class="text-xs text-[#8C2538] font-bold font-sans">${book.discountRate}%</span>` : ''}
          </div>

          <div class="grid grid-cols-2 gap-2">
            <button onclick="openBookPreview('${book.id}')" class="w-full py-2 bg-[#FAF8F5] hover:bg-[#EDE9E1] text-[#17191C] text-xs font-semibold rounded border border-[#E4DFD7] transition-colors cursor-pointer">
              상세보기
            </button>
            <button onclick="addToCart('${book.id}')" class="w-full py-2 bg-[#17191C] hover:bg-[#6E1B2A] text-white text-xs font-semibold rounded transition-colors flex items-center justify-center space-x-1 cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              <span>담기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Global Exports
window.CURRENT_BOOKS = CURRENT_BOOKS;
window.DEFAULT_BOOKS_DATA = DEFAULT_BOOKS_DATA;
window.getUnifiedBooks = getUnifiedBooks;
window.syncDynamicBooks = syncDynamicBooks;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQty = updateCartQty;
window.toggleCart = toggleCart;
window.renderCartDrawer = renderCartDrawer;
window.openBookPreview = openBookPreview;
window.closeBookPreview = closeBookPreview;
window.openStoreCheckout = openStoreCheckout;
window.closeStoreCheckoutModal = closeStoreCheckoutModal;
window.handleAdminTriggerClick = handleAdminTriggerClick;
window.openAdminLoginModal = openAdminLoginModal;
window.closeAdminLoginModal = closeAdminLoginModal;
window.handleAdminLogin = handleAdminLogin;
window.updateAdminUI = updateAdminUI;
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.handleAuthSubmit = handleAuthSubmit;
window.logout = logout;
window.updateHeaderUserUI = updateHeaderUserUI;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleMobileAccordion = toggleMobileAccordion;
window.showToast = showToast;
window.generateBookCardHtml = generateBookCardHtml;

// Initial Auto-runner on DOM load
document.addEventListener('DOMContentLoaded', () => {
  updateAdminUI();
  updateHeaderCartCount();
  updateHeaderUserUI();
});
