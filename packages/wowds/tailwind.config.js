const { palette, color } = require('./dist/tokens/color')
const { space } = require('./dist/tokens/space')
const { typography, fontWeight, fontFamily } = require('./dist/tokens/typography')

const fontSizes = Object.entries(typography).reduce((acc, [key, value]) => {
  acc[key] = [
    value.fontSize,
    {
      lineHeight: value.lineHeight,
      letterSpacing: value.letterSpacing,
    },
  ]
  return acc
}, {})

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./ui/**/*.{ts,tsx}', './index.ts'],
  theme: {
    extend: {
      colors: {
        ...palette,
        ...color,
      },
      spacing: { ...space },
      fontFamily: { ...fontFamily },
      fontWeight: { ...fontWeight },
      fontSize: fontSizes,
    },
  },
  plugins: [],
}
