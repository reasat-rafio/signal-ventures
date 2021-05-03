import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { useCtx } from '../../../../store'
import { FOCUS_WINDOW_BOX } from '../../../../store/types'
import { imageUrlBuilder } from '../../../../utils/sanity'
import {
    ArticelWindowWrapper,
    ArticleAvatar,
    ArticleBody,
    ArticleContent,
    ArticleImg,
    ArticleBodyWrapper,
    Header,
} from '../../../styles/Styles'
import Draggable from 'react-draggable'
import moment from 'moment'
import { WindowHeaderButtons } from '../WindowHeaderButtons'
import clsx from 'clsx'

interface ArticleProps extends IWindowsProps {
    blogInfo: IBloginfo[]
}

export const Articles: React.FC<ArticleProps> = ({
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
    blogInfo,
    positionX,
    positionY,
    setPositionX,
    setPositionY,
}) => {
    const {
        dispatch,
        state: { darkMode },
    } = useCtx()

    const articlesRef = useRef<HTMLDivElement | null>(null)

    // opening the medium article when clicking on then article image
    const onClickImgAction = (link: string) => {
        if (typeof window !== 'undefined' && typeof link !== 'undefined') {
            window.open(link, '_blank')
        }
    }

    return (
        <Draggable
            handle={isExpanded ? 'legend' : 'strong'} // couldnt find any solution to disable the dragging so using legend for handle when the window is expanded. (legend doesn't exist here)
            onDrag={draggable}
            onStart={draggable}
            onStop={draggable}
            bounds="body"
            position={{
                x: mdScreenBreakpoint ? 0 : isExpanded ? positionX : xaxis,
                y: mdScreenBreakpoint ? 0 : isExpanded ? positionY : yaxis,
            }}
        >
            <ArticelWindowWrapper
                windowIsFocused={windowIsFocused}
                isExpanded={isExpanded}
                ref={articlesRef}
                onClick={(e) => dispatch({ type: FOCUS_WINDOW_BOX, payload: index })}
            >
                <strong className="cursor-move">
                    <Header active={windowIsFocused ? true : false}>
                        <div className="flex gap-2">
                            <SanityImg
                                className="py-1"
                                builder={imageUrlBuilder}
                                image={windowIcon}
                                alt={windowName + 'logo'}
                            />
                            <p>{windowName}</p>
                        </div>
                        <WindowHeaderButtons
                            index={index}
                            setIsExpanded={setIsExpanded}
                            windowRef={articlesRef}
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

                <ArticleBodyWrapper>
                    {blogInfo.map(
                        (
                            { thumbnail, title, link, pubDate, image, author, content },
                            index: number,
                        ) => (
                            <ArticleBody key={index}>
                                <ArticleImg
                                    thumbnail={thumbnail}
                                    onClick={() => onClickImgAction(link)}
                                >
                                    <ArticleAvatar size={60} src={image} />
                                </ArticleImg>

                                <ArticleContent darkMode={darkMode}>
                                    <h3 className="md:text-2xl text-xl font-bold my-2">{title}</h3>
                                    <p
                                        className={clsx(
                                            'md:text-lg text-base transition-colors duration-300',
                                            darkMode ? 'text-gray-200' : 'text-gray-600',
                                        )}
                                    >
                                        {content}{' '}
                                        <a
                                            className="text-blue-500 md:text-lg text-base"
                                            href={link}
                                            target="_blank"
                                        >
                                            [Read more...]
                                        </a>
                                    </p>
                                    <div className="flex gap-2 mt-3">
                                        <Image
                                            src="/img/static/person.png"
                                            layout="intrinsic"
                                            height="20"
                                            width="20"
                                            alt="date icon"
                                        />
                                        <p className="text-sm md:text-base">{author}</p>
                                    </div>
                                    <div className="flex gap-2 mb-3">
                                        <Image
                                            src="/img/static/date.png"
                                            layout="intrinsic"
                                            height="20"
                                            width="20"
                                            alt="date icon"
                                        />
                                        <p className="text-sm md:text-base">
                                            {moment(pubDate).format('ll')}
                                        </p>
                                    </div>
                                </ArticleContent>
                            </ArticleBody>
                        ),
                    )}
                </ArticleBodyWrapper>
            </ArticelWindowWrapper>
        </Draggable>
    )
}
