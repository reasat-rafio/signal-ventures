interface PropIsChildren {
    children: React.ReactNode
}

interface WindowsProps {
    name: string
    icon: string
    index: string
}

interface InitalState {
    openWindows: WindowsProps[]
    activeWindows: WindowsProps[]
    focusWindow: null | string
    darkMode: boolean
}
type Action = {
    type:
        | 'CREATE_WINDOW_BOX'
        | 'MINIMIZE_WINDOW_BOX'
        | 'CLOSE_WINDOW_BOX'
        | 'FOCUS_WINDOW_BOX'
        | 'TOGGLE_DARK_MODE'
    payload?: any
}

interface HomeProps {
    title: string
    description: string
    logo: string
    button: {
        _type: string
        title: string
        href?: string
    }
}

interface Inavs {
    title: string
    _key: string
    logo: {
        asset: {
            _ref: string
        }
    }
    dark_mode?: number
    href?: string
}

type DraggableData = {
    node: HTMLElement
    x: number
    y: number
    deltaX: number
    deltaY: number
    lastX: number
    lastY: number
}

interface IWindowWrapper {
    isExpanded: boolean
    windowIsFocused: boolean
}

declare module '*.png'
