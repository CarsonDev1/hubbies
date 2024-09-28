/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'button-color': '#944B08',
				'primary-color': '#FFD583',
				'second-color': '#442101',
			},
			keyframes: {
				paging: {
					'0%': { transform: 'rotateY(0deg) skewY(0deg)' },
					'50%': { transform: 'rotateY(90deg) skewY(-20deg)' },
					'100%': { transform: 'rotateY(180deg) skewY(0deg)' },
				},
			},
			animation: {
				paging: 'paging 0.5s linear infinite',
			},
		},
	},
	plugins: [],
};
