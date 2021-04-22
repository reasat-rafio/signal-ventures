import React, { useEffect, useRef, useState } from 'react'
import { useCtx } from '../../../store'
import { Articles } from './articles/Articles'
import { Contact } from './contact/Contact'
import { Portfolio } from './portfolio/Portfolio'

interface WindowProps {
    index: string
    width: number
    blogInfo: any
}

export const Window_: React.FC<WindowProps> = ({ index, width, blogInfo }) => {
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
    const [windowID, setWindowID] = useState<string>('')

    const findWindowDetails = (id: string) => {
        const findWin: WindowsProps[] = activeWindows.filter((i) => i.index == id)
        setWindowName(findWin[0].name)
        setWindowIcon(findWin[0].icon)
        setWindowID(findWin[0].index)
    }

    useEffect(() => {
        if (window !== undefined) {
            setWindowIsNotUndefined(true)
        }
        switch (index) {
            case '0ca5a8f1cfbb':
                findWindowDetails('0ca5a8f1cfbb')
                break
            case 'ad5661f253fe':
                findWindowDetails('ad5661f253fe')
                break
            case '5345c8fcdf0e':
                findWindowDetails('5345c8fcdf0e')
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
        windowID,
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
            {windowIsNotUndefined && windowID === '0ca5a8f1cfbb' && <Portfolio {...props} />}
            {windowIsNotUndefined && windowID === '5345c8fcdf0e' && <Contact {...props} />}
            {windowIsNotUndefined && windowID === 'ad5661f253fe' && (
                <Articles {...props} blogInfo={blogInfo} />
            )}
        </>
    )
}
