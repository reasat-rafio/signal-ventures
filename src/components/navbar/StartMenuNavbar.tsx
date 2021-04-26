import { useState } from 'react'
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
import { useDate, useOrderNavs } from '../../../libs/hooks'
import { CREATE_WINDOW_BOX, TOGGLE_DARK_MODE } from '../../../store/types'
import { imageUrlBuilder } from '../../../utils/sanity'
import { useCtx } from '../../../store'
import { NavAction } from '../../../libs/HelperFunc'

export const StartMenuNavbar: React.FC<NavbarProps> = ({ navs, startMenu }) => {
    const {
        dispatch,
        state: { openWindows, focusWindow, darkMode },
    } = useCtx()

    // Menu open | close state
    const [open, setOpen] = useState<boolean>(false)
    // This will return the current time date and year
    const { date, time, year } = useDate()

    // This will return the ordered navigation accounding to the <dark | light> mode
    const { navigations } = useOrderNavs(navs, darkMode)

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
                            {navigations?.map(({ title, key, logo, dark_mode, href }: Inavs) => (
                                <div
                                    onClick={() =>
                                        NavAction(title, logo, key, dark_mode, dispatch, href)
                                    }
                                >
                                    <ListItem style={{ width: '14rem' }} key={key}>
                                        <div className="flex items-center ">
                                            <SanityImg
                                                builder={imageUrlBuilder}
                                                image={logo}
                                                alt={title + 'logo'}
                                                width={30}
                                            />
                                            <p className="ml-4">{title}</p>
                                        </div>
                                    </ListItem>
                                </div>
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
