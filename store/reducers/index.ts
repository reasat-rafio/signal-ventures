import { CREATE_WINDOW_BOX, MINIMIZE_WINDOW_BOX, CLOSE_WINDOW_BOX } from '../types'

export const initialState: InitalState = {
    openWindows: [],
    activeWindows: [],
}

export const reducer = (state: InitalState, action: Action) => {
    switch (action.type) {
        case CREATE_WINDOW_BOX: {
            const { openWindows, activeWindows } = state

            if (
                !openWindows
                    .map((window: WindowsProps) => window.index)
                    .includes(action.payload.index)
            ) {
                openWindows.push(action.payload)
            }
            if (
                !activeWindows
                    .map((window: WindowsProps) => window.index)
                    .includes(action.payload.index)
            ) {
                activeWindows.push(action.payload)
            }

            return { ...state, openWindows, activeWindows }
        }
        case MINIMIZE_WINDOW_BOX: {
            let { activeWindows } = state
            activeWindows = activeWindows.filter(
                (window: WindowsProps) => window.index !== action.payload,
            )
            return { ...state, activeWindows }
        }

        case CLOSE_WINDOW_BOX: {
            let { openWindows, activeWindows } = state
            activeWindows = activeWindows.filter(
                (window: WindowsProps) => window.index !== action.payload,
            )
            openWindows = openWindows.filter(
                (window: WindowsProps) => window.index !== action.payload,
            )
            return {
                ...state,
                openWindows,
                activeWindows,
            }
        }
        default:
            return state
    }
}
