/** 贴子 */
interface TiebaPost {
    id: string
    forum: {
        id: string
        name: string
        href: string
    }

    author: {
        portrait: string
        name: string
        href: string
    }
    time: string

    title: string
    content: string
    replies: number
    images: {
        thumb: string
        original: string
    }[]
}
