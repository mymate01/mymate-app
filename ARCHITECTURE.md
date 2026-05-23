# Career Guidance Platform - Architecture Document

## Tech Stack
- **Frontend:** Next.js (React), App Router
- **3D Engine:** React Three Fiber (`@react-three/fiber`, `@react-three/drei`) for interactive 3D elements (e.g., Maps).
- **Styling:** Custom Vanilla CSS / CSS Modules (Premium aesthetics, micro-animations). **Theme Locked: Sunrise Gradient** (Light mode with soft cream/warm gray backgrounds, and smooth gradients of vibrant coral, peach, and golden yellow for interactive elements. Must feel positive, uplifting, and bright with soft drop shadows).
- **Backend/DB:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (Email/Password)
- **Hosting:** Vercel
- **Testing:** Jest & React Testing Library (Unit Tests), Playwright (End-to-End UI & Core Flow Testing).
- **CI/CD:** GitHub Actions (CodeQL, Dependabot, Automated Test Runner blocking PRs if tests fail). A dedicated QA Agent must pass Playwright E2E tests before pushing to Release branches.

## Database Schema (Proposed)
- `users`: id, email, current_standard, created_at
- `career_paths`: id, title, description, ai_generated_content
- `goals`: id, user_id, path_id, step_name, status
- `job_alerts`: id, job_title, company, source_url, matched_path_id
- `learning_modules`: id, title, type (enum: '3d_interactive', 'practice_pad', 'quiz'), content_data (JSONB)
- `assessments`: id, module_id, target_exam (e.g., 'Railways'), questions (JSONB)
- `user_progress`: id, user_id, module_id, score, completed_at
- `scraping_sources`: id, name (e.g., 'Indian Railways'), target_url, css_selectors (JSONB), is_active, last_scraped_at

## Data Strategy (Hybrid)
1. **AI Generation:** Core career paths and structured knowledge are generated via LLM and stored in Supabase.
2. **Live Scraping:** Government jobs (Railways, SSC, UPSC) are scraped via background scripts. These sources are NOT hardcoded; they are dynamically managed via the `scraping_sources` database table so you can easily view, toggle, or add new websites to monitor. Private jobs are pulled via standard APIs (Naukri/Indeed).

## Git Branching Strategy
- **`main`**: Permanent branch representing Production-ready code.
- **`dev`**: Permanent branch for active integration of tested features.
- **`release/*`**: Temporary branches specifically for the QA agent to run exhaustive Playwright E2E tests before merging into `main`.
- **`feature/*`**: Short-lived branches created per Linear ticket for writing and unit-testing code.

## Project Management
- **Tool:** Linear
- **Workflow:** For every Linear ticket, agents MUST read this file before writing code or infrastructure scripts, and MUST update this file if architectural decisions are made.
- **Git Workflow Rule:** For every feature/ticket, you MUST:
  1. Create a new branch from `dev`
  2. Pull the latest code
  3. Implement changes
  4. Push to remote
  5. Ask the user to merge
- **Testing Rule:** Agents MUST write tests and run the full test suite to guarantee existing functionality is unbroken before completing any ticket.
