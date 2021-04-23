import { Button, TextField } from 'react95'
import Image from 'next/image'
import React from 'react'
import { SanityImg } from 'sanity-react-extra'
import { useCtx } from '../../../../store'
import { CLOSE_WINDOW_BOX, FOCUS_WINDOW_BOX, MINIMIZE_WINDOW_BOX } from '../../../../store/types'
import { imageUrlBuilder } from '../../../../utils/sanity'
import { Header, ContactWindowsWrapper, ContactContentWrapper } from '../../../styles/Styles'
import Draggable from 'react-draggable'

interface ContactProps extends IWindowsProps {
    contact: any
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
    const { ctaButton, email, message, logo } = contact[0]

    console.log(ctaButton)

    const { dispatch } = useCtx()
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

                        <div className="flex justify-end flex-1">
                            <Button
                                size="sm"
                                onClick={() =>
                                    dispatch({ type: MINIMIZE_WINDOW_BOX, payload: index })
                                }
                            >
                                <Image
                                    src="/img/static/close.png"
                                    layout="intrinsic"
                                    width="27%"
                                    height="27%"
                                    alt="minimize"
                                />
                            </Button>
                            <Button size="sm" onClick={() => setIsExpanded((prev) => !prev)}>
                                <Image
                                    src="/img/static/maximize.png"
                                    layout="intrinsic"
                                    width="18"
                                    height="18"
                                    alt="maximize"
                                />
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => dispatch({ type: CLOSE_WINDOW_BOX, payload: index })}
                            >
                                <Image
                                    src="/img/static/cross.png"
                                    layout="intrinsic"
                                    width="30%"
                                    height="27%"
                                    alt="close"
                                />
                            </Button>
                        </div>
                    </Header>
                </strong>
                <form
                    className="grid grid-cols-12 absolute mx-auto gap-2"
                    style={{ height: '90%', width: '99%' }}
                >
                    <div
                        className="col-span-4 flex justify-center items-center  px-8  h-full w-full  "
                        style={{ backgroundColor: '#56AAAA' }}
                    >
                        <SanityImg
                            builder={imageUrlBuilder}
                            image={logo}
                            height={600}
                            alt={'contact poster'}
                        />
                    </div>

                    <div className="col-span-8  h-full w-full flex flex-col justify-center gap-4 px-3">
                        <div className="grid grid-cols-12  gap-4">
                            <p className="col-span-2 ">{email}</p>
                            <TextField
                                style={{ gridColumn: 'span 10 / span 10' }}
                                placeholder="Type here..."
                                fullWidth
                            />
                        </div>
                        <div className="grid grid-cols-12  gap-4">
                            <p className="col-span-2">{message}</p>
                            <TextField
                                style={{ gridColumn: 'span 10 / span 10' }}
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
