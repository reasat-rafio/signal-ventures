import { imageUrlBuilder, sanityStaticProps, useSanityQuery } from '../utils/sanity'
import { groq } from 'next-sanity'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { NextSeo } from 'next-seo'
import { withDimensions, SanityImg } from 'sanity-react-extra'
import { SanityProps } from 'next-sanity-extra'
import axios from 'axios'
import { Window_ } from '../components/window/Window'
import { Navbar } from '../components/navbar/Navbar'
import { Home } from '../components/landing/Home'
import { useCtx } from '../store'

const query = groq`{
  "site": *[_id == "site"][0] {
    ...,
    "logo": ${withDimensions('logo')}
  },
  "landingPage": *[_id == "landingPage"][0]
}`

export const getStaticProps: GetStaticProps = async (context) => ({
    props: await sanityStaticProps({ query, context }),
})

export default function Index(props: SanityProps) {
    const {
        data: { site, landingPage },
    } = useSanityQuery(query, props)

    const {
        state: { activeWindows, openWindows },
    } = useCtx()

    return (
        <div
            className="h-screen opacity-99 w-screen overflow-hidden relative"
            style={{ background: '#0E1C3D' }}
        >
            <NextSeo title={landingPage.seo.title} description={landingPage.seo.description} />

            <div className="container mx-auto flex flex-col items-center ">
                <Home />
                {activeWindows.map(({ index }: any) => (
                    <Window_ key={index} index={index} />
                ))}
                <Navbar />
            </div>
        </div>
    )
}
