// src/App.jsx
import { useQAAnalysis } from "./hooks/useQAAnalysis";
import InputPanel from "./components/InputPanel";
import LoadingPanel from "./components/LoadingPanel";

export default function App() {
  const { analyze, reset, status, currentStep, steps, analysis, error } =
    useQAAnalysis();

  // LOADING
  if (status === "loading") {
    return <LoadingPanel currentStep={currentStep} steps={steps} />;
  }

  // DONE — Dashboard coming next
  if (status === "done" && analysis) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0F0F0D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
        }}
      >
        <div
          style={{
            background: "#1A1A17",
            border: "1px solid #1D9E75",
            borderRadius: 12,
            padding: "1.5rem 2rem",
            textAlign: "center",
            maxWidth: 480,
          }}
        >
          <p style={{ fontSize: 32, margin: "0 0 8px" }}>✅</p>
          <h2 style={{ color: "#1D9E75", margin: "0 0 8px", fontSize: 18 }}>
            360° Analysis Complete
          </h2>
          <p style={{ color: "#888780", fontSize: 14, margin: "0 0 16px" }}>
            {analysis.meta.total_test_cases} test cases · {analysis.meta.dimensions_covered.length} dimensions ·{" "}
            <span
              style={{
                color:
                  analysis.meta.overall_risk_score === "Red"
                    ? "#E24B4A"
                    : analysis.meta.overall_risk_score === "Amber"
                    ? "#BA7517"
                    : "#1D9E75",
                fontWeight: 600,
              }}
            >
              {analysis.meta.overall_risk_score} risk
            </span>
          </p>
          <p style={{ color: "#555552", fontSize: 13, margin: "0 0 20px" }}>
            Dashboard UI coming in the next step — full 11-output view.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#5B4DD4",
              border: "none",
              borderRadius: 8,
              padding: "10px 24px",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ← Analyze another requirement
          </button>
        </div>
      </div>
    );
  }

  // ERROR
  if (status === "error") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0F0F0D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            background: "#1A1A17",
            border: "1px solid #E24B4A",
            borderRadius: 12,
            padding: "1.5rem 2rem",
            textAlign: "center",
            maxWidth: 480,
          }}
        >
          <p style={{ fontSize: 32, margin: "0 0 8px" }}>⚠️</p>
          <h2 style={{ color: "#E24B4A", margin: "0 0 8px", fontSize: 18 }}>
            Something went wrong
          </h2>
          <p style={{ color: "#888780", fontSize: 14, margin: "0 0 20px" }}>
            {error}
          </p>
          <button
            onClick={reset}
            style={{
              background: "#5B4DD4",
              border: "none",
              borderRadius: 8,
              padding: "10px 24px",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ← Try again
          </button>
        </div>
      </div>
    );
  }

  // IDLE — Input screen
  return <InputPanel onAnalyze={analyze} />;
}
