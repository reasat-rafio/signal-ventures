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

export const useToText = (
    item: IBloginfo[],
    feed: { image: string; link: string },
    width: number,
    isExpanded: boolean,
) => {
    const [blogInfo, setBlogInfo] = useState<IBloginfo[]>([])
    const { image, link } = feed
    const [pageWidth, setPageWidth] = useState<number>(0)

    // This will set the words count for the article based on page width
    useEffect(() => {
        if (!isExpanded) {
            if (width < 500) {
                setPageWidth(300)
            } else {
                setPageWidth(600)
            }
        } else {
            if (width >= 1785) {
                setPageWidth(2400)
            } else if (width < 1784 && width >= 1275) {
                setPageWidth(1000)
            } else if (width < 1275 && width >= 500) {
                setPageWidth(600)
            } else {
                setPageWidth(300)
            }
        }
    }, [width, isExpanded])

    useEffect(() => {
        const newArr = item.map(({ content, author, pubDate, title, thumbnail }: IBloginfo) => {
            let tag = document.createElement('div')
            tag.innerHTML = content
            return {
                content: tag.innerText.slice(0, pageWidth) + '...',
                pubDate,
                title,
                thumbnail,
                author,
                image,
                link,
            }
        })
        setBlogInfo(newArr)
    }, [pageWidth])
    return { blogInfo }
}

export const useOrderNavs = (navs: Inavs[], darkMode: boolean) => {
    const [navigations, setNavigations] = useState<Inavs[]>([])

    useEffect(() => {
        // filtering out the navs that dont have "dark_mode" value (ex: Article, Portfolio, Contact, Twitter)
        const _navs = navs.filter((n) => n.dark_mode == undefined)
        // filtering out the navs that  have "dark_mode" value (ex: Switch to dark mode, Switch to light mode)
        const dark_and_light_navs = navs.filter((n) => n.dark_mode != undefined)
        setNavigations(_navs)

        if (darkMode) {
            // If DarkMode is true then only keeping 'Switch to light mode' and removing 'Switch to darkmode'
            const _dark_nav = dark_and_light_navs.filter((d) => !d.dark_mode)
            // Ordering the navs
            const newNav = [..._navs, ..._dark_nav].sort((n) => (n.dark_mode != undefined ? -1 : 1))
            setNavigations(newNav)
        } else {
            // If DarkMode is false then only keeping 'Switch to dark mode' and removing 'Switch to light mode'
            const _light_nav = dark_and_light_navs.filter((d) => d.dark_mode)
            // Ordering the navs
            const newNav = [..._navs, ..._light_nav].sort((n) =>
                n.dark_mode != undefined ? -1 : 1,
            )
            setNavigations(newNav)
        }
    }, [darkMode])
    return {
        navigations,
    }
}
