/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
'./pages/**/*.{js,ts,jsx,tsx,mdx}',
'./components/**/*.
{js,ts,jsx,tsx,mdx}',
'./app/**/*.{js,ts,jsx,tsx,mdx}',
],
theme: {
extend: {
colors: {
primary: '#3b82f6',
secondary: '#06b6d4',
dark: '#0f172a',
},
animation: {
fadeIn: 'fadeIn 0.5s ease-in',
},
keyframes: {
fadeIn: {
'0%': { opacity: '0' },
'100%': { opacity: '1' },
},
},
},
},
plugins: [],
}
