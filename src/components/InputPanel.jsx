// src/components/InputPanel.jsx
import { useState } from "react";

const EXAMPLES = [
  {
    label: "Google OAuth Login",
    text: "Users can log in with Google OAuth. On first login, a new account is automatically created using their Google profile. Returning users are matched by email address.",
  },
  {
    label: "Password Reset",
    text: "Users should be able to reset their password via email. The system sends a time-limited reset link that expires in 30 minutes. The link should only work once.",
  },
  {
    label: "Shopping Cart Checkout",
    text: "Users can add products to a shopping cart, apply coupon codes for discounts, and complete checkout by paying via credit card or UPI. Order confirmation is sent via email. Inventory should reduce after a successful order.",
  },
];

export default function InputPanel({ onAnalyze }) {
  const [input, setInput] = useState("");

  const handleAnalyze = () => {
    if (input.trim()) onAnalyze(input.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleAnalyze();
  };

  return (
    <div style={styles.wrap}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoRow}>
          <div style={styles.logoBadge}>QA</div>
          <div>
            <h1 style={styles.title}>QA Brain</h1>
            <p style={styles.subtitle}>360° Intelligence Platform</p>
          </div>
        </div>
        <p style={styles.tagline}>
          Paste any requirement. Get the complete thinking of a 12-year QA veteran — in 60 seconds.
        </p>
      </div>

      {/* Input */}
      <div style={styles.inputWrap}>
        <label style={styles.label}>Requirement / user story / feature description</label>
        <textarea
          style={styles.textarea}
          placeholder="e.g. Users can reset their password via email. The system sends a time-limited link that expires in 30 minutes..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={6}
        />
        <p style={styles.hint}>Tip: Press Ctrl + Enter to analyze</p>
      </div>

      {/* Analyze button */}
      <button
        style={{
          ...styles.btn,
          opacity: input.trim() ? 1 : 0.5,
          cursor: input.trim() ? "pointer" : "not-allowed",
        }}
        onClick={handleAnalyze}
        disabled={!input.trim()}
      >
        Generate 360° QA Analysis ↗
      </button>

      {/* Examples */}
      <div style={styles.examples}>
        <p style={styles.examplesLabel}>Try an example</p>
        <div style={styles.exampleGrid}>
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              style={styles.exBtn}
              onClick={() => setInput(ex.text)}
            >
              <span style={styles.exLabel}>{ex.label}</span>
              <span style={styles.exText}>{ex.text.slice(0, 80)}...</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div style={styles.statsBar}>
        <div style={styles.stat}><span style={styles.statNum}>11</span><span style={styles.statLabel}>outputs</span></div>
        <div style={styles.divider} />
        <div style={styles.stat}><span style={styles.statNum}>8</span><span style={styles.statLabel}>dimensions</span></div>
        <div style={styles.divider} />
        <div style={styles.stat}><span style={styles.statNum}>4</span><span style={styles.statLabel}>AI steps</span></div>
        <div style={styles.divider} />
        <div style={styles.stat}><span style={styles.statNum}>60s</span><span style={styles.statLabel}>analysis</span></div>
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    background: "#0F0F0D",
    gap: "1.5rem",
  },
  header: {
    textAlign: "center",
    maxWidth: 640,
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
  },
  logoBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    background: "#5B4DD4",
    color: "#fff",
    fontSize: 18,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: "#F5F3EC",
    margin: 0,
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: 13,
    color: "#888780",
    margin: 0,
  },
  tagline: {
    fontSize: 15,
    color: "#B8B5AC",
    lineHeight: 1.6,
    margin: 0,
  },
  inputWrap: {
    width: "100%",
    maxWidth: 640,
  },
  label: {
    display: "block",
    fontSize: 13,
    color: "#888780",
    marginBottom: 8,
    fontWeight: 500,
  },
  textarea: {
    width: "100%",
    background: "#1A1A17",
    border: "1px solid #2E2E2A",
    borderRadius: 10,
    padding: "12px 14px",
    fontSize: 14,
    color: "#F5F3EC",
    fontFamily: "inherit",
    resize: "vertical",
    lineHeight: 1.6,
    outline: "none",
    boxSizing: "border-box",
  },
  hint: {
    fontSize: 12,
    color: "#555552",
    marginTop: 6,
    margin: "6px 0 0 0",
  },
  btn: {
    width: "100%",
    maxWidth: 640,
    padding: "12px 24px",
    background: "#5B4DD4",
    border: "none",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    color: "#fff",
    cursor: "pointer",
    letterSpacing: "0.01em",
  },
  examples: {
    width: "100%",
    maxWidth: 640,
  },
  examplesLabel: {
    fontSize: 12,
    color: "#555552",
    marginBottom: 8,
    fontWeight: 500,
    margin: "0 0 8px 0",
  },
  exampleGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  exBtn: {
    background: "#1A1A17",
    border: "1px solid #2E2E2A",
    borderRadius: 8,
    padding: "10px 14px",
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  exLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "#F5F3EC",
  },
  exText: {
    fontSize: 12,
    color: "#888780",
    lineHeight: 1.4,
  },
  statsBar: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    padding: "12px 24px",
    background: "#1A1A17",
    border: "1px solid #2E2E2A",
    borderRadius: 10,
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  statNum: {
    fontSize: 18,
    fontWeight: 700,
    color: "#5B4DD4",
  },
  statLabel: {
    fontSize: 11,
    color: "#888780",
  },
  divider: {
    width: 1,
    height: 32,
    background: "#2E2E2A",
  },
};
