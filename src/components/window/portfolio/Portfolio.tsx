import { Button, TabBody } from 'react95'
import Image from 'next/image'
import React from 'react'
import { SanityImg } from 'sanity-react-extra'
import { useCtx } from '../../../../store'
import { CLOSE_WINDOW_BOX, FOCUS_WINDOW_BOX, MINIMIZE_WINDOW_BOX } from '../../../../store/types'
import { imageUrlBuilder } from '../../../../utils/sanity'
import {
    Header,
    PorfolioWindowWrapper,
    PortfolioBody,
    Body,
    PortfolioContentWrapper,
} from '../../../styles/Styles'
import Draggable from 'react-draggable'

interface PortfolioProps extends IWindowsProps {
    portfolioItems: any
}

export const Portfolio: React.FC<PortfolioProps> = ({
    windowKey,
    windowIsFocused,
    isExpanded,
    index,
    windowName,
    windowIcon,
    setIsExpanded,
    draggable,
    mdScreenBreakpoint,
    xaxis,
    yaxis,
    portfolioItems,
}) => {
    const { dispatch } = useCtx()

    return (
        <Draggable
            handle="strong"
            onDrag={draggable}
            onStart={draggable}
            onStop={draggable}
            bounds="body"
            position={{
                x: mdScreenBreakpoint ? 0 : isExpanded ? 0 : xaxis,
                y: mdScreenBreakpoint ? 0 : isExpanded ? 0 : yaxis,
            }}
        >
            <PorfolioWindowWrapper
                windowKey={windowKey}
                windowIsFocused={windowIsFocused}
                isExpanded={isExpanded}
                onClick={(e) => dispatch({ type: FOCUS_WINDOW_BOX, payload: index })}
            >
                <strong className="cursor-move">
                    <Header active={windowIsFocused ? true : false}>
                        <SanityImg
                            className="py-1"
                            builder={imageUrlBuilder}
                            image={windowIcon}
                            alt={windowName + 'logo'}
                        />
                        <p>{windowName}</p>

                        <div className="flex justify-end flex-1">
                            <Button
                                size="sm"
                                onClick={() =>
                                    dispatch({ type: MINIMIZE_WINDOW_BOX, payload: index })
                                }
                            >
                                <Image
                                    src="/img/static/close.png"
                                    layout="intrinsic"
                                    width="27%"
                                    height="27%"
                                    alt="minimize"
                                />
                            </Button>
                            <Button size="sm" onClick={() => setIsExpanded((prev) => !prev)}>
                                <Image
                                    src="/img/static/maximize.png"
                                    layout="intrinsic"
                                    width="18"
                                    height="18"
                                    alt="maximize"
                                />
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => dispatch({ type: CLOSE_WINDOW_BOX, payload: index })}
                            >
                                <Image
                                    src="/img/static/cross.png"
                                    layout="intrinsic"
                                    width="30%"
                                    height="27%"
                                    alt="close"
                                />
                            </Button>
                        </div>
                    </Header>
                </strong>

                <PortfolioContentWrapper isExpanded={isExpanded}>
                    <PortfolioBody>
                        <div className="grid grid-cols-20 justify-center items-center my-9 h-full">
                            {portfolioItems.map(({ _id, href, logo, title }) => (
                                <a
                                    key={_id}
                                    className="col-span-10 md:col-span-5 lg:col-span-4 flex flex-col justify-center items-center  gap-3 "
                                    href={href}
                                >
                                    <SanityImg
                                        builder={imageUrlBuilder}
                                        image={logo}
                                        alt={'signal ventures logo'}
                                        width={45}
                                    />
                                    <p className="text-base">{title}</p>
                                </a>
                            ))}
                        </div>
                    </PortfolioBody>
                </PortfolioContentWrapper>
            </PorfolioWindowWrapper>
        </Draggable>
    )
}
