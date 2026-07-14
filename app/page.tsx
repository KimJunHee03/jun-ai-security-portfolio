const stats = [
  { value: "4.17", label: "최근 학기 평점", unit: "/ 4.5" },
  { value: "0.893", label: "보안 로그 분류", unit: "Accuracy" },
  { value: "18", label: "프로젝트·활동 기록", unit: "Archive" },
];

const projects = [
  {
    eyebrow: "AI for Security",
    title: "보안 로그에서\n공격의 흔적을 찾다.",
    description:
      "KISA 방화벽 로그를 운영 관점의 3개 클래스로 재구성하고 Random Forest로 공격 유형을 분류했습니다.",
    result: "Accuracy 0.893",
    tags: ["Python", "Random Forest", "Log Analysis"],
    detail:
      "10개 원본 공격 유형을 3개 범주로 재설계했습니다. 단순 정확도에 머물지 않고 SQL Injection과 GET Flooding의 낮은 재현율을 확인해, 실무 적용 전 보완해야 할 한계까지 분석했습니다.",
  },
  {
    eyebrow: "Artificial Intelligence",
    title: "데이터 누수 없이\n폐업 위험을 예측하다.",
    description:
      "서울시 상권 데이터를 상권 단위로 재구성하고, 데이터 누수를 차단한 검증 구조로 폐업 위험을 예측했습니다.",
    result: "Test F1 0.616",
    tags: ["GroupKFold", "Feature Engineering", "Clustering"],
    detail:
      "점포·매출·유동인구 등 대규모 원천 데이터를 통합했습니다. 상권 기준 GroupKFold를 적용하고 타깃 정의를 다시 설계해 과대평가를 줄였으며, 선별형 모델로서의 활용 가능성과 재현율 한계를 함께 제시했습니다.",
  },
  {
    eyebrow: "Web · Security",
    title: "사람과 일정을\n하나의 별로 연결하다.",
    description:
      "그룹 일정 조율과 관계 기록을 우주 콘셉트로 연결한 Spring MVC 기반 웹 서비스를 설계하고 배포했습니다.",
    result: "Live Service",
    tags: ["Spring MVC", "Tomcat", "Nginx · HTTPS"],
    detail:
      "JSP·JSTL·JdbcTemplate으로 기능을 구현하고 Oracle Cloud에 배포했습니다. BCrypt 비밀번호 해시, 세션 만료, 객체별 권한 검증, HTTPS와 방화벽 설정 등 운영 단계의 보안을 직접 점검했습니다.",
  },
];

const skillGroups = [
  {
    title: "Security",
    text: "Web Security · System Security · AI Security",
    caption: "웹·시스템 중 · AI 보안 학습 중",
  },
  {
    title: "AI · Data",
    text: "Python · ML · Random Forest · KNN · SVM · PCA",
    caption: "머신러닝 중 · DL/LLM 학습 중",
  },
  {
    title: "Programming",
    text: "C · Python · Java · Spring MVC · HTML/CSS",
    caption: "C 상 · Python/Java 중",
  },
  {
    title: "Infrastructure",
    text: "Network · Linux · Windows Server · Virtualization",
    caption: "네트워크·Linux 상",
  },
];

const timeline = [
  {
    year: "2026 — 현재",
    title: "정보보안 전공 3학년",
    text: "기계학습과 보안 과목을 연결하며 AI for Security 연구 방향을 구체화하고 있습니다.",
  },
  {
    year: "2026.05 — 06",
    title: "머신러닝 프로젝트 2건",
    text: "보안 로그 분류와 폐업 위험 예측을 수행하며 타깃 설계, 누수 방지, 모델 평가를 경험했습니다.",
  },
  {
    year: "2022 — 2023",
    title: "정보체계 운용·유지보수",
    text: "군 정보체계의 안정적인 운용을 지원하며 시스템과 네트워크를 실제 운영 관점에서 익혔습니다.",
  },
];

const education = [
  ["한경국립대학교", "정보보안전공", "2026.02 — 현재"],
  ["청운대학교", "컴퓨터공학과", "2023.02 — 2026.02"],
  ["인하공업전문대학교", "정보통신공학과", "2022.02 — 2022.12"],
  ["사우고등학교", "제20회 졸업", "2019.03 — 2022.01"],
];

const experiences = [
  ["대한민국 육군", "교육사 전투지휘훈련단 · 모의지원", "2022.04 — 2023.10"],
  ["롯데몰 김포공항점", "백화점 안전팀", "2023.10 — 2024.02"],
  ["행사 경호팀", "실기시험·공연·행사 안전 업무", "2024.12 — 2025.02"],
  ["동래정", "매장 근무", "2024.07 — 2025.10"],
  ["CU 편의점", "매장 운영", "2025.02 — 현재"],
];

