// src/chain/mockData.js
// Mock response simulating the full 360° QA Brain analysis
// Replace with real API calls when Claude API key is available

export const mockAnalysis = {
  meta: {
    requirement_summary: "Google OAuth Login — new account creation and returning user matching by email",
    analyzed_at: new Date().toISOString(),
    overall_risk_score: "Amber",
    total_test_cases: 24,
    dimensions_covered: [
      "functional",
      "security",
      "performance",
      "compatibility",
      "usability",
      "integration",
      "data",
      "regression"
    ]
  },

  comprehension: {
    what: "A Google OAuth-based authentication flow that handles two scenarios: new users get an account auto-created from their Google profile, and returning users are identified by email address match.",
    who: "All application users — new visitors and returning members",
    systems_touched: ["Google OAuth API", "User database", "Session manager", "Email service", "Analytics service"],
    data_handled: ["Email address", "Full name", "Google profile avatar", "OAuth token", "Session token"],
    ambiguities: [
      "What happens if a user has an existing password-based account with the same email?",
      "Is email matching case-sensitive?",
      "What is the session expiry duration?",
      "Should the Google avatar overwrite an existing profile picture?",
      "What happens if Google returns no email address?"
    ]
  },

  test_cases: [
    // FUNCTIONAL
    {
      id: "TC001", title: "Successful first-time Google login",
      dimension: "functional", priority: "High",
      preconditions: "User has a valid Google account, no existing app account",
      steps: "Click 'Login with Google', complete Google consent, return to app",
      expected_result: "New account created, user logged in, redirected to dashboard"
    },
    {
      id: "TC002", title: "Returning user login — account matched by email",
      dimension: "functional", priority: "High",
      preconditions: "User has an existing account matching their Google email",
      steps: "Click 'Login with Google', complete Google consent",
      expected_result: "Existing account retrieved, no duplicate created, session started"
    },
    {
      id: "TC003", title: "User cancels Google consent screen",
      dimension: "functional", priority: "Medium",
      preconditions: "User initiates Google login",
      steps: "Click 'Login with Google', click Cancel on Google consent screen",
      expected_result: "User returned to app gracefully, no error crash, login page shown"
    },
    {
      id: "TC004", title: "Post-login redirect to correct destination",
      dimension: "functional", priority: "Medium",
      preconditions: "User accessed a deep link before login",
      steps: "Access protected URL, complete Google login",
      expected_result: "User redirected to originally requested URL, not generic dashboard"
    },
    {
      id: "TC005", title: "Account data accuracy after creation",
      dimension: "functional", priority: "Medium",
      preconditions: "New user completes Google login",
      steps: "Check profile after first login",
      expected_result: "Name, email, avatar correctly pulled from Google profile, no truncation"
    },

    // SECURITY
    {
      id: "TC006", title: "Invalid / tampered OAuth token rejected",
      dimension: "security", priority: "High",
      preconditions: "Attacker has a modified token",
      steps: "Submit tampered OAuth token to callback endpoint",
      expected_result: "Token validation fails, login rejected, no session created, error logged"
    },
    {
      id: "TC007", title: "CSRF protection on OAuth callback",
      dimension: "security", priority: "High",
      preconditions: "OAuth state parameter not implemented",
      steps: "Attempt CSRF attack on callback URL without valid state param",
      expected_result: "Request rejected, state mismatch error, no session created"
    },
    {
      id: "TC008", title: "Session fixation prevention",
      dimension: "security", priority: "High",
      preconditions: "Attacker has pre-auth session ID",
      steps: "Complete login with a known pre-auth session ID",
      expected_result: "New session ID generated post-login, old session invalidated"
    },
    {
      id: "TC009", title: "XSS via Google profile name",
      dimension: "security", priority: "High",
      preconditions: "Google account with script tag in display name",
      steps: "Login with account whose name contains <script>alert(1)</script>",
      expected_result: "Name sanitised before storage and display, no script execution"
    },

    // PERFORMANCE
    {
      id: "TC010", title: "Concurrent first-time logins — race condition",
      dimension: "performance", priority: "High",
      preconditions: "Same email initiates login simultaneously from two devices",
      steps: "Simulate two parallel OAuth callbacks for the same email",
      expected_result: "Only one account created, no duplicate, atomic DB operation confirmed"
    },
    {
      id: "TC011", title: "Login under load — 100 concurrent users",
      dimension: "performance", priority: "Medium",
      preconditions: "Load test environment configured",
      steps: "Simulate 100 simultaneous Google OAuth logins",
      expected_result: "All logins complete within 3 seconds, no 5xx errors, no dropped sessions"
    },

    // COMPATIBILITY
    {
      id: "TC012", title: "Google login on Safari browser",
      dimension: "compatibility", priority: "Medium",
      preconditions: "Safari on macOS and iOS",
      steps: "Initiate Google OAuth flow on Safari",
      expected_result: "OAuth popup or redirect works correctly, no ITP cookie blocking issues"
    },
    {
      id: "TC013", title: "Google login on mobile WebView",
      dimension: "compatibility", priority: "Medium",
      preconditions: "App opened inside a WebView (e.g. from email link)",
      steps: "Attempt Google login from within WebView",
      expected_result: "User redirected to external browser for OAuth, returns to app correctly"
    },
    {
      id: "TC014", title: "Login in incognito mode",
      dimension: "compatibility", priority: "Low",
      preconditions: "User opens app in incognito / private browsing",
      steps: "Attempt Google login in incognito mode",
      expected_result: "Login completes successfully, session maintained within incognito tab"
    },

    // USABILITY
    {
      id: "TC015", title: "Keyboard-only navigation through login flow",
      dimension: "usability", priority: "Medium",
      preconditions: "User navigates without mouse",
      steps: "Tab to login button, press Enter, complete Google flow",
      expected_result: "Full login flow completable via keyboard only, focus states visible"
    },
    {
      id: "TC016", title: "Screen reader accessibility on login page",
      dimension: "usability", priority: "Medium",
      preconditions: "Screen reader enabled (NVDA or VoiceOver)",
      steps: "Navigate login page with screen reader",
      expected_result: "Login button correctly announced, OAuth flow accessible, errors announced"
    },

    // INTEGRATION
    {
      id: "TC017", title: "Google OAuth API unavailable",
      dimension: "integration", priority: "High",
      preconditions: "Google OAuth endpoint is down or unreachable",
      steps: "Attempt login when Google API returns timeout",
      expected_result: "User sees meaningful error message, app does not crash, retry option shown"
    },
    {
      id: "TC018", title: "Email service failure on account creation",
      dimension: "integration", priority: "Medium",
      preconditions: "Email service is down",
      steps: "New user completes first Google login",
      expected_result: "Account created successfully, login proceeds, welcome email queued for retry"
    },

    // DATA INTEGRITY
    {
      id: "TC019", title: "Email case sensitivity matching",
      dimension: "data", priority: "High",
      preconditions: "Account exists as user@gmail.com",
      steps: "Login with Google account returning User@Gmail.com",
      expected_result: "Emails normalised to lowercase, existing account matched, no duplicate"
    },
    {
      id: "TC020", title: "Google returns no email address",
      dimension: "data", priority: "Medium",
      preconditions: "Edge case — Google profile has no email",
      steps: "Complete OAuth flow where profile email is null",
      expected_result: "Login rejected gracefully, user shown clear error, no empty account created"
    },
    {
      id: "TC021", title: "GDPR — data stored is minimal and documented",
      dimension: "data", priority: "High",
      preconditions: "New user account created via Google login",
      steps: "Inspect data stored in DB after account creation",
      expected_result: "Only necessary fields stored (email, name, avatar), no raw OAuth token persisted"
    },

    // REGRESSION
    {
      id: "TC022", title: "Existing password-based login still works",
      dimension: "regression", priority: "High",
      preconditions: "Users with password accounts exist",
      steps: "Attempt standard email/password login after OAuth feature deployed",
      expected_result: "Password login unaffected, no session or auth conflicts"
    },
    {
      id: "TC023", title: "User profile page displays correctly post OAuth login",
      dimension: "regression", priority: "Medium",
      preconditions: "OAuth user is logged in",
      steps: "Navigate to profile / account settings page",
      expected_result: "Profile page loads correctly, no missing fields, no layout breaks"
    },
    {
      id: "TC024", title: "Analytics events fire correctly on OAuth login",
      dimension: "regression", priority: "Low",
      preconditions: "Analytics service is connected",
      steps: "Complete Google login, check analytics dashboard",
      expected_result: "Login event tracked with correct user_id, login_method: google, timestamp"
    }
  ],

  risks: [
    {
      id: "R001", title: "Duplicate account creation via race condition",
      category: "Data integrity", severity: "Critical", likelihood: "Medium",
      root_cause: "No atomic check-and-create operation — two simultaneous OAuth callbacks create two accounts",
      linked_test_cases: ["TC010"]
    },
    {
      id: "R002", title: "Authentication bypass via token forgery",
      category: "Security", severity: "Critical", likelihood: "Medium",
      root_cause: "If Google token not validated server-side, forged tokens could create sessions",
      linked_test_cases: ["TC006"]
    },
    {
      id: "R003", title: "CSRF attack on OAuth callback",
      category: "Security", severity: "High", likelihood: "Medium",
      root_cause: "Missing state parameter in OAuth flow allows cross-site request forgery",
      linked_test_cases: ["TC007"]
    },
    {
      id: "R004", title: "Session fixation vulnerability",
      category: "Security", severity: "High", likelihood: "Low",
      root_cause: "Session ID not regenerated after login — attacker with pre-auth ID gains access",
      linked_test_cases: ["TC008"]
    },
    {
      id: "R005", title: "Email case mismatch creates duplicate accounts",
      category: "Data integrity", severity: "High", likelihood: "High",
      root_cause: "Email comparison is case-sensitive — User@Gmail.com treated as new user",
      linked_test_cases: ["TC019"]
    },
    {
      id: "R006", title: "Google API outage takes down entire login",
      category: "Availability", severity: "High", likelihood: "Low",
      root_cause: "No fallback authentication method, no circuit breaker on Google API calls",
      linked_test_cases: ["TC017"]
    },
    {
      id: "R007", title: "XSS via unsanitised Google profile data",
      category: "Security", severity: "High", likelihood: "Low",
      root_cause: "Google display name rendered without sanitisation allows script injection",
      linked_test_cases: ["TC009"]
    },
    {
      id: "R008", title: "GDPR violation — excess data stored",
      category: "Compliance", severity: "High", likelihood: "Medium",
      root_cause: "Raw OAuth tokens or unnecessary profile fields persisted in database",
      linked_test_cases: ["TC021"]
    }
  ],

  impact: [
    {
      risk_id: "R001",
      consequence: "Users lose their data on next login — they see an empty account",
      who_affected: "All new users who log in simultaneously or during peak traffic",
      business_impact: "Support ticket spike, manual account merges, user trust damage",
      incident_scenario: "Launch day spike — hundreds of users get duplicate accounts, data split across both, impossible to self-resolve"
    },
    {
      risk_id: "R002",
      consequence: "Attacker gains access to any user account without credentials",
      who_affected: "All users — entire user base exposed",
      business_impact: "Data breach, regulatory fines, reputational damage, potential shutdown",
      incident_scenario: "Security researcher finds bypass, publishes it — you have hours to respond before exploitation at scale"
    },
    {
      risk_id: "R003",
      consequence: "Attackers force users to link accounts to attacker-controlled sessions",
      who_affected: "Any user who clicks a malicious link",
      business_impact: "Account takeover, privacy breach, legal liability",
      incident_scenario: "Phishing email links to crafted URL — victim clicks, attacker gets authenticated session"
    },
    {
      risk_id: "R005",
      consequence: "Real users locked out of their account or see an empty new account",
      who_affected: "Users whose email provider uses mixed case (common in enterprise)",
      business_impact: "Looks like data loss — highest severity support tickets",
      incident_scenario: "Enterprise client onboards team — half the users get locked out because their Google workspace returns capitalised emails"
    },
    {
      risk_id: "R006",
      consequence: "Entire login system down whenever Google has an incident",
      who_affected: "All users — 100% login failure",
      business_impact: "Complete service unavailability, SLA breach, customer churn",
      incident_scenario: "Google OAuth has a 30-minute outage — your app is completely inaccessible, no fallback, CEO is calling"
    },
    {
      risk_id: "R008",
      consequence: "GDPR non-compliance — ICO investigation, fines up to 4% of annual turnover",
      who_affected: "All EU users",
      business_impact: "Regulatory fine, mandatory audit, reputational damage with enterprise clients",
      incident_scenario: "GDPR audit triggered by a complaint — raw OAuth tokens found in DB — immediate remediation required"
    }
  ],

  mitigation: [
    {
      risk_id: "R001",
      action: "Use database-level unique constraint on email + upsert (INSERT ... ON CONFLICT) to make account creation atomic",
      priority: "Before release"
    },
    {
      risk_id: "R002",
      action: "Always validate Google ID token signature server-side using Google's public keys before trusting any profile data",
      priority: "Before release"
    },
    {
      risk_id: "R003",
      action: "Implement OAuth state parameter — generate a random token, store in session, verify on callback",
      priority: "Before release"
    },
    {
      risk_id: "R004",
      action: "Regenerate session ID immediately after successful authentication using session.regenerate()",
      priority: "Before release"
    },
    {
      risk_id: "R005",
      action: "Normalise all emails to lowercase before storage and before matching — enforce at DB level with a function index",
      priority: "Before release"
    },
    {
      risk_id: "R006",
      action: "Add timeout + circuit breaker on Google API calls. Show user-friendly error with retry. Consider email/password as fallback.",
      priority: "Before release"
    },
    {
      risk_id: "R007",
      action: "Sanitise all data from Google profile before storage and before rendering using DOMPurify or equivalent",
      priority: "Before release"
    },
    {
      risk_id: "R008",
      action: "Store only email, name, avatar URL. Never persist raw OAuth tokens. Document data retention policy. Add to privacy notice.",
      priority: "Before release"
    }
  ],

  requirement_gaps: [
    "No acceptance criteria defined for what happens when email already exists with a password-based account",
    "Session expiry duration not specified — how long does a Google login session last?",
    "No specification for what happens if Google revokes app access mid-session",
    "Avatar handling not defined — does Google avatar overwrite existing profile picture?",
    "No mention of rate limiting on the OAuth callback endpoint",
    "Multi-device behaviour not specified — can the same user be logged in on multiple devices?",
    "No definition of error messages to show users — what does the UI say when login fails?",
    "Account deletion flow not addressed — what happens to Google-linked accounts when deleted?"
  ],

  test_data: [
    { scenario: "Valid new user", data: "Fresh Google account never used with this app" },
    { scenario: "Returning user", data: "Google account matching existing DB record (lowercase email)" },
    { scenario: "Case sensitivity", data: "Google account returning User@Gmail.com when DB has user@gmail.com" },
    { scenario: "Mixed case enterprise email", data: "Google Workspace account e.g. John.Smith@Company.com" },
    { scenario: "Invalid token", data: "Tampered JWT with invalid signature" },
    { scenario: "Expired token", data: "OAuth token with past expiry timestamp" },
    { scenario: "No email in profile", data: "Edge case Google account with email scope denied" },
    { scenario: "Name with special characters", data: "Google account with name: José María <script>alert(1)</script>" },
    { scenario: "Long email", data: "Email at maximum length: 254 characters" },
    { scenario: "Concurrent load", data: "100 simultaneous OAuth callbacks with unique emails" }
  ],

  entry_exit_criteria: {
    entry: [
      "Google OAuth client ID and secret configured in all environments",
      "Database schema for users table reviewed and approved",
      "Test environment connected to Google OAuth test credentials",
      "All security test cases reviewed by at least one senior developer",
      "Mock Google OAuth server available for offline testing"
    ],
    exit: [
      "All High priority test cases passed with zero defects",
      "All Critical and High severity risks mitigated and verified",
      "Security test cases signed off by security reviewer",
      "Performance test shows login completes under 3 seconds at 100 concurrent users",
      "GDPR compliance checklist completed and approved",
      "No open bugs of severity Critical or High",
      "Product owner sign-off on happy path demo"
    ]
  },

  questions_for_team: [
    "What happens if a user already has a password-based account with the same email — do we link, block, or create a duplicate?",
    "Who owns the decision on session expiry — product or security team?",
    "Is there a rate limit on the OAuth callback endpoint — what happens if someone hammers it?",
    "Has the Google OAuth app been verified? Unverified apps show a warning screen to users.",
    "What is our recovery plan if Google OAuth is down — is there a fallback login method?",
    "Which environments have Google OAuth configured — dev, staging, and prod all need separate credentials",
    "Do we need to support Google Workspace accounts — they behave differently from personal Gmail",
    "What is the data retention policy for user profile data pulled from Google?",
    "Has legal reviewed the Google OAuth terms of service for our use case?",
    "Who is notified when a login failure spike is detected — is there an alert configured?"
  ],

  automation_recommendations: [
    { test_id: "TC001", recommendation: "Automate", tool: "Cypress", reason: "Core happy path — must run on every deployment" },
    { test_id: "TC002", recommendation: "Automate", tool: "Cypress", reason: "Critical returning user flow — regression risk on every change" },
    { test_id: "TC006", recommendation: "Automate", tool: "Postman / Jest", reason: "API-level security test — fast, reliable, no UI needed" },
    { test_id: "TC007", recommendation: "Automate", tool: "Postman / Jest", reason: "CSRF check is deterministic — perfect for automation" },
    { test_id: "TC010", recommendation: "Automate", tool: "JMeter", reason: "Race condition needs concurrent load — can't be tested manually" },
    { test_id: "TC011", recommendation: "Automate", tool: "JMeter", reason: "Performance baseline — automate and run before every release" },
    { test_id: "TC019", recommendation: "Automate", tool: "Jest / Postman", reason: "Email normalisation is a data layer test — unit testable" },
    { test_id: "TC021", recommendation: "Automate", tool: "Jest", reason: "GDPR data check — query DB after creation, assert only allowed fields" },
    { test_id: "TC003", recommendation: "Manual", tool: "—", reason: "Cancel flow has UI nuance and browser-specific behaviour" },
    { test_id: "TC015", recommendation: "Manual", tool: "—", reason: "Keyboard accessibility requires human judgment on UX quality" },
    { test_id: "TC016", recommendation: "Manual", tool: "—", reason: "Screen reader testing requires assistive technology + human assessment" },
    { test_id: "TC012", recommendation: "Manual", tool: "—", reason: "Safari WebKit behaviour needs real device validation" }
  ],

  compliance_checklist: [
    { standard: "GDPR", item: "Minimal data collection — only email, name, avatar stored", status: "Verify" },
    { standard: "GDPR", item: "Privacy notice updated to include Google OAuth data source", status: "Verify" },
    { standard: "GDPR", item: "User can request deletion of Google-linked account data", status: "Verify" },
    { standard: "GDPR", item: "Raw OAuth tokens not persisted in database or logs", status: "Verify" },
    { standard: "WCAG 2.1 AA", item: "Login button has accessible name and role", status: "Verify" },
    { standard: "WCAG 2.1 AA", item: "Error messages announced to screen readers", status: "Verify" },
    { standard: "WCAG 2.1 AA", item: "Focus visible on all interactive elements", status: "Verify" },
    { standard: "OWASP", item: "OAuth state parameter implemented to prevent CSRF", status: "Verify" },
    { standard: "OWASP", item: "Token validation performed server-side", status: "Verify" },
    { standard: "OWASP", item: "Session regenerated after successful login", status: "Verify" },
    { standard: "OWASP", item: "All redirect URIs whitelisted in Google console", status: "Verify" }
  ],

  landscape: {
    upstream: [
      {
        system: "Google OAuth API",
        role: "Token provider — authenticates user identity",
        boundary_risks: [
          "API returns invalid or expired token",
          "API is down or returns 5xx",
          "Token signature changes — validation breaks silently",
          "Google changes OAuth scopes or response format"
        ],
        test_focus: "Token validation, error handling, timeout behaviour"
      },
      {
        system: "User profile database",
        role: "Source of truth for existing accounts",
        boundary_risks: [
          "DB connection pool exhausted under load",
          "Email uniqueness constraint missing — allows duplicates",
          "Read replica lag causes returning user not found"
        ],
        test_focus: "Upsert atomicity, unique constraints, connection resilience"
      },
      {
        system: "Email service",
        role: "Sends welcome email on first login",
        boundary_risks: [
          "Email service down — does account creation fail or proceed?",
          "Welcome email sent multiple times on retry",
          "Email queue overflow during peak signup"
        ],
        test_focus: "Failure isolation — email failure must not block login"
      }
    ],
    downstream: [
      {
        system: "Session manager",
        role: "Creates and maintains authenticated session",
        boundary_risks: [
          "Session store full — login succeeds but session not persisted",
          "Session ID not regenerated — fixation vulnerability",
          "Session expiry not aligned with Google token expiry"
        ],
        test_focus: "Session creation success, ID regeneration, expiry handling"
      },
      {
        system: "Analytics service",
        role: "Tracks login events for product metrics",
        boundary_risks: [
          "Analytics event missing login_method: google — data corrupted",
          "Analytics failure blocks login flow if synchronous",
          "Duplicate events fired on retry"
        ],
        test_focus: "Event schema validation, async fire-and-forget, deduplication"
      },
      {
        system: "Notification service",
        role: "Triggers onboarding flow for new users",
        boundary_risks: [
          "Onboarding triggered for returning users — duplicate emails",
          "Notification service down — onboarding never starts",
          "New user flag not correctly set — returning users get onboarding"
        ],
        test_focus: "New vs returning user flag accuracy, failure isolation"
      }
    ]
  }
};

// Simulate API delay for realistic development experience
export const getMockAnalysis = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAnalysis), 2500);
  });
};