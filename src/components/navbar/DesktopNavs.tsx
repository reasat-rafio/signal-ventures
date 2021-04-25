import React from 'react'
import { SanityImg } from 'sanity-react-extra'
import { useOrderNavs } from '../../../libs/hooks'
import { useCtx } from '../../../store'
import { CREATE_WINDOW_BOX, TOGGLE_DARK_MODE } from '../../../store/types'
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

    const navbarAction = (
        title: string,
        logo: string,
        key: string,
        dark_mode: number | undefined,
        href?: string,
    ) => {
        if (key != undefined) {
            dispatch({
                type: CREATE_WINDOW_BOX,
                payload: {
                    name: title,
                    icon: logo,
                    key: key,
                },
            })
        } else {
            if (dark_mode == undefined) {
                if (typeof window !== 'undefined' && typeof href !== 'undefined') {
                    document.location.href = href
                }
            } else {
                dispatch({
                    type: TOGGLE_DARK_MODE,
                })
            }
        }
    }

    return (
        <div className="hidden fixed lg:block top-10 left-5 z-20  w-40">
            <div className="flex flex-col justify-center items-center gap-6 ">
                {navigations?.map(({ title, key, logo, dark_mode, href }: Inavs, i: number) => (
                    <div
                        className="flex flex-col justify-center items-center gap-1 cursor-pointer"
                        key={i}
                        onClick={() => navbarAction(title, logo, key, dark_mode, href)}
                    >
                        <SanityImg
                            builder={imageUrlBuilder}
                            image={logo}
                            alt={title + 'logo'}
                            width={40}
                        />
                        <p className="text-white">{title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
