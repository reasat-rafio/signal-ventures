import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { Button } from 'react95'
import { useCtx } from '../../../store'
import { CLOSE_WINDOW_BOX, FOCUS_WINDOW_BOX, MINIMIZE_WINDOW_BOX } from '../../../store/types'
import { WindowWrapper, Header, Body } from '../../styles/Styles'

interface WindowProps {
    index: string
    width: number
}

export const Window_: React.FC<WindowProps> = ({ index, width }) => {
    console.log(width)

    const {
        dispatch,
        state: { focusWindow },
    } = useCtx()

    const [isExpanded, setIsExpanded] = useState(false)
    const [windowIsNotUndefined, setWindowIsNotUndefined] = useState(false)
    const [xaxis, setXaxis] = useState<number>(0)
    const [yaxis, setYaxis] = useState<number>(0)
    const [windowIsFocused, setWindowIsFocused] = useState<boolean>(false)
    const [mdScreenBreakpoint, setMdScreenBreakpoint] = useState<boolean>(false)

    useEffect(() => {
        if (window !== undefined) {
            setWindowIsNotUndefined(true)
        }
    }, [])

    useEffect(() => {
        width >= 992 ? setMdScreenBreakpoint(false) : setMdScreenBreakpoint(true)
    }, [width])

    useEffect(() => {
        focusWindow === index ? setWindowIsFocused(true) : setWindowIsFocused(false)
    }, [focusWindow])

    const draggable = (e: any, data: DraggableData) => {
        setXaxis(data.x)
        setYaxis(data.y)
    }

    if (mdScreenBreakpoint) {
    }

    return (
        <>
            {windowIsNotUndefined && (
                <Draggable
                    onDrag={draggable}
                    onStart={draggable}
                    onStop={draggable}
                    bounds="body"
                    // position={{ x: isExpanded ? 0 : xaxis, y: isExpanded ? 0 : yaxis }}
                    position={{
                        x: mdScreenBreakpoint ? 0 : isExpanded ? 0 : xaxis,
                        y: mdScreenBreakpoint ? 0 : isExpanded ? 0 : yaxis,
                    }}
                >
                    <WindowWrapper
                        windowIsFocused={windowIsFocused}
                        isExpanded={isExpanded}
                        onClick={(e) => dispatch({ type: FOCUS_WINDOW_BOX, payload: index })}
                    >
                        <Header active={windowIsFocused ? true : false}>
                            <strong className="cursor">
                                <div>{focusWindow}</div>
                            </strong>
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
                                    onClick={() =>
                                        dispatch({ type: CLOSE_WINDOW_BOX, payload: index })
                                    }
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
                    </WindowWrapper>
                </Draggable>
            )}
        </>
    )
}