const credentials = [
  ["네트워크관리사 2급", "ICQA · 2021.12"],
  ["컴퓨터활용능력 2급", "대한상공회의소 · 2021.12"],
  ["정보기기운용기능사", "HRD · 2022.12"],
  ["운전면허 1종 보통", "경찰청 · 2021.10"],
  ["신임경비교육", "경찰청 · 2023.10"],
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
  ["2026.06", "ML 프로젝트", "기계학습 강의를 통한 3주 팀 프로젝트"],
  ["2026.04", "뭇별", "웹 서비스 구현부터 서버 운영·배포·보안까지"],
  ["2025.12", "청운대", "1~2학년 대학 생활과 전공 활동 정리"],
  ["2025.12", "지식iN · 바람신", "질문 답변 기반 지식 공유 활동"],
  ["2025.12", "윈도우 프로그래밍", "Windows Programming 최종 과제"],
  ["2025.12", "SNS 콘텐츠 제작", "SNS 콘텐츠 제작 최종 과제"],
  ["2025.06", "개인 홈페이지", "웹클라이언트 프로그래밍 최종 과제"],
  ["2025.05", "학습 포트폴리오", "서버 구축·관리 학습 기록 · 장려상"],
  ["2025.05", "대학 애플리케이션 개선", "UI/UX 개선 제안 · 장려상"],
  ["2024.12", "글쓰기와 표현", "자유 주제 글쓰기"],
  ["2024.10", "호치민 리더십", "리더십 영상 감평문"],
  ["2024.09", "청학동 스터디 2학기", "공동체 기반 전공 학습"],
  ["2024.06", "청운 글쓰기 공모전", "미래를 위해 몰입하고 있는 것 · 최우수상"],
  ["2024.06", "청학동 스터디 1학기", "공동체 기반 전공 학습"],
  ["2024.05", "청운공간 PBL", "사용하지 않는 교내 공간 개선"],
  ["2024.05", "디지털 지식 전달 공모전", "카드뉴스 제작 · 우수상"],
  ["2020.08", "자가검진 앱 UI/UX", "자가검진 애플리케이션 개인 디자인 프로젝트"],
  ["2019.04", "방송부", "19기 국장 겸 엔지니어"],
];

export default function Home() {
  return (
    <main id="top">
      <header className="global-nav">
        <div className="nav-inner">
          <a className="wordmark" href="#top" aria-label="포트폴리오 첫 화면으로 이동">
            J.
          </a>
          <nav aria-label="주요 메뉴">
            <a href="#projects">프로젝트</a>
            <a href="#about">소개</a>
            <a href="#journey">경험</a>
            <a href="#contact">연락</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy page-width">
          <p className="hero-kicker">Information Security × Artificial Intelligence</p>
          <h1>
            보안을 더<br />
            <span>지능적으로.</span>
          </h1>
          <p className="hero-intro">
            네트워크·서버·보안 지식에 AI를 더해,<br className="desktop-break" />
            비정상 행위와 알려지지 않은 공격을 탐지하고 분석합니다.
          </p>
          <div className="hero-links">
            <a className="primary-link" href="#projects">프로젝트 보기</a>
            <a className="text-link" href="#about">더 알아보기 <span aria-hidden="true">›</span></a>
          </div>
        </div>

        <div className="hero-stage page-width">
          <img
            src="/images/hero-ai-security.webp"
            alt="투명한 유리 소재로 표현한 인공지능 보안 조형물"
            fetchPriority="high"
            decoding="async"
          />
          <p className="hero-caption">AI SECURITY · RESEARCH DIRECTION · 2026</p>
        </div>
      </section>

      <section className="numbers" aria-label="주요 성과">
        <div className="page-width numbers-inner">
          <p className="numbers-heading">결과로 확인한 성장.</p>
          <div className="numbers-grid">
            {stats.map((stat) => (
              <article key={stat.label}>
                <p><strong>{stat.value}</strong><span>{stat.unit}</span></p>
                <small>{stat.label}</small>
              </article>
            ))}
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
                  <p className="project-result">{project.result}</p>
                </div>

                <div className={`project-art art-${index + 1}`}>
                  <img
                    src={[
                      "/images/project-security.webp",
                      "/images/project-ai.webp",
                      "/images/project-mutbyeol.webp",
                    ][index]}
                    alt={[
                      "보안 로그의 위협 신호를 표현한 푸른 유리 조형물",
                      "인공지능 예측 모델을 표현한 투명한 데이터 조형물",
                      "사람과 일정을 연결하는 뭇별 서비스를 표현한 별자리 조형물",
                    ][index]}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="project-footer">
                  <ul aria-label={`${project.eyebrow} 사용 기술`}>
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <details>
                    <summary aria-label={`${project.eyebrow} 상세 설명 열기`}>자세히 보기 <span aria-hidden="true">+</span></summary>
                    <p>{project.detail}</p>
                  </details>
                </div>
              </article>
            ))}
          </div>

          <div className="archive-header">
            <div>
              <p className="section-kicker">Full Archive</p>
              <h3>프로젝트와 활동.<br /><span>처음부터 지금까지.</span></h3>
            </div>
            <p>Notion에 정리된 프로젝트, 발표, 수상과 학습 활동을 최신순으로 담았습니다.</p>
          </div>
          <div className="archive-list">
            {archiveProjects.map(([date, title, description], index) => (
              <article key={`${date}-${title}`}>
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
              한경국립대학교에서 정보보안을 전공하고 있습니다. 관심 분야는
              <strong> AI 보안, 이상행위 탐지, 침입 탐지</strong>입니다. 디지털 환경의
              비정상 행위와 알려지지 않은 공격을 탐지·분석하는 보안 인재를 목표로 합니다.
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
              </article>
            ))}
          </div>

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
              <p className="section-kicker">Journey</p>
              <h2>경험이 만든<br />지금의 방향.</h2>
            </header>
            <div className="timeline">
              {timeline.map((item) => (
                <article key={item.year}>
                  <p>{item.year}</p>
                  <h3>{item.title}</h3>
                  <span>{item.text}</span>
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
            <a href="mailto:boo2525@naver.com">이메일 보내기</a>
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
    </main>
  );
}
