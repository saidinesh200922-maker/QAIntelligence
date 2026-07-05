// src/components/LoadingPanel.jsx
export default function LoadingPanel({ currentStep, steps }) {
  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logoBadge}>QA</div>
          <div>
            <h2 style={styles.title}>Analysing requirement</h2>
            <p style={styles.subtitle}>Running 4-step QA intelligence chain</p>
          </div>
        </div>

        {/* Steps */}
        <div style={styles.steps}>
          {steps.map((step) => {
            const isDone    = currentStep > step.id;
            const isActive  = currentStep === step.id;
            const isPending = currentStep < step.id;

            return (
              <div key={step.id} style={styles.stepRow}>
                {/* Icon */}
                <div style={{
                  ...styles.stepIcon,
                  background: isDone ? "#1D9E75" : isActive ? "#5B4DD4" : "#1A1A17",
                  border: isActive ? "2px solid #5B4DD4" : isDone ? "2px solid #1D9E75" : "2px solid #2E2E2A",
                }}>
                  {isDone ? (
                    <span style={{ color: "#fff", fontSize: 14 }}>✓</span>
                  ) : isActive ? (
                    <span style={styles.spinner} />
                  ) : (
                    <span style={{ color: "#555552", fontSize: 12, fontWeight: 700 }}>{step.id}</span>
                  )}
                </div>

                {/* Label */}
                <div style={styles.stepBody}>
                  <p style={{
                    ...styles.stepLabel,
                    color: isDone ? "#1D9E75" : isActive ? "#F5F3EC" : "#555552",
                  }}>
                    {step.label}
                  </p>
                  <p style={{
                    ...styles.stepDetail,
                    color: isActive ? "#888780" : "#444441",
                  }}>
                    {step.detail}
                  </p>
                </div>

                {/* Active pulse */}
                {isActive && <div style={styles.activeDot} />}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div style={styles.progressWrap}>
          <div style={styles.progressTrack}>
            <div style={{
              ...styles.progressFill,
              width: `${(Math.max(currentStep - 1, 0) / steps.length) * 100}%`,
            }} />
          </div>
          <p style={styles.progressLabel}>
            Step {currentStep} of {steps.length}
          </p>
        </div>

        {/* Footer note */}
        <p style={styles.footerNote}>
          Applying 12 years of QA expertise across 8 dimensions · 11 outputs
        </p>
      </div>
    </div>
  );
}

const spin = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// Inject keyframes once
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = spin;
  document.head.appendChild(style);
}

const styles = {
  wrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0F0F0D",
    padding: "2rem 1rem",
  },
  card: {
    width: "100%",
    maxWidth: 480,
    background: "#1A1A17",
    border: "1px solid #2E2E2A",
    borderRadius: 16,
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  logoBadge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: "#5B4DD4",
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  title: {
    fontSize: 17,
    fontWeight: 600,
    color: "#F5F3EC",
    margin: 0,
  },
  subtitle: {
    fontSize: 12,
    color: "#888780",
    margin: 0,
  },
  steps: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  stepRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    position: "relative",
  },
  stepIcon: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.3s ease",
  },
  spinner: {
    width: 14,
    height: 14,
    borderRadius: "50%",
    border: "2px solid #3D35A0",
    borderTopColor: "#fff",
    display: "inline-block",
    animation: "spin 0.7s linear infinite",
  },
  stepBody: {
    flex: 1,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: 500,
    margin: 0,
    transition: "color 0.3s ease",
  },
  stepDetail: {
    fontSize: 12,
    margin: "2px 0 0 0",
    transition: "color 0.3s ease",
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#5B4DD4",
    flexShrink: 0,
  },
  progressWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  progressTrack: {
    width: "100%",
    height: 4,
    background: "#2E2E2A",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "#5B4DD4",
    borderRadius: 4,
    transition: "width 0.6s ease",
  },
  progressLabel: {
    fontSize: 12,
    color: "#555552",
    margin: 0,
    textAlign: "right",
  },
  footerNote: {
    fontSize: 12,
    color: "#444441",
    textAlign: "center",
    margin: 0,
    lineHeight: 1.5,
  },
};
