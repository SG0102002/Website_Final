import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			// Clean minimal color scheme - White and Green only
  			'radixs-bg': '#FFFFFF',
  			'radixs-surface': '#FFFFFF',
  			'radixs-text': '#1A1A1A',
  			'radixs-text-muted': '#666666',
  			'radixs-border': '#E5E5E5',
  			'radixs-green': '#2C5F4E',
  			'radixs-green-hover': '#234A3D',
  			// All colors now use GREEN for consistency
  			vibrant: {
  				white: '#FFFFFF',
  				green: {
  					DEFAULT: '#2C5F4E',
  					dark: '#234A3D',
  					light: '#3C7A64',
  					glow: 'rgba(44, 95, 78, 0.2)'
  				},
  				terracotta: {
  					DEFAULT: '#2C5F4E',
  					dark: '#234A3D',
  					light: '#3C7A64',
  					accent: '#2C5F4E',
  					glow: 'rgba(44, 95, 78, 0.2)'
  				},
  				purple: {
  					DEFAULT: '#2C5F4E',
  					dark: '#234A3D',
  					light: '#3C7A64',
  					glow: 'rgba(44, 95, 78, 0.2)'
  				},
  				bronze: {
  					DEFAULT: '#2C5F4E',
  					dark: '#234A3D',
  					light: '#3C7A64',
  					glow: 'rgba(44, 95, 78, 0.2)'
  				},
  				amber: {
  					DEFAULT: '#2C5F4E',
  					dark: '#234A3D',
  					light: '#3C7A64',
  					gold: '#2C5F4E'
  				},
  				slate: '#1A1A1A',
  				dark: {
  					DEFAULT: '#1A1A1A',
  					alt: '#1A1A1A'
  				}
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
  			mono: ['var(--font-jetbrains-mono)', 'monospace']
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
