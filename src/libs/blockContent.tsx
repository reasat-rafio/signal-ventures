//@ts-nocheck
// TODO fix typescript errors
import BlockContent from '@sanity/block-content-to-react'

export const typesSerializer = {
    block: (p: any) => {
        const { style } = p.node

        if (style === 'normal') {
            return <div className="">{p.children}</div>
        }
        return BlockContent.defaultSerializers.types.block(p)
    },
}

export const marksSerializer = {
    fontSize: ({ children, mark }: { children: any[]; mark: any }) => (
        <span style={{ fontSize: `${mark.size}px` }}>{children}</span>
    ),
}
