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

export const useSiteHeightAndWidth = (myRef: any) => {
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)

    useEffect(() => {
        setWidth(myRef.current.offsetWidth)
        setHeight(myRef.current.offsetHeight)
        const handleResize = () => {
            setWidth(myRef.current.offsetWidth)
            setHeight(myRef.current.offsetHeight)
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [myRef])
    return { height, width }
}

export const useToText = (item: IBloginfo[], feed: { image: string; link: string }) => {
    const [blogInfo, setBlogInfo] = useState<IBloginfo[]>([])
    const { image, link } = feed

    useEffect(() => {
        const newArr = item.map(({ content, author, pubDate, title, thumbnail }: IBloginfo) => {
            let tag = document.createElement('div')
            tag.innerHTML = content
            return {
                content: tag.innerText.slice(0, 600) + '...',
                pubDate,
                title,
                thumbnail,
                author,
                image,
                link,
            }
        })
        setBlogInfo(newArr)
    }, [])
    return { blogInfo }
}

export const useOrderNavs = (navs, theme) => {
    const [navigations, setNavigations] = useState<any>()

    useEffect(() => {
        const _navs = navs.filter((n) => n.dark_mode == undefined)
        const dark_and_light_navs = navs.filter((n) => n.dark_mode != undefined)
        setNavigations(_navs)

        if (theme) {
            const _dark_nav = dark_and_light_navs.filter((d) => !d.dark_mode)
            const newNav = [..._navs.reverse(), ..._dark_nav].sort((n) =>
                n.dark_mode != undefined ? -1 : 1,
            )
            setNavigations(newNav)
        } else {
            const _light_nav = dark_and_light_navs.filter((d) => d.dark_mode)
            const newNav = [..._navs.reverse(), ..._light_nav].sort((n) =>
                n.dark_mode != undefined ? -1 : 1,
            )
            setNavigations(newNav)
        }
    }, [theme])
    return {
        navigations,
    }
}
