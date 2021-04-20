import { AppBar, Toolbar, Button, List, Window, WindowHeader } from 'react95'
import styled from 'styled-components'
import { respondTo } from '../../libs/mixin'

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
`
export const NavTabs = styled(Button)<{ index: number }>`
    margin: 0 5px;
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
    top: ${(props: IWindowWrapper) => (props.isExpanded ? '0px' : '10rem')};
    width: ${(props: IWindowWrapper) => (props.isExpanded ? '100vw' : '32rem')};
  `}
    z-index: ${(props: IWindowWrapper) => (props.windowIsFocused ? '10' : '0')};
`

export const Header = styled(WindowHeader)`
    display: flex;
    align-items: center;
    background-color: #050071;
    color: #ffffff;
    padding-right: 0;
`
export const Body = styled.div<{ isExpanded: boolean }>`
    background-color: #b0b2b1;
    padding: 2rem;
    height: ${(props) => props.isExpanded && '87.45vh'};
`
