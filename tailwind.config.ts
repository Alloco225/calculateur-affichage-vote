import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	darkMode: ["class"],
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				// --- BASE COLORS (Updated for Palette) ---
				// Using the recommended off-white for main background
				background: "hsl(var(--background))", // F5F8FA (200 23% 97%)
				// Using the Dark Blue for main text/foreground
				foreground: "hsl(var(--foreground))", // 0E294A (215 69% 17%)
				// Using Light Gray for borders
				border: "hsl(var(--border))", // CCD4DA (206 19% 83%)
				// Using Pure White for cards/popovers to "pop" off the background
				card: {
					DEFAULT: "hsl(var(--card))", // FFFFFF (0 0% 100%)
					foreground: "hsl(var(--foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--foreground))",
				},
				// Using the Medium Blue as Primary
				primary: {
					DEFAULT: "hsl(var(--primary))", // 194B8A (215 69% 32%)
					foreground: "hsl(var(--primary-foreground))", // White text on dark primary
				},
				// New Custom Dark Primary for deeper accents/hover
				"primary-dark": {
					DEFAULT: "hsl(var(--primary-dark))", // 0E294A (215 69% 17%)
				},
				// Secondary text/captions
				muted: {
					DEFAULT: "hsl(var(--muted))", // 5A6772 (210 13% 40%)
					foreground: "hsl(var(--muted-foreground))",
				},
				// Feedback colors
				destructive: {
					DEFAULT: "hsl(var(--destructive))", // D93025 (4 70% 50%)
					foreground: "hsl(var(--destructive-foreground))",
				},
				// New Success color
				success: {
					DEFAULT: "hsl(var(--success))", // 3B9C52 (136 46% 42%)
					foreground: "hsl(var(--success-foreground))",
				},
				// --- EXISTING PLACEHOLDERS ---
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				// --- EXISTING CUSTOM COLORS ---
				canvas: {
					DEFAULT: "hsl(var(--canvas-bg))",
				},
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			// --- TYPOGRAPHY (NEW) ---
			fontFamily: {
				// Michroma for a modern, hi-tech, and clean look (Headings, Buttons)
				sans: ["var(--font-michroma)", ...fontFamily.sans],
				// Open Sans for high readability and a trustworthy feel (Body Text)
				body: ["var(--font-open-sans)", ...fontFamily.sans],
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
				"bar-grow": {
					from: {
						height: "0%",
					},
					to: {
						height: "var(--bar-height)",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"bar-grow": "bar-grow 0.8s ease-out forwards",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
