"use client";

import { useEffect, useState, type MouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";

const projects = [
  {
    eyebrow: "AI for Security",
    title: "보안 로그에서\n공격 신호를 찾아내다.",
    description:
      "KISA 방화벽 로그를 운영 관점의 3개 클래스로 재구성하고 Random Forest로 공격 유형을 분류했습니다.",
    evidenceLabel: "Model Accuracy",
    evidenceValue: "0.893",
    evidenceNote: "3-class firewall log classification",
    tags: ["Python", "Random Forest", "Log Analysis"],
    detail:
      "10개 원본 공격 유형을 3개 범주로 재설계했습니다. 단순 정확도에 머물지 않고 SQL Injection과 GET Flooding의 낮은 재현율을 확인해, 실무 적용 전 보완해야 할 한계까지 분석했습니다.",
    steps: [
      { label: "01", title: "로그 구조 재설계", text: "KISA 방화벽 로그의 10개 공격 유형을 운영 관점의 3개 클래스로 다시 정의했습니다." },
      { label: "02", title: "분류 모델 학습", text: "전처리한 로그를 Random Forest에 학습시키고 클래스별 성능을 비교했습니다." },
      { label: "03", title: "오류와 한계 검증", text: "전체 정확도뿐 아니라 SQL Injection과 GET Flooding의 재현율을 따로 확인했습니다." },
    ],
  },
  {
    eyebrow: "Artificial Intelligence",
    title: "데이터 누수를 막고\n폐업 위험을 예측하다.",
    description:
      "서울시 상권 데이터를 상권 단위로 재구성하고, 데이터 누수를 차단한 검증 구조로 폐업 위험을 예측했습니다.",
    evidenceLabel: "Test F1",
    evidenceValue: "0.616",
    evidenceNote: "Group-aware cross validation",
    tags: ["GroupKFold", "Feature Engineering", "Clustering"],
    detail:
      "점포·매출·유동인구 등 대규모 원천 데이터를 통합했습니다. 상권 기준 GroupKFold를 적용하고 타깃 정의를 다시 설계해 과대평가를 줄였으며, 선별형 모델로서의 활용 가능성과 재현율 한계를 함께 제시했습니다.",
    steps: [
      { label: "01", title: "상권 단위 통합", text: "점포·매출·유동인구 데이터를 상권 기준으로 결합하고 예측 대상의 범위를 정리했습니다." },
      { label: "02", title: "누수 방지 검증", text: "같은 상권의 데이터가 학습과 테스트에 섞이지 않도록 GroupKFold를 적용했습니다." },
      { label: "03", title: "타깃과 결과 점검", text: "피처를 정제한 뒤 Test F1과 재현율을 확인해 선별형 모델로서의 한계를 기록했습니다." },
    ],
  },
  {
    eyebrow: "Web · Security",
    title: "사람과 일정을\n하나의 별에 담아내다.",
    description:
      "그룹 일정 조율과 관계 기록을 우주 콘셉트로 연결한 Spring MVC 기반 웹 서비스를 설계하고 배포했습니다.",
    evidenceLabel: "Deployment",
    evidenceValue: "LIVE",
    evidenceNote: "Oracle Cloud · Nginx · HTTPS",
    tags: ["Spring MVC", "Tomcat", "Nginx · HTTPS"],
    detail:
      "JSP·JSTL·JdbcTemplate으로 기능을 구현하고 Oracle Cloud에 배포했습니다. BCrypt 비밀번호 해시, 세션 만료, 객체별 권한 검증, HTTPS와 방화벽 설정 등 운영 단계의 보안을 직접 점검했습니다.",
    steps: [
      { label: "01", title: "서비스 구조 설계", text: "그룹 일정 조율과 관계 기록을 하나의 우주 콘셉트로 묶고 Spring MVC 구조를 설계했습니다." },
      { label: "02", title: "기능과 권한 구현", text: "JSP·JSTL·JdbcTemplate으로 기능을 만들고 BCrypt, 세션 만료, 객체별 권한 검증을 적용했습니다." },
      { label: "03", title: "서버 배포와 보안 점검", text: "Oracle Cloud에 배포한 뒤 Nginx·HTTPS·방화벽 설정을 확인하며 운영 상태를 점검했습니다." },
    ],
  },
];

const skillGroups = [
  {
    title: "Security",
    text: "Web Security · System Security · AI Security",
    caption: "웹·시스템 보안 · AI 보안 학습 중",
    detail: "웹 서비스의 입력값·세션·권한 흐름을 점검하고, Linux·Windows Server 환경의 운영 관점까지 연결해 보안 문제를 바라봅니다. 최근에는 보안 로그와 이상행위 탐지에 머신러닝을 적용하는 방향을 공부하고 있습니다.",
    points: [
      "WebGoat 기반 SQL Injection·XSS·CSRF 취약점 실습",
      "로그인·세션·관리자 페이지의 권한 검증과 접근 제어 점검",
      "Linux·Windows Server의 계정·권한·서비스 설정 보안 실습",
      "보안 로그 분석·이상행위 탐지·침입 탐지 분야 학습",
    ],
  },
  {
    title: "AI · Data",
    text: "Python · ML · Random Forest · KNN · SVM · PCA",
    caption: "머신러닝 · DL/LLM 학습 중",
    detail: "데이터를 목적에 맞게 정의하고, 전처리·타깃 설계·검증 구조를 함께 점검합니다. 모델 성능을 높이는 것보다 결과가 실제로 신뢰할 수 있는지 설명하는 데 집중합니다.",
    points: [
      "Python·scikit-learn 기반 데이터 전처리와 모델 학습",
      "Random Forest·KNN·SVM·PCA 알고리즘 실습",
      "정확도·정밀도·재현율·F1-score를 통한 모델 평가",
      "GroupKFold로 데이터 누수를 통제한 폐업 위험 예측",
      "DL·LLM 기반 보안 자동화와 분석 보조 방향 학습",
    ],
  },
  {
    title: "Programming",
    text: "C · Python · Java · Spring MVC · HTML/CSS",
    caption: "프로젝트 기반 구현 경험",
    detail: "배운 기술을 개별 문법으로 남겨두지 않고, 화면·서버·데이터 흐름이 이어지는 작은 서비스로 구현합니다. 기능을 만든 뒤에는 인증과 권한, 배포 환경까지 함께 확인합니다.",
    points: [
      "C·Python·Java를 활용한 프로그래밍 기초와 응용",
      "Spring MVC·JSP·JSTL·JdbcTemplate 기반 웹 서비스 구현",
      "HTML/CSS로 웹 페이지 구조와 기본 인터랙션 구성",
      "기능 단위 설계부터 서버 배포까지 프로젝트 흐름 경험",
    ],
  },
  {
    title: "Infrastructure",
    text: "Network · Linux · Windows Server · Virtualization",
    caption: "네트워크·Linux 운영 경험",
    detail: "서비스가 안정적으로 실행되는 조건을 이해하기 위해 네트워크와 서버 운영을 함께 학습했습니다. 로컬 가상화 환경에서 설정을 재현하고, 실제 서비스 배포 과정에서 운영과 보안을 연결해 확인합니다.",
    points: [
      "Switching·Routing, IP·Port·NAT·DNS 네트워크 기초",
      "CentOS·Ubuntu 환경에서 Apache·Nginx·SSH·FTP·DNS 구성",
      "Windows Server 2012·2012 R2·2016 계정·권한 관리 실습",
      "VMware·Docker 기반 Linux·Windows Server 실습 환경 구성",
      "서비스 장애와 설정 문제를 원인부터 좁혀가는 운영 관점",
    ],
  },
];

const education = [
  ["사우고등학교", "제20회 졸업", "2019.03 — 2022.01"],
  ["인하공업전문대학교", "정보통신공학과", "2022.02 — 2022.12"],
  ["청운대학교", "컴퓨터공학과", "2023.02 — 2026.02"],
  ["한경국립대학교", "정보보안전공", "2026.02 — 현재"],
];

const experiences = [
  ["대한민국 육군", "교육사 전투지휘훈련단 모의지원중대", "2022.04 — 2023.10"],
  ["롯데몰 김포공항점", "백화점 안전팀", "2023.10 — 2024.02"],
  ["동래정", "매장 근무", "2024.07 — 2025.10"],
  ["행사 경호팀", "실기시험·공연·행사 안전 업무", "2024.12 — 2025.02"],
  ["CU 편의점", "매장 운영", "2025.02 — 현재"],
];

const credentials = [
  ["운전면허 1종 보통", "경찰청 · 2021.10"],
  ["네트워크관리사 2급", "ICQA · 2021.12"],
  ["컴퓨터활용능력 2급", "대한상공회의소 · 2021.12"],
  ["정보기기운용기능사", "HRD · 2022.12"],
  ["Google AI Essentials", "Google · 2025.10"],
  ["Agents and Workflows", "OpenAI · 2026.07"],
];

const values = [
  "예의를 기본으로 생각합니다.",
  "결과만큼 과정도 중요하게 봅니다.",
  "쉴 때는 쉬고, 할 때는 확실하게 합니다.",
  "문제가 생겨도 진행할 수 있는 방법을 찾습니다.",
];

const archiveProjects = [
  ["2019.04", "방송부", "19기 국장 겸 엔지니어"],
  ["2020.08", "자가검진 앱 UI/UX", "자가검진 애플리케이션 개인 디자인 프로젝트"],
  ["2024.05", "디지털 지식 전달 공모전", "카드뉴스 제작 · 우수상"],
  ["2024.05", "청운공간 PBL", "사용하지 않는 교내 공간 개선"],
  ["2024.06", "청학동 스터디 1학기", "공동체 기반 전공 학습"],
  ["2024.06", "청운 글쓰기 공모전", "미래를 위해 몰입하고 있는 것 · 최우수상"],
  ["2024.09", "청학동 스터디 2학기", "공동체 기반 전공 학습"],
  ["2024.10", "호치민 리더십", "리더십 영상 감평문"],
  ["2024.12", "글쓰기와 표현", "자유 주제 글쓰기"],
  ["2025.05", "대학 애플리케이션 개선", "UI/UX 개선 제안 · 장려상"],
  ["2025.05", "학습 포트폴리오", "서버 구축·관리 학습 기록 · 장려상"],
  ["2025.06", "개인 홈페이지", "웹클라이언트 프로그래밍 최종 과제"],
  ["2025.12", "SNS 콘텐츠 제작", "SNS 콘텐츠 제작 최종 과제"],
  ["2025.12", "윈도우 프로그래밍", "Windows Programming 최종 과제"],
  ["2025.12", "지식iN · 바람신", "질문 답변 기반 지식 공유 활동"],
  ["2026.04", "뭇별", "웹 서비스 구현부터 서버 운영·배포·보안까지"],
  ["2026.06", "ML 프로젝트", "기계학습 강의를 통한 3주 팀 프로젝트"],
];

const archiveDetails = [
  {
    role: "19기 국장 겸 엔지니어",
    period: "2019.04",
    result: "방송 운영·행사 협업 경험",
    summary: "부원 모집과 홍보 자료 제작부터 방송 송출과 타종 시스템 운영까지 맡았습니다.",
    points: [
      "부원 모집 및 홍보 자료 제작",
      "페이스북 관리",
      "전교 부회장 홍보 영상 편집: 오디오 노이즈 제거, 화면 안정화, 더빙 싱크 조정",
      "학생회·동아리·행정실 등과 각종 행사 협업",
      "아침·점심 방송 송출과 교내 타종 시스템 운영",
    ],
    sourceUrl: "https://app.notion.com/p/a788068656124c7692dc8b42658f7e48",
  },
  {
    role: "개인 프로젝트",
    period: "2020.07 — 08",
    summary: "자가검진 애플리케이션의 UI/UX를 개인 프로젝트로 설계했습니다.",
    points: ["자가검진 애플리케이션 UI/UX 디자인"],
    sourceUrl: "https://app.notion.com/p/259647d7900a80e9aebfe550d2d13b27",
  },
  {
    role: "기획 및 디자인",
    period: "2024.05.17",
    result: "398명 참가 · 우수상 수상",
    summary: "정보를 소개하고 쉽게 이해할 수 있도록 내용을 구상해 카드뉴스로 제작했습니다.",
    points: ["디지털 지식 대중화를 위한 카드뉴스 공모전", "카드뉴스 기획 및 디자인"],
    sourceUrl: "https://app.notion.com/p/64bc09e7fe8747b1a0f4e0ebdc42e847",
  },
  {
    role: "개인 진행",
    period: "2024.05",
    result: "A+",
    summary: "사용하지 않는 교내 공간을 개선하는 프로젝트를 진행했습니다.",
    points: ["사용하지 않는 공간의 문제를 파악하고 개선안 제안"],
    sourceUrl: "https://app.notion.com/p/479563bc71434eb692b5c9d59a67757d",
  },
  {
    role: "팀원",
    period: "2024.03 — 06",
    summary: "동일한 주제와 관심 분야를 학습하고자 하는 학생들과 학습공동체를 형성했습니다.",
    points: ["공동체 기반 전공 학습 활동"],
    sourceUrl: "https://app.notion.com/p/170647d7900a8038a316f0695804f37e",
  },
  {
    role: "개인 진행 · 기획 및 디자인",
    period: "2024.06.04",
    result: "최우수상",
    summary: "‘나는 지금 무엇에 빠져 있는가?’를 주제로, 빛나는 미래를 위해 몰입하고 있는 것과 진로 탐색을 위한 다양한 경험을 글로 정리했습니다.",
    points: ["청운 글쓰기 공모전 출품", "진로 탐색을 위한 다양한 경험을 글로 표현"],
    sourceUrl: "https://app.notion.com/p/35dbba84da424343b623a76b687373e9",
  },
  {
    role: "팀원",
    period: "2024.09 — 12",
    summary: "동일한 주제와 관심 분야를 학습하고자 하는 학생들과 학습공동체를 형성했습니다.",
    points: ["공동체 기반 전공 학습 활동"],
    sourceUrl: "https://app.notion.com/p/1c5647d7900a8005bdfaf34a2826e6b2",
  },
  {
    period: "2024.11",
    result: "A+",
    summary: "호치민 관련 영상을 시청한 후 1페이지 분량의 감평문을 작성했습니다.",
    points: ["호치민의 독립전쟁과 리더십에 관한 영상 감상 및 감평문 작성"],
    sourceUrl: "https://app.notion.com/p/1c5647d7900a80b98133e073c3b43d2e",
  },
  {
    period: "2024.09 — 12",
    result: "A+",
    summary: "개인의 관심사를 바탕으로 자유 주제의 글을 5페이지 이상 작성했습니다.",
    points: ["자유 주제 글쓰기"],
    sourceUrl: "https://app.notion.com/p/1edb5379897c4f80acebf439e189920f",
  },
  {
    role: "PPT·UI/UX·최종 제안서",
    period: "2024.03 — 06 / 2025.05",
    result: "장려상",
    summary: "청운대학교 애플리케이션의 불편함을 개선하기 위한 UI/UX를 제안했습니다.",
    points: ["PPT 자료 제작", "UI/UX 개선안 설계", "최종 제안서 작성"],
    sourceUrl: "https://app.notion.com/p/f36f32cc114143ce8fede10a250b7995",
  },
  {
    period: "2025.05",
    result: "장려상",
    summary: "서버 구축 및 관리에 대한 학습 내용을 포트폴리오로 정리했습니다.",
    points: ["서버 구축·관리 학습 기록 작성"],
    sourceUrl: "https://app.notion.com/p/231647d7900a80f7a904da46f67542ad",
  },
  {
    role: "개인 프로젝트",
    period: "2025.06",
    result: "웹클라이언트 프로그래밍 최종 과제",
    summary: "웹 클라이언트 프로그래밍에서 배운 내용을 바탕으로 개인 페이지를 제작하고 GitHub에 게시했습니다.",
    points: ["자유 주제 개인 홈페이지 제작", "GitHub를 통한 웹사이트 게시"],
    sourceUrl: "https://app.notion.com/p/231647d7900a80b48b6ed55405d699a1",
  },
  {
    role: "개인 프로젝트",
    period: "2025.12",
    result: "A+",
    summary: "홍성 또는 인천에 위치한 지역 기업·제품을 선정해 로컬 콘텐츠 카드뉴스를 기획하고 제작했습니다.",
    points: ["지역 기반 기업 또는 제품 선정", "카드뉴스 기획 및 제작"],
    sourceUrl: "https://app.notion.com/p/2f4647d7900a8027a31bd8beb451c274",
  },
  {
    role: "개인 프로젝트",
    period: "2025.12",
    result: "A+",
    summary: "윈도우 프로그래밍 최종 과제를 제출했습니다.",
    points: ["윈도우 프로그래밍 최종 과제 수행"],
    sourceUrl: "https://app.notion.com/p/2f4647d7900a80c8a329e526bda04a85",
  },
  {
    period: "2025.12.31 활동 중단",
    result: "컴퓨터 본체 9위 · 컴퓨터 부품·조립 40위",
    summary: "컴퓨터 본체와 컴퓨터 부품·조립 분야의 질문에 답하며 지식을 공유했습니다.",
    points: ["지식iN 바람신 활동", "컴퓨터 본체 분야 9위", "컴퓨터 부품·조립 분야 40위"],
    sourceUrl: "https://app.notion.com/p/be9bb75de1eb410fbd9c602b4cda89f5",
  },
  {
    role: "서비스 개발·서버 운영·보안 점검",
    period: "1차 2026.04.01 — 06.14 / 2차 여름방학 예정",
    result: "서비스 운영",
    summary: "일정 조율 및 기록 기반 웹서비스를 개발하며 구현부터 서버 운영·배포·보안까지 직접 경험했습니다.",
    points: [
      "기술 스택: Spring MVC, JSP, Tomcat, Nginx, Ubuntu, Supabase",
      "CSRF 방어와 보안 헤더 적용",
      "BCrypt 비밀번호 해시, 세션 타임아웃, 로그인·요청 감사 로그 구현",
      "관리자 권한과 접근 제어 점검",
      "SQL Injection, XSS, 파일 업로드, 경로 조작 대응",
    ],
    sourceUrl: "https://app.notion.com/p/364647d7900a8029a4d6ca160212532d",
  },
  {
    role: "2인 1조",
    period: "2026.06.18",
    result: "Random Forest 기본 F1 0.84",
    summary: "서울시 카페 상권 데이터를 활용해 폐업 위험 요인을 분석하는 3주 팀 프로젝트를 진행했습니다.",
    points: [
      "점포·매출·유동인구·상주인구·직장인구·상권변화지표 데이터 활용",
      "최근 2년 폐업률 증가폭 상위 30% 상권을 위험 상권으로 정의",
      "프랜차이즈 비율, 객단가, 점포당 매출·유동인구, 경쟁강도 파생변수 생성",
      "Random Forest 기본 성능: Accuracy 0.80 · Precision 0.91 · Recall 0.78 · F1 0.84",
      "같은 상권의 분기 데이터가 학습·테스트에 함께 들어가는 데이터 누수 문제 확인",
    ],
    sourceUrl: "https://app.notion.com/p/384647d7900a80258671fcc9629722a9",
  },
];

const archivePreviewImages = [
  "/archive/archive-01.png",
  "/archive/archive-02.png",
  "/archive/archive-03.png",
  "/archive/archive-04.png",
  "/archive/archive-05.png",
  "/archive/archive-06.png",
  "/archive/archive-07.png",
  "/archive/archive-08.png",
  "/archive/archive-09.png",
  "/archive/archive-10.png",
  "/archive/archive-11.png",
  "/archive/archive-12.png",
  "/archive/archive-13.jpg",
  "/archive/archive-14.svg",
  "/archive/archive-15.png",
  "/archive/archive-16.png",
  "/archive/archive-17.png",
];

export default function Home() {
  const [openProject, setOpenProject] = useState<number | null>(null);
  const [openSkill, setOpenSkill] = useState<number | null>(null);
  const [openArchive, setOpenArchive] = useState<number | null>(null);
  const [hoveredArchive, setHoveredArchive] = useState<number | null>(null);
  const [archivePreviewPosition, setArchivePreviewPosition] = useState({ x: 24, y: 24 });
  const [isNavTransitioning, setIsNavTransitioning] = useState(false);
  const [navTransitionDirection, setNavTransitionDirection] = useState<"down" | "up">("down");
  const selectedProject = openProject === null ? null : projects[openProject];
  const selectedSkill = openSkill === null ? null : skillGroups[openSkill];
  const selectedArchive = openArchive === null ? null : archiveProjects[openArchive];
  const selectedArchiveDetail = openArchive === null ? null : archiveDetails[openArchive];

  const updateArchivePreviewPosition = (event: ReactPointerEvent<HTMLElement>) => {
    const previewWidth = 236;
    const previewHeight = 188;
    setArchivePreviewPosition({
      x: Math.min(Math.max(event.clientX + 18, 16), window.innerWidth - previewWidth),
      y: Math.min(Math.max(event.clientY + 18, 16), window.innerHeight - previewHeight),
    });
  };

  const handleNavLink = (event: MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    setNavTransitionDirection(targetTop > window.scrollY ? "down" : "up");
    setIsNavTransitioning(true);
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    }, 140);
    window.setTimeout(() => setIsNavTransitioning(false), 720);
  };

  useEffect(() => {
    if (openProject === null && openSkill === null && openArchive === null) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpenProject(null);
          setOpenSkill(null);
          setOpenArchive(null);
        }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openProject, openSkill, openArchive]);

  return (
    <main id="top">
      <div
        className={`nav-page-transition ${isNavTransitioning ? "is-active" : ""} is-${navTransitionDirection}`}
        aria-hidden="true"
      />
      <header className="global-nav">
        <div className="nav-inner">
          <a className="wordmark" href="#top" aria-label="포트폴리오 첫 화면으로 이동">
            KIMJUNHEE
          </a>
          <nav aria-label="주요 메뉴">
            <a href="#projects" onClick={handleNavLink}>프로젝트</a>
            <a href="#about" onClick={handleNavLink}>소개</a>
            <a href="#journey" onClick={handleNavLink}>경험</a>
            <a href="#contact" onClick={handleNavLink}>연락</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-signal" aria-hidden="true">
          <div className="hero-signal-head">
            <span>LIVE / SECURITY LOG</span>
            <b>MONITORING</b>
          </div>
          <div className="hero-signal-chart">
            <div className="hero-signal-grid" />
            <span className="hero-signal-row signal-row-one">08:42:11 GET /login 200 · NORMAL · 08:42:12 POST /session 200 · NORMAL</span>
            <span className="hero-signal-row signal-row-two">08:42:13 GET /dashboard 200 · NORMAL · 08:42:14 GET /api/user 200 · NORMAL</span>
            <span className="hero-signal-row signal-row-three">08:42:15 POST /upload 201 · NORMAL · 08:42:16 GET /admin 403 · BLOCKED</span>
            <span className="hero-signal-row hero-signal-anomaly">08:42:17 GET /admin 403 · ANOMALY DETECTED</span>
            <span className="hero-signal-marker"><i /> anomaly</span>
          </div>
        </div>
        <div className="hero-copy page-width">
          <p className="hero-kicker">Information Security × Artificial Intelligence</p>
          <h1>
            보안을<br />
            <span>지능적으로.</span>
          </h1>
          <p className="hero-intro">
            보안 지식에 AI를 더해,<br className="desktop-break" />
            비정상 행위와 알려지지 않은 공격을 탐지하고 분석합니다.
          </p>
          <div className="hero-links">
            <a className="primary-link" href="#projects">프로젝트 보기</a>
            <a className="text-link" href="#about">더 알아보기 <span aria-hidden="true">›</span></a>
          </div>
        </div>

      </section>

      <section className="projects-section section-space" id="projects">
        <div className="page-width">
          <header className="section-header">
            <p>선택한 프로젝트</p>
            <h2>문제를 정의하고.<br /><span>끝까지 검증하고.</span></h2>
            <p className="section-description">
              점수만 보여주지 않습니다. 데이터의 구조를 다시 설계하고,
              결과를 어디까지 신뢰할 수 있는지 설명합니다.
            </p>
          </header>

          <div className="project-bento">
            {projects.map((project, index) => (
              <article className={`project-card project-${index + 1}`} key={project.title}>
                <div className="project-copy">
                  <p className="card-eyebrow">{project.eyebrow}</p>
                  <h3>{project.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h3>
                  <p className="project-description">{project.description}</p>
                </div>

                <div className="project-evidence" aria-label={`${project.evidenceLabel} ${project.evidenceValue}`}>
                  <span>{project.evidenceLabel}</span>
                  <strong>{project.evidenceValue}</strong>
                  <small>{project.evidenceNote}</small>
                </div>

                <div className="project-footer">
                  <ul aria-label={`${project.eyebrow} 사용 기술`}>
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <button
                    type="button"
                    className="project-open"
                    aria-haspopup="dialog"
                    aria-controls={`project-modal-${index}`}
                    onClick={() => setOpenProject(index)}
                  >
                    진행 과정 보기 <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {selectedProject && openProject !== null && (
            <div className="project-modal-backdrop" role="presentation" onMouseDown={() => setOpenProject(null)}>
              <section
                className="project-modal"
                id={`project-modal-${openProject}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`project-modal-title-${openProject}`}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <div className="project-modal-topline">
                  <p>PROJECT PROCESS</p>
                  <button type="button" className="project-modal-close" aria-label="프로젝트 과정 닫기" onClick={() => setOpenProject(null)}>×</button>
                </div>
                <p className="project-modal-eyebrow">{selectedProject.eyebrow}</p>
                <h3 id={`project-modal-title-${openProject}`}>{selectedProject.title.split("\n").join(" ")}</h3>
                <p className="project-modal-summary">{selectedProject.detail}</p>
                <ol className="project-steps">
                  {selectedProject.steps.map((step) => (
                    <li key={step.label}>
                      <span>{step.label}</span>
                      <div>
                        <h4>{step.title}</h4>
                        <p>{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          )}

          <div className="archive-header">
            <div>
              <p className="section-kicker">Full Archive</p>
              <h3>프로젝트와 활동.<br /><span>처음부터 지금까지.</span></h3>
            </div>
            <p>Notion에 정리된 프로젝트, 발표, 수상과 학습 활동을 오래된 기록부터 최근 활동까지 담았습니다.</p>
          </div>
          <div className="archive-list">
            {archiveProjects.map(([date, title, description], index) => (
              <article
                key={`${date}-${title}`}
                onPointerEnter={(event) => {
                  setHoveredArchive(index);
                  updateArchivePreviewPosition(event);
                }}
                onPointerMove={updateArchivePreviewPosition}
                onPointerLeave={() => setHoveredArchive(null)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <time>{date}</time>
                <h4>{title}</h4>
                <p>{description}</p>
                <button
                  type="button"
                  className="archive-open"
                  aria-haspopup="dialog"
                  aria-controls={`archive-modal-${index}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setOpenArchive(index);
                  }}
                >
                  자세히 보기 <span aria-hidden="true">↗</span>
                </button>
              </article>
            ))}
          </div>

          {selectedArchive && selectedArchiveDetail && openArchive !== null && (
            <div className="project-modal-backdrop" role="presentation" onMouseDown={() => setOpenArchive(null)}>
              <section
                className="project-modal archive-modal"
                id={`archive-modal-${openArchive}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`archive-modal-title-${openArchive}`}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <div className="project-modal-topline">
                  <p>ARCHIVE DETAIL · KIMJUNHEE</p>
                  <button
                    type="button"
                    className="project-modal-close"
                    aria-label="활동 상세 닫기"
                    onClick={() => setOpenArchive(null)}
                  >
                    ×
                  </button>
                </div>
                <p className="project-modal-eyebrow">{selectedArchive[0]}</p>
                <h3 id={`archive-modal-title-${openArchive}`}>{selectedArchive[1]}</h3>
                <p className="project-modal-summary">{selectedArchiveDetail.summary}</p>
                <div className="archive-detail-meta">
                  {selectedArchiveDetail.role && (
                    <div>
                      <span>역할</span>
                      <strong>{selectedArchiveDetail.role}</strong>
                    </div>
                  )}
                  {selectedArchiveDetail.period && (
                    <div>
                      <span>시기</span>
                      <strong>{selectedArchiveDetail.period}</strong>
                    </div>
                  )}
                  {selectedArchiveDetail.result && (
                    <div>
                      <span>성과</span>
                      <strong>{selectedArchiveDetail.result}</strong>
                    </div>
                  )}
                </div>
                <ul className="archive-detail-points">
                  {selectedArchiveDetail.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </section>
            </div>
          )}
        </div>
      </section>

      <section className="about-section section-space" id="about">
        <div className="page-width">
          <p className="section-kicker">About Jun</p>
          <h2>
            보안을 이해하고,<br />
            <span>AI로 확장합니다.</span>
          </h2>
          <div className="about-grid">
            <p>
              한경국립대학교에서 정보보안을 전공하고 있습니다.<br />
              관심 분야는 <strong>AI 보안, 이상행위 탐지, 침입 탐지</strong>입니다.<br />
              디지털 환경의 비정상 행위와 알려지지 않은 공격을 탐지·분석하는 보안 인재를 목표로 합니다.
            </p>
            <p>
              현재는 Python과 머신러닝 기초를 실제 데이터에 적용하며,
              평가 점수보다 데이터 정의와 검증 구조를 먼저 보는 습관을 만들고 있습니다.
            </p>
          </div>

          <div className="skills-grid">
            {skillGroups.map((skill, index) => (
              <article className={`skill-card skill-${index + 1}`} key={skill.title}>
                <p>{skill.caption}</p>
                <h3>{skill.title}</h3>
                <span>{skill.text}</span>
                <button
                  type="button"
                  className="skill-open"
                  aria-haspopup="dialog"
                  aria-controls={`skill-modal-${index}`}
                  onClick={() => setOpenSkill(index)}
                >
                  간단히 보기 <span aria-hidden="true">↗</span>
                </button>
              </article>
            ))}
          </div>

          {selectedSkill && openSkill !== null && (
            <div className="project-modal-backdrop" role="presentation" onMouseDown={() => setOpenSkill(null)}>
              <section
                className="project-modal skill-modal"
                id={`skill-modal-${openSkill}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`skill-modal-title-${openSkill}`}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <div className="project-modal-topline">
                  <p>SKILL FOCUS</p>
                  <button type="button" className="project-modal-close" aria-label="스킬 설명 닫기" onClick={() => setOpenSkill(null)}>×</button>
                </div>
                <p className="project-modal-eyebrow">{selectedSkill.caption}</p>
                <h3 id={`skill-modal-title-${openSkill}`}>{selectedSkill.title}</h3>
                <p className="project-modal-summary">{selectedSkill.detail}</p>
                <ul className="skill-points">
                  {selectedSkill.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </section>
            </div>
          )}

          <div className="toolbox">
            <div>
              <p>Tools &amp; Documentation</p>
              <span>VMware · Docker · Notion · PowerPoint · Word · Excel</span>
            </div>
            <div>
              <p>Design &amp; Editing</p>
              <span>Photoshop · Illustrator · Premiere Pro</span>
            </div>
            <div>
              <p>Soft Skills</p>
              <span>Responsibility · Adaptability · Communication · Leadership</span>
            </div>
          </div>
        </div>
      </section>

      <section className="journey-section section-space" id="journey">
        <div className="page-width">
          <div className="background-grid">
            <section>
              <p className="background-label">Education</p>
              <h2 className="background-title">배운 것을 쌓아온 시간.</h2>
              {education.map(([school, major, date]) => (
                <article key={school}>
                  <div><h3>{school}</h3><p>{major}</p></div>
                  <time>{date}</time>
                </article>
              ))}
            </section>
            <section>
              <p className="background-label">Experience</p>
              <h2 className="background-title">현장에서 익힌 기준.</h2>
              {experiences.map(([place, role, date]) => (
                <article key={`${place}-${date}`}>
                  <div><h3>{place}</h3><p>{role}</p></div>
                  <time>{date}</time>
                </article>
              ))}
            </section>
          </div>

          <div className="credentials-section">
            <header>
              <p className="section-kicker">Credentials</p>
              <h2>배움을 증명한 기록.</h2>
            </header>
            <div className="credential-grid">
              {credentials.map(([title, issuer]) => (
                <article key={title}>
                  <span aria-hidden="true">✓</span>
                  <h3>{title}</h3>
                  <p>{issuer}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="values-section">
            <p className="section-kicker">How I Work</p>
            <h2>일을 대하는 기준.</h2>
            <div>
              {values.map((value, index) => (
                <article key={value}><span>0{index + 1}</span><p>{value}</p></article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-glow" aria-hidden="true" />
        <div className="page-width contact-inner">
          <p>다음 문제를 함께.</p>
          <h2>같이 풀어볼<br />보안 문제가 있나요?</h2>
          <div className="contact-links">
            <a href="mailto:boo2525@naver.com?subject=AI%20%EB%B3%B4%EC%95%88%20%EC%97%B0%EA%B5%AC%20%EC%9D%B4%EC%95%BC%EA%B8%B0">이메일 보내기</a>
            <a href="https://www.instagram.com/junheekim__" target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-width">
          <span>© 2026 Jun. All rights reserved.</span>
          <a href="#top">맨 위로 ↑</a>
        </div>
      </footer>

      {hoveredArchive !== null && (
        <div
          className="archive-preview"
          style={{ left: archivePreviewPosition.x, top: archivePreviewPosition.y }}
          aria-hidden="true"
        >
          <div className="archive-preview-frame">
            <Image src={archivePreviewImages[hoveredArchive % archivePreviewImages.length]} width={220} height={172} alt="" unoptimized />
            <span>{archiveProjects[hoveredArchive][1]}</span>
          </div>
        </div>
      )}
    </main>
  );
}
