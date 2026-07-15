"use client";

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";

const projects = [
  {
    eyebrow: "AI for Security",
    title: "보안 로그에서\n공격의 흔적을 찾다.",
    description:
      "KISA 방화벽 로그를 운영 관점의 3개 클래스로 재구성하고 Random Forest로 공격 유형을 분류했습니다.",
    evidenceLabel: "Model Accuracy",
    evidenceValue: "0.893",
    evidenceNote: "3-class firewall log classification",
    tags: ["Python", "Random Forest", "Log Analysis"],
    previewImage: "/projects/firewall-logs.svg",
    previewAlt: "방화벽 로그와 모델 정확도를 보여주는 보안 분석 화면",
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
    title: "데이터 누수 없이\n폐업 위험을 예측하다.",
    description:
      "서울시 상권 데이터를 상권 단위로 재구성하고, 데이터 누수를 차단한 검증 구조로 폐업 위험을 예측했습니다.",
    evidenceLabel: "Test F1",
    evidenceValue: "0.616",
    evidenceNote: "Group-aware cross validation",
    tags: ["GroupKFold", "Feature Engineering", "Clustering"],
    previewImage: "/projects/market-risk.svg",
    previewAlt: "상권 데이터를 그룹별로 분석하는 예측 모델 화면",
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
    title: "사람과 일정을\n하나의 별로 연결하다.",
    description:
      "그룹 일정 조율과 관계 기록을 우주 콘셉트로 연결한 Spring MVC 기반 웹 서비스를 설계하고 배포했습니다.",
    evidenceLabel: "Deployment",
    evidenceValue: "LIVE",
    evidenceNote: "Oracle Cloud · Nginx · HTTPS",
    tags: ["Spring MVC", "Tomcat", "Nginx · HTTPS"],
    previewImage: "/projects/mootbyeol.svg",
    previewAlt: "별과 궤도로 표현한 웹 서비스 배포 화면",
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
    detail: "웹과 시스템의 기본적인 공격 표면을 이해하고, 그 위에 AI를 활용한 탐지 관점을 확장하고 있습니다.",
    points: ["Web Security 취약점과 방어 흐름", "System Security 운영 관점", "AI Security 이상행위 탐지 학습"],
  },
  {
    title: "AI · Data",
    text: "Python · ML · Random Forest · KNN · SVM · PCA",
    caption: "머신러닝 · DL/LLM 학습 중",
    detail: "데이터를 목적에 맞게 정의하고, 누수를 막은 검증 구조 안에서 모델의 결과를 해석하는 데 집중합니다.",
    points: ["Python 기반 데이터 전처리", "Random Forest·KNN·SVM 모델 실습", "PCA와 DL/LLM 학습 확장"],
  },
  {
    title: "Programming",
    text: "C · Python · Java · Spring MVC · HTML/CSS",
    caption: "프로젝트 기반 구현 경험",
    detail: "문제를 작은 기능으로 나누고, 실제 서비스로 연결될 수 있는 구조를 직접 구현합니다.",
    points: ["C·Python·Java 기초 구현", "Spring MVC 웹 서비스 개발", "HTML/CSS 화면 구조와 인터랙션"],
  },
  {
    title: "Infrastructure",
    text: "Network · Linux · Windows Server · Virtualization",
    caption: "네트워크·Linux 운영 경험",
    detail: "서비스가 안정적으로 실행되는 환경을 이해하기 위해 네트워크, 서버, 가상화 환경을 함께 다룹니다.",
    points: ["Network 구조와 트러블슈팅", "Linux·Windows Server 운영", "VMware·Docker 기반 가상화"],
  },
];

