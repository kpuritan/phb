import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  ShoppingBag,
  BookOpen,
  Award,
  Bookmark,
  ListOrdered,
  Feather,
  ShieldCheck,
  Truck,
  CreditCard,
  Gift,
  X,
  Plus,
  ChevronRight,
  Check,
  CheckCircle2,
  BookX
} from 'lucide-react';

// ==========================================
// 1. THEOLOGICAL CATALOG & MOCK DATABASE
// ==========================================
export const BOOKS_DATA = [
  {
    id: 'phb-001',
    title: '개혁주의 조직신학 전집 (전4권 세트)',
    originalTitle: 'Reformed Systematic Theology (4 Volumes Set)',
    author: '조엘 비키 & 폴 스몰리',
    originalAuthor: 'Joel R. Beeke & Paul M. Smalley',
    translator: '조계광, 손현선 공역',
    series: '개혁교의학 대계 (Reformed Dogmatics Series)',
    category: 'dogmatics',
    isNew: true,
    isPreorder: true,
    isFeatured: true,
    isHardcover: true,
    isMasterTranslation: true,
    price: 198000,
    originalPrice: 220000,
    discountRate: 10,
    pages: '4,480쪽',
    isbn: '979-11-984501-0-1',
    pubDate: '2026. 10. 15 (출간예정)',
    tagline: '신학과 경건, 학문성과 목회적 적용이 완벽하게 융화된 21세기 최고의 개혁주의 교의학 기념비적 대작',
    coverGradient: 'from-[#1a1c20] via-[#2d1b24] to-[#121417]',
    coverAccent: '#C39738',
    confessionTag: '웨스트민스터 신앙고백서 1~33장 전편 해설',
    description: `역사적 개혁주의 전통과 청교도 체험적 영성을 평생 연구해 온 조엘 비키 박사와 폴 스몰리 교수가 8년여에 걸쳐 완성한 4부작 조직신학 전집입니다. 계시론과 신론, 인간론과 기독론, 구원론과 교회론, 종말론에 이르는 기독교 교리 전체를 개혁신학적 정합성과 청교도적 목회적 영성으로 풀어내었습니다.`,
    toc: [
      '제1권: 계시론과 신론 (Revelation and God)',
      '제2권: 인간론과 기독론 (Man and Christ)',
      '제3권: 성령론과 구원론 (Holy Spirit and Salvation)',
      '제4권: 교회론과 종말론 (Church and Last Things)',
      '특별 부록: 개혁주의 교의학 용어사전 및 역사적 신앙고백 대조표'
    ],
    excerpt: `“신학이란 하나님을 아는 지식이며, 그분을 경외하고 사랑함으로 예배에 이르게 하는 가장 거룩한 학문이다. 머리로만 체계화된 교리는 죽은 정통에 불과하지만, 성령의 조명 안에서 마음을 뜨겁게 달구는 참된 교의는 영혼을 살리고 하나님을 찬양하게 만든다.” (제1권 서문 중에서)`
  },
  {
    id: 'phb-002',
    title: '죄와 유혹 (청교도 정본 완역판)',
    originalTitle: 'Overcoming Sin and Temptation',
    author: '존 오웬',
    originalAuthor: 'John Owen (1616–1683)',
    translator: '서문강 역',
    series: '오늘을 위한 청교도 보화 01',
    category: 'puritan-gems',
    isNew: false,
    isPreorder: false,
    isFeatured: true,
    isHardcover: true,
    isMasterTranslation: true,
    price: 31500,
    originalPrice: 35000,
    discountRate: 10,
    pages: '584쪽',
    isbn: '979-11-984501-1-8',
    pubDate: '2026. 03. 20',
    tagline: '영적 전쟁과 신자의 내면을 해부하는 청교도 최고의 영혼의 외과의사 존 오웬의 불후의 고전',
    coverGradient: 'from-[#4a121c] via-[#2a0b11] to-[#170508]',
    coverAccent: '#C39738',
    confessionTag: 'WCF 제13장 성화 / 하이델베르크 제126~127문',
    description: `존 오웬의 3대 영적 전쟁 명저인 『신자 안에 남아있는 죄』, 『죄 죽이기』, 『유혹론』을 한 권으로 엮은 정본 완역판입니다. 죄의 기만성과 유혹의 경로를 정밀하게 파헤치고, 복음의 은혜와 성령의 사역으로 승리하는 길을 제시합니다.`,
    toc: [
      '제1부 신자 안에 거하는 죄의 권세와 속임수',
      '제2부 육신의 행실을 죽이는 성령의 사역 (Mortification of Sin)',
      '제3부 유혹의 본질, 위험성, 그리고 파수하는 경건의 방책',
      '해제: 존 오웬의 성화론과 현대 성도를 위한 적용'
    ],
    excerpt: `“죄를 죽이지 않으면 죄가 당신을 죽일 것이다. 성령의 권능 없이 자신의 결단이나 도덕적 노력만으로 죄와 싸우려는 자는 풀을 베어 독초를 박멸하려는 어리석은 농부와 같다.”`
  },
  {
    id: 'phb-003',
    title: '신자의 위로 (하나님의 모든 섭리)',
    originalTitle: 'A Divine Cordial (All Things for Good)',
    author: '토마스 왓슨',
    originalAuthor: 'Thomas Watson (1620–1686)',
    translator: '백금산 역',
    series: '오늘을 위한 청교도 보화 02',
    category: 'puritan-gems',
    isNew: false,
    isPreorder: false,
    isFeatured: false,
    isHardcover: true,
    isMasterTranslation: true,
    price: 19800,
    originalPrice: 22000,
    discountRate: 10,
    pages: '272쪽',
    isbn: '979-11-984501-2-5',
    pubDate: '2026. 01. 10',
    tagline: '로마서 8장 28절에 담긴 하나님의 주권적 사랑과 섭리를 맛보게 하는 가장 감미로운 위로의 샘물',
    coverGradient: 'from-[#1b2b3a] via-[#111e2b] to-[#0a121b]',
    coverAccent: '#C39738',
    confessionTag: '하이델베르크 요리문답 제1문 / WCF 제5장 섭리',
    description: `청교도 설교자 중 가장 유려하고 생생한 문체를 자랑하는 토마스 왓슨의 대표작입니다. 고난과 시련, 심지어 성도의 연약함과 실패까지도 하나님께서 합력하여 영원한 유익을 이루신다는 영광스러운 진리를 선포합니다.`,
    toc: [
      '제1장 최상의 약효를 지닌 영적 강장제: 로마서 8:28 해설',
      '제2장 최선의 것들이 신자에게 유익이 되는 방식',
      '제3장 최악의 것들(환난, 유혹, 상실)조차 신자에게 선을 이루는 섭리',
      '제4장 하나님을 진실로 사랑하는 자들의 12가지 특징'
    ],
    excerpt: `“의사의 손에 들린 메스는 살을 에는 고통을 주지만, 그 목적은 고름을 짜내고 생명을 살리는 데 있다. 하나님의 섭리의 메스 역시 당신을 해치려는 것이 아니라 당신 영혼의 죄의 종기를 도려내기 위함이다.”`
  },
  {
    id: 'phb-004',
    title: '가정예배 성경 가이드 (양장본 완역)',
    originalTitle: 'Family Worship Bible Guide',
    author: '조엘 비키 & 마이클 배럿 외',
    originalAuthor: 'Joel R. Beeke, Michael P. V. Barrett et al.',
    translator: '이원택 역',
    series: '가정예배와 거룩한 유산 01',
    category: 'family',
    isNew: false,
    isPreorder: false,
    isFeatured: true,
    isHardcover: true,
    isMasterTranslation: true,
    price: 49500,
    originalPrice: 55000,
    discountRate: 10,
    pages: '960쪽',
    isbn: '979-11-984501-3-2',
    pubDate: '2026. 05. 12',
    tagline: '창세기부터 요한계시록까지 성경 1,189장 전 장에 대한 가정예배 묵상과 나눔 질문 완벽 수록',
    coverGradient: 'from-[#2e261d] via-[#1f1912] to-[#120e0a]',
    coverAccent: '#C39738',
    confessionTag: '웨스트민스터 예배지침 (가정예배 규범)',
    description: `매일 가정예배를 어떻게 인도해야 할지 막막한 부모와 목회자를 위한 최고의 길잡이입니다. 창세기 1장부터 계시록 22장까지 매 장마다 핵심 개요, 2~3가지 핵심 진리, 자녀들과 함께 나눌 적용 질문과 기도 제목을 명쾌하게 제시합니다.`,
    toc: [
      '제1부 구약 성경 39권 매 장 강해 및 가정 나눔 가이드',
      '제2부 신약 성경 27권 매 장 강해 및 가정 나눔 가이드',
      '부록 1: 청교도의 가정예배 모범과 역사적 지침',
      '부록 2: 연령대별 자녀를 위한 성경 문답 훈련법'
    ],
    excerpt: `“가정은 교회의 작은 묘목장이며, 가정예배는 다음 세대의 마음에 하나님의 진리를 새기는 거룩한 제단이다. 아버지가 제사장이 되어 성경을 펴고 찬송할 때, 그 가정은 지상에 임한 천국의 전초기지가 된다.”`
  },
  {
    id: 'phb-005',
    title: '상한 갈대 (The Bruised Reed)',
    originalTitle: 'The Bruised Reed and Smoking Flax',
    author: '리처드 십스',
    originalAuthor: 'Richard Sibbes (1577–1635)',
    translator: '장호연 역',
    series: '개혁파 영성 클래식 01',
    category: 'puritan-gems',
    isNew: false,
    isPreorder: false,
    isFeatured: false,
    isHardcover: false,
    isMasterTranslation: true,
    price: 16200,
    originalPrice: 18000,
    discountRate: 10,
    pages: '224쪽',
    isbn: '979-11-984501-4-9',
    pubDate: '2025. 11. 30',
    tagline: '‘달콤한 십스(Heavenly Doctor Sibbes)’가 전하는 상하고 꺾인 영혼을 향한 그리스도의 한없는 자비',
    coverGradient: 'from-[#1c2c26] via-[#101c18] to-[#070e0b]',
    coverAccent: '#C39738',
    confessionTag: 'WCF 제14장 구원에 이르는 믿음',
    description: `이사야 42:3의 말씀을 바탕으로, 자신의 무가치함과 죄책감으로 인해 꺾여버린 상한 갈대 같은 신자들을 결코 꺾지 않으시고, 꺼져가는 심지 같은 연약한 믿음을 끄지 않으시는 예수 그리스도의 온유하심을 감동적으로 선포합니다.`,
    toc: [
      '제1장 상한 갈대: 그리스도께서 꺾지 않으시는 자들',
      '제2장 꺼져가는 심지: 그리스도께서 끄지 않으시는 미약한 은혜',
      '제3장 그리스도의 자비와 인내가 신자 안에서 마침내 거둘 승리',
      '제4장 영적 의심과 낙심에 빠진 자들을 위한 목회적 권면'
    ],
    excerpt: `“우리의 연약함이 그리스도의 긍휼을 막지 못하며, 우리의 불완전함이 그분의 사랑을 식게 하지 못한다. 작은 불꽃이라도 연기 속에 살아있다면, 성령께서는 그것을 거룩한 사랑의 화염으로 다시 타오르게 하실 것이다.”`
  },
  {
    id: 'phb-006',
    title: '언약신학 탐구 (The Economy of Covenants)',
    originalTitle: 'The Economy of the Covenants between God and Man',
    author: '헤르만 위트시우스',
    originalAuthor: 'Herman Witsius (1636–1708)',
    translator: '박태현 역 / 김남준 목사 해제',
    series: '개혁교의학 대계 (Reformed Dogmatics Series)',
    category: 'dogmatics',
    isNew: true,
    isPreorder: false,
    isFeatured: false,
    isHardcover: true,
    isMasterTranslation: true,
    price: 68400,
    originalPrice: 76000,
    discountRate: 10,
    pages: '1,120쪽',
    isbn: '979-11-984501-5-6',
    pubDate: '2026. 08. 10',
    tagline: '네덜란드 제2종교개혁(Nadere Reformatie)의 정수이자 성경 전체를 꿰뚫는 언약의 웅장한 체계',
    coverGradient: 'from-[#3a201b] via-[#241310] to-[#120806]',
    coverAccent: '#C39738',
    confessionTag: 'WCF 제7장 하나님과 인간의 언약',
    description: `행위언약과 은혜언약, 구속언약의 삼중적 구조를 통해 구속사의 통일성과 성경 전체의 맥락을 완벽하게 해명한 개혁주의 언약신학의 최고봉입니다. 학문적 엄밀함과 뜨거운 찬양이 결합된 기념비적 저작입니다.`,
    toc: [
      '제1권 행위언약 (The Covenant of Works)',
      '제2권 영원한 구속언약 (The Covenant of Redemption)',
      '제3권 은혜언약의 본질과 그리스도의 중보',
      '제4권 구약 경륜과 신약 경륜의 성례 및 완결'
    ],
    excerpt: `“언약은 하나님께서 피조물인 인간과 나누시는 가장 친밀하고 복된 사귐의 통로이다. 그리스도 안에서 맺어진 은혜언약은 만세 전에 세워진 영원한 작정의 실현이며, 타락한 인류를 영원한 영광으로 이끄는 흔들리지 않는 닻이다.”`
  },
  {
    id: 'phb-007',
    title: '거룩과 확신 (Holiness & Assurance)',
    originalTitle: 'Holiness: Its Nature, Hindrances, Difficulties, and Roots',
    author: 'J. C. 라일',
    originalAuthor: 'J. C. Ryle (1816–1900)',
    translator: '정성욱 역',
    series: '개혁파 영성 클래식 02',
    category: 'puritan-gems',
    isNew: false,
    isPreorder: false,
    isFeatured: false,
    isHardcover: true,
    isMasterTranslation: true,
    price: 27000,
    originalPrice: 30000,
    discountRate: 10,
    pages: '512쪽',
    isbn: '979-11-984501-6-3',
    pubDate: '2025. 10. 05',
    tagline: '19세기 청교도라 불린 J.C. 라일 주교가 선포하는 실천적 성화와 진정한 영적 싸움의 본질',
    coverGradient: 'from-[#1f2633] via-[#121824] to-[#0a0d14]',
    coverAccent: '#C39738',
    confessionTag: 'WCF 제18장 은혜와 구원의 확신',
    description: `신비주의적 성화론이나 안이한 칭의론에 빠진 현대 교회를 향한 날카로운 경종이자, 참된 거룩의 표지와 성도가 마땅히 싸워야 할 영적 전쟁의 무기를 명쾌하게 제시합니다.`,
    toc: [
      '제1장 죄의 실재와 심각성',
      '제2장 성화: 거룩함의 본질과 특성',
      '제3장 영적 전쟁: 십자가 군사의 무장',
      '제4장 구원의 확신과 성도의 견인'
    ],
    excerpt: `“값싼 은혜와 피 흘림 없는 평안을 외치는 이 시대에, 성경은 ‘거룩함이 없이는 아무도 주를 보지 못하리라’고 명백히 선언한다. 거룩은 구원의 조건이 아니라 구원받은 영혼의 필연적 열매이다.”`
  },
  {
    id: 'phb-008',
    title: '그리스도의 영광 (The Glory of Christ)',
    originalTitle: 'Meditations and Discourses on the Glory of Christ',
    author: '존 오웬',
    originalAuthor: 'John Owen (1616–1683)',
    translator: '김홍만 역',
    series: '오늘을 위한 청교도 보화 03',
    category: 'puritan-gems',
    isNew: false,
    isPreorder: false,
    isFeatured: false,
    isHardcover: true,
    isMasterTranslation: true,
    price: 24300,
    originalPrice: 27000,
    discountRate: 10,
    pages: '384쪽',
    isbn: '979-11-984501-7-0',
    pubDate: '2026. 02. 14',
    tagline: '존 오웬이 임종 직전 병상에서 혼신의 힘을 다해 구술한 영혼의 백미이자 기독론 묵상의 절정',
    coverGradient: 'from-[#3a1a2b] via-[#240e1b] to-[#14060e]',
    coverAccent: '#C39738',
    confessionTag: 'WCF 제8장 중보자 그리스도',
    description: `존 오웬 생애 마지막 대작으로, 성자 하나님의 영원한 신성, 성육신하신 그리스도의 인격, 그리고 지금도 하늘 보좌에서 중보하시는 대제사장의 영광을 신령한 통찰로 묵상합니다.`,
    toc: [
      '제1장 믿음으로 바라보는 그리스도의 인격의 영광',
      '제2장 그리스도의 지혜, 사랑, 그리고 중보 사역의 영광',
      '제3장 얼굴과 얼굴을 맞대어 보게 될 내세의 영광',
      '제4장 그리스도의 영광을 묵상함이 주는 성화의 능력'
    ],
    excerpt: `“믿음으로 그리스도의 영광을 바라보는 것은 우리 영혼이 이 땅에서 누릴 수 있는 가장 고귀한 특권이며, 장차 천국에서 누릴 완전한 영화(Glorification)의 첫 열매이다.”`
  }
];

