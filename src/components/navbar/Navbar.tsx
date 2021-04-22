import { useEffect, useState } from 'react'
import { Button, ListItem, Tooltip } from 'react95'
import Image from 'next/image'
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
}

export const Navbar: React.FC<NavbarProps> = ({ navs }) => {
    const {
        dispatch,
        state: { openWindows, focusWindow, darkMode },
    } = useCtx()
    const [navigation, setNavigation] = useState<Inavs[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const { date, time, year } = useDate()

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
        _ref: string,
        _key: string,
        dark_mode: number | undefined,
    ) => {
        if (dark_mode == undefined) {
            dispatch({
                type: CREATE_WINDOW_BOX,
                payload: {
                    name: title,
                    icon: _ref,
                    index: _key,
                },
            })
        } else {
            dispatch({
                type: TOGGLE_DARK_MODE,
            })
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
                        <Image
                            src="/img/static/Start Logo 1.png"
                            alt="windowns 95 logo"
                            height={20}
                            width={20}
                            layout="intrinsic"
                        />
                        <p className="ml-1">Start</p>
                    </StartButton>

                    {/* THIS WILL SHOW ALL THE TABS THAT ARE OPEN IN THE NAVBAR  */}
                    {openWindows.map(({ icon, name, index }) => (
                        <NavTabs
                            primary
                            active={index == focusWindow ? true : false}
                            key={index}
                            onClick={() =>
                                dispatch({
                                    type: CREATE_WINDOW_BOX,
                                    payload: { icon, name, index },
                                })
                            }
                        >
                            <SanityImg
                                builder={imageUrlBuilder}
                                image={icon}
                                alt={name + 'logo'}
                                height={20}
                                width={20}
                            />
                            <p className="ml-1 md:block hidden">{name}</p>
                        </NavTabs>
                    ))}

                    {/*  DROPDOWN LIST ITEMS */}
                    {open && (
                        <NavList onClick={() => setOpen(false)}>
                            {navigation?.map(
                                ({
                                    title,
                                    _key,
                                    logo: {
                                        asset: { _ref },
                                    },
                                    dark_mode,
                                }: Inavs) => (
                                    <ListItem style={{ width: '14rem' }} key={_key}>
                                        <span
                                            className="flex items-center gap-4"
                                            onClick={() =>
                                                navbarAction(title, _ref, _key, dark_mode)
                                            }
                                        >
                                            <SanityImg
                                                builder={imageUrlBuilder}
                                                image={_ref}
                                                alt={title + 'logo'}
                                                height={30}
                                                width={30}
                                            />
                                            <p>{title}</p>
                                        </span>
                                    </ListItem>
                                ),
                            )}
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
