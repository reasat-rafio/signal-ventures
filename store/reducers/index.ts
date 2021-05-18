import {
    HIDE_MODAL,
    LOADING_END,
    LOADING_START,
    SET_MODE,
    SHOW_MODAL,
    SUB_PORTFOLIO_DATA,
} from './../types'
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
    subPortfolio: {},
    focusWindow: null,
    darkMode: true,
    loading: false,
    showModal: false,
    modalData: {
        success: false,
    },
}

export const reducer = (state: InitalState, action: Action) => {
    switch (action.type) {
        case CREATE_WINDOW_BOX: {
            const { openWindows, activeWindows } = state

            if (
                !openWindows.map((window: WindowsProps) => window.key).includes(action.payload.key)
            ) {
                openWindows.push(action.payload)
            }
            if (
                !activeWindows
                    .map((window: WindowsProps) => window.key)
                    .includes(action.payload.key)
            ) {
                activeWindows.push(action.payload)
            }

            return { ...state, openWindows, activeWindows, focusWindow: action.payload.key }
        }
        case MINIMIZE_WINDOW_BOX: {
            let { activeWindows } = state
            activeWindows = activeWindows.filter(
                (window: WindowsProps) => window.key !== action.payload,
            )
            return { ...state, activeWindows }
        }

        case CLOSE_WINDOW_BOX: {
            let { openWindows, activeWindows } = state
            activeWindows = activeWindows.filter(
                (window: WindowsProps) => window.key !== action.payload,
            )
            openWindows = openWindows.filter(
                (window: WindowsProps) => window.key !== action.payload,
            )
            if (action.payload == 'sub') {
                return {
                    ...state,
                    openWindows,
                    activeWindows,
                    subPortfolio: {},
                }
            } else {
                return {
                    ...state,
                    openWindows,
                    activeWindows,
                }
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

        case SET_MODE:
            return {
                ...state,
                darkMode: action.payload,
            }

        case LOADING_START:
            return {
                ...state,
                loading: true,
            }

        case LOADING_END:
            return {
                ...state,
                loading: false,
            }

        case SHOW_MODAL:
            return {
                ...state,
                showModal: true,
                modalData: action.payload,
            }

        case HIDE_MODAL:
            return {
                ...state,
                showModal: false,
                modalData: {},
            }

        case SUB_PORTFOLIO_DATA:
            return {
                ...state,
                subPortfolio: action.payload,
            }

        default:
            return state
    }
}