export const PURITAN_QUOTES = [
  {
    quote: "그리스도를 아는 지식이 없는 거룩은 참된 거룩이 아니며, 지식만 있고 마음의 경건이 없는 신앙은 죽은 껍데기에 불과하다.",
    author: "토마스 왓슨 (Thomas Watson)",
    source: "『신자의 위로 (A Divine Cordial)』 중",
    theme: "지식과 경건"
  },
  {
    quote: "죄를 죽이지 않으면 죄가 당신을 죽일 것이다. 성령의 불로 당신의 마음을 채우지 않으면 죄의 독초가 영혼을 잠식할 것이다.",
    author: "존 오웬 (John Owen)",
    source: "『죄 죽이기 (Mortification of Sin)』 중",
    theme: "성화와 영적 전쟁"
  },
  {
    quote: "그리스도께서는 상한 갈대를 꺾지 않으시며, 꺼져가는 심지를 끄지 않으신다. 우리의 가장 연약한 믿음조차 그분의 크신 자비 안에 안식한다.",
    author: "리처드 십스 (Richard Sibbes)",
    source: "『상한 갈대 (The Bruised Reed)』 중",
    theme: "그리스도의 온유"
  },
  {
    quote: "가정예배의 제단에 피어오르는 찬송과 기도는 사탄의 권세를 무너뜨리고 하나님의 은혜를 가정에 머물게 하는 거룩한 축복의 통로이다.",
    author: "조엘 비키 (Joel R. Beeke)",
    source: "『가정예배 성경 가이드』 서문 중",
    theme: "가정예배와 신앙전수"
  }
];

