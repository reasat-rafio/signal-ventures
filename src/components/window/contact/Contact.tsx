import { Button } from 'react95'
import Image from 'next/image'
import React from 'react'
import { SanityImg } from 'sanity-react-extra'
import { useCtx } from '../../../../store'
import { CLOSE_WINDOW_BOX, FOCUS_WINDOW_BOX, MINIMIZE_WINDOW_BOX } from '../../../../store/types'
import { imageUrlBuilder } from '../../../../utils/sanity'
import { Body, Header, ArticelWindowWrapper } from '../../../styles/Styles'
import Draggable from 'react-draggable'

export const Contact: React.FC<IWindowsProps> = ({
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
}) => {
    const { dispatch } = useCtx()
    return (
        <Draggable
            onDrag={draggable}
            onStart={draggable}
            onStop={draggable}
            bounds="body"
            position={{
                x: mdScreenBreakpoint ? 0 : isExpanded ? 0 : xaxis,
                y: mdScreenBreakpoint ? 0 : isExpanded ? 0 : yaxis,
            }}
        >
            <ArticelWindowWrapper
                windowKey={windowKey}
                windowIsFocused={windowIsFocused}
                isExpanded={isExpanded}
                onClick={(e) => dispatch({ type: FOCUS_WINDOW_BOX, payload: index })}
            >
                <Header active={windowIsFocused ? true : false}>
                    <strong className="cursor flex gap-2">
                        <SanityImg
                            className="py-1"
                            builder={imageUrlBuilder}
                            image={windowIcon}
                            alt={windowName + 'logo'}
                        />
                        <p>{windowName}</p>
                    </strong>
                    <div className="flex justify-end flex-1">
                        <Button
                            size="sm"
                            onClick={() => dispatch({ type: MINIMIZE_WINDOW_BOX, payload: index })}
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

                <Body isExpanded={isExpanded}>Demo Body</Body>
            </ArticelWindowWrapper>
        </Draggable>
    )
}
