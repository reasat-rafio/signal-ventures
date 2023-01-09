import { NextStudio } from 'next-sanity/studio'
import config from '../../../studio/sanity.config'
import Head from 'next/head'
import { NextStudioHead } from 'next-sanity/studio/head'

export default function StudioPage() {
    return (
        <div>
            <Head>
                <NextStudioHead />
            </Head>
            <NextStudio config={config} />
        </div>
    )
}
