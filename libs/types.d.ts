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
        | 'SET_MODE'

    payload?: any
}

interface HomeProps {
    title: string
    description: string
    darkLogo: string
    lightLogo: string
    navs: Inavs[]
    button: {
        _type: string
        title: string
        href?: string
    }
}

interface NavbarProps {
    navs: Inavs[]
    startMenu: {
        _type: string
        title: string
        logo: Logo
    }
    languageSwitcher: IlanguageSwitcher[]
    locale: string
}

interface Inavs {
    title: string
    key: string
    logo: Logo
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
    darkMode: boolean
}

interface IWindowsProps {
    windowKey: string
    windowIsFocused: boolean
    isExpanded: boolean
    index: string
    windowName: string
    windowIcon: string
    setIsExpanded: Dispatch<SetStateAction<boolean>>
    draggable: (e, data: DraggableData) => void
    mdScreenBreakpoint: boolean
    xaxis: number
    yaxis: number
    positionX: number
    positionY: number
    setPositionX: (positionX: number) => void
    setPositionY: (positionY: number) => void
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
    name: string
    logo: Logo
    subject: string
    message: string
}

interface CtaButton {
    _type: string
    title: string
}

// declare type LineWidthGridHelperProps = Object3DNode<
//     LineWidthGridHelper,
//     typeof LineWidthGridHelper
// >

// namespace JSX {
//     interface IntrinsicElements {
//         lineWidthGridHelper: LineWidthGridHelperProps
//     }
// }

interface IlanguageSwitcher {
    __i18n_lang: string
    __i18n_refs: I18NRef[]
    _createdAt: Date
    _id: string
    _rev: string
    _type: string
    _updatedAt: Date
    locales: string
    logo: Logo
    title: string
}

interface I18NRef {
    _key: string
    lang: string
    ref: Ref
}

interface Ref {
    _ref: string
    _type: string
    _weak: boolean
}
