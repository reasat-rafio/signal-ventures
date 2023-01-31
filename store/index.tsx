import { useReducer, useContext, createContext, useEffect } from 'react'
import { initialState, reducer } from './reducers'

const Store = createContext<{ state: typeof initialState; dispatch: (action: Action) => void }>({
    state: initialState,
    dispatch: () => {},
})

export const AppProvider: React.FC<PropIsChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('signal_ventures_active_mode', JSON.stringify(state.darkMode))
        }
    }, [state])

    return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}

export const useCtx = () => useContext(Store)