export const CONFESSIONS_MAP = [
  {
    standard: '웨스트민스터 소요리문답',
    section: '제1문: 사람의 제일 되는 목적',
    content: '“사람의 제일 되는 목적은 하나님을 영화롭게 하고 영원토록 그분을 즐거워하는 것이다.”',
    matchedBookId: 'phb-001',
    bookTitle: '개혁주의 조직신학 전집 (조엘 비키 & 폴 스몰리)',
    recommendation: '교리의 기초부터 신자의 궁극적 영광까지 신학 전체를 예배로 연결하는 필독서'
  },
  {
    standard: '웨스트민스터 신앙고백서',
    section: '제13장: 성화 (Sanctification)',
    content: '“그리스도의 죽으심과 부활의 효능으로 말미암아서… 죄의 지배 권세가 파괴되고, 정욕들이 점점 약화되며 죽어간다.”',
    matchedBookId: 'phb-002',
    bookTitle: '죄와 유혹 (존 오웬 정본 완역판)',
    recommendation: '신자 안에 남아있는 잔재하는 죄의 실체와 성령의 성화 메커니즘을 규명하는 정본'
  },
  {
    standard: '하이델베르크 요리문답',
    section: '제1문: 당신의 유일한 위로는 무엇입니까?',
    content: '“살아서나 죽어서나 나는 나의 것이 아니요, 몸도 영혼도 나의 신실하신 구주 예수 그리스도의 것입니다.”',
    matchedBookId: 'phb-003',
    bookTitle: '신자의 위로 (토마스 왓슨)',
    recommendation: '로마서 8:28을 통해 모든 고난조차 성도의 선을 이루는 하나님의 섭리를 맛보게 하는 영적 강장제'
  },
  {
    standard: '웨스트민스터 신앙고백서',
    section: '제7장: 하나님과 인간의 언약',
    content: '“하나님과 피조물 사이의 거리가 너무나 멀기 때문에… 하나님 편에서 언약의 방식으로 자신을 낮추사 교제하신다.”',
    matchedBookId: 'phb-006',
    bookTitle: '언약신학 탐구 (헤르만 위트시우스)',
    recommendation: '행위언약과 은혜언약의 통일성을 성경신학적으로 논증한 개혁교의학의 금자탑'
  }
];

