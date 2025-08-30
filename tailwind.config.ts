import type { Config } from 'tailwindcss'
import rtl from 'tailwindcss-rtl'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: { extend: {} },
  plugins: [rtl()],
} satisfies Config
