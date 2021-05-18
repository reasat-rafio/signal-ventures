import * as React from 'react'
import { Button } from 'react95'
import { useCtx } from '../../../store'
import { CLOSE_WINDOW_BOX, MINIMIZE_WINDOW_BOX } from '../../../store/types'
import { IoCloseSharp } from 'react-icons/io5'
import { FaRegWindowMinimize, FaRegWindowMaximize } from 'react-icons/fa'

interface WindowHeaderButtonsProps {
    index: string
    setIsExpanded: (isExpanded: (prev: boolean) => void) => void
    windowRef: any
    xaxis: number
    yaxis: number
    isExpanded: boolean
    positionX: number
    positionY: number
    setPositionX: (positionX: number) => void
    setPositionY: (positionY: number) => void
}

export const WindowHeaderButtons: React.FC<WindowHeaderButtonsProps> = ({
    index,
    setIsExpanded,
    windowRef,
    xaxis,
    yaxis,
    isExpanded,
    positionX,
    positionY,
    setPositionX,
    setPositionY,
}) => {
    const {
        dispatch,
        state: { activeWindows },
    } = useCtx()
    console.log('index', index)

    const minmaxAction = () => {
        if (isExpanded) {
            setPositionX(0)
            setPositionY(0)
        } else {
            setPositionX(xaxis)
            setPositionY(yaxis)
        }

        if (windowRef?.current) {
            windowRef.current.style.transform = `translate(${positionX}px, ${positionY}px)`
        }
        setIsExpanded((prev) => !prev)
    }

    return (
        <div className="flex justify-end flex-1 z-20">
            <Button
                size="sm"
                onClick={() => {
                    dispatch({ type: MINIMIZE_WINDOW_BOX, payload: index })
                }}
            >
                <FaRegWindowMinimize />
            </Button>
            <div className="hidden lg:block">
                <Button size="sm" onClick={minmaxAction}>
                    <FaRegWindowMaximize />
                </Button>
            </div>

            <Button
                size="sm"
                onClick={() => {
                    dispatch({ type: CLOSE_WINDOW_BOX, payload: index })
                }}
            >
                <IoCloseSharp />
            </Button>
        </div>
    )
}
