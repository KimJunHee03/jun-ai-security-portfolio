"use client";

import { useEffect, useState, useSyncExternalStore, type CSSProperties, type MouseEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import Image from "next/image";
import { notionArchiveDetails } from "./notion-archive-data";

type ThemeMode = "light" | "system" | "dark";

const themeStorageKey = "jun-theme";
const themeChangeEvent = "jun-theme-change";
let themeMemory: ThemeMode = "system";

function readThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "system";
  try {
    const saved = window.localStorage.getItem(themeStorageKey);
    if (saved === "light" || saved === "system" || saved === "dark") {
      themeMemory = saved;
    }
  } catch {
    // The in-memory fallback still applies when storage is unavailable.
  }
  return themeMemory;
}

function subscribeToThemeMode(onChange: () => void) {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener("storage", onChange);
  window.addEventListener(themeChangeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(themeChangeEvent, onChange);
  };
}

function getServerThemeMode(): ThemeMode {
  return "system";
}

function writeThemeMode(next: ThemeMode) {
  themeMemory = next;
  try {
    window.localStorage.setItem(themeStorageKey, next);
  } catch {
    // The selected mode still applies for this session when storage is unavailable.
  }
  window.dispatchEvent(new Event(themeChangeEvent));
}

const themeOptions: Array<{ value: ThemeMode; label: string; icon: string }> = [
  { value: "light", label: "밝게", icon: "☼" },
  { value: "system", label: "시스템", icon: "▣" },
  { value: "dark", label: "어둡게", icon: "☾" },
];

