import { useState } from 'react'
import { Button, ListItem, Tooltip } from 'react95'
import Image from 'next/image'
import { useDate } from '../../libs/hooks'
import Link from 'next/link'
import { nav } from './_data'
import { useCtx } from '../../store'
import { CREATE_WINDOW_BOX } from '../../store/types'
import {
    NavBar,
    NavList,
    NavTabs,
    StartBar,
    StartButton,
    ToolbarWrapper,
} from '../../styles/Styles'

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const {
        dispatch,
        state: { openWindows },
    } = useCtx()

    const [open, setOpen] = useState<boolean>(false)
    const { date, time, year } = useDate()

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
                        <p style={{ marginLeft: '5px' }}>Start</p>
                    </StartButton>

                    {openWindows.map(({ icon, name, index }: any) => (
                        <NavTabs
                            primary
                            key={index}
                            onClick={() =>
                                dispatch({
                                    type: CREATE_WINDOW_BOX,
                                    payload: { icon, name, index },
                                })
                            }
                        >
                            <Image
                                src={icon}
                                alt={`${name} logo`}
                                height={20}
                                width={20}
                                layout="intrinsic"
                            />
                            <p style={{ marginLeft: '5px' }}>{name}</p>
                        </NavTabs>
                    ))}

                    {open && (
                        <NavList onClick={() => setOpen(false)}>
                            <ListItem style={{ width: '14rem' }}>
                                <span className="flex items-center gap-4">
                                    <Image
                                        src={'/img/static/network_normal_two_pcs-2.png'}
                                        height="30"
                                        width="30"
                                        layout="intrinsic"
                                    />
                                    <p>Switch to Light Mode</p>
                                </span>
                            </ListItem>

                            {nav &&
                                nav.map(({ name, icon }, index: number) => (
                                    <ListItem style={{ width: '14rem' }} key={index}>
                                        <span
                                            className="flex items-center gap-4"
                                            onClick={() =>
                                                dispatch({
                                                    type: CREATE_WINDOW_BOX,
                                                    payload: { name, icon, index },
                                                })
                                            }
                                        >
                                            <Image
                                                src={icon}
                                                height="30"
                                                width="30"
                                                layout="intrinsic"
                                            />
                                            <p>{name}</p>
                                        </span>
                                    </ListItem>
                                ))}
                            <ListItem style={{ width: '14rem' }}>
                                <Link href="www.twitter.com">
                                    <a className="flex items-center gap-4">
                                        <Image
                                            src={'/img/static/twitter 1.png'}
                                            height="30"
                                            width="30"
                                            layout="intrinsic"
                                        />
                                        <p>Twitter</p>
                                    </a>
                                </Link>
                            </ListItem>
                        </NavList>
                    )}
                </StartBar>

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
