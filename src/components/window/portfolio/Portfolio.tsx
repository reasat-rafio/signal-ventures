import React, { useRef, RefObject, Dispatch, SetStateAction } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { useCtx } from '../../../../store'
import { imageUrlBuilder } from '../../../../utils/sanity'
import { Header, PortfolioBody, PortfolioContentWrapper } from '../../../styles/Styles'
import { WindowHeaderButtons } from '../WindowHeaderButtons'
import clsx from 'clsx'
import { CREATE_WINDOW_BOX, SUB_PORTFOLIO_DATA, TOGGLE_DARK_MODE } from '../../../../store/types'

interface PortfolioProps extends IWindowsProps {
    portfolioItems: IPorfolioItems[]
    portfolioRef: RefObject<Element>
    mdScreenBreakpoint: boolean
    setWindowIsFocused: Dispatch<SetStateAction<boolean>>
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
    mdScreenBreakpoint,
    setWindowIsFocused,
}) => {
    const {
        state: { darkMode, subPortfolio },
        dispatch,
    } = useCtx()

    const navAction = (
        key: string,
        logo: Logo,
        title: string,
        href: string,
        projectDescription: ProjectDescription[],
        projectTitle: string,
        ctaButton: CtaButton,
    ) => {
        dispatch({
            type: CREATE_WINDOW_BOX,
            payload: {
                key: key,
            },
        }),
            dispatch({
                type: SUB_PORTFOLIO_DATA,
                payload: {
                    logo,
                    title,
                    key: 'sub',
                    href,
                    projectDescription,
                    projectTitle,
                    ctaButton,
                },
            })
    }
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
            <PortfolioContentWrapper
                isExpanded={isExpanded}
                mdScreenBreakpoint={mdScreenBreakpoint}
                darkMode={darkMode}
            >
                <div className="grid grid-cols-20 justify-center items-center h-full  gap-6  ">
                    {portfolioItems.map(
                        ({
                            _id,
                            href,
                            logo,
                            title,
                            projectDescription,
                            projectTitle,
                            ctaButton,
                        }) => (
                            <div
                                key={_id}
                                className="col-span-10 md:col-span-5 lg:col-span-4 flex flex-col justify-center items-center gap-1 m-auto mx-2 "
                                onClick={() => {
                                    if (projectDescription && projectTitle) {
                                        setWindowIsFocused(false)
                                        navAction(
                                            'sub',
                                            logo,
                                            title,
                                            href,
                                            projectDescription,
                                            projectTitle,
                                            ctaButton,
                                        )
                                    } else {
                                        if (window) {
                                            window.open(href, '_blank')
                                        }
                                    }
                                }}
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
                            </div>
                        ),
                    )}
                </div>
            </PortfolioContentWrapper>
        </>
    )
}
