import { useState } from 'react'
import { Button, ListItem, Tooltip } from 'react95'
import Image from 'next/image'
import Link from 'next/link'
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
import { CREATE_WINDOW_BOX } from '../../../store/types'
import { imageUrlBuilder } from '../../../utils/sanity'
import { useCtx } from '../../../store'

interface NavbarProps {
    nav: Inavs[]
}

export const Navbar: React.FC<NavbarProps> = ({ nav }) => {
 
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
                        <p className="ml-1">Start</p>
                    </StartButton>

                    {openWindows.map(({ icon, name, index }) => (
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
                            <SanityImg
                                builder={imageUrlBuilder}
                                image={icon}
                                alt={name + 'logo'}
                                height={20}
                                width={20}
                            />
                            <p className="ml-1">{name}</p>
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

                            {nav?.map(
                                (
                                    {
                                        title,
                                        logo: {
                                            asset: { _ref },
                                        },
                                    }: Inavs,
                                    index: number,
                                ) => (
                                    <ListItem style={{ width: '14rem' }} key={index}>
                                        <span
                                            className="flex items-center gap-4"
                                            onClick={() =>
                                                dispatch({
                                                    type: CREATE_WINDOW_BOX,
                                                    payload: { name: title, icon: _ref, index },
                                                })
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
