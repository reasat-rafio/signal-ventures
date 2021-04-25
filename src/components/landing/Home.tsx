import React from 'react'
import { Button } from 'react95'
import { SanityImg } from 'sanity-react-extra'
import { useCtx } from '../../../store'
import { imageUrlBuilder } from '../../../utils/sanity'

export const Home: React.FC<HomeProps> = ({ description, title, lightLogo, darkLogo, button }) => {
    const {
        state: { darkMode },
    } = useCtx()

    return (
        <section
            className={`flex flex-col justify-center items-center transform  h-screen text-white gap-5   px-2 md:px-0 z-10 ${
                darkMode ? '-translate-y-16' : ' -translate-y-5 '
            }`}
        >
            {darkMode ? (
                <SanityImg
                    builder={imageUrlBuilder}
                    image={darkLogo}
                    alt={'signal ventures logo'}
                    width={210}
                    className="transform translate-y-16"
                />
            ) : (
                <SanityImg
                    builder={imageUrlBuilder}
                    image={lightLogo}
                    alt={'signal ventures logo'}
                    width={110}
                />
            )}

            <h1 className="md:text-6xl text-5xl text-center">{title}</h1>
            <p className="text-gray-300 md:text-2xl text-xl  text-center max-w-5xl ">
                {description}
            </p>
            <Button style={{ padding: '5px 30px' }} size="lg">
                {button.title}
            </Button>
        </section>
    )
}
