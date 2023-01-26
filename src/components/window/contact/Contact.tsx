// @ts-nocheck
// TODO fix typescript errors
import { Button } from 'react95'
import { SanityImg } from 'sanity-react-extra'
import { useCtx } from '../../../../store'
import { LOADING_END, LOADING_START, SHOW_MODAL } from '../../../../store/types'
import { imageUrlBuilder } from '../../../../utils/sanity'
import { Header, ContactTextField } from '../../../styles/Styles'
import { WindowHeaderButtons } from '../WindowHeaderButtons'
import { RefObject } from 'react'
import { useFormspark } from '@formspark/use-formspark'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ContactSchema } from '../../../../libs/yupSchema'

interface ContactProps extends IWindowsProps {
    contact: Icontact[]
    contactRef: RefObject<Element>
}

export const Contact: React.FC<ContactProps> = ({
    windowIsFocused,
    isExpanded,
    index,
    windowName,
    windowIcon,
    setIsExpanded,
    xaxis,
    yaxis,
    contact,
    positionX,
    positionY,
    setPositionX,
    setPositionY,
    contactRef,
}) => {
    const { ctaButton, email, message, name, subject, logo } = contact[0]

    const {
        dispatch,
        state: { darkMode },
    } = useCtx()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(ContactSchema),
    })

    const formID: any = process.env.NEXT_PUBLIC_FORMID

    const [submit, submitting] = useFormspark({
        formId: formID,
    })

    const onSubmit = async (data: IForm) => {
        try {
            dispatch({
                type: LOADING_START,
            })
            const { email, name, subject, message } = data
            await submit({ email, name, subject, message })

            dispatch({
                type: LOADING_END,
            })

            dispatch({
                type: SHOW_MODAL,
                payload: {
                    success: true,
                },
            })

            reset({})
        } catch (error) {
            dispatch({
                type: SHOW_MODAL,
                payload: {
                    success: false,
                },
            })
        }
    }

    return (
        <>
            <strong className="cursor-move">
                <Header active={windowIsFocused ? true : false}>
                    {windowIcon && (
                        <SanityImg
                            className="py-1"
                            builder={imageUrlBuilder}
                            image={windowIcon}
                            width={20}
                            alt={windowName + 'logo'}
                        />
                    )}

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
                className="absolute grid grid-cols-12 gap-2 mx-auto"
                style={{ height: '90%', width: '99%' }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div
                    className="items-center justify-center hidden w-full h-full col-span-4 px-8 md:flex "
                    style={{ backgroundColor: '#56AAAA' }}
                >
                    <SanityImg
                        builder={imageUrlBuilder}
                        image={logo}
                        height={600}
                        alt={'contact poster'}
                    />
                </div>

                <div className="flex flex-col justify-center w-full h-full col-span-12 gap-4 px-3 md:col-span-8">
                    <div className="grid grid-cols-12 gap-4">
                        <p className="col-span-2 ">{email}</p>
                        <ContactTextField
                            disabled={submitting}
                            error={errors.email}
                            darkMode={darkMode}
                            {...register('email')}
                            fullWidth
                        />
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <p className="col-span-2 ">{name}</p>
                        <ContactTextField
                            disabled={submitting}
                            error={errors.name}
                            {...register('name')}
                            darkMode={darkMode}
                            fullWidth
                        />
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <p className="col-span-2 ">{subject}</p>
                        <ContactTextField
                            disabled={submitting}
                            error={errors.subject}
                            darkMode={darkMode}
                            {...register('subject')}
                            fullWidth
                        />
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <p className="col-span-2">{message}</p>
                        <ContactTextField
                            disabled={submitting}
                            error={errors.message}
                            darkMode={darkMode}
                            {...register('message')}
                            multiline
                            fullWidth
                            rows={4}
                        />
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-2" />

                        <Button
                            disabled={submitting}
                            type="submit"
                            style={{ gridColumn: 'span 10 / span 10', width: '90px' }}
                        >
                            {ctaButton.title}
                        </Button>
                    </div>
                </div>
            </form>
        </>
    )
}
