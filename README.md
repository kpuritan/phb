# 퓨리탄 헤리티지 북스 (Puritan Heritage Books, PHB) 웹 플랫폼

역사적 개혁주의 교의학과 16~17세기 청교도 고전 문헌을 보급하는 출판사 **"퓨리탄 헤리티지 북스(PHB)"**의 공식 웹 플랫폼입니다. Reformation Heritage Books(heritagebooks.org)의 학술적이고 경건한 감성을 현대적인 한국어 에디토리얼 타이포그래피와 고전 제본 미학으로 구현하였습니다.

---

## 🏛 주요 특징 및 디자인 시스템

1. **시각적 아이덴티티 (Visual Identity)**:
   - **앤틱 가죽 바인더 차콜 (`#17191C`)**: 묵직하고 신뢰감 있는 바탕
   - **청교도 헤리티지 버건디 (`#6E1B2A`)**: 클래식 출판의 품격
   - **골드 호일 / 황옥색 (`#C39738`)**: 고전 양장본 금박 압인(Gold Foil Stamping) 효과
   - **웜 페이퍼 / 크림 양피지 (`#F8F7F4`, `#EDE9E1`)**: 가독성 높은 지면 텍스처
   - **타이포그래피**: `Noto Serif KR` (한글 명조) + `Cinzel` / `Cormorant Garamond` (라틴 세리프) + `Noto Sans KR` (본문)

2. **핵심 기능 및 컴포넌트**:
   - **3D 입체 양장본 목업 (Hero Section)**: 리얼한 책등 그림자 및 금박 씰링 배지가 적용된 대표 출간작 전시
   - **실시간 다중 필터 & 검색**: 도서명, 저자, 역자, 시리즈명 실시간 검색 및 카테고리 탭 필터링
   - **도서 목차 및 서문 미리보기 모달**: 상세 서지정보, 목차(TOC), 원문 발췌 묵상글 확인
   - **인터랙티브 장바구니 슬라이드 드로어**: 실시간 수량 조절, 50,000원 이상 무료배송 게이지 및 결제 시뮬레이션
   - **체험적 개혁주의 신앙 (Experiential Religion)**: 주간 청교도 명언 회전 배너 및 웨스트민스터/하이델베르크 신앙고백서 조항 연계 도서 맵핑

---

## 📂 파일 구성 안내

- [index.html](file:///c:/Users/user/Desktop/PHB%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80/index.html): **브라우저에서 더블 클릭 시 즉시 실행**되는 스탠드얼론 완전판 웹 애플리케이션 (React 18 + Tailwind CSS + Lucide Icons 내장)
- [PuritanHeritageBooks.jsx](file:///c:/Users/user/Desktop/PHB%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80/PuritanHeritageBooks.jsx): React / Next.js / Vite 프로젝트에서 import하여 사용할 수 있는 모듈형 컴포넌트

---

## 🚀 실행 방법

### 방법 1. 즉시 브라우저로 확인 (가장 간편)
1. 바탕화면의 `PHB홈페이지` 폴더 내 [index.html](file:///c:/Users/user/Desktop/PHB%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80/index.html) 파일을 Chrome, Edge, Safari 등 브라우저로 더블 클릭하여 실행합니다.

### 방법 2. React 프로젝트에 컴포넌트로 적용
```bash
npm install lucide-react
```
프로젝트 내에서 [PuritanHeritageBooks.jsx](file:///c:/Users/user/Desktop/PHB%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80/PuritanHeritageBooks.jsx)를 가져와 렌더링합니다:
```jsx
import PuritanHeritageBooksApp from './PuritanHeritageBooks';

export default function App() {
  return <PuritanHeritageBooksApp />;
}
```
