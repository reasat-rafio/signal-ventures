interface WindowsProps {
    name: string
    icon: string
    index: number
}

interface InitalState {
    openWindows: WindowsProps[]
    activeWindows: WindowsProps[]
}

type Action = {
    type: 'CREATE_WINDOW_BOX' | 'MINIMIZE_WINDOW_BOX' | 'CLOSE_WINDOW_BOX'
    payload: any
}

interface PropIsChildren {
    children: React.ReactNode
}

declare module '*.png'
