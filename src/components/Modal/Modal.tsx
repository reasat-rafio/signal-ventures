import clsx from 'clsx'
import { useCtx } from '../../../store'
import { Window, WindowContent, WindowHeader, Button, Toolbar, Panel } from 'react95'
import { IoCloseSharp } from 'react-icons/io5'
import { ModalButton, ModalHeader, ModalWrapper } from '../../styles/Styles'
import { useEffect, useState } from 'react'
import { HIDE_MODAL } from '../../../store/types'
import Image from 'next/image'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from '../../../utils/sanity'

interface ModalProps {
    modal: ModalData[]
}

export const Modal: React.FC<ModalProps> = ({ modal }) => {
    const { errorImg, errorMessage, successImg, successMessage, closeButton } = modal[0]
    console.log(closeButton)

    const {
        dispatch,
        state: {
            darkMode,
            showModal,
            modalData: { success },
        },
    } = useCtx()

    const hideModalAction = () => {
        dispatch({
            type: HIDE_MODAL,
        })
    }

    return (
        <div
            className={clsx(
                'fixed h-full w-full right-0 top-0 left-0 bottom-0  flex justify-center items-center ',
                showModal ? 'z-50 block' : 'z-0 hidden',
            )}
        >
            {showModal && (
                <ModalWrapper>
                    <ModalHeader active={true} darkMode={darkMode}>
                        <span className="flex-1">{success ? 'success.exe' : 'error.exe'}</span>
                        <Button onClick={hideModalAction}>
                            <IoCloseSharp />
                        </Button>
                    </ModalHeader>
                    <WindowContent>
                        <div className="grid grid-cols-12">
                            <div className="col-span-4">
                                <SanityImg
                                    builder={imageUrlBuilder}
                                    image={success ? successImg : errorImg}
                                    alt={success ? 'success logo' : 'error logo'}
                                    width={60}
                                />
                            </div>
                            <div className="col-span-8 flex justify-start items-center">
                                {success ? successMessage : errorMessage}
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <ModalButton size="sm" onClick={hideModalAction}>
                                {closeButton}
                            </ModalButton>
                        </div>
                    </WindowContent>
                </ModalWrapper>
            )}
        </div>
    )
}
