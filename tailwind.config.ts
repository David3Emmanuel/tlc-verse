import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.tsx',
    './app/**/*.tsx',
  ],
  theme: {
    extend: {
      screens: {
        'form': '500px',
      },
    },
  },
  plugins: [],
}
export default config
