interface SectionTransitionProps {
  from: 'light' | 'dark'
  to: 'light' | 'dark'
}

export function SectionTransition({ from, to }: SectionTransitionProps) {
  const gradients = {
    'light-to-dark': 'bg-gradient-to-b from-white via-purple-50 via-slate-200 via-slate-400 to-vibrant-dark',
    'dark-to-light': 'bg-gradient-to-b from-vibrant-dark via-slate-400 via-slate-200 via-purple-50 to-white',
    'light-to-light': 'bg-transparent',
    'dark-to-dark': 'bg-transparent'
  }

  const key = `${from}-to-${to}` as keyof typeof gradients

  return <div className={`h-48 md:h-64 ${gradients[key]}`} />
}
