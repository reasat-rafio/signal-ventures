const STUDIO_REWRITE = {
    source: '/studio/:path*',
    destination:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3333/studio/:path*'
            : '/studio/index.html',
}

const config = {
    // rewrites: () => [STUDIO_REWRITE],
    i18n: {
        locales: ['en-SG', 'zh-SG'],
        defaultLocale: 'en-SG',
    },
    output: 'standalone',
    // future: {
    //     webpack5: true,
    // },
}

// const withFonts = require('next-fonts')
// const withTM = require('next-transpile-modules')(['@react95/core'])

module.exports = config
