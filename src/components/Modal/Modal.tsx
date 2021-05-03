import clsx from 'clsx'
import { useCtx } from '../../../store'
import { Window, WindowContent, WindowHeader, Button, Toolbar, Panel } from 'react95'
import { IoCloseSharp } from 'react-icons/io5'
import { ModalButton, ModalHeader, ModalWrapper } from '../../styles/Styles'
import { useEffect, useState } from 'react'
import { HIDE_MODAL } from '../../../store/types'
import Image from 'next/image'
interface ModalProps {}

export const Modal: React.FC<ModalProps> = ({}) => {
    const {
        dispatch,
        state: {
            darkMode,
            showModal,
            modalData: { success, description },
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
                                <Image
                                    layout="intrinsic"
                                    src={
                                        success
                                            ? '/img/static/check.png'
                                            : '/img/static/Warning.png'
                                    }
                                    width="50"
                                    height="50"
                                />
                            </div>
                            <div className="col-span-8">{description}</div>
                        </div>
                        <div className="flex justify-center items-center">
                            <ModalButton size="sm" onClick={hideModalAction}>
                                OK
                            </ModalButton>
                        </div>
                    </WindowContent>
                </ModalWrapper>
            )}
        </div>
    )
}
