import defaultResolve, { PublishAction, UnpublishAction } from 'part:@sanity/base/document-actions'

export default function resolveDocumentActions(props) {
    // if (['site.nav'].includes(props.type)) {
    //     return [UnpublishAction, PublishAction]
    // } else {
    //     return defaultResolve(props)
    // }
    return [UnpublishAction, PublishAction]
}
