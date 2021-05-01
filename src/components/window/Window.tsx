import React, { useEffect, useRef, useState } from 'react'
import { useToText } from '../../../libs/hooks'
import { useCtx } from '../../../store'
import { Articles } from './articles/Articles'
import { Contact } from './contact/Contact'
import { Portfolio } from './portfolio/Portfolio'

interface WindowProps {
    index: string
    width: number
    blogItems: IBloginfo[]
    blogFeeds: { image: string; link: string }
    portfolioItems: IPorfolioItems[]
    contact: Icontact[]
}

export const Window_: React.FC<WindowProps> = ({
    index,
    width,
    blogItems,
    blogFeeds,
    portfolioItems,
    contact,
}) => {
    const {
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
    const [windowIcon, setWindowIcon] = useState<string>('')
    const [windowKey, setWindowKey] = useState<string>('')

    const findWindowDetails = (key: string) => {
        // Finding THIS windows info from global store by key and setting them to state
        const findWin: WindowsProps[] = activeWindows.filter((i) => i.key == key)
        setWindowName(findWin[0].name)
        setWindowIcon(findWin[0].icon)
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
    }, [activeWindows])

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
        positionX,
        positionY,
        setPositionX,
        setPositionY,
    }

    return (
        <>
            {windowIsNotUndefined && windowKey === 'portfolio' && (
                <Portfolio {...props} portfolioItems={portfolioItems} />
            )}
            {windowIsNotUndefined && windowKey === 'contact' && (
                <Contact {...props} contact={contact} />
            )}
            {windowIsNotUndefined && windowKey === 'articles' && (
                <Articles {...props} blogInfo={blogInfo} />
            )}
        </>
    )
}
