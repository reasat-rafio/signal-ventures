import {
    AppBar,
    Toolbar,
    Button,
    List,
    Window,
    WindowHeader,
    TabBody,
    Cutout,
    Avatar,
    TextField,
    WindowContent,
} from 'react95'
import styled from 'styled-components'
import { respondTo } from '../../libs/mixin'
import { font_size_for_nav, commonWindowStylings, LIGHT_PINK } from '../../libs/_variables'

export const Container = styled.div<{ darkMode: boolean }>`
    min-height: 100vh;
    background: ${({ darkMode }) => (darkMode === true ? 'black' : 'white')};
`

export const BackgroundMask = styled.div`
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    background-size: contain;
    background-color: #fdf5eb;
`

export const NavBar = styled(AppBar)`
    position: fixed;
    left: 0;
    bottom: 0;
    top: auto;
    z-index: 50;
`
export const ToolbarWrapper = styled(Toolbar)`
    justify-content: space-between;
    display: flex;
`

export const StartBar = styled.div`
    position: relative;
    display: flex;
`
export const StartButton = styled(Button)`
    font-weight: bold;
    font-size: ${font_size_for_nav.sm};
    ${respondTo.md`
    font-size: ${font_size_for_nav.lg};
  `}
`
export const NavTabs = styled(Button)<{ index: number }>`
    margin: 0 3px;
    font-size: ${font_size_for_nav.sm};
    ${respondTo.md`
    font-size: ${font_size_for_nav.lg};

  `}
`

export const NavList = styled(List)`
    position: absolute;
    left: -5px;
    bottom: 43px;
`
export const LanguageList = styled(List)`
    position: absolute;
    right: 1px;
    bottom: 43px;
`

export const Header = styled(WindowHeader)`
    display: flex;
    align-items: center;
    padding-right: 0;
`

// ARTICEL WINDOW STYLINGS
export const ArticelWindowWrapper = styled(Window)<IWindowWrapper>`
    ${commonWindowStylings}

    z-index: ${({ windowIsFocused }: IWindowWrapper) => (windowIsFocused ? '40' : '30')};
    ${respondTo.md`
    min-height: ${({ isExpanded }: IWindowWrapper) => (isExpanded ? '100vh' : '700px')};
    left: ${({ isExpanded }: IWindowWrapper) => (isExpanded ? '0px' : '11%')};
    top: ${({ isExpanded }: IWindowWrapper) => (isExpanded ? '0px' : '6%')};
    width: ${({ isExpanded }: IWindowWrapper) => (isExpanded ? '100vw' : '700px')};
  `}
`

export const ArticleBodyWrapper = styled.div`
    position: absolute;
    height: 94%;
    width: 99%;
    overflow: auto;
    padding: 0 5px;
`

export const ArticleBody = styled(TabBody)`
    display: grid;
    grid-template-rows: repeat(5, minmax(0, 1fr));
    min-height: 90%;
    padding: 8px;
    margin: 1rem 0;
`

export const ArticleImg = styled.div<{ thumbnail: string }>`
    grid-row: span 2 / span 2;
    background: ${(props) => `url(${props.thumbnail})  no-repeat center center / cover`};
    position: relative;
    cursor: pointer;
`

// scrollbar-width: thin;
// scrollbar-color: ${({ darkMode }) => darkMode && '#39f5e6 #1f0220'};

export const ArticleContent = styled(Cutout)<{ darkMode: boolean }>`
    grid-row: span 3 / span 3;
    background: ${(props) => (props.darkMode ? '#301b3f' : 'white')};
    margin: 10px 0 0 0;

    > * {
        overflow: hidden;
    }
`

export const ArticleAvatar = styled(Avatar)`
    bottom: 0;
    left: 10px;
    position: absolute;
    transform: translateY(40%);
    z-index: 10;
`

// PORTFOLIO WINDOW STYLINGS

