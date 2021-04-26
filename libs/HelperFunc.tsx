import { CREATE_WINDOW_BOX, TOGGLE_DARK_MODE } from '../store/types'

export const NavAction = (
    title: string,
    logo: string,
    key: string,
    dark_mode: number | undefined,
    dispatch: any,
    href?: string,
) => {
    if (key != undefined) {
        dispatch({
            type: CREATE_WINDOW_BOX,
            payload: {
                name: title,
                icon: logo,
                key: key,
            },
        })
    } else {
        if (dark_mode == undefined) {
            if (typeof window !== 'undefined' && typeof href !== 'undefined') {
                document.location.href = href
            }
        } else {
            dispatch({
                type: TOGGLE_DARK_MODE,
            })
        }
    }
}
