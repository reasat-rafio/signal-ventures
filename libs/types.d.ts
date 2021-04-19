interface PropIsChildren {
    children: React.ReactNode
}

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

interface HomeProps {
    title: string
    description: string
    logo: string
}

interface Inavs {
    title: string
    logo: {
        asset: {
            _ref: string
        }
    }
}

declare module '*.png'