const timeline = [
  {
    year: "2022 — 2023",
    title: "운영의 기준을 배웠습니다",
    text: "군 정보체계 운용·유지보수를 맡아 시스템과 네트워크 상태를 확인하고, 문제가 생겼을 때 원인을 좁혀 복구하는 과정을 반복했습니다.",
    takeaway: "배운 것 · 정상 상태를 알아야 이상을 발견할 수 있다는 것",
  },
  {
    year: "2026.05 — 06",
    title: "검증할 수 있는 분석을 만들었습니다",
    text: "보안 로그 분류와 폐업 위험 예측을 수행하며 타깃을 다시 정의하고, 상권 기준 GroupKFold로 데이터 누수를 막았습니다.",
    takeaway: "배운 것 · 좋은 모델보다 신뢰할 수 있는 검증이 먼저라는 것",
  },
  {
    year: "2026 — 현재",
    title: "AI 보안 연구의 기반을 쌓고 있습니다",
    text: "정보보안 전공과 머신러닝 경험을 연결해 이상행위 탐지와 AI for Security를 공부하고 있습니다. 모델 성능뿐 아니라 실제 운영에서 쓸 수 있는 탐지 기준까지 고민합니다.",
    takeaway: "다음 방향 · 오탐과 누락을 줄이는 실용적인 보안 연구",
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

const archivePreviewImages = [
  "/projects/firewall-logs.svg",
  "/projects/market-risk.svg",
  "/projects/mootbyeol.svg",
];

export default function Home() {
  const [openProject, setOpenProject] = useState<number | null>(null);
  const [openSkill, setOpenSkill] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [hoveredArchive, setHoveredArchive] = useState<number | null>(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 24, y: 24 });
  const [archivePreviewPosition, setArchivePreviewPosition] = useState({ x: 24, y: 24 });
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const selectedProject = openProject === null ? null : projects[openProject];
  const selectedSkill = openSkill === null ? null : skillGroups[openSkill];

  const updatePreviewPosition = (event: ReactPointerEvent<HTMLElement>) => {
    const previewWidth = 236;
    const previewHeight = 188;
    setPreviewPosition({
      x: Math.min(Math.max(event.clientX + 18, 16), window.innerWidth - previewWidth),
      y: Math.min(Math.max(event.clientY + 18, 16), window.innerHeight - previewHeight),
    });
  };

  const updateArchivePreviewPosition = (event: ReactPointerEvent<HTMLElement>) => {
    const previewWidth = 236;
    const previewHeight = 188;
    setArchivePreviewPosition({
      x: Math.min(Math.max(event.clientX + 18, 16), window.innerWidth - previewWidth),
      y: Math.min(Math.max(event.clientY + 18, 16), window.innerHeight - previewHeight),
    });
  };

  const handleInternalLink = (event: MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    setIsPageTransitioning(true);
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    }, 140);
    window.setTimeout(() => setIsPageTransitioning(false), 720);
  };

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handlePointerMove = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      cursor.classList.add("is-visible");
      const target = event.target instanceof Element ? event.target.closest("a, button, [data-cursor='interactive']") : null;
      cursor.classList.toggle("is-active", Boolean(target));
    };
    const handlePointerLeave = () => cursor.classList.remove("is-visible");

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  useEffect(() => {
    if (openProject === null && openSkill === null) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenProject(null);
        setOpenSkill(null);
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openProject, openSkill]);

  return (
    <main id="top">
      <div className={`page-transition ${isPageTransitioning ? "is-active" : ""}`} aria-hidden="true" />
      <div className="site-cursor" ref={cursorRef} aria-hidden="true"><span /></div>
      <header className="global-nav">
        <div className="nav-inner">
          <a className="wordmark micro-action" href="#top" aria-label="포트폴리오 첫 화면으로 이동" onClick={handleInternalLink} data-cursor="interactive">
            JUNHEE KIM
          </a>
          <nav aria-label="주요 메뉴">
            <a className="micro-action" href="#projects" onClick={handleInternalLink} data-cursor="interactive">WORK</a>
            <a className="micro-action" href="#about" onClick={handleInternalLink} data-cursor="interactive">ABOUT</a>
            <a className="micro-action" href="#journey" onClick={handleInternalLink} data-cursor="interactive">JOURNEY</a>
            <a className="micro-action" href="#contact" onClick={handleInternalLink} data-cursor="interactive">SAY HI</a>
          </nav>
        </div>
      </header>

      <section className="hero">
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
            <a className="primary-link micro-action" href="#projects" onClick={handleInternalLink} data-cursor="interactive">프로젝트 보기</a>
            <a className="text-link micro-action" href="#about" onClick={handleInternalLink} data-cursor="interactive">더 알아보기 <span aria-hidden="true" data-arrow>›</span></a>
          </div>
          <p className="hero-scroll-note"><span>SCROLL TO EXPLORE</span><span aria-hidden="true">↓</span></p>
        </div>

        <div className="hero-orbit" aria-hidden="true">
          <span className="hero-orbit-label">AI × SECURITY</span>
          <span className="hero-orbit-index">01 / 06</span>
          <span className="hero-orbit-core">J</span>
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
                className={`project-card project-${index + 1} ${hoveredProject === index ? "is-previewing" : ""}`}
                key={project.title}
                data-cursor="interactive"
                onPointerEnter={(event) => {
                  setHoveredProject(index);
                  updatePreviewPosition(event);
                }}
                onPointerMove={updatePreviewPosition}
                onPointerLeave={() => setHoveredProject(null)}
              >
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
                    className="project-open micro-action"
                    aria-haspopup="dialog"
                    aria-controls={`project-modal-${index}`}
                    onClick={() => setOpenProject(index)}
                    data-cursor="interactive"
                  >
                    진행 과정 보기 <span aria-hidden="true" data-arrow>↗</span>
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
                  <button type="button" className="project-modal-close micro-action" aria-label="프로젝트 과정 닫기" onClick={() => setOpenProject(null)} data-cursor="interactive">×</button>
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
              </article>
            ))}
          </div>
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
                  className="skill-open micro-action"
                  aria-haspopup="dialog"
                  aria-controls={`skill-modal-${index}`}
                  onClick={() => setOpenSkill(index)}
                  data-cursor="interactive"
                >
                  간단히 보기 <span aria-hidden="true" data-arrow>↗</span>
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
                  <button type="button" className="project-modal-close micro-action" aria-label="스킬 설명 닫기" onClick={() => setOpenSkill(null)} data-cursor="interactive">×</button>
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
          <div className="journey-grid">
            <header>
                <p className="section-kicker">How I Got Here</p>
                <h2>운영에서 배운 보안,<br />데이터로 확장합니다.</h2>
            </header>
            <div className="timeline">
              {timeline.map((item) => (
                <article key={item.year}>
                  <p>{item.year}</p>
                    <h3>{item.title}</h3>
                    <span>{item.text}</span>
                    <small>{item.takeaway}</small>
                </article>
              ))}
            </div>
          </div>

          <div className="background-grid">
            <section>
              <p className="background-label">Education</p>
              {education.map(([school, major, date]) => (
                <article key={school}>
                  <div><h3>{school}</h3><p>{major}</p></div>
                  <time>{date}</time>
                </article>
              ))}
            </section>
            <section>
              <p className="background-label">Experience</p>
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
          <span>AI 보안 연구, 데이터 분석 프로젝트, 서비스 개발에 관한 대화를 환영합니다.</span>
          <div className="contact-links">
            <a className="micro-action" href="mailto:boo2525@naver.com?subject=AI%20%EB%B3%B4%EC%95%88%20%EC%97%B0%EA%B5%AC%20%EC%9D%B4%EC%95%BC%EA%B8%B0" data-cursor="interactive">연구 이야기 나누기</a>
            <a className="micro-action" href="https://www.instagram.com/junheekim__" target="_blank" rel="noreferrer" data-cursor="interactive">Instagram <span aria-hidden="true" data-arrow>↗</span></a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-width">
          <span>© 2026 Jun. All rights reserved.</span>
          <a className="micro-action" href="#top" onClick={handleInternalLink} data-cursor="interactive">맨 위로 ↑</a>
        </div>
      </footer>

      {hoveredProject !== null && (
        <div
          className="project-preview"
          style={{ left: previewPosition.x, top: previewPosition.y }}
          aria-hidden="true"
        >
          <div className="project-preview-frame">
            <Image src={projects[hoveredProject].previewImage} width={220} height={172} alt="" />
            <span>{projects[hoveredProject].eyebrow}</span>
          </div>
        </div>
      )}

      {hoveredArchive !== null && (
        <div
          className="archive-preview"
          style={{ left: archivePreviewPosition.x, top: archivePreviewPosition.y }}
          aria-hidden="true"
        >
          <div className="archive-preview-frame">
            <Image src={archivePreviewImages[hoveredArchive % archivePreviewImages.length]} width={220} height={172} alt="" />
            <span>{archiveProjects[hoveredArchive][1]}</span>
          </div>
        </div>
      )}
    </main>
  );
}
