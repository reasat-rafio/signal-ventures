import {
    CREATE_WINDOW_BOX,
    MINIMIZE_WINDOW_BOX,
    CLOSE_WINDOW_BOX,
    FOCUS_WINDOW_BOX,
    TOGGLE_DARK_MODE,
} from '../types'

export const initialState: InitalState = {
    openWindows: [],
    activeWindows: [],
    focusWindow: null,
    darkMode: false,
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

            return { ...state, openWindows, activeWindows, focusWindow: action.payload.index }
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

        case FOCUS_WINDOW_BOX:
            return {
                ...state,
                focusWindow: action.payload,
            }

        case TOGGLE_DARK_MODE:
            const { darkMode } = state
            return {
                ...state,
                darkMode: !darkMode,
            }

        default:
            return state
    }
}
