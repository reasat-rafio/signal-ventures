import { AppBar, Toolbar, Button, List, Window, WindowHeader } from 'react95'
import styled from 'styled-components'

export const NavBar = styled(AppBar)`
    position: fixed;
    left: 0;
    bottom: 0;
    top: auto;
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

export const WindowWrapper = styled(Window)`
    width: ${(props) => (props.isExpanded === true ? '100vw' : '32rem')};
    min-height: ${(props) => (props.isExpanded === true ? '100vh' : '47rem')};
    position: absolute;
    top: ${(props) => (props.isExpanded === true ? '0px' : '10rem')};
    left: ${(props) => (props.isExpanded === true ? '0px' : '20rem')};
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
    height: ${(props) => props.isExpanded === true && '87.45vh'};
`
