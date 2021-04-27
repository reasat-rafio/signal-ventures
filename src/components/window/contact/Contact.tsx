import { Button, TextField } from 'react95'
import { SanityImg } from 'sanity-react-extra'
import { useCtx } from '../../../../store'
import { FOCUS_WINDOW_BOX } from '../../../../store/types'
import { imageUrlBuilder } from '../../../../utils/sanity'
import { Header, ContactWindowsWrapper } from '../../../styles/Styles'
import Draggable from 'react-draggable'
import { WindowHeaderButtons } from '../WindowHeaderButtons'

interface ContactProps extends IWindowsProps {
    contact: Icontact[]
}

export const Contact: React.FC<ContactProps> = ({
    windowKey,
    windowIsFocused,
    isExpanded,
    index,
    windowName,
    windowIcon,
    setIsExpanded,
    draggable,
    mdScreenBreakpoint,
    xaxis,
    yaxis,
    contact,
}) => {
    const { ctaButton, email, message, name, subject, logo } = contact[0]

    const {
        dispatch,
        state: { darkMode },
    } = useCtx()
    return (
        <Draggable
            handle="strong"
            onDrag={draggable}
            onStart={draggable}
            onStop={draggable}
            bounds="body"
            position={{
                x: mdScreenBreakpoint ? 0 : isExpanded ? 0 : xaxis,
                y: mdScreenBreakpoint ? 0 : isExpanded ? 0 : yaxis,
            }}
        >
            <ContactWindowsWrapper
                windowKey={windowKey}
                windowIsFocused={windowIsFocused}
                isExpanded={isExpanded}
                onClick={(e) => dispatch({ type: FOCUS_WINDOW_BOX, payload: index })}
            >
                <strong className="cursor-move">
                    <Header active={windowIsFocused ? true : false}>
                        <SanityImg
                            className="py-1"
                            builder={imageUrlBuilder}
                            image={windowIcon}
                            alt={windowName + 'logo'}
                        />
                        <p>{windowName}</p>

                        <WindowHeaderButtons index={index} setIsExpanded={setIsExpanded} />
                    </Header>
                </strong>
                <form
                    className="grid grid-cols-12 absolute mx-auto gap-2"
                    style={{ height: '90%', width: '99%' }}
                >
                    <div
                        className="hidden  col-span-4 md:flex justify-center items-center  px-8  h-full w-full  "
                        style={{ backgroundColor: '#56AAAA' }}
                    >
                        <SanityImg
                            builder={imageUrlBuilder}
                            image={logo}
                            height={600}
                            alt={'contact poster'}
                        />
                    </div>

                    <div className="md:col-span-8 col-span-12  h-full w-full flex flex-col justify-center gap-4 px-3">
                        <div className="grid grid-cols-12  gap-4">
                            <p className="col-span-2 ">{email}</p>
                            <TextField
                                style={{
                                    gridColumn: 'span 10 / span 10',
                                    background: `${darkMode ? '#301b3f' : 'white'}`,
                                }}
                                placeholder="Type here..."
                                fullWidth
                            />
                        </div>
                        <div className="grid grid-cols-12  gap-4">
                            <p className="col-span-2 ">{name}</p>
                            <TextField
                                style={{
                                    gridColumn: 'span 10 / span 10',
                                    background: `${darkMode ? '#301b3f' : 'white'}`,
                                }}
                                placeholder="Type here..."
                                fullWidth
                            />
                        </div>
                        <div className="grid grid-cols-12  gap-4">
                            <p className="col-span-2 ">{subject}</p>
                            <TextField
                                style={{
                                    gridColumn: 'span 10 / span 10',
                                    background: `${darkMode ? '#301b3f' : 'white'}`,
                                }}
                                placeholder="Type here..."
                                fullWidth
                            />
                        </div>
                        <div className="grid grid-cols-12  gap-4">
                            <p className="col-span-2">{message}</p>
                            <TextField
                                style={{
                                    gridColumn: 'span 10 / span 10',
                                    background: `${darkMode ? '#301b3f' : 'white'}`,
                                }}
                                multiline
                                placeholder="Type here..."
                                fullWidth
                                rows={4}
                            />
                        </div>
                        <div className="grid grid-cols-12  gap-4">
                            <div className="col-span-2" />
                            <Button
                                type="submit"
                                style={{ gridColumn: 'span 10 / span 10', width: '90px' }}
                            >
                                {ctaButton.title}
                            </Button>
                        </div>
                    </div>
                </form>
            </ContactWindowsWrapper>
        </Draggable>
    )
}
