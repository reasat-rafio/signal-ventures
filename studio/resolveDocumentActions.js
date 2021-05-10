// import defaultResolve, {
//     PublishAction,
//     DiscardChangesAction,
//     DeleteAction,
// } from 'part:@sanity/base/document-actions'

// export default function resolveDocumentActions(props) {
//     if (['site.nav'].includes(props.type)) {
//         return [PublishAction, DiscardChangesAction]
//     } else {
//         return defaultResolve(props)
//     }
// }

import { PublishAction, DiscardChangesAction } from 'part:@sanity/base/document-actions'
import defaultResolve from 'part:@sanity/base/document-actions/resolver'

export default function resolveDocumentActions(props) {
    if (['site.nav'].includes(props.type)) {
        return [PublishAction, DiscardChangesAction]
    } else {
        return defaultResolve(props)
    }
}
