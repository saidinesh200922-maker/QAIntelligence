// src/hooks/useQAAnalysis.js
// Orchestrates the 4-step AI chain
// Currently uses mock data — swap getMockAnalysis for runChain when API key is ready

import { useState } from "react";
import { getMockAnalysis } from "../chain/mockData";

const STEPS = [
  { id: 1, label: "Comprehending requirement...",    detail: "Reading what, who, systems, data, ambiguities" },
  { id: 2, label: "Generating test cases...",        detail: "Covering all 8 dimensions" },
  { id: 3, label: "Assessing risks...",              detail: "Severity × likelihood matrix" },
  { id: 4, label: "Calculating impact...",           detail: "Business consequences + mitigation" },
];

export function useQAAnalysis() {
  const [status, setStatus]     = useState("idle");      // idle | loading | done | error
  const [currentStep, setCurrentStep] = useState(0);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError]       = useState(null);

  const analyze = async (requirement) => {
    if (!requirement.trim()) return;

    setStatus("loading");
    setAnalysis(null);
    setError(null);
    setCurrentStep(0);

    try {
      // Simulate step-by-step progress for realistic UX
      for (let i = 0; i < STEPS.length; i++) {
        setCurrentStep(i + 1);
        await new Promise((r) => setTimeout(r, 600));
      }

      // Get analysis (mock now — real API chain later)
      const result = await getMockAnalysis();
      setAnalysis(result);
      setStatus("done");

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    } finally {
      setCurrentStep(0);
    }
  };

  const reset = () => {
    setStatus("idle");
    setAnalysis(null);
    setError(null);
    setCurrentStep(0);
  };

  return {
    analyze,
    reset,
    status,
    currentStep,
    steps: STEPS,
    analysis,
    error,
  };
}