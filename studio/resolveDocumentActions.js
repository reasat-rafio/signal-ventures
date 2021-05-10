import defaultResolve, {
    PublishAction,
    DiscardChangesAction,
} from 'part:@sanity/base/document-actions'

export default function resolveDocumentActions(props) {
    if (['site.nav'].includes(props.type)) {
        return [PublishAction, DiscardChangesAction]
    } else {
        return defaultResolve(props)
    }
}
