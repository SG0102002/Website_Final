interface SectionTransitionProps {
  from: 'light' | 'dark'
  to: 'light' | 'dark'
}

export function SectionTransition({ from, to }: SectionTransitionProps) {
  // Minimal transitions - just white and green
  const getGradient = () => {
    if (from === 'light' && to === 'dark') {
      return { background: 'linear-gradient(to bottom, #FFFFFF, #2C5F4E)' }
    }
    if (from === 'dark' && to === 'light') {
      return { background: 'linear-gradient(to bottom, #2C5F4E, #FFFFFF)' }
    }
    return { background: 'transparent' }
  }

  return <div className="h-48 md:h-64" style={getGradient()} />
}
