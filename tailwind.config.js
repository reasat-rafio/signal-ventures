module.exports = {
    purge: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            opacity: {
                99: '.99',
            },
            gridTemplateColumns: {
                20: 'repeat(20, minmax(0, 1fr))',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
