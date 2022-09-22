/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                'Poppins': ['Poppins', 'sans-serif'],
            }
        }
    },
    plugins: [
        plugin(({ addBase, theme }) => {
            addBase({
                '.scrollbar': {
                    overflowY: 'auto',
                    scrollbarColor: `${theme('colors.blue.600')} ${theme('colors.blue.200')}`,
                    scrollbarWidth: 'thin',
                },
                '.scrollbar::-webkit-scrollbar': {
                    height: '2px',
                    width: '2px',
                },
                '.scrollbar::-webkit-scrollbar-thumb': {
                    backgroundColor: theme('colors.blue.600'),
                },
                '.scrollbar::-webkit-scrollbar-track-piece': {
                    backgroundColor: theme('colors.blue.200'),
                },
            });
        }),
    ]
};
