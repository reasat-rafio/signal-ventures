import React, { RefObject } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { useCtx } from '../../../../store'
import { imageUrlBuilder, PortableText } from '../../../../utils/sanity'
import { Header, PortfolioContentWrapper } from '../../../styles/Styles'
import { WindowHeaderButtons } from '../WindowHeaderButtons'
import { Button } from 'react95'
import clsx from 'clsx'
import { marksSerializer, typesSerializer } from '../../../libs/blockContent'

interface SubPortfolioProps extends IWindowsProps {
    subPortfolioRef: RefObject<Element>
    mdScreenBreakpoint: boolean
}

export const SubPortfolio: React.FC<SubPortfolioProps> = ({
    windowIsFocused,
    isExpanded,
    index,
    setIsExpanded,
    xaxis,
    yaxis,
    positionX,
    positionY,
    setPositionX,
    setPositionY,
    subPortfolioRef,
    mdScreenBreakpoint,
}) => {
    const {
        state: {
            subPortfolio: { logo, title, href, projectDescription, projectTitle },
            darkMode,
        },
    } = useCtx()
    return (
        <>
            <strong className="cursor-move z-20">
                <Header active={windowIsFocused ? true : false}>
                    {logo && (
                        <SanityImg
                            width={20}
                            className="py-1"
                            builder={imageUrlBuilder}
                            image={logo}
                            alt={title + ' logo'}
                        />
                    )}

                    <p className="mx-1">{title}</p>

                    <WindowHeaderButtons
                        index={index}
                        setIsExpanded={setIsExpanded}
                        windowRef={subPortfolioRef}
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
            <PortfolioContentWrapper
                isExpanded={isExpanded}
                mdScreenBreakpoint={mdScreenBreakpoint}
                darkMode={darkMode}
            >
                <div className="bg-red-600h-full">
                    <div>
                        <h5 className="text-center font-semibold text-xl">{projectTitle}</h5>
                        <div className="break-normal ">
                            <PortableText
                                blocks={projectDescription}
                                className={clsx(
                                    ' my-4  h-full',
                                    darkMode ? 'text-gray-200' : 'text-gray-600',
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-2">
                        <a href={href} target="_blank">
                            <Button size="sm" style={{ fontSize: '15px' }}>
                                GO TO SITE
                            </Button>
                        </a>
                        <Button size="sm" style={{ fontSize: '15px' }}>
                            READ MORE
                        </Button>
                    </div>
                </div>
            </PortfolioContentWrapper>
        </>
    )
}
