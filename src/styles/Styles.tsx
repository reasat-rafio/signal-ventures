import { AppBar, Toolbar, Button, List, Window, WindowHeader } from 'react95'
import styled from 'styled-components'
import { respondTo } from '../../libs/mixin'
import { font_size_for_nav } from '../../libs/_variables'

export const Container = styled.div<{ darkMode: boolean }>`
    min-height: 100vh;
    background: ${(props: { darkMode: boolean }) =>
        props.darkMode === true
            ? 'url(/img/static/darkbg.png) no-repeat center center / cover '
            : '#0E1C3D'};

    ${({ darkMode }) =>
        darkMode &&
        `
        &:after {
            content: '';
            opacity: 0.8;
            background-color: #000;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            position: absolute;
            background-size: contain;
            background-repeat: repeat;
        } `}
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
    display: inline-block;
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
    margin: 0 5px;
  `}
`

export const NavList = styled(List)`
    position: absolute;
    left: -5px;
    bottom: 43px;
`

export const WindowWrapper = styled(Window)<IWindowWrapper>`
    position: absolute;
    width: 100vw;
    left: 0;
    top: 0;
    min-height: 100vh;
    ${respondTo.md`
    min-height: ${(props: IWindowWrapper) => (props.isExpanded ? '100vh' : '47rem')};
    left: ${(props: IWindowWrapper) => (props.isExpanded ? '0px' : '20rem')};
    top: ${(props: IWindowWrapper) => (props.isExpanded ? '0px' : '7rem')};
    width: ${(props: IWindowWrapper) => (props.isExpanded ? '100vw' : '32rem')};
  `}
    z-index: ${(props: IWindowWrapper) => (props.windowIsFocused ? '40' : '30')};
`

export const Header = styled(WindowHeader)`
    display: flex;
    align-items: center;
    padding-right: 0;
`
export const Body = styled.div<{ isExpanded: boolean }>`
    background-color: #b0b2b1;
    padding: 2rem;
    height: ${(props) => props.isExpanded && '87.45vh'};
`
