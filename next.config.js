const STUDIO_REWRITE = {
    source: '/studio/:path*',
    destination:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3333/studio/:path*'
            : '/studio/index.html',
}

module.exports = {
    rewrites: () => [STUDIO_REWRITE],
    future: {
        webpack5: true,
    },
}

const withFonts = require('next-fonts')
const withTM = require('next-transpile-modules')(['@react95/core'])

module.exports = withTM(withFonts())
