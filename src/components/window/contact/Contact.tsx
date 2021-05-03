import { Button, TextField } from 'react95'
import { SanityImg } from 'sanity-react-extra'
import { useCtx } from '../../../../store'
import { FOCUS_WINDOW_BOX } from '../../../../store/types'
import { imageUrlBuilder } from '../../../../utils/sanity'
import { Header, ContactWindowsWrapper, ContactTextField } from '../../../styles/Styles'
import Draggable from 'react-draggable'
import { WindowHeaderButtons } from '../WindowHeaderButtons'
import { useRef } from 'react'
import { useFormspark } from '@formspark/use-formspark'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ContactSchema } from '../../../../libs/yupSchema'

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
    positionX,
    positionY,
    setPositionX,
    setPositionY,
}) => {
    const { ctaButton, email, message, name, subject, logo } = contact[0]

    const {
        dispatch,
        state: { darkMode },
    } = useCtx()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(ContactSchema),
    })

    const contactRef = useRef<HTMLDivElement | null>(null)

    const [submit, submitting] = useFormspark({
        formId: 'process.env.FORM_ID',
    })

    const onSubmit = async (data) => {
        console.log(data)
        // await submit({ message })
        // alert('Form submitted')
    }

    return (
        <Draggable
            handle={isExpanded ? 'legend' : 'strong'} // couldnt find any solution to disable the dragging so using legend for handle when the window is expanded. (legend doesn't exist here)
            onDrag={draggable}
            onStart={draggable}
            onStop={draggable}
            bounds="body"
            position={{
                x: mdScreenBreakpoint ? 0 : isExpanded ? positionX : xaxis,
                y: mdScreenBreakpoint ? 0 : isExpanded ? positionY : yaxis,
            }}
        >
            <ContactWindowsWrapper
                ref={contactRef}
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

                        <WindowHeaderButtons
                            index={index}
                            setIsExpanded={setIsExpanded}
                            windowRef={contactRef}
                            xaxis={xaxis}
                            yaxis={yaxis}
                            isExpanded={isExpanded}
                            positionX={positionX}
                            positionY={positionY}
                            setPositionX={setPositionX}
                            setPositionY={setPositionY}
                        />
                    </Header>
                </strong>
                <form
                    className="grid grid-cols-12 absolute mx-auto gap-2"
                    style={{ height: '90%', width: '99%' }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div
                        className="hidden col-span-4 md:flex justify-center items-center  px-8  h-full w-full  "
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
                            <ContactTextField
                                error={errors.email}
                                darkMode={darkMode}
                                {...register('email')}
                                fullWidth
                            />
                        </div>
                        <div className="grid grid-cols-12  gap-4">
                            <p className="col-span-2 ">{name}</p>
                            <ContactTextField
                                error={errors.name}
                                {...register('name')}
                                darkMode={darkMode}
                                fullWidth
                            />
                        </div>
                        <div className="grid grid-cols-12  gap-4">
                            <p className="col-span-2 ">{subject}</p>
                            <ContactTextField
                                error={errors.subject}
                                darkMode={darkMode}
                                {...register('subject')}
                                fullWidth
                            />
                        </div>
                        <div className="grid grid-cols-12  gap-4">
                            <p className="col-span-2">{message}</p>
                            <ContactTextField
                                error={errors.message}
                                darkMode={darkMode}
                                {...register('message')}
                                multiline
                                fullWidth
                                rows={4}
                            />
                            {/* {errors.message && (
                                <span className="text-xs text-red-600col-span-10 ml-auto">
                                    {errors.message.message}
                                </span>
                            )} */}
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
