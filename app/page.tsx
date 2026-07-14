const stats = [
  { value: "4.17", label: "최근 학기 평점", unit: "/ 4.5" },
  { value: "0.893", label: "보안 로그 분류", unit: "Accuracy" },
  { value: "3+", label: "완성 프로젝트", unit: "ML · Web" },
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
    </main>
  );
}
