const stats = [
  { value: "4.17", label: "최근 학기 평점", unit: "/ 4.5" },
  { value: "0.893", label: "보안 로그 분류", unit: "Accuracy" },
  { value: "3+", label: "완성 프로젝트", unit: "ML · Web" },
];

const projects = [
  {
    number: "01",
    category: "AI FOR SECURITY",
    title: "보안 로그 공격 유형 분류",
    description:
      "KISA 방화벽 로그를 운영 관점의 3개 클래스로 재구성하고 Random Forest로 공격 유형을 분류했습니다.",
    result: "Accuracy 0.893",
    tags: ["Python", "Random Forest", "Log Analysis"],
    detail:
      "10개 원본 공격 유형을 3개 범주로 재설계했습니다. 단순 정확도에 머물지 않고 SQL Injection과 GET Flooding의 낮은 재현율을 확인해, 실무 적용 전 보완해야 할 한계까지 분석했습니다.",
  },
  {
    number: "02",
    category: "MACHINE LEARNING",
    title: "카페 폐업 위험 예측",
    description:
      "서울시 상권 데이터를 상권 단위로 재구성하고, 데이터 누수를 차단한 검증 구조로 폐업 위험을 예측했습니다.",
    result: "Test F1 0.616",
    tags: ["GroupKFold", "Feature Engineering", "Clustering"],
    detail:
      "점포·매출·유동인구 등 대규모 원천 데이터를 통합했습니다. 상권 기준 GroupKFold를 적용하고 타깃 정의를 다시 설계해 과대평가를 줄였으며, 선별형 모델로서의 활용 가능성과 재현율 한계를 함께 제시했습니다.",
  },
  {
    number: "03",
    category: "WEB · SECURITY",
    title: "뭇별 — 일정 조율 서비스",
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
    title: "SECURITY",
    text: "웹 취약점 실습, 시스템 보안, 네트워크 보안, 로그 분석",
    level: "CORE INTEREST",
  },
  {
    title: "AI · DATA",
    text: "Python, scikit-learn, Random Forest, SVM, PCA, DBSCAN",
    level: "PROJECT READY",
  },
  {
    title: "BACKEND · WEB",
    text: "Java, Spring MVC, JSP/JSTL, MySQL, HTML/CSS, JavaScript",
    level: "BUILD & DEPLOY",
  },
  {
    title: "INFRASTRUCTURE",
    text: "Linux, Nginx, Tomcat, Oracle Cloud, DNS, HTTPS, Firewall",
    level: "OPERATIONS",
  },
];

