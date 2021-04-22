import React from 'react'
import { Button } from 'react95'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from '../../../utils/sanity'

export const Home: React.FC<HomeProps> = ({ description, title, logo, button }) => {
    return (
        <section className="flex flex-col justify-center items-center transform  -translate-y-5  h-screen text-white gap-5  px-2 md:px-0 z-10">
            <SanityImg
                builder={imageUrlBuilder}
                image={logo}
                alt={'signal ventures logo'}
                height={124}
                width={110}
            />
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
