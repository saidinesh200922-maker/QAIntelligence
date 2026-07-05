// src/App.jsx
import { useQAAnalysis } from "./hooks/useQAAnalysis";
import InputPanel from "./components/InputPanel";
import LoadingPanel from "./components/LoadingPanel";
import Dashboard from "./components/Dashboard";

export default function App() {
  const { analyze, reset, status, currentStep, steps, analysis, error } =
    useQAAnalysis();

  if (status === "loading") {
    return <LoadingPanel currentStep={currentStep} steps={steps} />;
  }

  if (status === "done" && analysis) {
    return <Dashboard analysis={analysis} onReset={reset} />;
  }

  if (status === "error") {
    return (
      <div style={{ minHeight: "100vh", background: "#0F0F0D", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ background: "#1A1A17", border: "1px solid #E24B4A", borderRadius: 12, padding: "1.5rem 2rem", textAlign: "center", maxWidth: 480 }}>
          <p style={{ fontSize: 32, margin: "0 0 8px" }}>⚠️</p>
          <h2 style={{ color: "#E24B4A", margin: "0 0 8px", fontSize: 18 }}>Something went wrong</h2>
          <p style={{ color: "#888780", fontSize: 14, margin: "0 0 20px" }}>{error}</p>
          <button onClick={reset} style={{ background: "#5B4DD4", border: "none", borderRadius: 8, padding: "10px 24px", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            ← Try again
          </button>
        </div>
      </div>
    );
  }

  return <InputPanel onAnalyze={analyze} />;
}