const timeline = [
  {
    year: "2026 — NOW",
    title: "정보보안 전공 · 3학년",
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

export default function Home() {
  return (
    <main>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="포트폴리오 첫 화면으로 이동">
          <span className="brand-mark">J</span>
          <span>JUN.PORTFOLIO</span>
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#projects">PROJECTS</a>
          <a href="#about">ABOUT</a>
          <a className="nav-contact" href="#contact">CONTACT</a>
        </nav>
      </header>

      <section className="hero section-shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> INFORMATION SECURITY · MACHINE LEARNING</p>
          <h1>
            데이터에서<br />
            <span>공격의 징후</span>를 찾습니다.
          </h1>
          <p className="hero-description">
            정보보안과 머신러닝을 공부하며, 로그 속 이상 징후를 탐지하고
            반복되는 보안 업무를 자동화하는 방법을 탐구합니다.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              프로젝트 보기 <span aria-hidden="true">↘</span>
            </a>
            <a className="button button-secondary" href="#about">
              더 알아보기
            </a>
          </div>
        </div>

        <div className="hero-panel" aria-label="현재 관심 분야">
          <div className="panel-topline">
            <span>FOCUS / 2026</span>
            <span className="live"><i /> LEARNING IN PROGRESS</span>
          </div>
          <div className="orbit" aria-hidden="true">
            <div className="orbit-ring ring-one" />
            <div className="orbit-ring ring-two" />
            <div className="orbit-core">AI<span>×</span>SEC</div>
            <span className="orbit-dot dot-one" />
            <span className="orbit-dot dot-two" />
          </div>
          <div className="focus-list">
            <span>01</span><p>Security log analysis</p>
            <span>02</span><p>Anomaly detection</p>
            <span>03</span><p>Security automation</p>
          </div>
        </div>
      </section>

      <section className="stat-strip section-shell" aria-label="주요 성과">
        {stats.map((stat) => (
          <article key={stat.label}>
            <p><strong>{stat.value}</strong><span>{stat.unit}</span></p>
            <small>{stat.label}</small>
          </article>
        ))}
        <p className="scroll-hint"><span /> SCROLL TO EXPLORE</p>
      </section>

      <section className="content-section section-shell" id="projects">
        <div className="section-heading">
          <div>
            <p className="section-index">01 / SELECTED WORK</p>
            <h2>문제를 정의하고,<br />끝까지 검증한 작업</h2>
          </div>
          <p>
            모델의 점수만 제시하지 않습니다. 데이터 구조를 다시 설계하고,
            결과가 왜 그렇게 나왔는지와 어디까지 신뢰할 수 있는지를 설명합니다.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <div className="project-meta">
                <span>{project.number}</span>
                <span>{project.category}</span>
              </div>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-result">{project.result}</div>
              <ul className="tag-list" aria-label={`${project.title} 사용 기술`}>
                {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <details>
                <summary>프로젝트 상세 <span aria-hidden="true">+</span></summary>
                <p>{project.detail}</p>
              </details>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section section-shell" id="about">
        <div className="section-heading about-heading">
          <div>
            <p className="section-index">02 / PROFILE</p>
            <h2>보안을 이해하고,<br />AI로 확장합니다.</h2>
          </div>
          <div className="about-copy">
            <p>
              한경국립대학교에서 정보보안을 전공하고 있습니다. 관심 분야는
              <strong> AI를 통한 정보보안</strong>입니다. 보안 로그의 이상 징후를
              찾고, 반복적인 분석 업무를 자동화하는 연구와 실무를 목표로 합니다.
            </p>
            <p>
              현재는 Python과 머신러닝 기초를 실제 데이터에 적용하며, 평가 점수보다
              데이터 정의와 검증 구조를 먼저 보는 습관을 만들고 있습니다.
            </p>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-card">
            <p className="card-label">CURRENT POSITION</p>
            <div className="profile-monogram" aria-hidden="true">J</div>
            <h3>Information Security<br />Undergraduate</h3>
            <p>AI for Security를 향해 학습하고 구현하는 학생 개발자</p>
            <div className="profile-status"><i /> ANSEONG · KOREA</div>
          </div>
          <div className="skills-grid">
            {skillGroups.map((skill, index) => (
              <article className="skill-card" key={skill.title}>
                <div><span>0{index + 1}</span><small>{skill.level}</small></div>
                <h3>{skill.title}</h3>
                <p>{skill.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section section-shell timeline-section">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-index">03 / JOURNEY</p>
            <h2>경험이 쌓인 방향</h2>
          </div>
        </div>
        <div className="timeline">
          {timeline.map((item) => (
            <article key={item.year}>
              <p>{item.year}</p>
              <h3>{item.title}</h3>
              <span>{item.text}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-shell contact-inner">
          <p className="section-index">04 / CONTACT</p>
          <h2>같이 풀어볼<br />보안 문제가 있나요?</h2>
          <p>
            AI 보안 연구, 데이터 분석 프로젝트, 서비스 개발에 관한 대화를 환영합니다.
          </p>
          <div className="contact-placeholder">
            <span>CONTACT CHANNEL</span>
            <strong>공개용 이메일 · GitHub 연결 예정</strong>
          </div>
        </div>
      </section>

      <footer className="site-footer section-shell">
        <span>© 2026 JUN PORTFOLIO</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
