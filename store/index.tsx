import { useReducer, useContext, createContext } from 'react'
import { initialState, reducer } from './reducers'

const Store = createContext<{ state: typeof initialState; dispatch: (action: Action) => void }>({
    state: initialState,
    dispatch: () => {},
})

export const AppProvider: React.FC<PropIsChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}

export const useCtx = () => useContext(Store)
