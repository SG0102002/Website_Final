# Complete Website Recreation Plan: AI & Automation Studio

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack & Dependencies](#tech-stack--dependencies)
3. [Visual Identity & Design System](#visual-identity--design-system)
4. [Site Structure](#site-structure)
5. [Component Specifications](#component-specifications)
6. [Content & Copywriting](#content--copywriting)
7. [Implementation Steps](#implementation-steps)
8. [Design Patterns & Techniques](#design-patterns--techniques)

---

## Project Overview

**Goal:** Build a premium, highly interactive portfolio website for an AI & Automation consultancy targeting Malaysian SMEs. The site must feel modern, technical, and trustworthy while showcasing automation solutions and web design expertise.

**Target Audience:**
- Malaysian SMEs looking to reduce costs and automate workflows
- Finance teams, accountants, auditors
- Companies with manual, repetitive processes
- Businesses needing digital transformation

**Core Philosophy:**
- Single-page scrolling experience with smooth transitions
- Interactive hero section to showcase technical capability
- Premium purple aesthetic with depth and glassmorphism
- No page reloads - modals for detailed content
- Mobile-first, responsive design

---

## Tech Stack & Dependencies

### Core Framework
```bash
# Next.js 14 with App Router
npx create-next-app@latest website --typescript --tailwind --eslint --app
```

### Required Dependencies
```bash
npm install framer-motion lucide-react
```

### Shadcn UI Components
```bash
npx shadcn-ui@latest init
# Select: slate theme, CSS variables
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add label
npx shadcn-ui@latest add dialog
```

### Final package.json Dependencies
```json
{
  "dependencies": {
    "next": "14.x",
    "react": "^18",
    "react-dom": "^18",
    "framer-motion": "^12.34.3",
    "lucide-react": "^0.487.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "tailwindcss": "^3.4.1",
    "eslint": "^8",
    "eslint-config-next": "14.x"
  }
}
```

---

## Visual Identity & Design System

### Color Palette

**Primary Purple Theme:**
- `vibrant-purple`: `#8B5CF6` (main accent, interactive elements)
- `vibrant-purple-dark`: `#7C3AED` (darker purple for gradients)
- `vibrant-purple-light`: `#A78BFA` (lighter purple for text)
- `vibrant-purple-glow`: `rgba(139, 92, 246, 0.2)` (shadows and effects)

**Background & Surfaces:**
- `vibrant-white`: `#FAFAFA` (light section backgrounds)
- `vibrant-dark`: `#1E293B` (dark section backgrounds - services section)
- `vibrant-dark-alt`: `#0F172A` (deeper dark for contrast)
- `vibrant-slate`: `#0F172A` (text color)

**Legacy Green (kept for potential use):**
- `vibrant-green`: `#10B981`
- `vibrant-green-dark`: `#059669`
- `vibrant-green-light`: `#34D399`

### Typography

**Fonts:**
- **Body/UI:** Inter (--font-inter)
- **Code/Technical:** JetBrains Mono (--font-jetbrains-mono)

**Type Scale:**
- Hero headline: `text-5xl md:text-6xl lg:text-7xl`
- Section titles: `text-4xl md:text-5xl lg:text-6xl`
- Service cards: `text-2xl md:text-3xl`
- Body text: `text-base md:text-lg`
- Labels: `text-xs uppercase tracking-[0.25em]`

### Design Principles

1. **Depth & Layering:**
   - Glassmorphic cards with backdrop-blur
   - Multi-layer gradients (from-via-to)
   - Colored shadows for depth perception
   - Background patterns at low opacity (3-8%)

2. **Smooth Transitions:**
   - Custom gradient transitions between sections
   - 500-800ms transition durations
   - Staggered animations (100ms delay increments)

3. **Interactivity:**
   - Hover states with lift effects (y: -4 to -8)
   - Scale animations on buttons (scale: 1.02-1.05)
   - Color transitions on interactive elements
   - Cursor-reactive particle network in hero

4. **Spacing & Rhythm:**
   - Section padding: `py-20 md:py-32`
   - Container max-width: `1400px`
   - Card gaps: `gap-6 lg:gap-8`
   - Generous whitespace for premium feel

---

## Site Structure

### Navigation Flow
1. **Hero Section** (`#home`) - Interactive particle network
2. **Gradient Transition** (light → dark)
3. **Services Section** (`#services`) - 5 service cards on dark background
4. **Gradient Transition** (dark → light)
5. **How We Work Section** (`#how-we-work`) - Challenges + Process
6. **Contact Section** (`#contact`) - Lead capture form

### Section Breakdown

#### 1. Navigation Bar
- Fixed position, scroll-tracking active states
- Logo on left, nav links on right
- Smooth scroll to sections
- Purple underline for active section

#### 2. Hero Section (Interactive Particle Network)
- Full viewport height
- Canvas-based particle system with cursor interaction
- Headline + subheadline + CTA button
- Purple gradient background with animated particles
- Particles repel from cursor position

#### 3. Services Section (Dark Background)
- 3-column grid on large screens (5 services total)
- Glassmorphic cards with purple borders
- Click to open modal with full details
- Each card shows: number, title, short description, arrow icon
- Subtle dot pattern background

#### 4. How We Work Section (Light Background)
- **Common Challenges:** 4 cards showing pain points
- **Our Process:** 5-step workflow with connecting line
- Cards have shadows and hover effects
- Gradient backgrounds and icons

#### 5. Contact Section (Light Background)
- Glassmorphic form container
- Fields: Name, Email, Message
- Purple focus rings on inputs
- Grid pattern background
- Submit button with purple gradient

---

## Component Specifications

### File Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── Navigation.tsx      # Fixed nav bar
│   ├── HeroPhysics.tsx     # Particle network hero
│   ├── ServicesGrid.tsx    # Services cards + data
│   ├── ServiceModal.tsx    # Service detail modal
│   ├── HowWeWork.tsx       # Challenges + process
│   ├── Contact.tsx         # Contact form
│   └── SectionTransition.tsx # Gradient transitions
├── hooks/
│   └── useScrollTracking.tsx # Active section tracking
└── types/
    └── service.ts          # Service interface
```

### Key Components Detail

#### Navigation.tsx
```typescript
// Props: activeSection: string
// Features:
// - Fixed position (fixed top-0 left-0 right-0)
// - Backdrop blur: bg-white/90 backdrop-blur-md
// - Smooth scroll on link click
// - Purple underline on active section
// - Links: Home, Services, How We Work, Contact
```

#### HeroPhysics.tsx
```typescript
// Canvas-based particle system
// - 40-60 particles (responsive)
// - Particles: purple circles with glow
// - Mouse repulsion physics
// - Connecting lines between nearby particles
// - Gradient background: purple/10 to purple/5
// - Centered content with headline + CTA
```

#### ServicesGrid.tsx
```typescript
// Contains services data array (5 services)
// Grid: md:grid-cols-2 lg:grid-cols-3
// Card features:
// - bg-white/8 with backdrop-blur
// - border-white/20, hover: border-vibrant-purple/60
// - Service number (01-05) in purple
// - Title, shortDescription
// - ArrowUpRight icon
// - Click opens ServiceModal
```

#### ServiceModal.tsx
```typescript
// Props: isOpen, onClose, service
// Framer Motion modal with AnimatePresence
// Layout:
// - Full screen overlay with backdrop blur
// - Centered content container (max-w-4xl)
// - Single column layout
// - Service number badge + title
// - Full description
// - "Designed For" section (green card with bullets)
// - "What We Build" benefits (checkmarks)
// - Impact metric (purple quote box)
// - Tech stack pills
// - Close button (X icon)
```

#### HowWeWork.tsx
```typescript
// Two sections:
// 1. Common Challenges (4 cards in 2x2 grid)
//    - Icon, title, description
//    - shadow-lg, hover:shadow-2xl
//    - Lift effect on hover
//
// 2. Our Process (5 steps)
//    - Numbered circles with gradient background
//    - Connecting vertical line
//    - Content cards for each step
//    - Title + description
```

#### Contact.tsx
```typescript
// Form with glassmorphic container
// Fields:
// - Name (text input)
// - Email (email input)
// - Message (textarea)
// - Submit button (purple gradient)
// Background: grid pattern
// Form: bg-white/90, shadow-2xl
```

#### SectionTransition.tsx
```typescript
// Props: from: 'light' | 'dark', to: 'light' | 'dark'
// Creates smooth gradient between sections
// light-to-dark: white → purple-50 → slate-200 → slate-400 → dark
// dark-to-light: reverse gradient
// Height: h-12 md:h-16
```

---

## Content & Copywriting

### Hero Section

**Headline:**
```
Build Systems That Work
```

**Subheadline:**
```
AI solutions and automation that reduce manual work,
eliminate errors, and help Malaysian SMEs scale reliably.
```

**CTA Button:**
```
Start a Project
```

### Services Section

**Section Title:**
```
Systems That Solve Real Problems
```

**Section Subtitle:**
```
End-to-end solutions designed for impact
```

#### Service 1: Automated Excel Comparison & Data Validation

```typescript
{
  id: '01',
  title: 'Automated Excel Comparison & Data Validation',
  shortDescription: 'Automated Excel comparison systems that detect inconsistencies, highlight mismatches, and reduce manual reconciliation hours for finance teams.',
  fullDescription: 'Many SMEs rely heavily on Excel for reporting, reconciliation, budgeting, and compliance. Manual cross-checking between complex spreadsheets is time-consuming and prone to error.',
  designedFor: [
    'Accountants',
    'Auditors',
    'Finance teams',
    'Real estate professionals',
    'Operations managers'
  ],
  benefits: [
    'Compare large, multi-sheet Excel files instantly',
    'Detect inconsistencies and discrepancies',
    'Highlight missing or mismatched data',
    'Reduce manual reconciliation hours',
    'Improve reporting accuracy'
  ],
  impactMetric: 'Especially valuable for firms handling financial audits, property reconciliations, cost tracking, and compliance reporting.',
  techStack: ['Python', 'Pandas', 'openpyxl', 'FastAPI', 'Excel API']
}
```

#### Service 2: Custom Website Development

```typescript
{
  id: '02',
  title: 'Custom Website Development',
  shortDescription: 'Modern, secure, and scalable websites custom-built for business growth—not template-based.',
  fullDescription: 'We develop modern, secure, and scalable websites tailored to your operations. Whether it\'s a corporate site, booking system, or secure client portal, we ensure your website supports your business — not just markets it.',
  designedFor: [
    'SMEs establishing digital presence',
    'Service-based businesses',
    'Professional firms',
    'Companies needing client portals',
    'Internal dashboards'
  ],
  benefits: [
    'Custom-built (not template-based)',
    'Structured for performance and scalability',
    'Designed for credibility and authority',
    'Integrated with internal systems where required'
  ],
  techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL']
}
```

#### Service 3: Smart Search & Internal Knowledge Systems

```typescript
{
  id: '03',
  title: 'Smart Search & Internal Knowledge Systems',
  shortDescription: 'Intelligent search systems that allow teams to find documents instantly using natural language, reducing time spent searching through folders.',
  fullDescription: 'As companies grow, finding the right document quickly becomes difficult. We build intelligent search systems with natural language capabilities and smart filtering.',
  designedFor: [
    'Companies with large internal documentation',
    'HR departments',
    'Legal & compliance teams',
    'Engineering and project-based firms',
    'Operations-heavy businesses'
  ],
  benefits: [
    'Search documents in natural language',
    'Filter by department, project, or category',
    'Retrieve relevant files instantly',
    'Reduce time spent searching through folders'
  ],
  impactMetric: 'Significantly improves productivity for document-driven businesses.',
  techStack: ['LangChain', 'Pinecone', 'OpenAI', 'React', 'Vector Search']
}
```

#### Service 4: Workflow Automation & Software Integration

```typescript
{
  id: '04',
  title: 'Workflow Automation & Software Integration',
  shortDescription: 'Connect your software tools and automate repetitive workflows to eliminate duplicate data entry and reduce operational errors.',
  fullDescription: 'We design systems that connect your software tools and automate repetitive workflows. Instead of adding more manual steps, we simplify and streamline your operations.',
  designedFor: [
    'SMEs using multiple disconnected tools',
    'Businesses managing repetitive manual processes',
    'Teams relying on spreadsheet-based operations'
  ],
  benefits: [
    'Eliminate duplicate data entry',
    'Sync data across systems',
    'Automate reporting',
    'Reduce operational errors',
    'Improve process clarity'
  ],
  techStack: ['n8n', 'Zapier', 'Microsoft 365', 'Google Workspace', 'Python', 'API Integration']
}
```

#### Service 5: CAD to BIM Digital Transformation

```typescript
{
  id: '05',
  title: 'CAD to BIM Digital Transformation',
  shortDescription: 'Digital solutions that help transition traditional CAD workflows into structured BIM-ready environments.',
  fullDescription: 'We develop digital solutions that help architecture and engineering firms modernize their workflows while maintaining efficiency and project accuracy.',
  designedFor: [
    'Architecture firms',
    'Engineering consultancies',
    'Construction companies',
    'Real estate developers'
  ],
  benefits: [
    'Convert CAD drawings into structured BIM-compatible data',
    'Reduce repetitive modeling work',
    'Improve data consistency across projects',
    'Support scalable digital construction processes'
  ],
  impactMetric: 'Helps firms modernize their workflows while maintaining efficiency and project accuracy.'
}
```

### How We Work Section

**Common Challenges (4 cards):**

1. **Manual, Repetitive Work**
   - "Teams spending hours on tasks that could be automated"

2. **Data Scattered Everywhere**
   - "Information trapped in different systems, hard to access"

3. **Excel Dependency**
   - "Critical processes running on fragile spreadsheets"

4. **No Time to Improve**
   - "Too busy firefighting to implement better systems"

**Our Process (5 steps):**

1. **Understand the Problem**
   - "We analyze your current workflow and identify bottlenecks"

2. **Design the Solution**
   - "Custom architecture tailored to your specific needs"

3. **Build & Test**
   - "Develop robust systems with quality assurance"

4. **Deploy & Train**
   - "Smooth rollout with team training and documentation"

5. **Support & Optimize**
   - "Ongoing support to ensure long-term success"

### Contact Section

**Headline:**
```
Let's Build Something Great Together
```

**Subheadline:**
```
Tell us about your project and we'll get back to you within 24 hours
```

**Form Fields:**
- Name (placeholder: "Your name")
- Email (placeholder: "your@email.com")
- Message (placeholder: "Tell us about your project...")

**Submit Button:**
```
Send Message
```

---

## Implementation Steps

### Step 1: Project Setup

```bash
# Create Next.js project
npx create-next-app@latest website --typescript --tailwind --eslint --app
cd website

# Install dependencies
npm install framer-motion lucide-react

# Initialize Shadcn UI
npx shadcn-ui@latest init
# Select: slate theme, CSS variables

# Add Shadcn components
npx shadcn-ui@latest add button input textarea label dialog
```

### Step 2: Configure Tailwind

Update `tailwind.config.ts` with custom colors:

```typescript
colors: {
  vibrant: {
    white: '#FAFAFA',
    green: {
      DEFAULT: '#10B981',
      dark: '#059669',
      light: '#34D399'
    },
    purple: {
      DEFAULT: '#8B5CF6',
      dark: '#7C3AED',
      light: '#A78BFA',
      glow: 'rgba(139, 92, 246, 0.2)'
    },
    slate: '#0F172A',
    dark: {
      DEFAULT: '#1E293B',
      alt: '#0F172A'
    }
  }
},
fontFamily: {
  sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
  mono: ['var(--font-jetbrains-mono)', 'monospace']
}
```

### Step 3: Setup Fonts

Update `app/layout.tsx`:

```typescript
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

### Step 4: Create Type Definitions

Create `src/types/service.ts`:

```typescript
export interface Service {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  designedFor: string[]
  benefits: string[]
  impactMetric?: string
  techStack?: string[]
}
```

### Step 5: Build Components (In Order)

1. **Create SectionTransition.tsx** - Gradient transitions
2. **Create useScrollTracking.tsx** - Hook for nav active states
3. **Create Navigation.tsx** - Fixed nav bar
4. **Create HeroPhysics.tsx** - Particle network canvas
5. **Create ServiceModal.tsx** - Service detail modal
6. **Create ServicesGrid.tsx** - Service cards with data
7. **Create HowWeWork.tsx** - Challenges and process
8. **Create Contact.tsx** - Contact form

### Step 6: Assemble Main Page

Update `app/page.tsx`:

```typescript
'use client'

import { Navigation } from '@/components/Navigation'
import { HeroPhysics } from '@/components/HeroPhysics'
import { ServicesGrid } from '@/components/ServicesGrid'
import { HowWeWork } from '@/components/HowWeWork'
import { Contact } from '@/components/Contact'
import { SectionTransition } from '@/components/SectionTransition'
import { useScrollTracking } from '@/hooks/useScrollTracking'

export default function Home() {
  const activeSection = useScrollTracking(['home', 'services', 'how-we-work', 'contact'])

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} />

      <section id="home">
        <HeroPhysics />
      </section>

      <SectionTransition from="light" to="dark" />

      <section id="services">
        <ServicesGrid />
      </section>

      <SectionTransition from="dark" to="light" />

      <HowWeWork />

      <Contact />
    </div>
  )
}
```

### Step 7: Testing Checklist

- [ ] All sections scroll smoothly
- [ ] Nav tracking highlights correct section
- [ ] Particle network responds to cursor
- [ ] Service modals open/close properly
- [ ] All 5 services display correctly
- [ ] Form inputs have purple focus states
- [ ] Mobile responsive (test at 375px, 768px, 1024px, 1440px)
- [ ] Hover effects work on all interactive elements
- [ ] Gradient transitions render smoothly
- [ ] No console errors

### Step 8: Optimization

```bash
# Build for production
npm run build

# Test production build
npm start

# Check bundle size
npm run build -- --analyze # (if you add bundle analyzer)
```

---

## Design Patterns & Techniques

### 1. Glassmorphism

Used extensively for cards and overlays:

```css
/* Basic glassmorphic card */
bg-white/8              /* Semi-transparent white */
backdrop-blur-sm        /* Blur background */
border border-white/20  /* Subtle border */
```

### 2. Colored Shadows for Depth

Instead of black shadows, use brand color shadows:

```css
shadow-2xl shadow-vibrant-purple/30  /* Purple glow shadow */
hover:shadow-vibrant-purple/50       /* Stronger on hover */
```

### 3. Multi-Layer Gradients

Create smooth transitions with via colors:

```css
bg-gradient-to-b from-white via-purple-50 to-vibrant-dark
```

### 4. Background Patterns

Subtle patterns add texture without distraction:

```css
/* Dot pattern */
backgroundImage: radial-gradient(circle at 1px 1px, rgb(124 58 237) 1px, transparent 0)
backgroundSize: 40px 40px
opacity: 0.03

/* Grid pattern */
backgroundImage: linear-gradient(to right, ...), linear-gradient(to bottom, ...)
backgroundSize: 60px 60px
```

### 5. Framer Motion Patterns

**Scroll-triggered animations:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

**Staggered children:**
```typescript
transition={{ delay: index * 0.1, duration: 0.6 }}
```

**Hover effects:**
```typescript
whileHover={{ y: -8, scale: 1.02 }}
```

**Modal with backdrop:**
```typescript
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Modal content */}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

### 6. Particle Network Physics

Key concepts for HeroPhysics:
- Array of particles with x, y, vx, vy properties
- Each frame: update positions, apply velocity
- Mouse repulsion: calculate distance, apply inverse force
- Draw connections between particles within threshold distance
- Use `requestAnimationFrame` for smooth 60fps animation
- Canvas 2D context for rendering

### 7. Responsive Design Strategy

**Mobile-first approach:**
```typescript
// Base styles (mobile)
className="text-2xl p-4 grid grid-cols-1"

// Tablet
md:text-3xl md:p-6 md:grid-cols-2

// Desktop
lg:text-4xl lg:p-8 lg:grid-cols-3

// Large desktop
xl:text-5xl xl:p-12
```

**Breakpoints:**
- Mobile: < 768px (1 column)
- Tablet: 768px - 1023px (2 columns)
- Desktop: 1024px - 1439px (3 columns)
- Large: 1440px+ (max-width container)

---

## Additional Notes

### Performance Considerations

1. **Lazy load sections** - Consider using dynamic imports for below-fold components
2. **Optimize particles** - Reduce particle count on mobile (40 vs 60)
3. **Image optimization** - Use Next.js Image component if adding images
4. **Font optimization** - Next.js font optimization is automatic with next/font

### Accessibility

1. **Keyboard navigation** - Modal should trap focus and close on Escape
2. **ARIA labels** - Add aria-label to icon-only buttons
3. **Focus indicators** - Purple focus rings on all interactive elements
4. **Color contrast** - Ensure text meets WCAG AA standards

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS backdrop-filter support (IE not supported)
- Canvas API for particle network
- Framer Motion requires JavaScript enabled

---

## Success Metrics

A successful recreation will have:

✅ Interactive particle network hero that responds to cursor
✅ Smooth gradient transitions between sections
✅ All 5 services with complete content and modals
✅ Professional glassmorphic design throughout
✅ Mobile responsive from 320px to 1920px+
✅ Sub-second interaction times (animations, modal opens)
✅ No layout shift or visual bugs
✅ Clean, maintainable code structure

---

## Repository Structure

```
website/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── HeroPhysics.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── ServiceModal.tsx
│   │   ├── HowWeWork.tsx
│   │   ├── Contact.tsx
│   │   └── SectionTransition.tsx
│   ├── hooks/
│   │   └── useScrollTracking.tsx
│   └── types/
│       └── service.ts
├── public/
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

**This document contains everything needed to recreate the website from scratch. Follow the implementation steps sequentially, use the exact content provided, and apply the design patterns consistently for best results.**
