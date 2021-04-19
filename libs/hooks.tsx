import { useEffect, useState } from 'react'

export const useDate = () => {
    const locale = 'en'
    const [today, setDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date())
        }, 60 * 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    const day = today.toLocaleDateString(locale, { weekday: 'long' })
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {
        month: 'long',
    })}\n\n`

    const hour = today.getHours()

    const time = today.toLocaleTimeString(locale, {
        hour: 'numeric',
        hour12: true,
        minute: 'numeric',
    })
    const year = today.getFullYear()

    return {
        date,
        time,
        year,
    }
}
