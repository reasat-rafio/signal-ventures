import { useReducer, useContext, createContext, useEffect } from 'react'
import { initialState, reducer } from './reducers'

const Store = createContext<{ state: typeof initialState; dispatch: (action: Action) => void }>({
    state: initialState,
    dispatch: () => {},
})

export const AppProvider: React.FC<PropIsChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState, () => {
        if (typeof window !== 'undefined') {
            const localData = localStorage.getItem('signal_ventures_active_mode')

            if (localData) {
                const mode = JSON.parse(localData)
                return {
                    ...initialState,
                    darkMode: mode,
                }
            } else {
                return initialState
            }
        }
        return initialState
    })

    useEffect(() => {
        localStorage.setItem('signal_ventures_active_mode', JSON.stringify(state.darkMode))
    }, [state])

    return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}

export const useCtx = () => useContext(Store)
