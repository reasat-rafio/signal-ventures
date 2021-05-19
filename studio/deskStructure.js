import S from '@sanity/desk-tool/structure-builder'
import * as Structure from 'sanity-plugin-intl-input/lib/structure'
import { GrEdit, GrView } from 'react-icons/gr'
import * as React from 'react'
import { FaSitemap } from 'react-icons/fa'

function SitePreview({ document, options }) {
    if (!process.env.SANITY_STUDIO_PREVIEW_URL) {
        console.warn(
            'SANITY_STUDIO_PREVIEW_URL should be set for preview to work! Falling back to localhost:3000',
        )
    }
    return (
        <iframe
            src={`${
                process.env.SANITY_STUDIO_PREVIEW_URL ?? 'http://localhost:3000'
            }/api/preview?secret=${process.env.SANITY_STUDIO_PREVIEW_TOKEN}&slug=${options.slug}`}
            style={{ width: '100%', height: '100%', border: 0 }}
        />
    )
}

// default implementation by re-exporting
// export const getDefaultDocumentNode = Structure.getDefaultDocumentNode
// export default Structure.default

// // or manual implementation to use with your own custom desk structure

export const getDefaultDocumentNode = (props) => {
    if (props.schemaType === 'portfolio') {
        return S.document().views(S.view.form())
    } else {
        return S.document().views([
            ...Structure.getDocumentNodeViewsForSchemaType(props.schemaType),
            S.view.component(SitePreview).icon(GrView).options({ slug: '' }).title('Preview'),
        ])
    }
}

const groupItems = ({ schemaType }) => {
    return [
        ...Structure.getFilteredDocumentTypeListItems().filter((i) =>
            i.getId().includes(schemaType),
        ),
    ]
}

export default () =>
    S.list()
        .title('Content')
        .id('__root__')
        .items([
            S.listItem()
                .title('Site')
                .icon(FaSitemap)
                .child(
                    S.list()
                        .title('Site')
                        .items([
                            ...groupItems({
                                schemaType: 'site.logos',
                            }),
                            ...groupItems({
                                schemaType: 'site.nav',
                            }),
                            ...groupItems({
                                schemaType: 'site.startButton',
                            }),
                            ...groupItems({
                                schemaType: 'site.languageSwitcher',
                            }),
                            ...groupItems({
                                schemaType: 'seo',
                            }),
                            ...groupItems({
                                schemaType: 'more',
                            }),
                        ]),
                ),

            S.divider(),
            ...groupItems({
                schemaType: 'Page',
            }),

            S.divider(),
            ...groupItems({
                schemaType: 'articles',
            }),
            ...groupItems({
                schemaType: 'contact',
            }),
            ...groupItems({
                schemaType: 'portfolio',
            }),

            S.divider(),
            ...Structure.getFilteredDocumentTypeListItems()
                .filter(
                    (item) =>
                        ![
                            'site.nav',
                            'site.startButton',
                            'site.logos',
                            'site.languageSwitcher',
                            'landingPage',
                            'articles',
                            'contact',
                            'portfolio',
                            'seo',
                            'more',
                        ].includes(item.getId()) &&
                        !item
                            .getId()
                            .includes('site' || 'Page' || 'articles' || 'contact' || 'portfolio'),
                )
                .reverse(),
        ])
