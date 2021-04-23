import React, { useEffect, useRef, useState } from 'react'
import { useCtx } from '../../../store'
import { Articles } from './articles/Articles'
import { Contact } from './contact/Contact'
import { Portfolio } from './portfolio/Portfolio'

interface WindowProps {
    index: string
    width: number
    blogInfo: any
    portfolioItems: any
}

export const Window_: React.FC<WindowProps> = ({ index, width, blogInfo, portfolioItems }) => {
    const {
        dispatch,
        state: { focusWindow, activeWindows },
    } = useCtx()

    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [windowIsNotUndefined, setWindowIsNotUndefined] = useState<boolean>(false)
    const [xaxis, setXaxis] = useState<number>(0)
    const [yaxis, setYaxis] = useState<number>(0)
    const [windowIsFocused, setWindowIsFocused] = useState<boolean>(false)
    const [mdScreenBreakpoint, setMdScreenBreakpoint] = useState<boolean>(false)
    const [windowName, setWindowName] = useState<string>('')
    const [windowIcon, setWindowIcon] = useState<string>('')
    const [windowKey, setWindowKey] = useState<string>('')

    const findWindowDetails = (key: string) => {
        const findWin: WindowsProps[] = activeWindows.filter((i) => i.key == key)
        setWindowName(findWin[0].name)
        setWindowIcon(findWin[0].icon)
        setWindowKey(findWin[0].key)
    }

    useEffect(() => {
        if (window !== undefined) {
            setWindowIsNotUndefined(true)
        }
        switch (index) {
            case 'article':
                findWindowDetails('article')
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
    }, [])

    useEffect(() => {
        width >= 992 ? setMdScreenBreakpoint(false) : setMdScreenBreakpoint(true)
    }, [width])

    useEffect(() => {
        focusWindow === index ? setWindowIsFocused(true) : setWindowIsFocused(false)
    }, [focusWindow])

    const draggable = (e, data: DraggableData) => {
        setXaxis(data.x)
        setYaxis(data.y)
    }

    const props = {
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
    }

    return (
        <>
            {windowIsNotUndefined && windowKey === 'portfolio' && (
                <Portfolio {...props} portfolioItems={portfolioItems} />
            )}
            {windowIsNotUndefined && windowKey === 'contact' && <Contact {...props} />}
            {windowIsNotUndefined && windowKey === 'article' && (
                <Articles {...props} blogInfo={blogInfo} />
            )}
        </>
    )
}
