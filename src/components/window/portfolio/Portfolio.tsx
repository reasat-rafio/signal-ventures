import React, { useRef, RefObject } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { useCtx } from '../../../../store'
import { imageUrlBuilder } from '../../../../utils/sanity'
import { Header, PortfolioBody, PortfolioContentWrapper } from '../../../styles/Styles'

import { WindowHeaderButtons } from '../WindowHeaderButtons'
import clsx from 'clsx'

interface PortfolioProps extends IWindowsProps {
    portfolioItems: IPorfolioItems[]
    portfolioRef: RefObject<Element>
}

export const Portfolio: React.FC<PortfolioProps> = ({
    windowIsFocused,
    isExpanded,
    index,
    windowName,
    windowIcon,
    setIsExpanded,
    xaxis,
    yaxis,
    portfolioItems,
    positionX,
    positionY,
    setPositionX,
    setPositionY,
    portfolioRef,
}) => {
    const {
        state: { darkMode },
    } = useCtx()

    return (
        <>
            <strong className="cursor-move z-20">
                <Header active={windowIsFocused ? true : false}>
                    {windowIcon && (
                        <SanityImg
                            width={20}
                            className="py-1"
                            builder={imageUrlBuilder}
                            image={windowIcon}
                            alt={windowName + 'logo'}
                        />
                    )}

                    <p>{windowName}</p>

                    <WindowHeaderButtons
                        index={index}
                        setIsExpanded={setIsExpanded}
                        windowRef={portfolioRef}
                        xaxis={xaxis}
                        yaxis={yaxis}
                        isExpanded={isExpanded}
                        positionX={positionX}
                        positionY={positionY}
                        setPositionX={setPositionX}
                        setPositionY={setPositionY}
                    />
                </Header>
            </strong>

            <PortfolioContentWrapper isExpanded={isExpanded}>
                <PortfolioBody darkMode={darkMode}>
                    <div className="grid grid-cols-20 justify-evenly items-center  gap-6 py-7">
                        {portfolioItems.map(({ _id, href, logo, title }) => (
                            <a
                                key={_id}
                                className="col-span-10 md:col-span-5 lg:col-span-4 flex flex-col justify-center items-center  gap-1  m-auto "
                                href={href}
                                target="_blank"
                            >
                                <SanityImg
                                    builder={imageUrlBuilder}
                                    image={logo}
                                    alt={'signal ventures logo'}
                                    width={45}
                                />
                                <p
                                    className={clsx(
                                        'text-base text-center',
                                        darkMode ? 'text-gray-200' : 'text-gray-600',
                                    )}
                                >
                                    {title}
                                </p>
                            </a>
                        ))}
                    </div>
                </PortfolioBody>
            </PortfolioContentWrapper>
        </>
    )
}