// ==========================================
// 2. MAIN APPLICATION COMPONENT
// ==========================================
export default function PuritanHeritageBooksApp() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([
    { book: BOOKS_DATA[0], quantity: 1 },
    { book: BOOKS_DATA[1], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [previewBook, setPreviewBook] = useState(null);
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  const [activeConfessionTab, setActiveConfessionTab] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Quote Rotator
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIdx((prev) => (prev + 1) % PURITAN_QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Cart Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const freeShippingThreshold = 50000;
  const isFreeShipping = cartTotal >= freeShippingThreshold;
  const shippingCost = cartTotal === 0 ? 0 : isFreeShipping ? 0 : 3500;
  const finalTotal = cartTotal + shippingCost;

  // Cart Handlers
  const addToCart = (book) => {
    setCart(prev => {
      const existing = prev.find(item => item.book.id === book.id);
      if (existing) {
        return prev.map(item =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { book, quantity: 1 }];
    });
    showToast(`『${book.title}』이(가) 장바구니에 담겼습니다.`);
  };

  const updateQuantity = (bookId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.book.id === bookId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (bookId) => {
    setCart(prev => prev.filter(item => item.book.id !== bookId));
  };

  // Filtered Books
  const filteredBooks = useMemo(() => {
    return BOOKS_DATA.filter(book => {
      const matchesCat =
        selectedCategory === 'all' ||
        (selectedCategory === 'puritan-gems' && book.category === 'puritan-gems') ||
        (selectedCategory === 'dogmatics' && book.category === 'dogmatics') ||
        (selectedCategory === 'family' && book.category === 'family') ||
        (selectedCategory === 'ebook' && book.isEbook) ||
        (selectedCategory === 'new' && (book.isNew || book.isPreorder));

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.translator.toLowerCase().includes(q) ||
        book.series.toLowerCase().includes(q) ||
        book.originalTitle.toLowerCase().includes(q);

      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative text-[#17191C] bg-[#F8F7F4] font-sans antialiased selection:bg-[#6E1B2A] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#17191C] text-[#F8F7F4] border-l-4 border-[#C39738] px-5 py-3.5 rounded shadow-2xl flex items-center space-x-3 text-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#C39738]" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* 1. TOP UTILITY BANNER */}
      <div className="bg-[#17191C] text-[#E4DFD7] text-xs py-2 px-4 border-b border-[#2B2F36]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="bg-[#6E1B2A] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
              학술 신간
            </span>
            <p className="truncate text-[#E4DFD7]">
              조엘 비키 & 폴 스몰리 『개혁주의 조직신학 전집 (전4권)』 완간 세트 특별 사전예약 접수 중
            </p>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-[#A6ADB8]">
            <a href="#shipping" className="hover:text-[#C39738] transition-colors">주문/배송조회</a>
            <span className="text-[#3A3F4A]">|</span>
            <a href="#login" className="hover:text-[#C39738] transition-colors">마이페이지</a>
            <span className="text-[#3A3F4A]">|</span>
            <a href="#about" className="hover:text-[#C39738] transition-colors font-semibold text-[#E4DFD7]">
              출판 사명선언문
            </a>
            <span className="text-[#3A3F4A]">|</span>
            <span className="text-[#C39738] font-serif font-semibold tracking-wider">KR / EN</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER & LOGO */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E4DFD7] transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-20 gap-3 xl:gap-6">
            
            <a href="#" className="flex items-center space-x-3 flex-shrink-0 group">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded bg-[#17191C] border-2 border-[#C39738] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                <div className="text-center text-[#C39738]">
                  <span className="font-serif text-base sm:text-lg font-black leading-none block">PHB</span>
                  <span className="text-[7px] tracking-widest text-[#E4DFD7] uppercase font-bold">Veritas</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="font-serif text-base sm:text-lg lg:text-xl xl:text-2xl font-bold tracking-tight text-[#17191C] group-hover:text-[#6E1B2A] transition-colors whitespace-nowrap">
                  PURITAN HERITAGE BOOKS
                </div>
                <div className="text-[11px] text-[#5E6470] tracking-wider flex items-center space-x-1.5 whitespace-nowrap">
                  <span>퓨리탄 헤리티지 북스</span>
                  <span className="text-[#C39738]">•</span>
                  <span className="text-[10px] text-[#8C2538] font-semibold">역사적 개혁주의 & 청교도 정본 출판사</span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation (3 Menus: PHB 소개, 도서몰, 전자책) */}
            <nav className="hidden md:flex items-center space-x-5 xl:space-x-7 flex-shrink-0">
              <a 
                href="#about" 
                className="text-xs sm:text-sm font-semibold text-[#17191C] hover:text-[#6E1B2A] transition-colors py-2 border-b-2 border-transparent hover:border-[#6E1B2A] whitespace-nowrap flex-shrink-0"
              >
                PHB 소개
              </a>
              <button 
                onClick={() => { setSelectedCategory('all'); document.getElementById('catalog-section')?.scrollIntoView({behavior: 'smooth'}); }}
                className="text-xs sm:text-sm font-semibold text-[#17191C] hover:text-[#6E1B2A] transition-colors py-2 border-b-2 border-transparent hover:border-[#6E1B2A] whitespace-nowrap flex-shrink-0"
              >
                도서몰
              </button>
              <button 
                onClick={() => { setSelectedCategory('ebook'); document.getElementById('catalog-section')?.scrollIntoView({behavior: 'smooth'}); }}
                className="text-xs sm:text-sm font-semibold text-[#17191C] hover:text-[#6E1B2A] transition-colors py-2 border-b-2 border-transparent hover:border-[#6E1B2A] whitespace-nowrap flex-shrink-0 flex items-center gap-1.5"
              >
                <span>전자책(ebook)</span>
                <span className="text-[10px] bg-[#6E1B2A] text-white px-1.5 py-0.2 rounded font-sans font-medium">ePub</span>
              </button>
            </nav>

            {/* Search, Login, Signup and Cart */}
            <div className="flex items-center space-x-2 sm:space-x-3.5 flex-shrink-0">
              <div className="relative hidden lg:block w-36 xl:w-48 flex-shrink-0">
                <input
                  type="text"
                  placeholder="도서명, 저자 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F8F7F4] border border-[#E4DFD7] text-xs rounded-full pl-8 pr-7 py-1.5 focus:outline-none focus:border-[#C39738] focus:ring-1 focus:ring-[#C39738] transition-all"
                />
                <div className="absolute left-2.5 top-2 text-[#5E6470]">
                  <Search className="w-3.5 h-3.5" />
                </div>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-[#A6ADB8] hover:text-[#17191C]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Login & Sign Up Actions */}
              <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs font-medium">
                <button
                  onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
                  className="text-[#17191C] hover:text-[#6E1B2A] px-2 py-1.5 rounded transition-colors whitespace-nowrap font-medium"
                >
                  로그인
                </button>
                <span className="text-[#E4DFD7]">|</span>
                <button
                  onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
                  className="bg-[#6E1B2A] hover:bg-[#8C2538] text-white px-3 py-1.5 rounded text-xs font-semibold transition-all shadow-xs hover:shadow whitespace-nowrap border border-[#8C2538]"
                >
                  회원가입
                </button>
              </div>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 sm:p-2.5 rounded-full bg-[#F8F7F4] hover:bg-[#EDE9E1] border border-[#E4DFD7] text-[#17191C] transition-all group flex-shrink-0"
                aria-label="장바구니 열기"
              >
                <ShoppingBag className="w-5 h-5 text-[#17191C] group-hover:text-[#6E1B2A] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#6E1B2A] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 3. HERO EXHIBITION SECTION */}
      <section className="relative bg-[#17191C] text-white overflow-hidden py-12 lg:py-20 border-b-4 border-[#C39738]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#6E1B2A] text-[#F8F7F4] text-xs font-semibold px-3 py-1 rounded tracking-wide uppercase border border-[#8C2538]">
                  2026 기념비적 완간 역작
                </span>
                <span className="bg-[#17191C] text-[#C39738] text-xs font-semibold px-3 py-1 rounded border border-[#C39738]/50 flex items-center gap-1.5 font-serif">
                  <Award className="w-3.5 h-3.5" />
                  SOLI DEO GLORIA
                </span>
                <span className="text-[#A6ADB8] text-xs">
                  양장 금박 한정판 • 정본 완역
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-xs sm:text-sm font-serif tracking-[0.25em] text-[#C39738] uppercase">
                  Monumental Publication • Reformed Systematic Theology
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight tracking-tight">
                  개혁주의 조직신학 전집 <br className="hidden sm:inline" />
                  <span className="text-[#C39738] font-normal text-2xl sm:text-3xl lg:text-4xl">
                    (전 4권 완간 세트)
                  </span>
                </h1>
              </div>

              <div className="border-l-2 border-[#C39738] pl-4 space-y-1 text-sm text-[#E4DFD7]">
                <p className="font-medium text-base text-white">
                  저자: <span className="text-[#DFC075]">조엘 비키 & 폴 스몰리</span> (Joel R. Beeke & Paul M. Smalley)
                </p>
                <p className="text-xs text-[#A6ADB8]">
                  역자: 조계광, 손현선 공역 • 한국개혁주의신학회 추천도서
                </p>
              </div>

              <p className="text-[#D3D7DF] text-sm sm:text-base leading-relaxed max-w-2xl">
                16~17세기 정통 청교도 신학과 역사적 개혁교의학의 정수를 21세기 현대 언어로 집대성한 필생의 대작. 
                단순한 학문적 체계를 넘어, 모든 교리를 <strong className="text-white">“하나님을 아는 지식과 뜨거운 찬양, 거룩한 순종”</strong>으로 승화시킨 기념비적 전집입니다.
              </p>

              <div className="bg-[#23272D] border border-[#3A3F4A] rounded-lg p-4 inline-flex flex-wrap items-center gap-6">
                <div>
                  <span className="text-xs text-[#A6ADB8] block">사전예약 10% 특별 혜택가</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-[#DFC075] font-serif">198,000원</span>
                    <span className="text-xs text-[#7E8694] line-through">220,000원</span>
                  </div>
                </div>
                <div className="border-l border-[#3A3F4A] pl-6 text-xs text-[#E4DFD7] space-y-0.5">
                  <p className="text-[#DFC075] font-semibold flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5" />
                    한정 특전: 원전 대조 요약 소책자 증정
                  </p>
                  <p className="text-[#A6ADB8]">전국 무료 배송 • 고급 양장 하드커버 슬립케이스</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => addToCart(BOOKS_DATA[0])}
                  className="bg-[#6E1B2A] hover:bg-[#8C2538] text-white px-7 py-3.5 rounded font-semibold text-sm transition-all shadow-lg flex items-center space-x-2 border border-[#9A2D42]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>사전예약 구매하기 (담기)</span>
                </button>

                <button
                  onClick={() => setPreviewBook(BOOKS_DATA[0])}
                  className="bg-transparent hover:bg-[#C39738]/10 text-[#DFC075] border border-[#C39738] px-6 py-3.5 rounded font-semibold text-sm transition-all flex items-center space-x-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>목차 및 서문 미리보기</span>
                </button>
              </div>

            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group cursor-pointer" onClick={() => setPreviewBook(BOOKS_DATA[0])}>
                <div className="relative w-64 sm:w-72 md:w-80 h-[400px] sm:h-[450px] md:h-[480px] bg-gradient-to-br from-[#1b1e23] via-[#241a1f] to-[#121417] rounded-r-lg rounded-l-sm shadow-2xl border border-[#C39738]/40 p-6 flex flex-col justify-between transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
                  
                  <div className="text-center space-y-1">
                    <span className="font-serif text-[10px] tracking-[0.3em] text-[#DFC075] uppercase block">
                      Puritan Heritage Classics
                    </span>
                    <div className="w-12 h-0.5 bg-[#C39738] mx-auto opacity-70"></div>
                  </div>

                  <div className="text-center space-y-3">
                    <p className="italic text-xs text-[#DFC075]/80">
                      Reformed Systematic Theology
                    </p>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                      개혁주의<br />
                      조직신학 전집
                    </h2>
                    <span className="inline-block px-2.5 py-0.5 bg-[#6E1B2A]/80 border border-[#C39738]/40 text-[#DFC075] text-[10px] font-semibold tracking-wider uppercase rounded">
                      완간 4권 세트 (정본 완역)
                    </span>
                  </div>

                  <div className="text-center pt-4 border-t border-[#C39738]/30">
                    <p className="text-xs text-[#E4DFD7] font-medium">
                      조엘 비키 • 폴 스몰리 지음
                    </p>
                    <p className="font-serif text-[9px] text-[#A6ADB8] tracking-widest uppercase mt-0.5">
                      Puritan Heritage Books
                    </p>
                  </div>

                  <div className="absolute bottom-16 right-6 w-12 h-12 rounded-full border-2 border-[#C39738] bg-[#17191C]/90 flex items-center justify-center shadow-lg transform rotate-12">
                    <span className="text-[7px] font-serif font-bold text-[#DFC075] text-center leading-tight">
                      PHB<br />MASTER
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CURATED CATALOG & TABBED BOOK GRID */}
      <section id="catalog-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="font-serif text-xs font-bold tracking-[0.25em] text-[#6E1B2A] uppercase">
            Scholarly Editions & Classic Literature
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#17191C]">
            PHB 출간 도서 및 전집 아카이브
          </h2>
          <div className="w-16 h-1 bg-[#C39738] mx-auto mt-2"></div>
          <p className="text-sm text-[#5E6470] leading-relaxed">
            바른 신학과 뜨거운 경건이 결합된 16~17세기 청교도 거장들의 불후의 원전과 현대 최고 석학들의 개혁신학 표준서를 만나보십시오.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10">
          {[
            { key: 'all', label: '전체 도서 (All)' },
            { key: 'puritan-gems', label: '청교도 보화' },
            { key: 'dogmatics', label: '조직신학 • 교의학' },
            { key: 'family', label: '가정예배 • 경건' },
            { key: 'ebook', label: '전자책 (eBook)' },
            { key: 'new', label: '신간 • 사전예약' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedCategory(tab.key)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === tab.key
                  ? 'bg-[#6E1B2A] text-white shadow-md font-semibold'
                  : 'bg-white text-[#5E6470] hover:bg-[#EDE9E1] border border-[#E4DFD7]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {searchQuery && (
          <div className="mb-6 p-3 bg-white border border-[#E4DFD7] rounded-md text-xs text-[#5E6470] flex items-center justify-between">
            <span>
              검색어 <strong>"{searchQuery}"</strong>에 대한 도서 <strong>{filteredBooks.length}권</strong>이 검색되었습니다.
            </span>
            <button onClick={() => setSearchQuery('')} className="text-[#6E1B2A] font-semibold hover:underline">
              검색 초기화
            </button>
          </div>
        )}

        {filteredBooks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-[#E4DFD7] p-8">
            <BookX className="w-12 h-12 text-[#A6ADB8] mx-auto mb-3" />
            <h3 className="text-base font-serif font-semibold text-[#17191C]">일치하는 도서가 없습니다.</h3>
            <p className="text-xs text-[#5E6470] mt-1">다른 검색어나 카테고리를 선택해 주십시오.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg border border-[#E4DFD7] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="p-6 bg-[#F8F7F4] flex justify-center items-center relative border-b border-[#E4DFD7] overflow-hidden">
                  <div 
                    onClick={() => setPreviewBook(book)}
                    className={`cursor-pointer w-44 h-64 bg-gradient-to-br ${book.coverGradient} rounded-r-md rounded-l-xs shadow-lg p-4 flex flex-col justify-between transform transition-all duration-300 group-hover:scale-105 group-hover:-rotate-1 relative`}
                  >
                    <div className="relative z-10 text-center">
                      <span className="font-serif text-[8px] tracking-wider text-[#DFC075] uppercase block truncate">
                        {book.series.split('(')[0]}
                      </span>
                    </div>

                    <div className="relative z-10 text-center my-auto space-y-1">
                      <h3 className="font-serif text-base font-bold text-white leading-snug">
                        {book.title.split('(')[0]}
                      </h3>
                      <p className="italic text-[9px] text-[#DFC075]/70 truncate">
                        {book.originalTitle}
                      </p>
                    </div>

                    <div className="relative z-10 text-center border-t border-[#C39738]/20 pt-2">
                      <p className="text-[10px] text-[#E4DFD7] font-medium">
                        {book.author}
                      </p>
                      <span className="font-serif text-[7px] text-[#A6ADB8] tracking-widest">
                        PHB CLASSICS
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-20">
                    {book.isPreorder && (
                      <span className="bg-[#6E1B2A] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
                        사전예약
                      </span>
                    )}
                    {book.isHardcover && (
                      <span className="bg-[#17191C] text-[#C39738] text-[9px] font-medium px-2 py-0.5 rounded border border-[#C39738]/40 shadow">
                        양장본
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-[#17191C]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-2 p-4 z-30">
                    <button
                      onClick={() => setPreviewBook(book)}
                      className="w-full bg-[#DFC075] hover:bg-[#C39738] text-[#17191C] text-xs font-semibold py-2 px-3 rounded shadow flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>목차 & 본문 미리보기</span>
                    </button>
                    <button
                      onClick={() => addToCart(book)}
                      className="w-full bg-[#6E1B2A] hover:bg-[#8C2538] text-white text-xs font-semibold py-2 px-3 rounded shadow flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>장바구니 담기</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-semibold text-[#8C2538] tracking-wider uppercase block">
                      {book.series}
                    </span>
                    <h3 
                      onClick={() => setPreviewBook(book)}
                      className="font-serif font-bold text-base text-[#17191C] hover:text-[#6E1B2A] cursor-pointer transition-colors line-clamp-1"
                    >
                      {book.title}
                    </h3>
                    <p className="text-xs text-[#5E6470]">
                      <span className="font-medium text-[#17191C]">{book.author}</span> 지음
                      <span className="text-[#A6ADB8]"> • </span>
                      <span>{book.translator}</span>
                    </p>
                    <p className="text-xs text-[#7E8694] line-clamp-2 pt-1">
                      {book.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E4DFD7] flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-sm font-bold text-[#6E1B2A]">
                          {book.discountRate}%
                        </span>
                        <span className="text-base font-bold text-[#17191C]">
                          {book.price.toLocaleString()}원
                        </span>
                      </div>
                      <span className="text-[11px] text-[#A6ADB8] line-through">
                        {book.originalPrice.toLocaleString()}원
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(book)}
                      className="p-2.5 rounded bg-[#F8F7F4] hover:bg-[#6E1B2A] text-[#17191C] hover:text-white border border-[#E4DFD7] transition-all"
                      title="장바구니 담기"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. EXPERIENTIAL RELIGION & CONFESSIONAL ANCHOR */}
      <section id="quotes" className="bg-[#EDE9E1] py-16 border-y border-[#E4DFD7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Weekly Quote */}
            <div className="lg:col-span-6 bg-white p-8 sm:p-10 rounded-xl border border-[#E4DFD7] shadow-sm flex flex-col justify-between relative">
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#C39738]"></span>
                  <span className="text-xs font-serif font-bold text-[#6E1B2A] tracking-wider uppercase">
                    Weekly Puritan Excerpt • 주간 청교도 묵상
                  </span>
                </div>

                <blockquote className="font-serif text-lg sm:text-xl text-[#17191C] leading-relaxed font-normal mb-6 min-h-[100px]">
                  "{PURITAN_QUOTES[currentQuoteIdx].quote}"
                </blockquote>
              </div>

              <div className="border-t border-[#E4DFD7] pt-4 flex items-center justify-between">
                <div>
                  <p className="font-serif font-semibold text-sm text-[#17191C]">
                    {PURITAN_QUOTES[currentQuoteIdx].author}
                  </p>
                  <p className="text-xs text-[#5E6470]">
                    {PURITAN_QUOTES[currentQuoteIdx].source}
                  </p>
                </div>

                <div className="flex space-x-1.5">
                  {PURITAN_QUOTES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuoteIdx(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentQuoteIdx === idx ? 'bg-[#6E1B2A] w-6' : 'bg-[#E4DFD7]'
                      }`}
                      aria-label={`명언 ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Confessional Anchor */}
            <div id="confessions" className="lg:col-span-6 bg-[#17191C] text-white p-8 sm:p-10 rounded-xl border border-[#3A3F4A] shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-[#C39738]" />
                    <span className="text-xs font-serif font-bold text-[#DFC075] tracking-wider uppercase">
                      Confessional Anchor • 표준 신앙고백 연계
                    </span>
                  </div>
                  <span className="text-[11px] text-[#A6ADB8]">
                    웨스트민스터 & 하이델베르크
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white mb-4">
                  교리와 문답으로 만나는 PHB 추천 도서
                </h3>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {CONFESSIONS_MAP.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveConfessionTab(idx)}
                      className={`p-2.5 text-left rounded text-xs transition-all border ${
                        activeConfessionTab === idx
                          ? 'bg-[#6E1B2A] text-white border-[#8C2538] font-semibold'
                          : 'bg-[#23272D] text-[#A6ADB8] border-[#3A3F4A] hover:bg-[#2B3038]'
                      }`}
                    >
                      <span className="block text-[10px] text-[#DFC075] truncate">{item.standard}</span>
                      <span className="block truncate font-medium">{item.section.split(':')[0]}</span>
                    </button>
                  ))}
                </div>

                <div className="bg-[#23272D] border border-[#3A3F4A] rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#DFC075] font-semibold font-serif">
                      {CONFESSIONS_MAP[activeConfessionTab].section}
                    </span>
                    <span className="text-[10px] text-[#A6ADB8] bg-[#17191C] px-2 py-0.5 rounded">
                      {CONFESSIONS_MAP[activeConfessionTab].standard}
                    </span>
                  </div>
                  <p className="text-xs text-[#E4DFD7] font-serif leading-relaxed italic">
                    {CONFESSIONS_MAP[activeConfessionTab].content}
                  </p>
                  <div className="border-t border-[#3A3F4A] pt-2">
                    <span className="text-[10px] text-[#A6ADB8] block">연계 필독 추천 도서:</span>
                    <p className="text-xs font-semibold text-[#DFC075]">
                      『{CONFESSIONS_MAP[activeConfessionTab].bookTitle}』
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#3A3F4A] flex items-center justify-between">
                <span className="text-xs text-[#A6ADB8]">
                  개혁교회 역사적 표준문서 정본 완역 출판
                </span>
                <button
                  onClick={() => {
                    const targetBook = BOOKS_DATA.find(b => b.id === CONFESSIONS_MAP[activeConfessionTab].matchedBookId);
                    if (targetBook) setPreviewBook(targetBook);
                  }}
                  className="text-xs font-semibold text-[#DFC075] hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>해당 도서 상세보기</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. BRAND STORY & MISSION */}
      <section id="about" className="py-16 bg-[#F8F7F4] border-b border-[#E4DFD7] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#6E1B2A] text-[#DFC075] flex items-center justify-center font-serif font-bold text-lg mb-4 shadow-md">
            PHB
          </div>
          <span className="font-serif text-xs font-bold tracking-[0.3em] text-[#6E1B2A] uppercase block mb-2">
            Publishing Mission Statement • 사명선언문
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#17191C] mb-6">
            “오직 그리스도(Solus Christus), 오직 하나님께 영광(Soli Deo Gloria)”
          </h2>
          <p className="text-sm sm:text-base text-[#5E6470] font-serif leading-loose max-w-3xl mx-auto">
            퓨리탄 헤리티지 북스(Puritan Heritage Books)는 바른 교리와 뜨거운 경건이 결합된 역사적 개혁주의와 청교도 고전 문헌을 한국 교회와 성도들에게 가장 신실한 원전 번역과 단정한 만듦새로 전합니다. 
            영혼을 각성시키고 교회를 견고히 세우는 신학적 보화를 다음 세대에게 변함없이 전수하겠습니다.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs text-[#5E6470]">
            <span className="bg-white border border-[#E4DFD7] px-3 py-1.5 rounded-full">
              웨스트민스터 표준문서 (Westminster Standards)
            </span>
            <span className="bg-white border border-[#E4DFD7] px-3 py-1.5 rounded-full">
              일치 신조 삼형식 (Three Forms of Unity)
            </span>
            <span className="bg-white border border-[#E4DFD7] px-3 py-1.5 rounded-full">
              종교개혁 5대 강령 (Five Solas)
            </span>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-[#17191C] text-[#A6ADB8] pt-16 pb-12 text-xs border-t-2 border-[#C39738]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2B2F36]">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded bg-[#23272D] border border-[#C39738] flex items-center justify-center font-serif font-bold text-[#C39738] text-sm">
                  PHB
                </div>
                <div>
                  <span className="font-serif text-base font-bold text-white tracking-wider block">
                    PURITAN HERITAGE BOOKS
                  </span>
                  <span className="text-[10px] text-[#A6ADB8]">
                    도서출판 퓨리탄 헤리티지 북스
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#7E8694] leading-relaxed">
                본 출판사는 16~17세기 역사적 개혁교의학과 청교도 체험적 신앙 문헌을 정본 완역하여 보급하는 기독교 학술 출판사입니다.
              </p>
              <div className="text-[11px] text-[#5E6470] space-y-1">
                <p>대표자: 김은총 | 출판사 신고번호: 제2026-000142호</p>
                <p>사업자등록번호: 120-88-00000 | 통신판매업신고: 2026-서울마포-0000</p>
                <p>본사: 서울특별시 마포구 독막로 120 헤리티지빌딩 4층 | 파주 물류센터 운영</p>
                <p>고객지원: 02-334-1616 (평일 09:00~17:00) | contact@puritanheritage.kr</p>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">
                Publishing Archives
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#" className="hover:text-[#DFC075] transition-colors">청교도 보화 시리즈 (Puritan Gems)</a></li>
                <li><a href="#" className="hover:text-[#DFC075] transition-colors">개혁교의학 대계 (Reformed Dogmatics)</a></li>
                <li><a href="#" className="hover:text-[#DFC075] transition-colors">가정예배와 거룩한 유산 시리즈</a></li>
                <li><a href="#" className="hover:text-[#DFC075] transition-colors">존 오웬 전집 (Works of John Owen)</a></li>
                <li><a href="#" className="hover:text-[#DFC075] transition-colors">학술 논단 및 역자 주해 아카이브</a></li>
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">
                PHB Theological Letter & New Releases
              </h4>
              <p className="text-xs text-[#7E8694] leading-relaxed">
                PHB의 신간 출간 소식, 청교도 묵상 서신 및 학술 할인 이벤트를 이메일로 가장 먼저 받아보세요.
              </p>
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    placeholder="이메일 주소를 입력하십시오"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-[#23272D] border border-[#3A3F4A] text-xs text-white rounded-l px-3.5 py-2.5 w-full focus:outline-none focus:border-[#C39738]"
                  />
                  <button
                    type="submit"
                    className="bg-[#6E1B2A] hover:bg-[#8C2538] text-white text-xs font-semibold px-4 py-2.5 rounded-r transition-colors border border-[#8C2538]"
                  >
                    구독
                  </button>
                </div>
                {newsletterSuccess && (
                  <p className="text-[11px] text-[#DFC075] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    구독 신청이 완료되었습니다. 환영 서신을 확인해 주세요.
                  </p>
                )}
              </form>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#5E6470] gap-3">
            <p>© 2026 Puritan Heritage Books. All rights reserved. Soli Deo Gloria.</p>
            <div className="flex space-x-4">
              <a href="#privacy" className="hover:text-white">개인정보처리방침</a>
              <a href="#terms" className="hover:text-white">이용약관</a>
              <a href="#confession" className="hover:text-white">도서출판 사명문</a>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL 1: BOOK PREVIEW MODAL */}
      {previewBook && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F8F7F4] text-[#17191C] w-full max-w-3xl rounded-xl border border-[#C39738] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
            
            <div className="bg-[#17191C] text-white p-4 px-6 flex justify-between items-center border-b border-[#C39738]">
              <div className="flex items-center space-x-2">
                <span className="font-serif text-xs font-bold text-[#DFC075] tracking-widest uppercase">
                  Book Preview & Content Table
                </span>
                <span className="text-[#3A3F4A]">|</span>
                <span className="text-xs text-[#A6ADB8] truncate max-w-xs">
                  {previewBook.title}
                </span>
              </div>
              <button
                onClick={() => setPreviewBook(null)}
                className="text-[#A6ADB8] hover:text-white p-1 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-sm font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start pb-6 border-b border-[#E4DFD7]">
                <div className="sm:col-span-4 flex justify-center">
                  <div className={`w-36 h-52 bg-gradient-to-br ${previewBook.coverGradient} rounded-r rounded-l-xs shadow-lg p-3 flex flex-col justify-between text-center relative`}>
                    <span className="text-[7px] font-serif text-[#DFC075] tracking-wider uppercase block">
                      {previewBook.series.split('(')[0]}
                    </span>
                    <h4 className="text-xs font-serif font-bold text-white leading-snug">
                      {previewBook.title.split('(')[0]}
                    </h4>
                    <span className="text-[8px] text-[#E4DFD7]">
                      {previewBook.author}
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-8 space-y-2">
                  <span className="text-xs font-semibold text-[#8C2538] block">{previewBook.series}</span>
                  <h3 className="text-xl font-serif font-bold text-[#17191C]">{previewBook.title}</h3>
                  <p className="text-xs text-[#5E6470] italic">{previewBook.originalTitle}</p>
                  
                  <div className="grid grid-cols-2 gap-y-1 text-xs text-[#5E6470] pt-2">
                    <p><strong className="text-[#17191C]">저자:</strong> {previewBook.author}</p>
                    <p><strong className="text-[#17191C]">역자:</strong> {previewBook.translator}</p>
                    <p><strong className="text-[#17191C]">정가:</strong> {previewBook.price.toLocaleString()}원</p>
                    <p><strong className="text-[#17191C]">분량:</strong> {previewBook.pages}</p>
                    <p><strong className="text-[#17191C]">출간일:</strong> {previewBook.pubDate}</p>
                    <p><strong className="text-[#17191C]">ISBN:</strong> {previewBook.isbn}</p>
                  </div>

                  <div className="pt-2">
                    <span className="bg-[#EDE9E1] text-[#6E1B2A] text-[11px] font-semibold px-2.5 py-1 rounded border border-[#E4DFD7] inline-block">
                      {previewBook.confessionTag}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif font-bold text-base text-[#17191C] flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-[#C39738]" />
                  도서 상세 소개
                </h4>
                <p className="text-[#5E6470] leading-relaxed text-xs sm:text-sm bg-white p-4 rounded border border-[#E4DFD7]">
                  {previewBook.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif font-bold text-base text-[#17191C] flex items-center gap-1.5">
                  <ListOrdered className="w-4 h-4 text-[#C39738]" />
                  도서 목차 (Table of Contents)
                </h4>
                <div className="bg-white p-4 rounded border border-[#E4DFD7] space-y-2 text-xs sm:text-sm">
                  {previewBook.toc.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-[#5E6470] py-1 border-b border-[#F8F7F4] last:border-none">
                      <span className="text-[#C39738] font-bold text-xs">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif font-bold text-base text-[#17191C] flex items-center gap-1.5">
                  <Feather className="w-4 h-4 text-[#C39738]" />
                  본문 및 서문 맛보기 (Excerpt)
                </h4>
                <div className="bg-[#EDE9E1] p-5 rounded-lg border-l-4 border-[#6E1B2A] font-serif text-xs sm:text-sm text-[#17191C] leading-relaxed italic">
                  {previewBook.excerpt}
                </div>
              </div>
            </div>

            <div className="bg-white p-4 px-6 border-t border-[#E4DFD7] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#5E6470]">판매가</span>
                <span className="text-lg font-bold text-[#6E1B2A] ml-2">
                  {previewBook.price.toLocaleString()}원
                </span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setPreviewBook(null)}
                  className="px-4 py-2 border border-[#E4DFD7] rounded text-xs font-semibold text-[#5E6470] hover:bg-[#EDE9E1]"
                >
                  닫기
                </button>
                <button
                  onClick={() => {
                    addToCart(previewBook);
                    setPreviewBook(null);
                  }}
                  className="px-6 py-2 bg-[#6E1B2A] hover:bg-[#8C2538] text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>장바구니 담기</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: CART SLIDE-OVER DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white border-l border-[#E4DFD7] shadow-2xl flex flex-col justify-between">
              
              <div className="p-5 bg-[#17191C] text-white flex items-center justify-between border-b border-[#C39738]">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-[#C39738]" />
                  <h3 className="font-serif font-bold text-base text-white">
                    장바구니 ({cartCount}권)
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-[#A6ADB8] hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-[#F8F7F4] p-3.5 px-5 border-b border-[#E4DFD7] text-xs">
                {isFreeShipping ? (
                  <div className="text-[#6E1B2A] font-semibold flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#C39738]" />
                    <span>무료배송 혜택이 적용되었습니다! (50,000원 이상)</span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[#5E6470]">
                      <span>무료배송까지</span>
                      <span className="font-bold text-[#6E1B2A]">
                        {(freeShippingThreshold - cartTotal).toLocaleString()}원 추가 필요
                      </span>
                    </div>
                    <div className="w-full bg-[#E4DFD7] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#C39738] h-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (cartTotal / freeShippingThreshold) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#E4DFD7]">
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-[#7E8694] space-y-3">
                    <ShoppingBag className="w-12 h-12 mx-auto text-[#A6ADB8]" />
                    <p className="text-sm font-serif">장바구니에 담긴 도서가 없습니다.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-xs text-[#6E1B2A] font-semibold hover:underline"
                    >
                      도서 목록 둘러보기
                    </button>
                  </div>
                ) : (
                  cart.map(({ book, quantity }) => (
                    <div key={book.id} className="py-4 flex gap-4 items-center">
                      <div className={`w-14 h-20 bg-gradient-to-br ${book.coverGradient} rounded shadow flex-shrink-0 flex items-center justify-center p-1 text-center`}>
                        <span className="text-[7px] font-serif text-white line-clamp-2 leading-tight">
                          {book.title.split('(')[0]}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-serif font-semibold text-xs text-[#17191C] truncate">
                          {book.title}
                        </h4>
                        <p className="text-[11px] text-[#5E6470] truncate">{book.author}</p>
                        <p className="text-xs font-bold text-[#6E1B2A]">
                          {(book.price * quantity).toLocaleString()}원
                        </p>

                        <div className="flex items-center space-x-2 pt-1">
                          <button
                            onClick={() => updateQuantity(book.id, -1)}
                            className="w-6 h-6 rounded border border-[#E4DFD7] bg-[#F8F7F4] hover:bg-[#EDE9E1] flex items-center justify-center text-xs text-[#17191C]"
                          >
                            -
                          </button>
                          <span className="text-xs font-semibold px-2">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(book.id, 1)}
                            className="w-6 h-6 rounded border border-[#E4DFD7] bg-[#F8F7F4] hover:bg-[#EDE9E1] flex items-center justify-center text-xs text-[#17191C]"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(book.id)}
                            className="text-[11px] text-[#A6ADB8] hover:text-[#6E1B2A] ml-2"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-5 bg-[#F8F7F4] border-t border-[#E4DFD7] space-y-3">
                  <div className="space-y-1.5 text-xs text-[#5E6470]">
                    <div className="flex justify-between">
                      <span>도서 합계금액</span>
                      <span className="font-medium text-[#17191C]">{cartTotal.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between">
                      <span>배송비</span>
                      <span className="font-medium text-[#17191C]">
                        {shippingCost === 0 ? '무료' : `${shippingCost.toLocaleString()}원`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#17191C] pt-2 border-t border-[#E4DFD7]">
                      <span>총 결제 예상금액</span>
                      <span className="text-base text-[#6E1B2A]">{finalTotal.toLocaleString()}원</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      alert(`[주문 완료 테스트]\n총 결제금액: ${finalTotal.toLocaleString()}원\n퓨리탄 헤리티지 북스를 애용해 주셔서 감사합니다.`);
                      setCart([]);
                      setIsCartOpen(false);
                    }}
                    className="w-full bg-[#6E1B2A] hover:bg-[#8C2538] text-white py-3.5 rounded font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>주문서 작성 및 결제하기</span>
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      {/* MODAL 3: LOGIN / SIGN UP AUTH MODAL */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F8F7F4] text-[#17191C] w-full max-w-md rounded-xl border border-[#C39738] shadow-2xl overflow-hidden relative">
            
            {/* Modal Header */}
            <div className="bg-[#17191C] text-white p-4 px-6 flex justify-between items-center border-b border-[#C39738]">
              <span className="font-serif text-xs font-bold text-[#DFC075] tracking-widest uppercase">
                PURITAN HERITAGE BOOKS
              </span>
              <button
                onClick={() => setAuthModalOpen(false)}
                className="text-[#A6ADB8] hover:text-white p-1 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Switcher: 로그인 vs 회원가입 */}
            <div className="flex border-b border-[#E4DFD7] bg-[#EDE9E1]">
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-all ${
                  authMode === 'login'
                    ? 'bg-white text-[#6E1B2A] border-b-2 border-[#6E1B2A]'
                    : 'text-[#5E6470] hover:text-[#17191C]'
                }`}
              >
                로그인 (Sign In)
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-all ${
                  authMode === 'signup'
                    ? 'bg-white text-[#6E1B2A] border-b-2 border-[#6E1B2A]'
                    : 'text-[#5E6470] hover:text-[#17191C]'
                }`}
              >
                회원가입 (Sign Up)
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6 sm:p-8 space-y-4">
              {authMode === 'login' ? (
                <form onSubmit={(e) => { e.preventDefault(); showToast('로그인 되었습니다. 환영합니다.'); setAuthModalOpen(false); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#5E6470] mb-1">이메일 계정</label>
                    <input
                      type="email"
                      required
                      placeholder="example@heritagebooks.kr"
                      className="w-full bg-white border border-[#E4DFD7] rounded px-3.5 py-2.5 text-xs text-[#17191C] focus:outline-none focus:border-[#C39738]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5E6470] mb-1">비밀번호</label>
                    <input
                      type="password"
                      required
                      placeholder="비밀번호를 입력해 주세요"
                      className="w-full bg-white border border-[#E4DFD7] rounded px-3.5 py-2.5 text-xs text-[#17191C] focus:outline-none focus:border-[#C39738]"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#5E6470]">
                    <label className="flex items-center space-x-1.5 cursor-pointer">
                      <input type="checkbox" className="rounded text-[#6E1B2A] focus:ring-[#C39738]" />
                      <span>로그인 상태 유지</span>
                    </label>
                    <a href="#forgot" className="text-[#6E1B2A] hover:underline">비밀번호 찾기</a>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#6E1B2A] hover:bg-[#8C2538] text-white py-3 rounded text-xs font-semibold uppercase tracking-wider transition-all shadow-md mt-2"
                  >
                    로그인
                  </button>
                </form>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); showToast('PHB 회원가입이 완료되었습니다. 환영합니다!'); setAuthModalOpen(false); }} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-[#5E6470] mb-1">성명</label>
                    <input
                      type="text"
                      required
                      placeholder="홍길동"
                      className="w-full bg-white border border-[#E4DFD7] rounded px-3.5 py-2 text-xs text-[#17191C] focus:outline-none focus:border-[#C39738]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5E6470] mb-1">이메일 계정</label>
                    <input
                      type="email"
                      required
                      placeholder="example@heritagebooks.kr"
                      className="w-full bg-white border border-[#E4DFD7] rounded px-3.5 py-2 text-xs text-[#17191C] focus:outline-none focus:border-[#C39738]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5E6470] mb-1">비밀번호</label>
                    <input
                      type="password"
                      required
                      placeholder="영문, 숫자 포함 8자리 이상"
                      className="w-full bg-white border border-[#E4DFD7] rounded px-3.5 py-2 text-xs text-[#17191C] focus:outline-none focus:border-[#C39738]"
                    />
                  </div>
                  <div className="text-[11px] text-[#7E8694] space-y-1 pt-1">
                    <label className="flex items-center space-x-1.5 cursor-pointer">
                      <input type="checkbox" required className="rounded text-[#6E1B2A]" />
                      <span>이용약관 및 개인정보처리방침 동의 (필수)</span>
                    </label>
                    <label className="flex items-center space-x-1.5 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-[#6E1B2A]" />
                      <span>PHB 신간 및 청교도 서신 수신 동의 (선택)</span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#6E1B2A] hover:bg-[#8C2538] text-white py-3 rounded text-xs font-semibold uppercase tracking-wider transition-all shadow-md mt-2"
                  >
                    신규 회원가입 완료
                  </button>
                </form>
              )}
            </div>

            {/* Footer Note */}
            <div className="bg-[#EDE9E1] px-6 py-3 text-center text-[11px] text-[#7E8694] border-t border-[#E4DFD7]">
              회원가입 시 신간 10% 추가 적립 및 청교도 묵상 칼럼을 무료로 받아보실 수 있습니다.
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
