import React, { RefObject, useEffect, useRef, useState } from 'react'
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

import moment from 'moment'
import { WindowHeaderButtons } from '../WindowHeaderButtons'
import clsx from 'clsx'

interface ArticleProps extends IWindowsProps {
    blogInfo: IBloginfo[]
    articlesPlaceholder: IArticlePlacerholder
    articlesRef: RefObject<Element>
}

export const Articles: React.FC<ArticleProps> = ({
    windowIsFocused,
    isExpanded,
    index,
    windowName,
    windowIcon,
    setIsExpanded,
    xaxis,
    yaxis,
    blogInfo,
    positionX,
    positionY,
    setPositionX,
    setPositionY,
    articlesPlaceholder,
    articlesRef,
}) => {
    const {
        dispatch,
        state: { darkMode },
    } = useCtx()

    // opening the medium article when clicking on then article image
    const onClickImgAction = (link: string) => {
        if (typeof window !== 'undefined' && typeof link !== 'undefined') {
            window.open(link, '_blank')
        }
    }

    const { authorIcon, placeholderMessage, publisedAtIcon, placeholderImage } = articlesPlaceholder

    return (
        <>
            <strong className="cursor-move">
                <Header active={windowIsFocused ? true : false}>
                    <div className="flex gap-2">
                        <SanityImg
                            width={20}
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
                {blogInfo?.length > 0 ? (
                    blogInfo.map(
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
                                        <SanityImg
                                            builder={imageUrlBuilder}
                                            image={authorIcon}
                                            alt="Author Icon"
                                            width={20}
                                        />
                                        <p className="text-sm md:text-base">{author}</p>
                                    </div>
                                    <div className="flex gap-2 mb-3">
                                        <SanityImg
                                            builder={imageUrlBuilder}
                                            image={publisedAtIcon}
                                            alt="Published at Icon"
                                            width={20}
                                        />
                                        <p className="text-sm md:text-base">
                                            {moment(pubDate).format('ll')}
                                        </p>
                                    </div>
                                </ArticleContent>
                            </ArticleBody>
                        ),
                    )
                ) : (
                    // WHEN THERE IS NO ARTICLES IN CLIENTS MEDIUM
                    <div className="h-full flex flex-col justify-center items-center gap-5 transform -translate-y-7 w-full">
                        <SanityImg
                            builder={imageUrlBuilder}
                            image={placeholderImage}
                            alt="Ghost image"
                            width={isExpanded ? 380 : 200}
                        />
                        <p className={clsx(' text-center', isExpanded ? 'text-xl' : 'text-lg')}>
                            {placeholderMessage}
                        </p>
                    </div>
                )}
            </ArticleBodyWrapper>
        </>
    )
}
