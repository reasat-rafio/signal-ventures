import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Button } from 'react95'
import { SanityImg } from 'sanity-react-extra'
import { NavAction } from '../../../libs/HelperFunc'
import { useCtx } from '../../../store'
import { imageUrlBuilder } from '../../../utils/sanity'

export const Home: React.FC<HomeProps> = ({
    description,
    title,
    lightLogo,
    darkLogo,
    button,
    navs,
}) => {
    const {
        state: { darkMode },
        dispatch,
    } = useCtx()

    const portfolio = navs.filter(({ key }) => key === 'portfolio')
    const { logo, key, dark_mode, href } = portfolio[0]

    return (
        <section className="flex flex-col justify-center items-center transform h-screen  px-2 md:px-0 z-10 -translate-y-9 lg:-translate-y-28">
            <SanityImg
                builder={imageUrlBuilder}
                image={darkMode ? darkLogo : lightLogo}
                alt={'signal ventures logo'}
                width={200}
                className="w-44 h-44 md:w-56 md:h-56 object-center"
            />
            <h1
                className={clsx(
                    'md:text-big text-3xl font-header text-center transition-colors duration-300 mb-7',
                    darkMode ? 'text-white' : 'text-black',
                )}
            >
                {title}
            </h1>
            <p
                className={clsx(
                    'md:text-2xl text-xl  text-center max-w-5xl transition-colors duration-300 mb-7',
                    darkMode ? 'text-gray-300' : 'text-gray-800',
                )}
            >
                {description}
            </p>
            <Button
                style={{ padding: '5px 30px' }}
                size="lg"
                onClick={() => NavAction(portfolio[0].title, logo, key, dark_mode, dispatch, href)}
            >
                {button.title}
            </Button>
        </section>
    )
}
