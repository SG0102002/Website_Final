# Testing Checklist for SU Website (Next.js 14)

## ✅ Automated Checks Completed

- [x] Next.js 14 project initialized successfully
- [x] All dependencies installed (framer-motion, three.js, shadcn/ui)
- [x] Development server starts without errors
- [x] Page compiles successfully (2543 modules compiled)
- [x] No compilation errors or warnings
- [x] HTML renders with correct title and meta tags
- [x] All components present in output

## 🧪 Manual Testing Guide

Visit http://localhost:3000 and verify the following:

### Navigation Component
- [ ] Navigation bar appears at top with white/transparent background
- [ ] Logo "SU" is visible and clickable
- [ ] Three nav items visible: Home, Services, Contact
- [ ] Active section highlighted with vibrant green background
- [ ] Clicking nav items scrolls smoothly to sections
- [ ] Mobile menu button appears on small screens
- [ ] Mobile menu opens/closes correctly

### Hero Section
- [ ] "Build Systems That Work" headline displays correctly
- [ ] "Work" is highlighted in vibrant green
- [ ] Subheadline text is readable
- [ ] "Start a Project" button is visible with green background
- [ ] Button hovers show scale effect
- [ ] Three badge icons (AI, 3D, UX) display below
- [ ] 3D canvas loads on the right side
- [ ] Geometric shapes are visible and draggable (if physics loaded)

### Services Section
- [ ] "What We Build" headline displays
- [ ] Four service cards in 2x2 grid (responsive)
- [ ] Cards show: 01-04 numbers, titles, descriptions
- [ ] Hover effects work (lift, green glow)
- [ ] Clicking card opens modal
- [ ] Modal displays service details
- [ ] Modal has visual placeholder, title, description
- [ ] Impact metric shows in green badge
- [ ] Tech stack chips display
- [ ] "Let's Talk" button works
- [ ] Closing modal (X or backdrop) works

### Contact Section
- [ ] "Let's Design Something That Works" headline displays
- [ ] Form has Name, Email, and Message fields
- [ ] Input fields have proper styling (white bg, green focus ring)
- [ ] "Send Message" button is green
- [ ] Email link displays at bottom
- [ ] Form validates required fields

## 🎨 Visual Design Verification

### Colors
- [ ] Background is white (#FAFAFA)
- [ ] Text is dark slate (#0F172A)
- [ ] Accents are vibrant green (#4ADE80)
- [ ] No black/yellow colors from old design

### Typography
- [ ] Primary text uses Inter font
- [ ] Technical labels use JetBrains Mono (if applicable)
- [ ] Font sizes are appropriate for hierarchy

### Animations
- [ ] Navigation fade-in animation works
- [ ] Hero text animations (fade up) work
- [ ] Service cards animate on scroll
- [ ] Modal open/close animations are smooth
- [ ] Hover effects are responsive (60fps)

## 📱 Responsive Design

### Mobile (375px)
- [ ] Navigation menu button visible
- [ ] Hero switches to single column
- [ ] 3D canvas adjusts size or hides
- [ ] Services cards stack vertically
- [ ] Contact form is full width

### Tablet (768px)
- [ ] Navigation items visible
- [ ] Hero remains split layout
- [ ] Services maintain 2x2 grid
- [ ] All spacing appropriate

### Desktop (1440px)
- [ ] All sections centered with max-width
- [ ] Spacing is generous
- [ ] 3D canvas is large and visible

## ⚡ Performance

- [ ] Initial page load < 3 seconds
- [ ] Animations are smooth (no jank)
- [ ] 3D scene doesn't block main thread
- [ ] Scrolling is smooth
- [ ] No console errors in browser DevTools

## 🐛 Known Issues / Expected Behavior

- 3D canvas uses dynamic import with `ssr: false` (expected)
- Physics shapes may take a moment to initialize
- Some three.js deprecation warnings in console are expected

## 📝 Next Steps

After manual testing, consider:
- [ ] Add form submission API endpoint
- [ ] Optimize 3D scene performance
- [ ] Add more interactive elements
- [ ] Test cross-browser compatibility
- [ ] Run Lighthouse audit
- [ ] Add analytics tracking
