module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            opacity: {
                99: '.99',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