export const PorfolioWindowWrapper = styled(Window)<IWindowWrapper>`
    ${commonWindowStylings}
    z-index: ${({ windowIsFocused }: IWindowWrapper) => (windowIsFocused ? '40' : '30')};
    ${respondTo.md`
    min-height: ${({ isExpanded }: IWindowWrapper) => (isExpanded ? '100vh' : '510px')};
    left: ${({ isExpanded }: IWindowWrapper) => (isExpanded ? '0px' : '15%')};
    top: ${({ isExpanded }: IWindowWrapper) => (isExpanded ? '0px' : '7%')};
    width: ${({ isExpanded }: IWindowWrapper) => (isExpanded ? '100vw' : '700px')};
  `}
`
export const PortfolioContentWrapper = styled(TabBody)<{
    isExpanded: boolean
    mdScreenBreakpoint: boolean
    darkMode: boolean
}>`
    margin: auto;
    position: absolute;
    height: ${({ mdScreenBreakpoint }) => `calc(100% - ${mdScreenBreakpoint ? '78px' : '40px'})`};
    width: calc(100% - 4px);
    overflow: auto;
    background: ${(props) => (props.darkMode ? '#301b3f' : 'white')};
`

export const PortfolioBody = styled.div<{ darkMode: boolean }>``

// CONTACT WINDOW STYLINGS
export const ContactWindowsWrapper = styled(Window)<IWindowWrapper>`
    ${commonWindowStylings}
    z-index: ${({ windowIsFocused }: IWindowWrapper) => (windowIsFocused ? '40' : '30')};
    ${respondTo.md`
    min-height: ${({ isExpanded }: IWindowWrapper) => (isExpanded ? '100vh' : '500px')};
    left: ${({ isExpanded }: IWindowWrapper) => (isExpanded ? '0px' : '9%')};
    top: ${({ isExpanded }: IWindowWrapper) => (isExpanded ? '0px' : '7%')};
    width: ${({ isExpanded }: IWindowWrapper) => (isExpanded ? '100vw' : '700px')};
  `}
`

export const ContactContentWrapper = styled.div<{ isExpanded: boolean }>`
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    justify-content: center;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    align-items: center;
    padding: 0 5px;
    margin: auto;
    position: ${(props) => props.isExpanded && 'absolute'};
    width: ${(props) => props.isExpanded && '100%'};
    height: ${(props) => props.isExpanded && '89%'};
`
export const ContactTextField = styled(TextField)<{ darkMode: boolean; error: boolean }>`
    grid-column: span 10 / span 10;
    background: ${({ darkMode }) => (darkMode ? '#301b3f' : 'white')};
    border: ${({ error, darkMode }) =>
        error ? '1px solid red' : `1px solid ${darkMode ? LIGHT_PINK : '#e5e7eb'}`};
`

// MODAL
export const ModalWrapper = styled(Window)`
    max-width: 500px;
    min-width: 360px;
    min-height: 120px;
`
export const ModalHeader = styled(WindowHeader)<{ darkMode: boolean }>`
    display: flex;
`
export const ModalContent = styled(WindowContent)``

export const ModalButton = styled(Button)`
    padding: 5px 20px;
`

//
export const SubPorfolioWindowWrapper = styled(Window)<IWindowWrapper>`
    ${commonWindowStylings}
    z-index: ${({ windowIsFocused }: IWindowWrapper) => (windowIsFocused ? '40' : '30')};
    ${respondTo.md`
    min-height: ${({ isExpanded }: IWindowWrapper) => (isExpanded ? '100vh' : '470px')};
    left: ${({ isExpanded }: IWindowWrapper) => (isExpanded ? '0px' : '15%')};
    top: ${({ isExpanded }: IWindowWrapper) => (isExpanded ? '0px' : '9%')};
    width: ${({ isExpanded }: IWindowWrapper) => (isExpanded ? '100vw' : '500px')};
  `}
`
