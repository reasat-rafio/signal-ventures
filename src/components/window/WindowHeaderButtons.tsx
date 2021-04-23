import Image from 'next/image'
import { Button } from 'react95'
import { useCtx } from '../../../store'
import { CLOSE_WINDOW_BOX, MINIMIZE_WINDOW_BOX } from '../../../store/types'
import { IoCloseSharp } from 'react-icons/io5'
import { FaRegWindowMinimize, FaRegWindowMaximize } from 'react-icons/fa'

interface WindowHeaderButtonsProps {
    index: string
    setIsExpanded: any
}

export const WindowHeaderButtons: React.FC<WindowHeaderButtonsProps> = ({
    index,
    setIsExpanded,
}) => {
    const { dispatch } = useCtx()

    return (
        <div className="flex justify-end flex-1">
            <Button
                size="sm"
                onClick={() => dispatch({ type: MINIMIZE_WINDOW_BOX, payload: index })}
            >
                <FaRegWindowMinimize />
            </Button>
            <Button size="sm" onClick={() => setIsExpanded((prev) => !prev)}>
                <FaRegWindowMaximize />
            </Button>
            <Button size="sm" onClick={() => dispatch({ type: CLOSE_WINDOW_BOX, payload: index })}>
                <IoCloseSharp />
            </Button>
        </div>
    )
}
