import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { useToText } from '../../../libs/hooks'
import { useCtx } from '../../../store'
import { Articles } from './articles/Articles'
import { Contact } from './contact/Contact'
import { Portfolio } from './portfolio/Portfolio'
import {
    ArticelWindowWrapper,
    ContactWindowsWrapper,
    PorfolioWindowWrapper,
} from '../../styles/Styles'
import { FOCUS_WINDOW_BOX } from '../../../store/types'

export const Window_: React.FC<WindowProps> = ({
    index,
    width,
    blogItems,
    blogFeeds,
    portfolioItems,
    contact,
    navs,
    articlesPlaceholder,
}) => {
    const {
        dispatch,
        state: { focusWindow, activeWindows },
    } = useCtx()
    // State to find out this window is expanded or not
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [windowIsNotUndefined, setWindowIsNotUndefined] = useState<boolean>(false)

    // X and Y axis of the window when its draggable
    const [xaxis, setXaxis] = useState<number>(0)
    const [yaxis, setYaxis] = useState<number>(0)

    // This two state will keep the x and y value of the window position right before it expended
    const [positionX, setPositionX] = useState<number>(0)
    const [positionY, setPositionY] = useState<number>(0)

    //Window that is focused right now | clicked (for stylings and setting the window header active)
    const [windowIsFocused, setWindowIsFocused] = useState<boolean>(false)

    // Md screen (992) or less breakpoint (for stylings)
    const [mdScreenBreakpoint, setMdScreenBreakpoint] = useState<boolean>(false)

    // THIS windows name icon and key
    const [windowName, setWindowName] = useState<string>('')
    const [windowIcon, setWindowIcon] = useState<Logo | undefined>()
    const [windowKey, setWindowKey] = useState<string>('')

    const findWindowDetails = (key: string) => {
        // Finding THIS windows info from global store by key and setting them to state
        const findWinFromStore: WindowsProps[] = activeWindows.filter((i) => i.key == key)
        const findWin = navs.filter(({ key }) => key == findWinFromStore[0].key)
        setWindowName(findWin[0].title)
        setWindowIcon(findWin[0].logo)
        setWindowKey(findWin[0].key)
    }

    // This will return an array of all the blogs from clients medium
    const { blogInfo } = useToText(blogItems, blogFeeds, width, isExpanded)

    useEffect(() => {
        if (window !== undefined) {
            setWindowIsNotUndefined(true)
        }
        // This will find the info of THIS window and set it in the states
        switch (index) {
            case 'articles':
                findWindowDetails('articles')
                break
            case 'portfolio':
                findWindowDetails('portfolio')
                break
            case 'contact':
                findWindowDetails('contact')
                break
            default:
                setWindowName('...')
                break
        }
    }, [activeWindows, navs])

    useEffect(() => {
        width >= 992 ? setMdScreenBreakpoint(false) : setMdScreenBreakpoint(true)
    }, [width])

    useEffect(() => {
        focusWindow === index ? setWindowIsFocused(true) : setWindowIsFocused(false)
    }, [focusWindow])

    // This will set the window X and Y axis to state
    const draggable = (e, data: DraggableData) => {
        setXaxis(data.x)
        setYaxis(data.y)
    }

    const props = {
        windowIsFocused,
        isExpanded,
        index,
        windowName,
        windowIcon,
        setIsExpanded,
        xaxis,
        yaxis,
        positionX,
        positionY,
        setPositionX,
        setPositionY,
    }

    const draggableProps = {
        handle: 'strong',
        onDrag: draggable,
        onStart: draggable,
        onStop: draggable,
        bounds: 'body',
        position: {
            x: mdScreenBreakpoint ? 0 : isExpanded ? positionX : xaxis,
            y: mdScreenBreakpoint ? 0 : isExpanded ? positionY : yaxis,
        },
    }

    const portfolioRef = useRef<HTMLDivElement | null>(null)
    const contactRef = useRef<HTMLDivElement | null>(null)
    const articlesRef = useRef<HTMLDivElement | null>(null)

    return (
        <>
            {windowIsNotUndefined && windowKey === 'portfolio' && (
                <Draggable
                    {...draggableProps}
                    disabled={mdScreenBreakpoint || isExpanded ? true : false}
                >
                    <PorfolioWindowWrapper
                        ref={portfolioRef}
                        windowKey={windowKey}
                        windowIsFocused={windowIsFocused}
                        isExpanded={isExpanded}
                        onClick={(e) => {
                            dispatch({ type: FOCUS_WINDOW_BOX, payload: index })
                        }}
                    >
                        <Portfolio
                            {...props}
                            portfolioItems={portfolioItems}
                            portfolioRef={portfolioRef}
                        />
                    </PorfolioWindowWrapper>
                </Draggable>
            )}

            {windowIsNotUndefined && windowKey === 'contact' && (
                <Draggable {...draggableProps} disabled={mdScreenBreakpoint ? true : false}>
                    <ContactWindowsWrapper
                        ref={contactRef}
                        windowIsFocused={windowIsFocused}
                        isExpanded={isExpanded}
                        onClick={(e) => dispatch({ type: FOCUS_WINDOW_BOX, payload: index })}
                    >
                        <Contact {...props} contact={contact} contactRef={contactRef} />
                    </ContactWindowsWrapper>
                </Draggable>
            )}
            {/*  */}
            {windowIsNotUndefined && windowKey === 'articles' && (
                <Draggable {...draggableProps} disabled={mdScreenBreakpoint ? true : false}>
                    <ArticelWindowWrapper
                        windowIsFocused={windowIsFocused}
                        isExpanded={isExpanded}
                        ref={articlesRef}
                        onClick={(e) => dispatch({ type: FOCUS_WINDOW_BOX, payload: index })}
                    >
                        <Articles
                            {...props}
                            blogInfo={blogInfo}
                            articlesPlaceholder={articlesPlaceholder}
                            articlesRef={articlesRef}
                        />
                    </ArticelWindowWrapper>
                </Draggable>
            )}
        </>
    )
}
