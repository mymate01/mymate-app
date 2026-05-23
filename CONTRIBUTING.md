# Contributing to MyMate

Welcome to the MyMate project! We use a highly automated, AI-assisted workflow. Whether you are coding manually or using an AI agent, please follow this process strictly.

## 1. The Core Rules
Before doing anything, you (and your AI assistant) must read `ARCHITECTURE.md`. It contains the indisputable source of truth for our Tech Stack, Database Schema, and Design System (Sunrise Gradient).

## 2. Git Branching & Workflow
We strictly follow this branch flow to protect production:

1. **Start a Ticket**: Pull a ticket from Linear. Create a new branch off `dev` named `feature/[ticket-id]`.
2. **Development**: Write the code on your `feature/` branch. **Mandatory:** You or your AI must write Unit Tests (Jest/Vitest) for the new feature.
3. **Merge to Dev**: Once the feature is complete and local unit tests pass, open a Pull Request to merge your `feature/` branch into `dev`.
4. **The Release Phase**: When we have accumulated enough features for a release, we cut a `release/` branch from `dev`.
5. **QA Verification**: Before merging to main, the Playwright End-to-End test suite MUST be run on the `release/` branch. If a test fails, fix it here.
6. **Production**: Only after QA passes do we merge `release/` into `main`. Vercel will automatically deploy the `main` branch to production.

## 3. AI Agent Instructions
If you are using an AI-powered IDE (like Cursor) or CLI tool, ensure it is reading the `.agentrules` file located in the root. This hidden file forces the AI to automatically follow our testing and architectural rules without you having to remind it.