const projects = [
  {
    eyebrow: "AI for Security",
    title: "KISA 방화벽 로그 기반\n3-Class 공격 유형 분류 모델 구현",
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
    title: "GroupKFold를 이용한 데이터 누수 차단 및\n상권 폐업 예측",
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
    title: "Spring MVC 기반 그룹 일정 조율 및 기록\n웹 서비스 '뭇별' 배포",
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

type ProjectPointer = { x: number; y: number };

const securityNetworkNodes = [
  { key: "node-a", line: "line-a", x: 14, y: 20 },
  { key: "node-b", line: "line-b", x: 28, y: 76 },
  { key: "node-c", line: "line-c", x: 50, y: 16 },
  { key: "node-d", line: "line-d", x: 83, y: 28 },
  { key: "node-e", line: "line-e", x: 87, y: 78 },
];

function ProjectEffects({ index, pointer }: { index: number; pointer: ProjectPointer }) {
  if (index === 0) {
    return (
      <div
        className="project-pointer-effect project-log-effect"
        style={{ "--pointer-x": `${pointer.x}%`, "--pointer-y": `${pointer.y}%` } as CSSProperties}
        aria-hidden="true"
      >
        <span className="log-pointer-grid" />
        <span className="log-pointer-line" />
        <span className="log-pointer-ring" />
        <span className="log-pointer-dot" />
      </div>
    );
  }

  if (index === 1) {
    const cursorX = Math.max(8, Math.min(92, pointer.x));
    const graphY = Math.max(18, Math.min(84, 84 - pointer.y * 0.56));
    const graphPath = `M 7 84 C 22 80 34 ${Math.max(30, graphY + 18)} ${cursorX} ${graphY} S 76 ${Math.max(18, graphY - 4)} 94 ${Math.max(14, graphY - 18)}`;

    return (
      <svg
        className="project-pointer-effect prediction-graph-effect"
        viewBox="0 0 100 100"
        style={{ "--pointer-x": `${cursorX}%`, "--pointer-y": `${graphY}%` } as CSSProperties}
        aria-hidden="true"
      >
        <g className="prediction-graph-grid">
          <path d="M 8 22 H 92 M 8 42 H 92 M 8 62 H 92 M 8 82 H 92" />
          <path d="M 18 12 V 88 M 38 12 V 88 M 58 12 V 88 M 78 12 V 88" />
        </g>
        <path className="prediction-graph-line" d={graphPath} />
        <line className="prediction-graph-crosshair" x1={cursorX} y1="12" x2={cursorX} y2="88" />
        <line className="prediction-graph-crosshair" x1="8" y1={graphY} x2="92" y2={graphY} />
        <circle className="prediction-graph-pulse" cx={cursorX} cy={graphY} r="5" />
        <circle className="prediction-graph-point" cx={cursorX} cy={graphY} r="2.2" />
      </svg>
    );
  }

  return (
    <svg className="project-pointer-effect project-network" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <g className="network-links">
        {securityNetworkNodes.map((node) => (
          <line key={node.key} className={`network-line ${node.line}`} x1={node.x} y1={node.y} x2={pointer.x} y2={pointer.y} />
        ))}
      </g>
      <g className="network-nodes">
        {securityNetworkNodes.map((node) => (
          <circle key={node.key} className={`network-node ${node.key}`} cx={node.x} cy={node.y} r="1.6" />
        ))}
        <circle className="network-hub-pulse" cx={pointer.x} cy={pointer.y} r="5" />
        <circle className="network-hub" cx={pointer.x} cy={pointer.y} r="2.8" />
      </g>
    </svg>
  );
}

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
  ["청운대학교 (인천)", "컴퓨터공학과", "2023.02 — 2026.02"],
  ["한경국립대학교 (안성)", "정보보안전공", "2026.02 — 현재"],
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
    summary: "부원 모집과 홍보 자료 제작부터 방송 송출과 타종 시스템 운영까지, 방송부의 기획과 현장 운영을 맡았습니다.",
    points: [
      "부원 모집 및 홍보 자료 제작",
      "페이스북 관리",
      "전교 부회장 홍보 영상 제작: 기획 변경과 촬영 일정 지연에 대응하고, 오디오 노이즈 제거·화면 안정화·더빙 싱크 조정",
      "학생회·동아리·행정실 등 다양한 주체와 행사 일정 및 방송 운영 협업",
      "아침·점심 방송 송출과 교내 타종 시스템 운영",
    ],
  },
  {
    role: "개인 프로젝트",
    period: "2020.07 — 08",
    result: "UI/UX 설계 결과물",
    summary: "자가검진 애플리케이션을 가정해 사용자가 질문에 답하고 결과를 확인하는 흐름을 UI/UX로 설계했습니다.",
    points: [
      "자가검진 애플리케이션의 사용자 흐름과 화면 구조 설계",
      "검진 입력부터 결과 확인까지의 화면 구성",
      "개인 프로젝트로 UI/UX 시안 제작",
      "프로젝트 기간: 2020년 7월 — 8월",
    ],
  },
  {
    role: "기획 및 디자인",
    period: "2024.05.17",
    result: "398명 참가 · 우수상 수상",
    summary: "디지털 지식을 누구나 쉽게 이해할 수 있도록 내용을 정리하고, 정보 구조를 카드뉴스로 기획해 제작했습니다.",
    points: [
      "디지털 지식 대중화를 주제로 전달할 정보 선정",
      "복잡한 내용을 카드 단위로 나누어 읽기 흐름 구성",
      "카드뉴스 기획·시각 디자인·최종 제출",
    ],
  },
  {
    role: "개인 진행",
    period: "2024.05",
    result: "A+",
    summary: "사용되지 않는 교내 공간을 관찰하고, 공간이 다시 활용될 수 있도록 문제를 정의해 개선안을 제안했습니다.",
    points: [
      "사용하지 않는 공간의 현황과 불편 요소 파악",
      "공간 활용을 막는 문제를 정의하고 개선 방향 구상",
      "PBL 결과물로 공간 개선안 정리",
    ],
  },
  {
    role: "팀원",
    period: "2024.03 — 06",
    result: "학습공동체 활동",
    summary: "같은 주제와 관심 분야를 공부하려는 학생들과 학습공동체를 만들고, 함께 전공 내용을 공부했습니다.",
    points: [
      "학습 목표와 주제를 정하고 팀원들과 역할 분담",
      "학습 자료를 공유하고 서로 질문하며 내용 점검",
      "공동체 기반 전공 학습 활동 기록",
      "자율전공 학습공동체 활동으로 수료증 발급",
    ],
  },
  {
    role: "개인 진행 · 기획 및 디자인",
    period: "2024.06.04",
    result: "최우수상",
    summary: "‘나는 지금 무엇에 빠져 있는가?’를 주제로, 미래를 위해 몰입하고 있는 것과 진로 탐색 과정의 다양한 경험을 글로 정리했습니다.",
    points: [
      "현재의 관심과 몰입을 돌아보며 글의 주제 설정",
      "진로 탐색을 위해 경험한 활동과 생각을 서술",
      "글 구성과 제출물을 직접 기획·디자인해 공모전 출품",
    ],
  },
  {
    role: "팀원",
    period: "2024.09 — 12",
    result: "학습공동체 활동",
    summary: "1학기에 이어 같은 주제와 관심 분야를 공부하는 학생들과 학습공동체를 이어가며 전공 학습을 지속했습니다.",
    points: [
      "2학기 학습 주제와 목표를 정하고 팀원들과 진행 계획 수립",
      "학습 자료 공유와 질의·응답을 통한 내용 보완",
      "공동체 기반 전공 학습 활동 및 회고",
      "자율전공 학습공동체 활동으로 수료증 발급",
    ],
  },
  {
    role: "감상·에세이 작성",
    period: "2024.11",
    result: "A+",
    summary: "호치민 관련 영상을 시청한 뒤 독립전쟁과 리더십에 대한 생각을 1페이지 분량의 감평문으로 작성했습니다.",
    points: [
      "호치민의 독립전쟁과 리더십에 관한 영상 시청",
      "영상의 핵심 주장과 인상 깊은 장면 정리",
      "개인 관점과 느낀 점을 포함한 감평문 작성·제출",
    ],
  },
  {
    role: "개인 작성",
    period: "2024.09 — 12",
    result: "A+",
    summary: "개인의 관심사에서 자유 주제를 정하고, 생각을 5페이지 이상의 글로 구성해 표현했습니다.",
    points: [
      "개인의 관심사를 바탕으로 자유 주제 선정",
      "주장과 경험을 연결해 5페이지 이상의 글 구성",
      "글쓰기와 표현 수업 결과물 작성 및 제출",
    ],
  },
  {
    role: "PPT·UI/UX·최종 제안서",
    period: "2024.03 — 06 / 2025.05",
    result: "장려상",
    summary: "청운대학교 애플리케이션을 사용하며 느낀 불편을 정리하고, 사용자 흐름을 개선하는 UI/UX와 발표 자료를 제안했습니다.",
    points: [
      "앱 사용 흐름에서 불편한 지점과 개선 필요성 분석",
      "화면 구조와 사용자 흐름을 중심으로 UI/UX 개선안 설계",
      "PPT 발표 자료와 최종 제안서 작성",
    ],
  },
  {
    role: "개인 학습 정리",
    period: "2025.05",
    result: "장려상",
    summary: "서버 구축과 관리에 대한 학습 내용을 네트워크 중심의 포트폴리오로 정리하고, 실제 배포 과정에서 마주친 문제와 해결 과정까지 기록했습니다.",
    points: [
      "Ubuntu Linux 서버와 네트워크 중심 학습 내용 정리",
      "Oracle Cloud 인스턴스에 SSH로 접속해 apt 업데이트와 JDK 11 설치",
      "8080 포트 개방, Tomcat 설치·설정, Windows에서 Ubuntu 서버로 파일 전송",
      "도메인(Gabia) 연결과 Nginx 설정, HTTPS 인증서 적용",
      "SCP로 WAR 파일을 전송하고 기존 ROOT 애플리케이션을 백업한 뒤 재배포",
      "UFW에서 22·80·443 포트를 관리하고 Tomcat 기본 docs·examples·manager 페이지 제거",
      "Nginx의 server_tokens를 끄고 서버 정보 노출을 줄이는 설정 적용",
      "www 도메인 인증서 누락 문제를 확인하고 한글 도메인·www 포워딩 설정을 수정",
      "이미지 업로드 용량과 413 커스텀 오류 페이지를 테스트하고 약 17MB 파일 업로드 확인",
      "4차 재배포까지 진행한 과정을 학습 포트폴리오로 편집·제출",
    ],
  },
  {
    role: "개인 프로젝트",
    period: "2025.06",
    result: "웹클라이언트 프로그래밍 최종 과제",
    summary: "웹 클라이언트 프로그래밍에서 배운 내용을 활용해 자유 주제의 개인 페이지를 만들고 GitHub에 게시했습니다. 결과물은 kimjunhee03.github.io/portfolio/에서 확인할 수 있습니다.",
    points: [
      "웹 클라이언트 프로그래밍 학습 내용을 기반으로 개인 페이지 제작",
      "HTML·CSS 기반 개인 홈페이지 화면 구성",
      "자유 주제에 맞춰 콘텐츠와 페이지 구조 설계",
      "완성한 웹사이트를 GitHub를 통해 게시",
      "최종 과제 결과물: kimjunhee03.github.io/portfolio/",
    ],
  },
  {
    role: "개인 프로젝트",
    period: "2025.12",
    result: "A+",
    summary: "홍성 또는 인천의 지역 기업·제품을 선정해 정보를 조사하고, 로컬 콘텐츠 카드뉴스로 기획·제작했습니다.",
    points: [
      "홍성·인천 소재 기업 또는 제품 선정",
      "지역 정보와 제품 특징을 조사해 핵심 내용 요약",
      "SNS용 카드뉴스 구성·디자인·최종 과제 제출",
    ],
  },
  {
    role: "개인 프로젝트",
    period: "2025.12",
    result: "A+",
    summary: "C# 기반 윈도우 프로그래밍 수업에서 배운 내용을 적용해 최종 과제를 수행하고 결과물을 제출했습니다.",
    points: [
      "C# 프로그래밍 입문 및 윈도우 프로그래밍 개념 학습",
      "수업에서 배운 내용을 개인 과제 형태로 구현",
      "윈도우 프로그래밍 최종 결과물 제출",
    ],
  },
  {
    role: "지식iN 답변 활동",
    period: "2025.12.31 활동 중단",
    result: "컴퓨터 본체 9위 · 컴퓨터 부품·조립 40위",
    summary: "컴퓨터 본체와 부품·조립 분야의 질문을 읽고 해결 방향을 정리해 답변하며 지식을 공유했습니다.",
    points: [
      "질문 상황과 사용자의 요구사항을 파악해 답변 작성",
      "컴퓨터 본체 분야 활동 순위 9위",
      "컴퓨터 부품·조립 분야 활동 순위 40위",
    ],
  },
  {
    role: "서비스 개발·서버 운영·보안 점검",
    period: "1차 2026.04.01 — 06.14 / 2차 여름방학 예정",
    result: "서비스 운영",
    summary: "일정 조율과 기록을 하나의 별로 연결하는 웹서비스를 개발했습니다. 기능 구현에 그치지 않고 Oracle Cloud 서버 구축, 도메인·HTTPS 연결, 재배포, 보안 점검과 개선 기록까지 직접 남겼습니다.",
    points: [
      "서비스 구조 설계와 기술 스택 구성: Spring MVC, JSP, Tomcat, Nginx, Ubuntu, Supabase",
      "일정 조율·기록·관리자 기능과 방 만들기 흐름 구현",
      "Oracle Cloud 인스턴스에 SSH로 접속하고 JDK 11·Tomcat을 설치해 서비스 배포",
      "Gabia 도메인, Nginx 리버스 프록시, HTTPS 인증서와 www·한글 도메인 포워딩 구성",
      "SCP로 WAR를 전송하고 기존 ROOT를 백업한 뒤 Tomcat을 재시작하는 재배포 흐름 정리",
      "UFW에서 SSH·HTTP·HTTPS 포트를 관리하고 Tomcat 기본 관리 페이지 제거",
      "이미지 업로드 용량을 점검하고 413 커스텀 에러 페이지와 약 17MB 파일 업로드를 테스트",
      "CSRF 방어와 보안 헤더 적용",
      "CSRF 토큰을 세션에 저장하고 변경 요청의 파라미터·헤더를 검증하며 정적 리소스는 제외",
      "X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy와 캐시 정책 적용",
      "BCrypt 비밀번호 해시, 세션 타임아웃, 로그인·요청 감사 로그 구현",
      "로그인 성공·실패, 실패 사유, IP, User-Agent와 요청 메서드·경로·상태 코드·처리 시간 기록",
      "관리자 권한과 접근 제어 점검: 회원 차단·정지, 운영자 권한 변경, 별 상태 변경·삭제와 관리자 행동 로그",
      "SQL Injection 대응: JdbcTemplate 바인딩과 상태값 화이트리스트 적용",
      "XSS 대응: JSP 출력 escape, URL 생성과 외부 링크 rel 속성 적용",
      "파일 업로드 대응: 이미지 MIME 확인, 허용 확장자 제한, UUID 파일명, canonical path 비교",
      "비로그인 접근·다른 사용자의 roomId/starId 접근·직접 POST 호출·스크립트 입력·에러 노출을 점검",
      "초기 보안 점검에서 rate limit, 약한 비밀번호 정책, HSTS·Secure 쿠키·CSP 등 추가 개선 항목을 기록",
      "2차 개선안으로 비밀번호 8자 이상·쉬운 비밀번호 차단, 닉네임·아이디·방 제목 입력 제한을 정리",
    ],
  },
  {
    role: "2인 1조",
    period: "2026.06.18",
    result: "Random Forest 기본 F1 0.84",
    summary: "서울시 카페 상권 데이터를 2021년부터 2025년까지 분석해 최근 2년 폐업률 증가폭이 큰 상권을 위험 상권으로 정의했습니다. 여러 타깃과 모델을 비교한 뒤, 데이터 누수로 과대평가된 결과를 구분해 신뢰할 수 있는 검증의 필요성을 확인했습니다.",
    points: [
      "기계학습 강의를 통한 3주 프로젝트로 2인 1조 진행",
      "점포·매출·유동인구·상주인구·직장인구·상권변화지표 데이터 활용",
      "2021 — 2025년 데이터를 상권코드·년분기코드 기준으로 병합하고 결측치 처리",
      "프랜차이즈 비율, 객단가, 점포당 매출, 점포당 유동인구, 경쟁강도 파생변수 생성",
      "최근 2년 폐업률 증가폭 상위 30% 상권을 위험 상권으로 정의",
      "폐업률 상위 10%·20%·30%, 폐업점포 기준, 점포 수와 폐업률 기준, 상권변화지표 기준 등 여러 타깃 비교",
      "최종 타깃은 최근 2년 폐업률 증가폭에 상권 규모를 함께 반영하는 방식으로 선정",
      "Logistic: Accuracy 0.64 · Precision 0.75 · Recall 0.70 · F1 0.72",
      "Decision Tree: Accuracy 0.64 · Precision 0.82 · Recall 0.60 · F1 0.69",
      "Random Forest 기본 성능: Accuracy 0.80 · Precision 0.91 · Recall 0.78 · F1 0.84",
      "하이퍼파라미터 튜닝에서 F1 0.95 — 0.99가 나왔지만 실제보다 과대평가될 수 있음을 확인",
      "같은 상권의 여러 분기 데이터가 학습·테스트에 함께 들어가 이미 본 상권의 다른 분기를 예측하는 누수 문제 기록",
      "상권 단위 GroupKFold와 타깃·검증 구조를 다시 설계해 결과를 신뢰할 수 있는지 점검",
      "방학 중 선이수 학습 후 동일한 내용으로 다시 실행해 학습 전후의 성장을 비교할 계획",
    ],
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

function renderNotionInline(value: string, keyPrefix: string): ReactNode {
  const cleanValue = value.replace(/<\/?span[^>]*>/g, "").replace(/<\/?c[^>]*>/g, "");
  const tokens = cleanValue.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return tokens.map((token, index) => {
    if (!token) return null;
    const key = keyPrefix + "-" + index;
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={key}>{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith("[") && token.includes("](") && token.endsWith(")")) {
      const match = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        return <a key={key} href={match[2]} target="_blank" rel="noreferrer">{match[1]}</a>;
      }
    }
    return <span key={key}>{token}</span>;
  });
}

function getNotionFileLabel(line: string) {
  try {
    const decoded = decodeURIComponent(line);
    const matches = [...decoded.matchAll(/([^"\\/]+\.(?:pdf|hwp|ipynb|docx|pptx|xlsx))/gi)];
    return matches.at(-1)?.[1] ?? "첨부 파일";
  } catch {
    return "첨부 파일";
  }
}

function renderNotionContent(content: string, pageNo: string) {
  return content.split(/\r?\n/).map((rawLine, index) => {
    const line = rawLine.trim();
    const key = "notion-" + pageNo + "-" + index;
    if (!line || /^(?:<empty-block\/>|<\/?(?:columns|column)>|<\/?content>)$/.test(line)) return null;
    if (line === "---") return <hr key={key} />;

    // Notion export embeds inaccessible remote image blobs as file:// URLs.
    // Do not expose the raw serialized URL when no local asset was created.
    if (/^!\[[^\]]*\]\(file:\/\//.test(line)) return null;
    if (pageNo === "13" && (line === "![](/archive/notion/13-08.png)" || line === "…?")) return null;

    const image = line.match(/^!\[([^\]]*)\]\((\/archive\/notion\/[^)]+)\)$/);
    if (image) {
      return (
        <figure className="notion-image-block" key={key}>
          <a
            className="notion-image-link"
            href={image[2]}
            target="_blank"
            rel="noreferrer"
            aria-label="이미지를 원본 크기로 크게 보기"
          >
            <Image
              src={image[2]}
              alt={image[1] || ("Notion 원문 이미지 " + (index + 1))}
              width={1200}
              height={800}
              sizes="(max-width: 720px) calc(100vw - 48px), 632px"
              loading="lazy"
              style={{ width: "100%", height: "auto" }}
            />
          </a>
          {image[1] && <figcaption>{image[1]}</figcaption>}
        </figure>
      );
    }

    if (line.startsWith("<file ")) {
      if (
        line.includes("483e34ca-8eae-44a3-a887-739313eaf512") ||
        line.includes("6e2b93ce-6a95-49df-8ec6-42e087cb711b") ||
        line.includes("65c19f3a-9f7e-4000-a4e3-16116fcbe592")
      ) return null;
      return <p className="notion-file-block" key={key}>첨부 파일 · {getNotionFileLabel(line)}</p>;
    }
    if (line.startsWith("- ")) {
      return <li className="notion-list-item" key={key}>{renderNotionInline(line.slice(2), key)}</li>;
    }
    if (/^\d+\.\s/.test(line)) {
      return <li className="notion-list-item" key={key}>{renderNotionInline(line.replace(/^\d+\.\s/, ""), key)}</li>;
    }
    if (/^\*\*[^*]+\*\*$/.test(line)) {
      return <h4 key={key}>{renderNotionInline(line, key)}</h4>;
    }
    return <p key={key}>{renderNotionInline(line, key)}</p>;
  });
}

export default function Home() {
  const [openProject, setOpenProject] = useState<number | null>(null);
  const [projectPointer, setProjectPointer] = useState<ProjectPointer>({ x: 50, y: 50 });
  const [openSkill, setOpenSkill] = useState<number | null>(null);
  const [openArchive, setOpenArchive] = useState<number | null>(null);
  const [hoveredArchive, setHoveredArchive] = useState<number | null>(null);
  const [archivePreviewPosition, setArchivePreviewPosition] = useState({ x: 24, y: 24 });
  const [isNavTransitioning, setIsNavTransitioning] = useState(false);
  const [navTransitionDirection, setNavTransitionDirection] = useState<"down" | "up">("down");
  const themeMode = useSyncExternalStore(subscribeToThemeMode, readThemeMode, getServerThemeMode);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const selectedProject = openProject === null ? null : projects[openProject];
  const selectedSkill = openSkill === null ? null : skillGroups[openSkill];
  const selectedArchive = openArchive === null ? null : archiveProjects[openArchive];
  const selectedArchiveDetail = openArchive === null ? null : archiveDetails[openArchive];
  const selectedArchiveImage = openArchive === null ? null : archivePreviewImages[openArchive];
  const selectedArchiveNotion = openArchive === null ? null : notionArchiveDetails[openArchive];

  const updateProjectPointer = (event: ReactPointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
    setProjectPointer({ x, y });
  };

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
  }, [themeMode]);

  useEffect(() => {
    if (!isThemeMenuOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest("[data-theme-menu]")) setIsThemeMenuOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsThemeMenuOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isThemeMenuOpen]);

  useEffect(() => {
    const revealTargets = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

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

  const activeTheme = themeOptions.find((option) => option.value === themeMode) ?? themeOptions[1];

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
              <article
                className={`project-card project-${index + 1}`}
                key={project.title}
                onPointerEnter={updateProjectPointer}
                onPointerMove={updateProjectPointer}
              >
                <ProjectEffects index={index} pointer={projectPointer} />
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

          <div className="archive-header reveal-on-scroll">
            <div>
              <p className="section-kicker">전체 아카이브</p>
              <h3>전체 기록</h3>
            </div>
            <p>Notion에 정리된 프로젝트, 발표, 수상과 학습 활동을 오래된 기록부터 최근 활동까지 담았습니다.</p>
          </div>
          <div className="archive-list">
            {archiveProjects.map(([date, title, description], index) => (
              <article
                className="reveal-on-scroll"
                key={`${date}-${title}`}
                data-record={`ARCHIVE-${String(index + 1).padStart(2, "0")}`}
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
                {openArchive >= 15 ? (
                  <p className="archive-coming-soon">업로드 예정</p>
                ) : selectedArchiveNotion ? (
                  <div className="notion-archive-content">
                    {renderNotionContent(selectedArchiveNotion.content, selectedArchiveNotion.no)}
                  </div>
                ) : null}
                {selectedArchiveImage && (
                  <figure className="archive-detail-image-wrap">
                    <Image
                      src={selectedArchiveImage}
                      alt={`${selectedArchive[1]} 대표 이미지`}
                      width={1200}
                      height={760}
                      className="archive-detail-image"
                    />
                    <figcaption>프로젝트·활동 대표 이미지</figcaption>
                  </figure>
                )}
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
          <p className="section-kicker reveal-on-scroll">About Jun</p>
          <div className="about-grid reveal-on-scroll">
            <h2>
              보안을 이해하고,<br />
              <span>AI로 확장합니다.</span>
            </h2>
            <p>
              한경국립대학교에서 정보보안을 전공하고 있습니다.<br />
              관심 분야는 <strong>AI 보안, 이상행위 탐지, 침입 탐지</strong>입니다.<br />
              디지털 환경의 비정상 행위와 알려지지 않은 공격을 탐지·분석하는 보안 인재를 목표로 합니다.
            </p>
          </div>

          <div className="skills-grid">
            {skillGroups.map((skill, index) => (
              <article className={`skill-card skill-${index + 1} reveal-on-scroll`} key={skill.title}>
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

          <div className="toolbox reveal-on-scroll">
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
            <section className="background-grid-section education-list reveal-on-scroll">
              <p className="background-label">Education</p>
              <h2 className="background-title">학력</h2>
              {education.map(([school, major, date]) => (
                <article className="background-entry reveal-on-scroll" key={school}>
                  <div><h3>{school}</h3><p>{major}</p></div>
                  <time>{date}</time>
                </article>
              ))}
            </section>
            <section className="background-grid-section experience-list reveal-on-scroll">
              <p className="background-label">Experience</p>
              <h2 className="background-title">경력 및</h2>
              {experiences.map(([place, role, date]) => (
                <article className="background-entry reveal-on-scroll" key={`${place}-${date}`}>
                  <div><h3>{place}</h3><p>{role}</p></div>
                  <time>{date}</time>
                </article>
              ))}
            </section>
          </div>

          <div className="credentials-section">
            <header>
              <p className="section-kicker">Credentials</p>
              <h2>자격 사항</h2>
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

        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-glow" aria-hidden="true" />
        <div className="page-width contact-inner reveal-on-scroll">
          <p>더 깊이, 더 정확하게.</p>
          <h2>AI 보안을 향해<br />계속 나아가겠습니다.</h2>
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

      <div className="theme-menu" data-theme-menu>
        <button
          type="button"
          className="theme-trigger"
          aria-label={`현재 테마: ${activeTheme.label}. 테마 선택`}
          aria-haspopup="menu"
          aria-expanded={isThemeMenuOpen}
          onClick={() => setIsThemeMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{activeTheme.icon}</span>
        </button>
        {isThemeMenuOpen && (
          <div className="theme-popover" role="menu" aria-label="테마 선택">
            {themeOptions.map((option) => (
              <button
                type="button"
                role="menuitemradio"
                aria-checked={themeMode === option.value}
                className={`theme-option ${themeMode === option.value ? "is-selected" : ""}`}
                key={option.value}
                onClick={() => {
                  writeThemeMode(option.value);
                  setIsThemeMenuOpen(false);
                }}
              >
                <span className="theme-option-icon" aria-hidden="true">{option.icon}</span>
                <span>{option.label}</span>
                {themeMode === option.value && <span className="theme-check" aria-hidden="true">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>

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
