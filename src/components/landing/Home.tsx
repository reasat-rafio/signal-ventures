import clsx from 'clsx'
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
        <section className="flex flex-col justify-center items-center transform h-screen space-y-5 px-2 md:px-0 z-10 -translate-y-12">
            <SanityImg
                builder={imageUrlBuilder}
                image={darkMode ? darkLogo : lightLogo}
                alt={'signal ventures logo'}
                width={200}
                className="w-64 h-64 object-center"
            />
            <h1
                className={clsx(
                    'md:text-6xl text-5xl font-header text-center transition-colors duration-300',
                    darkMode ? 'text-white' : 'text-black',
                )}
            >
                {title}
            </h1>
            <p
                className={clsx(
                    'md:text-2xl text-xl  text-center max-w-5xl transition-colors duration-300',
                    darkMode ? 'text-gray-300' : 'text-gray-800',
                )}
            >
                {description}
            </p>
            <Button style={{ padding: '5px 30px' }} size="lg">
                {button.title}
            </Button>
        </section>
    )
}
