module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				deepRed: '#D73232',
				primaryRed: '#EB5757',
				fadedRed: '#FDE5E8',
				primaryOrange: '#E7692B',
				primaryYellow: '#F2C94C',
				fadedOrange: '#FFD6B9',
				primaryGreen: '#219653',
				lightGreen: '#27AE60',
				lightDakOrange: '#F8F5F3',
				veryLightGreen: '#6FCF97',
				fadedGreen: '#D7ECE0',
				primaryBlue: '#2F80ED',
				darktBlue: '#2D9CDB',
				lightBlue: '#56CCF2',
				primaryPurple: '#8F48D3',
				lighterPurple: '#B74EDE',
				lightPurple: '#BB6BD9',
				primaryBlack: '#333333',
				lightBlack: '#4F4F4F',
				fadedBlack: '#828282',
				primaryGray: '#BDBDBD',
				lightGray: '#E0E0E0',
				fadedGray: '#F2F2F2',
				grayBackground: '#F5F4F4',
				propertyBackground: '#FDF8F5',
				propertyInfoBox: '#FFF2EA',
				propertyDetailsBox: '#FCF6F3'
			}
		},
		screens: {
			'sm': '640px',
			// => @media (min-width: 640px) { ... }

			'md': '768px',
			// => @media (min-width: 768px) { ... }

			'mdlg': '1000px',
			// => @media (min-width: 768px) { ... }

			'lg': '1580px',
			// => @media (min-width: 1024px) { ... }

			'xl': '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		},
		fontSize: {
			'xs': '.73rem',
			'sm': '.85rem',
			'tiny': '.83rem',
			'base': '.90rem',
			'lg': '1.0rem',
			'xl': '1.11rem',
			'2xl': '1.2rem',
			'3xl': '1.5rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
			'6xl': '4rem',
			'7xl': '5rem',
		}
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/typography'),
	]
}
