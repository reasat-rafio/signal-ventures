import { useEffect, useState } from 'react'
import { Button, ListItem, Tooltip } from 'react95'
import {
    NavBar,
    NavList,
    NavTabs,
    StartBar,
    StartButton,
    ToolbarWrapper,
} from '../../styles/Styles'
import { SanityImg } from 'sanity-react-extra'
import { useDate } from '../../../libs/hooks'
import { CREATE_WINDOW_BOX, TOGGLE_DARK_MODE } from '../../../store/types'
import { imageUrlBuilder } from '../../../utils/sanity'
import { useCtx } from '../../../store'

interface NavbarProps {
    navs: Inavs[]
    startMenu: {
        _type: string
        title: string
        logo: any
    }
}

export const Navbar: React.FC<NavbarProps> = ({ navs, startMenu }) => {
    const {
        dispatch,
        state: { openWindows, focusWindow, darkMode },
    } = useCtx()

    const [navigation, setNavigation] = useState<Inavs[]>([])
    // Menu open | close state
    const [open, setOpen] = useState<boolean>(false)
    // This will return the current time date and year
    const { date, time, year } = useDate()

    // This whole useEffect will order the navs accounding to the <dark | light> mode
    useEffect(() => {
        const _navs = navs.filter((n) => n.dark_mode == undefined)
        const dark_and_light_navs = navs.filter((n) => n.dark_mode != undefined)
        setNavigation(_navs)

        if (darkMode) {
            const _dark_nav = dark_and_light_navs.filter((d) => !d.dark_mode)
            const newNav = [..._navs.reverse(), ..._dark_nav].sort((n) =>
                n.dark_mode != undefined ? -1 : 1,
            )
            setNavigation(newNav)
        } else {
            const _light_nav = dark_and_light_navs.filter((d) => d.dark_mode)
            const newNav = [..._navs.reverse(), ..._light_nav].sort((n) =>
                n.dark_mode != undefined ? -1 : 1,
            )
            setNavigation(newNav)
        }
    }, [darkMode])

    const navbarAction = (
        title: string,
        logo: string,
        key: string,
        dark_mode: number | undefined,
        href: string,
    ) => {
        if (key != undefined) {
            dispatch({
                type: CREATE_WINDOW_BOX,
                payload: {
                    name: title,
                    icon: logo,
                    key: key,
                },
            })
        } else {
            if (dark_mode == undefined) {
                if (typeof window !== 'undefined') {
                    document.location.href = href
                }
            } else {
                dispatch({
                    type: TOGGLE_DARK_MODE,
                })
            }
        }
    }

    return (
        <NavBar>
            <ToolbarWrapper>
                <StartBar>
                    <StartButton
                        primary
                        onClick={() => setOpen((prevState) => !prevState)}
                        active={open}
                    >
                        <SanityImg
                            builder={imageUrlBuilder}
                            image={startMenu.logo}
                            alt="Start menu logo"
                            width={20}
                        />
                        <p className="ml-1">{startMenu.title}</p>
                    </StartButton>

                    {/* THIS WILL SHOW ALL THE TABS THAT ARE OPEN IN THE NAVBAR  */}
                    {openWindows.map(({ icon, name, key }) => (
                        <NavTabs
                            primary
                            active={key == focusWindow ? true : false}
                            key={key}
                            onClick={() =>
                                dispatch({
                                    type: CREATE_WINDOW_BOX,
                                    payload: { icon, name, key },
                                })
                            }
                        >
                            <SanityImg
                                builder={imageUrlBuilder}
                                image={icon}
                                alt={name + 'logo'}
                                width={20}
                            />
                            <p className="ml-1 md:block hidden">{name}</p>
                        </NavTabs>
                    ))}

                    {/*  DROPDOWN LIST ITEMS */}
                    {open && (
                        <NavList onClick={() => setOpen(false)}>
                            {navigation?.map(({ title, key, logo, dark_mode, href }: Inavs) => (
                                <ListItem
                                    style={{ width: '14rem' }}
                                    key={key}
                                    onClick={() => navbarAction(title, logo, key, dark_mode, href)}
                                >
                                    <span className="flex items-center gap-4">
                                        <SanityImg
                                            builder={imageUrlBuilder}
                                            image={logo}
                                            alt={title + 'logo'}
                                            width={30}
                                        />
                                        <p>{title}</p>
                                    </span>
                                </ListItem>
                            ))}
                        </NavList>
                    )}
                </StartBar>

                {/* TIME VIEW */}
                <Tooltip
                    text={date + year}
                    enterDelay={100}
                    leaveDelay={200}
                    style={{
                        position: 'absolute',
                        left: '0',
                        bottom: '100%',
                    }}
                >
                    <Button variant="flat" disabled>
                        {time}
                    </Button>
                </Tooltip>
            </ToolbarWrapper>
        </NavBar>
    )
}
