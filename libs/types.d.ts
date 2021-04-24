interface PropIsChildren {
    children: React.ReactNode
}

interface WindowsProps {
    name: string
    icon: string
    key: string
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
    key: string
    logo: any
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
    windowKey: string
}

interface IWindowsProps {
    windowKey: string
    windowIsFocused: boolean
    isExpanded: boolean
    index: string
    windowName: string
    windowIcon: string
    setIsExpanded: any
    draggable: (e, data: DraggableData) => void
    mdScreenBreakpoint: boolean
    xaxis: number
    yaxis: number
}

interface BlogItems {
    author: string
    content: string
    image: string
    pubDate: string
    thumbnail: string
    title: string
    url: string
}

interface IBloginfo {
    author: string
    content: string
    image: string
    link: string
    pubDate: Date
    thumbnail: string
    title: string
}

declare module '*.png'

interface IPorfolioItems {
    _createdAt: Date
    _id: string
    _rev: string
    _type: string
    _updatedAt: Date
    href: string
    logo: Logo
    title: string
}

interface Logo {
    _type: string
    asset: Asset
}

interface Asset {
    _createdAt: Date
    _id: string
    _rev: string
    _type: string
    _updatedAt: Date
    assetId: string
    extension: string
    metadata: Metadata
    mimeType: string
    originalFilename: string
    path: string
    sha1hash: string
    size: number
    uploadId: string
    url: string
}

interface Metadata {
    dimensions: Dimensions
}

interface Dimensions {
    _type: string
    aspectRatio: number
    height: number
    width: number
}

interface Icontact {
    _createdAt: Date
    _id: string
    _rev: string
    _type: string
    _updatedAt: Date
    ctaButton: CtaButton
    email: string
    logo: Logo
    message: string
}

interface CtaButton {
    _type: string
    title: string
}
