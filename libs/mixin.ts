import { css } from 'styled-components'
import { breakpoints } from './_variables'

export const respondTo: any = Object.keys(breakpoints).reduce((accumulator, label) => {
    const _css: any = css
    accumulator[label] = (...args) => _css`
        @media (min-width: ${breakpoints[label]}) {
            ${_css(...args)} ;
        }
    `
    return accumulator
}, {})
