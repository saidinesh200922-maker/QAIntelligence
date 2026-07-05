// src/components/Dashboard.jsx
import { useState } from "react";

const TABS = [
  { id: "overview",     label: "Overview",        icon: "🧠" },
  { id: "testcases",    label: "Test Cases",       icon: "✅" },
  { id: "risks",        label: "Risk Map",         icon: "⚠️" },
  { id: "impact",       label: "Impact Report",    icon: "💥" },
  { id: "mitigation",   label: "Mitigation",       icon: "🛡️" },
  { id: "gaps",         label: "Req. Gaps",        icon: "🔍" },
  { id: "testdata",     label: "Test Data",        icon: "🗂️" },
  { id: "criteria",     label: "Entry / Exit",     icon: "🚦" },
  { id: "questions",    label: "Questions",        icon: "❓" },
  { id: "automation",   label: "Automation",       icon: "🤖" },
  { id: "compliance",   label: "Compliance",       icon: "📋" },
  { id: "landscape",    label: "Landscape",        icon: "🗺️" },
];

const DIMENSION_COLORS = {
  functional:    { bg: "#1A2744", text: "#6B9FE4" },
  security:      { bg: "#2A1A1A", text: "#E46B6B" },
  performance:   { bg: "#2A2010", text: "#E4A96B" },
  compatibility: { bg: "#1A2A20", text: "#6BE4A0" },
  usability:     { bg: "#251A2A", text: "#C46BE4" },
  integration:   { bg: "#1A2525", text: "#6BE4E4" },
  data:          { bg: "#2A251A", text: "#E4D06B" },
  regression:    { bg: "#2A2A2A", text: "#B0B0A8" },
};

const PRIORITY_COLORS = {
  High:   { bg: "#2A1A1A", text: "#E24B4A" },
  Medium: { bg: "#2A2010", text: "#BA7517" },
  Low:    { bg: "#1A2A1A", text: "#1D9E75" },
};

const SEVERITY_COLORS = {
  Critical: "#E24B4A",
  High:     "#E24B4A",
  Medium:   "#BA7517",
  Low:      "#1D9E75",
};

const LIKELIHOOD_SCORE = { High: 3, Medium: 2, Low: 1 };
const SEVERITY_SCORE   = { Critical: 4, High: 3, Medium: 2, Low: 1 };

