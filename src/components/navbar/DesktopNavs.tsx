import React from 'react'
import { SanityImg } from 'sanity-react-extra'
import { NavAction } from '../../../libs/HelperFunc'
import { useOrderNavs } from '../../../libs/hooks'
import { useCtx } from '../../../store'
import { imageUrlBuilder } from '../../../utils/sanity'

interface DesktopNavsProps {
    navs: Inavs[]
}

export const DesktopNavs: React.FC<DesktopNavsProps> = ({ navs }) => {
    const {
        dispatch,
        state: { darkMode },
    } = useCtx()

    // This will return the ordered navigation accounding to the <dark | light> mode
    const { navigations } = useOrderNavs(navs, darkMode)

    return (
        <div className="hidden fixed lg:block top-10 left-5 z-20  w-16">
            <div className="flex flex-col justify-center items-center gap-6 ">
                {navigations?.map(({ title, key, logo, dark_mode, href }: Inavs, i: number) => (
                    <div
                        className="flex flex-col justify-center items-center gap-1 cursor-pointer"
                        key={i}
                        onClick={() => NavAction(title, logo, key, dark_mode, dispatch, href)}
                    >
                        <SanityImg
                            builder={imageUrlBuilder}
                            image={logo}
                            alt={title + 'logo'}
                            width={40}
                        />
                        <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
