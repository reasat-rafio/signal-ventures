import React, { Dispatch, RefObject, SetStateAction, useEffect } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { useCtx } from '../../../../store'
import { imageUrlBuilder, PortableText } from '../../../../utils/sanity'
import { Header, PortfolioContentWrapper } from '../../../styles/Styles'
import { WindowHeaderButtons } from '../WindowHeaderButtons'
import { Button } from 'react95'
import clsx from 'clsx'

interface SubPortfolioProps extends IWindowsProps {
    subPortfolioRef: RefObject<Element>
    mdScreenBreakpoint: boolean
    setWindowIsFocused: Dispatch<SetStateAction<boolean>>
    portfolioActionButton: string
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
    setWindowIsFocused,
    portfolioActionButton,
}) => {
    const {
        state: { subPortfolio, darkMode },
    } = useCtx()

    useEffect(() => {
        setWindowIsFocused(true)
    }, [subPortfolio])

    const { logo, title, href, projectDescription, projectTitle, ctaButton } = subPortfolio

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
                <div className="flex flex-col h-full">
                    <div className="flex-1">
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

                    <div
                        className="flex justify-center items-center gap-5 mb-14"
                        style={{ margin: '0 0 3.5rem 0' }}
                    >
                        {portfolioActionButton && (
                            <a href={href} target="_blank">
                                <Button size="sm" style={{ fontSize: '15px' }}>
                                    {portfolioActionButton}
                                </Button>
                            </a>
                        )}

                        {ctaButton && (
                            <a href={ctaButton.href} target="_blank">
                                <Button size="sm" style={{ fontSize: '15px' }}>
                                    {ctaButton.title}
                                </Button>
                            </a>
                        )}
                    </div>
                </div>
            </PortfolioContentWrapper>
        </>
    )
}
