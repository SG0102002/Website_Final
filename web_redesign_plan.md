# Comprehensive Implementation Plan: AI & Automation Studio Redesign

## 1. Project Overview & Tech Stack
**Goal:** Build a highly interactive, premium portfolio and consultancy website. The site must feel like it was built by an expert AI Engineer and Website Designer. It needs smooth transitions, 3D/physics interactions in the hero section, and a clean, vibrant aesthetic.
**Target Audience:** Malaysian SMEs looking for cost reduction, automated workflows, and high-end web design.
**Core Stack:** * Framework: Next.js 14 (App Router)
* Styling: Tailwind CSS
* UI Components: Shadcn UI (for accessible foundations)
* Animations: Framer Motion (for modals and page transitions)
* 3D/Interactive Hero: React-Three-Fiber & React-Three-Rapier (for "Bruno Simon" style interactive physics blocks)
* Icons: Lucide React

## 2. Visual Identity & Theming
* **Background:** Vibrant White (`#FAFAFA` to `#FFFFFF`).
* **Primary Accent:** Vibrant Light Green (`#4ADE80` or `#22C55E`). Use this for hover states, buttons, and glowing effects.
* **Text:** Dark Slate (`#0F172A`) for high contrast readability.
* **Typography:** Inter or Geist for body text; JetBrains Mono for small technical labels or code-like elements.
* **Vibe:** Clean, gender-neutral, modern, and highly technical but accessible.

## 3. Structural Layout & Flow
The site will be a single-page scrolling experience with modular popups to prevent page reloads and maintain the interactive feel.
1. **Hero Section:** Interactive 3D playground + Main Value Proposition.
2. **Services / Solutions Section:** Interactive grid cards.
3. **Contact / CTA Section:** Clean form to capture leads.
*(Note: Do not include a "How it comes together" process section; integrate process details directly into the service popups).*

## 4. Component Architecture & Detailed Instructions

### A. The Hero Section (Interactive Physics)
* **Design:** A split layout or full-screen canvas. 
* **Text:** "Build Systems That Work. AI solutions and web design that reduce manual work and scale reliably."
* **Interactivity (React-Three-Fiber):** Create 4-5 floating 3D primitive shapes (cubes, spheres) that the user can drag and throw with their mouse. Assign them a light green glass material.

### B. The Services Section (Framer Motion Modals)
* **Design:** A 2x2 grid of minimalist cards.
* **Interactivity:** Clicking a card uses Framer Motion's `layoutId` to smoothly expand into a center-screen modal (glassmorphism background, blurring the rest of the site).
* **Modal Structure:** * Left side: `aspect-video` placeholder for a demo video or image.
  * Right side: Title, Description, Technical Stack chips, and a "Let's Talk" button.
* **The 4 Core Services to map out:**
  1. **ExcelQ Comparison Tool:** Variance analysis systems for Excel files. Target: Accountants, auditors, and real estate professionals.
  2. **Intelligent RAG Chatbots:** Enterprise-grade systems for finding and retrieving internal information instantly.
  3. **AI Automation Solutions:** Streamlining repetitive internal workflows to free up human capacity.
  4. **Premium Web Design:** High-performance, unique website design that stands out from standard templates.

### C. The CTA / Contact Section
* **Design:** Minimalist footer form.
* **Fields:** Name, Email, "Tell us about your project".
* **Styling:** Inputs should have a subtle green focus ring.

## 5. Step-by-Step Execution Commands for Claude
Execute these steps sequentially:
1. Initialize Next.js project: `npx create-next-app@latest ai-studio --typescript --tailwind --eslint --app`
2. Install dependencies: `npm install framer-motion lucide-react three @react-three/fiber @react-three/drei @react-three/rapier`
3. Initialize Shadcn UI: `npx shadcn-ui@latest init` (Use neutral/slate base).
4. Build the `ServiceModal` component using Framer Motion `AnimatePresence`.
5. Build the `HeroPhysics` component using React-Three-Fiber.
6. Assemble the `page.tsx` integrating Hero, Services, and Contact.

## 6. Content & Copywriting Map
Do not use placeholder text (Lorem Ipsum). Use the exact copy provided below for the new components.

### Hero Section Copy
* **Headline:** Build Systems That Work
* **Subheadline:** We design automation and intelligent systems that reduce manual work, improve decision-making, and scale reliably.
* **Button:** Start a Project

### Services / Pop-up Window Copy
When building the 4 Service Modals, use this exact content for the text areas:

**Service 1: ExcelQ Comparison Tool**
* **Title:** Automated Variance Analysis
* **Description:** A custom-built engine designed to compare complex Excel files instantly. Built specifically to eliminate hours of manual cross-checking for accountants, auditors, and real estate professionals.
* **Impact Metric:** Eliminates manual data comparison errors.

**Service 2: Intelligent RAG Chatbots**
* **Title:** Knowledge & Search Systems
* **Description:** Enterprise-grade systems for finding and retrieving internal information. We design AI-powered document retrieval for large knowledge bases using vector search with filtering for accurate, contextual results.
* **Impact Metric:** Reduced information retrieval time by 70% for internal teams.

**Service 3: AI & Automation Solutions**
* **Title:** Internal Workflow Automation
* **Description:** Streamlining repetitive processes to free up human capacity. We integrate disconnected systems to eliminate manual data transfer and build self-service tools to reduce dependency on technical teams.
* **Impact Metric:** Eliminated 15+ hours of manual work per week per team.

**Service 4: Premium Web Design**
* **Title:** High-Performance Web Architecture
* **Description:** As an AI Engineer and Web Designer, I build websites that aren't just templates. We create fast, unique, and highly interactive digital experiences that position your brand as a technical authority.
* **Impact Metric:** Scalable, unique digital presence.