export default function Dashboard({ analysis, onReset }) {
  const [activeTab, setActiveTab]         = useState("overview");
  const [dimFilter, setDimFilter]         = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const { meta, comprehension, test_cases, risks, impact, mitigation,
          requirement_gaps, test_data, entry_exit_criteria,
          questions_for_team, automation_recommendations,
          compliance_checklist, landscape } = analysis;

  const filteredCases = test_cases.filter((tc) => {
    const dimOk = dimFilter === "all" || tc.dimension === dimFilter;
    const priOk = priorityFilter === "all" || tc.priority === priorityFilter;
    return dimOk && priOk;
  });

  const riskScore = meta.overall_risk_score;
  const riskColor = riskScore === "Red" ? "#E24B4A" : riskScore === "Amber" ? "#BA7517" : "#1D9E75";

  return (
    <div style={s.page}>

      {/* ── TOP HEADER ── */}
      <div style={s.topBar}>
        <div style={s.topLeft}>
          <div style={s.logoBadge}>QA</div>
          <div>
            <h1 style={s.topTitle}>QA Brain — 360° Analysis</h1>
            <p style={s.topSub}>{meta.requirement_summary}</p>
          </div>
        </div>
        <div style={s.topRight}>
          <div style={{ ...s.riskBadge, background: riskColor + "22", border: `1px solid ${riskColor}`, color: riskColor }}>
            {riskScore} Risk
          </div>
          <button style={s.resetBtn} onClick={onReset}>← New Analysis</button>
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div style={s.statsRow}>
        {[
          { label: "Test cases",  value: meta.total_test_cases },
          { label: "Dimensions",  value: meta.dimensions_covered.length },
          { label: "Risks found", value: risks.length },
          { label: "Gaps found",  value: requirement_gaps.length },
          { label: "Outputs",     value: 11 },
        ].map((stat) => (
          <div key={stat.label} style={s.statCard}>
            <span style={s.statNum}>{stat.value}</span>
            <span style={s.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* ── TAB BAR ── */}
      <div style={s.tabBar}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            style={{
              ...s.tab,
              background: activeTab === tab.id ? "#5B4DD4" : "#1A1A17",
              color: activeTab === tab.id ? "#fff" : "#888780",
              border: activeTab === tab.id ? "1px solid #5B4DD4" : "1px solid #2E2E2A",
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB CONTENT ── */}
      <div style={s.content}>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div style={s.grid2}>
            {[
              { title: "What is being built", icon: "🔎", body: comprehension.what },
              { title: "Who uses it",         icon: "👤", body: comprehension.who },
            ].map((card) => (
              <div key={card.title} style={s.card}>
                <h3 style={s.cardTitle}>{card.icon} {card.title}</h3>
                <p style={s.cardBody}>{card.body}</p>
              </div>
            ))}
            <div style={s.card}>
              <h3 style={s.cardTitle}>🖥️ Systems touched</h3>
              <div style={s.tagWrap}>
                {comprehension.systems_touched.map((sys) => (
                  <span key={sys} style={s.tag}>{sys}</span>
                ))}
              </div>
            </div>
            <div style={s.card}>
              <h3 style={s.cardTitle}>💾 Data handled</h3>
              <div style={s.tagWrap}>
                {comprehension.data_handled.map((d) => (
                  <span key={d} style={s.tag}>{d}</span>
                ))}
              </div>
            </div>
            <div style={{ ...s.card, gridColumn: "1 / -1" }}>
              <h3 style={s.cardTitle}>❓ Ambiguities detected</h3>
              <ul style={s.ul}>
                {comprehension.ambiguities.map((a, i) => (
                  <li key={i} style={s.li}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TEST CASES */}
        {activeTab === "testcases" && (
          <div>
            {/* Filters */}
            <div style={s.filterRow}>
              <div style={s.filterGroup}>
                <span style={s.filterLabel}>Dimension:</span>
                {["all", ...Object.keys(DIMENSION_COLORS)].map((d) => (
                  <button key={d} style={{
                    ...s.filterBtn,
                    background: dimFilter === d ? "#5B4DD4" : "#1A1A17",
                    color: dimFilter === d ? "#fff" : "#888780",
                    border: dimFilter === d ? "1px solid #5B4DD4" : "1px solid #2E2E2A",
                  }} onClick={() => setDimFilter(d)}>
                    {d === "all" ? "All" : d}
                  </button>
                ))}
              </div>
              <div style={s.filterGroup}>
                <span style={s.filterLabel}>Priority:</span>
                {["all", "High", "Medium", "Low"].map((p) => (
                  <button key={p} style={{
                    ...s.filterBtn,
                    background: priorityFilter === p ? "#5B4DD4" : "#1A1A17",
                    color: priorityFilter === p ? "#fff" : "#888780",
                    border: priorityFilter === p ? "1px solid #5B4DD4" : "1px solid #2E2E2A",
                  }} onClick={() => setPriorityFilter(p)}>
                    {p === "all" ? "All" : p}
                  </button>
                ))}
              </div>
              <span style={s.filterCount}>{filteredCases.length} cases</span>
            </div>

            {/* Table */}
            <div style={s.tableWrap}>
              <table style={s.table}>
                <thead>
                  <tr>
                    {["ID", "Title", "Dimension", "Priority", "Steps", "Expected Result"].map((h) => (
                      <th key={h} style={s.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredCases.map((tc, i) => {
                    const dc = DIMENSION_COLORS[tc.dimension] || { bg: "#1A1A17", text: "#888780" };
                    const pc = PRIORITY_COLORS[tc.priority]   || { bg: "#1A1A17", text: "#888780" };
                    return (
                      <tr key={tc.id} style={{ background: i % 2 === 0 ? "#1A1A17" : "#161613" }}>
                        <td style={s.td}><span style={s.idBadge}>{tc.id}</span></td>
                        <td style={{ ...s.td, fontWeight: 500, color: "#F5F3EC" }}>{tc.title}</td>
                        <td style={s.td}>
                          <span style={{ ...s.dimBadge, background: dc.bg, color: dc.text }}>{tc.dimension}</span>
                        </td>
                        <td style={s.td}>
                          <span style={{ ...s.dimBadge, background: pc.bg, color: pc.text }}>{tc.priority}</span>
                        </td>
                        <td style={{ ...s.td, color: "#888780", fontSize: 12 }}>{tc.steps}</td>
                        <td style={{ ...s.td, color: "#888780", fontSize: 12 }}>{tc.expected_result}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* RISK MAP */}
        {activeTab === "risks" && (
          <div style={s.grid1}>
            {/* Risk matrix visual */}
            <div style={s.card}>
              <h3 style={s.cardTitle}>⚠️ Risk Matrix — Severity × Likelihood</h3>
              <div style={s.matrixWrap}>
                {/* Y axis label */}
                <div style={s.matrixYLabel}>Severity →</div>
                <div style={s.matrix}>
                  {["Critical","High","Medium","Low"].map((sev) => (
                    <div key={sev} style={s.matrixRow}>
                      <span style={s.matrixRowLabel}>{sev}</span>
                      {["Low","Medium","High"].map((lik) => {
                        const cellRisks = risks.filter(r => r.severity === sev && r.likelihood === lik);
                        const intensity = SEVERITY_SCORE[sev] * LIKELIHOOD_SCORE[lik];
                        const bg = intensity >= 9 ? "#3A1A1A" : intensity >= 6 ? "#2A2010" : intensity >= 3 ? "#1A2010" : "#1A1A1A";
                        const border = intensity >= 9 ? "#E24B4A" : intensity >= 6 ? "#BA7517" : intensity >= 3 ? "#1D9E75" : "#2E2E2A";
                        return (
                          <div key={lik} style={{ ...s.matrixCell, background: bg, border: `1px solid ${border}` }}>
                            {cellRisks.map(r => (
                              <span key={r.id} style={{ ...s.matrixRisk, color: SEVERITY_COLORS[r.severity] }}>
                                {r.id}
                              </span>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  <div style={s.matrixXLabels}>
                    <span style={s.matrixXLabel} />
                    {["Low","Medium","High"].map(l => <span key={l} style={s.matrixXLabel}>{l}</span>)}
                  </div>
                </div>
                <div style={s.matrixXAxisLabel}>Likelihood →</div>
              </div>
            </div>

            {/* Risk list */}
            {risks.map((risk) => (
              <div key={risk.id} style={s.card}>
                <div style={s.riskHeader}>
                  <span style={s.idBadge}>{risk.id}</span>
                  <h3 style={{ ...s.cardTitle, margin: 0 }}>{risk.title}</h3>
                  <span style={{ ...s.dimBadge, background: SEVERITY_COLORS[risk.severity] + "22", color: SEVERITY_COLORS[risk.severity] }}>
                    {risk.severity}
                  </span>
                  <span style={{ ...s.dimBadge, background: "#1A2525", color: "#6BE4E4" }}>
                    {risk.likelihood} likelihood
                  </span>
                </div>
                <p style={s.cardBody}><strong style={{ color: "#888780" }}>Category:</strong> {risk.category}</p>
                <p style={s.cardBody}><strong style={{ color: "#888780" }}>Root cause:</strong> {risk.root_cause}</p>
                <p style={{ ...s.cardBody, marginTop: 6 }}>
                  <strong style={{ color: "#888780" }}>Linked cases:</strong>{" "}
                  {risk.linked_test_cases.map(tc => (
                    <span key={tc} style={s.idBadge}>{tc}</span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* IMPACT REPORT */}
        {activeTab === "impact" && (
          <div style={s.grid1}>
            {impact.map((item, i) => (
              <div key={i} style={{ ...s.card, borderLeft: `3px solid #E24B4A` }}>
                <div style={s.riskHeader}>
                  <span style={s.idBadge}>{item.risk_id}</span>
                  <h3 style={{ ...s.cardTitle, margin: 0, color: "#E24B4A" }}>{item.consequence}</h3>
                </div>
                <div style={s.grid2} >
                  <div>
                    <p style={s.impactLabel}>Who is affected</p>
                    <p style={s.cardBody}>{item.who_affected}</p>
                  </div>
                  <div>
                    <p style={s.impactLabel}>Business impact</p>
                    <p style={s.cardBody}>{item.business_impact}</p>
                  </div>
                </div>
                <div style={{ marginTop: 12, background: "#2A1A1A", borderRadius: 8, padding: "10px 14px" }}>
                  <p style={{ ...s.impactLabel, color: "#E24B4A" }}>🚨 2am incident scenario</p>
                  <p style={{ ...s.cardBody, color: "#E4A090" }}>{item.incident_scenario}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MITIGATION */}
        {activeTab === "mitigation" && (
          <div style={s.grid1}>
            {mitigation.map((item, i) => (
              <div key={i} style={{ ...s.card, borderLeft: "3px solid #1D9E75" }}>
                <div style={s.riskHeader}>
                  <span style={s.idBadge}>{item.risk_id}</span>
                  <span style={{ ...s.dimBadge, background: "#1A2A1A", color: "#1D9E75" }}>{item.priority}</span>
                </div>
                <p style={{ ...s.cardBody, color: "#B0E4C8" }}>{item.action}</p>
              </div>
            ))}
          </div>
        )}

        {/* REQUIREMENT GAPS */}
        {activeTab === "gaps" && (
          <div style={s.card}>
            <h3 style={s.cardTitle}>🔍 Requirement gaps — what the spec doesn't say</h3>
            <p style={{ ...s.cardBody, marginBottom: 16, color: "#888780" }}>
              These are missing acceptance criteria, undefined edge cases, and unanswered "what ifs" that your QA brain detected. Raise these before a single line of code is written.
            </p>
            <ul style={s.ul}>
              {requirement_gaps.map((gap, i) => (
                <li key={i} style={{ ...s.li, color: "#E4D06B" }}>
                  <span style={{ color: "#BA7517", marginRight: 8 }}>⚠</span>{gap}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* TEST DATA */}
        {activeTab === "testdata" && (
          <div style={s.grid1}>
            <div style={s.card}>
              <h3 style={s.cardTitle}>🗂️ Test data guide</h3>
              <p style={{ ...s.cardBody, marginBottom: 16, color: "#888780" }}>
                Test cases without test data are useless. Here is every data scenario you need — valid, invalid, boundary, and edge.
              </p>
            </div>
            <div style={s.tableWrap}>
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={s.th}>#</th>
                    <th style={s.th}>Scenario</th>
                    <th style={s.th}>Test data</th>
                  </tr>
                </thead>
                <tbody>
                  {test_data.map((td, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#1A1A17" : "#161613" }}>
                      <td style={s.td}><span style={s.idBadge}>{i + 1}</span></td>
                      <td style={{ ...s.td, fontWeight: 500, color: "#F5F3EC" }}>{td.scenario}</td>
                      <td style={{ ...s.td, color: "#888780", fontSize: 13 }}>{td.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ENTRY / EXIT CRITERIA */}
        {activeTab === "criteria" && (
          <div style={s.grid2}>
            <div style={{ ...s.card, borderLeft: "3px solid #1D9E75" }}>
              <h3 style={s.cardTitle}>🟢 Entry criteria — when testing can START</h3>
              <ul style={s.ul}>
                {entry_exit_criteria.entry.map((e, i) => (
                  <li key={i} style={{ ...s.li, color: "#B0E4C8" }}>{e}</li>
                ))}
              </ul>
            </div>
            <div style={{ ...s.card, borderLeft: "3px solid #5B4DD4" }}>
              <h3 style={s.cardTitle}>🏁 Exit criteria — when testing is DONE</h3>
              <ul style={s.ul}>
                {entry_exit_criteria.exit.map((e, i) => (
                  <li key={i} style={{ ...s.li, color: "#C4B8F8" }}>{e}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* QUESTIONS FOR TEAM */}
        {activeTab === "questions" && (
          <div style={s.card}>
            <h3 style={s.cardTitle}>❓ Questions to ask your team</h3>
            <p style={{ ...s.cardBody, marginBottom: 16, color: "#888780" }}>
              These are the questions a 12-year QA veteran asks in sprint planning — before testing begins. Each one surfaces a hidden assumption that could become a production bug.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {questions_for_team.map((q, i) => (
                <div key={i} style={s.questionCard}>
                  <span style={s.questionNum}>Q{i + 1}</span>
                  <p style={{ ...s.cardBody, margin: 0 }}>{q}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AUTOMATION */}
        {activeTab === "automation" && (
          <div style={s.grid1}>
            <div style={s.card}>
              <h3 style={s.cardTitle}>🤖 Automation recommendations</h3>
              <p style={{ ...s.cardBody, marginBottom: 0, color: "#888780" }}>
                What to automate, what to keep manual, and which tool to use — with reasoning.
              </p>
            </div>
            <div style={s.tableWrap}>
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={s.th}>Test ID</th>
                    <th style={s.th}>Recommendation</th>
                    <th style={s.th}>Tool</th>
                    <th style={s.th}>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {automation_recommendations.map((ar, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#1A1A17" : "#161613" }}>
                      <td style={s.td}><span style={s.idBadge}>{ar.test_id}</span></td>
                      <td style={s.td}>
                        <span style={{
                          ...s.dimBadge,
                          background: ar.recommendation === "Automate" ? "#1A2A1A" : "#2A251A",
                          color: ar.recommendation === "Automate" ? "#1D9E75" : "#E4D06B",
                        }}>
                          {ar.recommendation}
                        </span>
                      </td>
                      <td style={{ ...s.td, color: "#6BE4E4", fontWeight: 500 }}>{ar.tool}</td>
                      <td style={{ ...s.td, color: "#888780", fontSize: 12 }}>{ar.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* COMPLIANCE */}
        {activeTab === "compliance" && (
          <div style={s.grid1}>
            <div style={s.card}>
              <h3 style={s.cardTitle}>📋 Compliance checklist</h3>
              <p style={{ ...s.cardBody, color: "#888780" }}>
                Standards that apply to this requirement — GDPR, WCAG, OWASP and more. Each item must be verified before release.
              </p>
            </div>
            <div style={s.tableWrap}>
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={s.th}>Standard</th>
                    <th style={s.th}>Requirement</th>
                    <th style={s.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {compliance_checklist.map((item, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#1A1A17" : "#161613" }}>
                      <td style={s.td}>
                        <span style={{ ...s.dimBadge, background: "#1A2525", color: "#6BE4E4" }}>{item.standard}</span>
                      </td>
                      <td style={{ ...s.td, color: "#F5F3EC" }}>{item.item}</td>
                      <td style={s.td}>
                        <span style={{ ...s.dimBadge, background: "#2A2010", color: "#E4D06B" }}>{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LANDSCAPE */}
        {activeTab === "landscape" && (
          <div style={s.grid1}>
            <div style={s.card}>
              <h3 style={s.cardTitle}>🗺️ Upstream / Downstream landscape</h3>
              <p style={{ ...s.cardBody, color: "#888780" }}>
                Silent failures live at boundaries — not inside features. This map shows every system that feeds into and consumes from this feature, with boundary risks and test focus areas.
              </p>
            </div>

            <div style={s.card}>
              <h3 style={{ ...s.cardTitle, color: "#1D9E75" }}>⬆️ Upstream — systems that feed INTO this feature</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
                {landscape.upstream.map((sys, i) => (
                  <div key={i} style={{ ...s.landscapeCard, borderLeft: "3px solid #1D9E75" }}>
                    <div style={s.riskHeader}>
                      <h4 style={{ color: "#1D9E75", margin: 0, fontSize: 14 }}>{sys.system}</h4>
                      <span style={{ ...s.dimBadge, background: "#1A2A1A", color: "#1D9E75" }}>upstream</span>
                    </div>
                    <p style={{ ...s.cardBody, marginBottom: 8 }}><strong style={{ color: "#888780" }}>Role:</strong> {sys.role}</p>
                    <p style={{ ...s.cardBody, marginBottom: 6 }}><strong style={{ color: "#888780" }}>Boundary risks:</strong></p>
                    <ul style={s.ul}>
                      {sys.boundary_risks.map((r, j) => (
                        <li key={j} style={{ ...s.li, color: "#E4D06B" }}>{r}</li>
                      ))}
                    </ul>
                    <p style={{ ...s.cardBody, marginTop: 8 }}>
                      <strong style={{ color: "#888780" }}>Test focus:</strong>{" "}
                      <span style={{ color: "#6BE4E4" }}>{sys.test_focus}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={s.card}>
              <h3 style={{ ...s.cardTitle, color: "#E24B4A" }}>⬇️ Downstream — systems that consume FROM this feature</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
                {landscape.downstream.map((sys, i) => (
                  <div key={i} style={{ ...s.landscapeCard, borderLeft: "3px solid #E24B4A" }}>
                    <div style={s.riskHeader}>
                      <h4 style={{ color: "#E24B4A", margin: 0, fontSize: 14 }}>{sys.system}</h4>
                      <span style={{ ...s.dimBadge, background: "#2A1A1A", color: "#E24B4A" }}>downstream</span>
                    </div>
                    <p style={{ ...s.cardBody, marginBottom: 8 }}><strong style={{ color: "#888780" }}>Role:</strong> {sys.role}</p>
                    <p style={{ ...s.cardBody, marginBottom: 6 }}><strong style={{ color: "#888780" }}>Boundary risks:</strong></p>
                    <ul style={s.ul}>
                      {sys.boundary_risks.map((r, j) => (
                        <li key={j} style={{ ...s.li, color: "#E4D06B" }}>{r}</li>
                      ))}
                    </ul>
                    <p style={{ ...s.cardBody, marginTop: 8 }}>
                      <strong style={{ color: "#888780" }}>Test focus:</strong>{" "}
                      <span style={{ color: "#6BE4E4" }}>{sys.test_focus}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ── STYLES ──────────────────────────────────────────────────────────────────
const s = {
  page:         { minHeight: "100vh", background: "#0F0F0D", display: "flex", flexDirection: "column" },
  topBar:       { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", background: "#1A1A17", borderBottom: "1px solid #2E2E2A", flexWrap: "wrap", gap: 12 },
  topLeft:      { display: "flex", alignItems: "center", gap: "0.75rem" },
  logoBadge:    { width: 40, height: 40, borderRadius: 10, background: "#5B4DD4", color: "#fff", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  topTitle:     { fontSize: 16, fontWeight: 600, color: "#F5F3EC", margin: 0 },
  topSub:       { fontSize: 12, color: "#888780", margin: 0, maxWidth: 500 },
  topRight:     { display: "flex", alignItems: "center", gap: 10 },
  riskBadge:    { fontSize: 13, fontWeight: 600, padding: "4px 14px", borderRadius: 20 },
  resetBtn:     { background: "transparent", border: "1px solid #2E2E2A", borderRadius: 8, padding: "6px 16px", color: "#888780", fontSize: 13, cursor: "pointer" },
  statsRow:     { display: "flex", gap: 0, borderBottom: "1px solid #2E2E2A", overflowX: "auto" },
  statCard:     { flex: 1, minWidth: 100, display: "flex", flexDirection: "column", alignItems: "center", padding: "0.75rem", borderRight: "1px solid #2E2E2A" },
  statNum:      { fontSize: 22, fontWeight: 700, color: "#5B4DD4" },
  statLabel:    { fontSize: 11, color: "#888780", marginTop: 2 },
  tabBar:       { display: "flex", gap: 6, padding: "0.75rem 1rem", overflowX: "auto", borderBottom: "1px solid #2E2E2A", flexShrink: 0 },
  tab:          { padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 5 },
  content:      { padding: "1.25rem", flex: 1, overflowY: "auto" },
  grid2:        { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 },
  grid1:        { display: "flex", flexDirection: "column", gap: 12 },
  card:         { background: "#1A1A17", border: "1px solid #2E2E2A", borderRadius: 12, padding: "1rem 1.25rem" },
  cardTitle:    { fontSize: 14, fontWeight: 600, color: "#F5F3EC", margin: "0 0 10px" },
  cardBody:     { fontSize: 13, color: "#B8B5AC", lineHeight: 1.6, margin: 0 },
  tagWrap:      { display: "flex", flexWrap: "wrap", gap: 6 },
  tag:          { fontSize: 12, background: "#252522", border: "1px solid #2E2E2A", borderRadius: 6, padding: "3px 10px", color: "#888780" },
  ul:           { paddingLeft: "1.2rem", margin: 0 },
  li:           { fontSize: 13, lineHeight: 1.6, marginBottom: 6, color: "#B8B5AC" },
  filterRow:    { display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12, alignItems: "center" },
  filterGroup:  { display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" },
  filterLabel:  { fontSize: 12, color: "#555552", marginRight: 4 },
  filterBtn:    { fontSize: 11, padding: "4px 10px", borderRadius: 14, cursor: "pointer", fontWeight: 500 },
  filterCount:  { fontSize: 12, color: "#555552", marginLeft: "auto" },
  tableWrap:    { overflowX: "auto", borderRadius: 10, border: "1px solid #2E2E2A" },
  table:        { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th:           { textAlign: "left", padding: "10px 14px", color: "#888780", fontSize: 12, fontWeight: 600, background: "#141412", borderBottom: "1px solid #2E2E2A", whiteSpace: "nowrap" },
  td:           { padding: "10px 14px", color: "#B8B5AC", borderBottom: "1px solid #1E1E1B", verticalAlign: "top" },
  idBadge:      { fontSize: 11, background: "#252522", border: "1px solid #2E2E2A", borderRadius: 5, padding: "2px 7px", color: "#888780", fontFamily: "monospace", marginRight: 4 },
  dimBadge:     { fontSize: 11, borderRadius: 5, padding: "2px 8px", fontWeight: 500, whiteSpace: "nowrap" },
  riskHeader:   { display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" },
  impactLabel:  { fontSize: 11, color: "#555552", fontWeight: 600, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.05em" },
  questionCard: { display: "flex", gap: 12, alignItems: "flex-start", background: "#141412", border: "1px solid #2E2E2A", borderRadius: 8, padding: "12px 14px" },
  questionNum:  { fontSize: 12, fontWeight: 700, color: "#5B4DD4", background: "#1E1A3A", borderRadius: 6, padding: "2px 8px", flexShrink: 0 },
  landscapeCard: { background: "#141412", border: "1px solid #2E2E2A", borderRadius: 8, padding: "12px 14px" },
  matrixWrap:   { display: "flex", flexDirection: "column", gap: 6, marginTop: 10 },
  matrix:       { display: "flex", flexDirection: "column", gap: 4 },
  matrixRow:    { display: "flex", gap: 4, alignItems: "center" },
  matrixRowLabel: { fontSize: 11, color: "#555552", width: 60, textAlign: "right", flexShrink: 0 },
  matrixCell:   { flex: 1, minHeight: 56, borderRadius: 6, display: "flex", flexWrap: "wrap", gap: 4, padding: 6, alignItems: "center", justifyContent: "center" },
  matrixRisk:   { fontSize: 11, fontWeight: 700, background: "#1A1A17", borderRadius: 4, padding: "2px 6px", fontFamily: "monospace" },
  matrixXLabels: { display: "flex", gap: 4, paddingLeft: 64 },
  matrixXLabel: { flex: 1, fontSize: 11, color: "#555552", textAlign: "center" },
  matrixYLabel: { fontSize: 11, color: "#555552" },
  matrixXAxisLabel: { fontSize: 11, color: "#555552", textAlign: "center" },
};
