import Image from 'next/image'
import React from 'react'
import { Button } from 'react95'

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    return (
        <section className="flex flex-col justify-center items-center transform  -translate-y-5  h-screen text-white gap-5 z-0">
            <Image
                src="/img/static/logo.png"
                height="124"
                width="110"
                layout="intrinsic"
                alt="signal ventures logo"
            />
            <h1 className="text-6xl">SIGNAL VENTURES</h1>
            <p className="text-gray-300 text-2xl text-center max-w-5xl">
                Signal Ventures is an investment firm specializing on technology in emerging
                cryptocurrencies. We invest in early stage blockchain startups and decentralized
                protocols.
            </p>
            <Button style={{ padding: '5px 30px' }} size="lg">
                Read More
            </Button>
        </section>
    )
}
