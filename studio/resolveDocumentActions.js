import { PublishAction, DiscardChangesAction } from 'part:@sanity/base/document-actions'
import allResolvers from 'all:part:@sanity/base/document-actions/resolver'

function resolveDocumentActions(props) {
    const otherResolvers = allResolvers.filter((r) => !r.isOwn)
    const defaultResolve = otherResolvers[otherResolvers.length - 1]
    console.log(defaultResolve(props))
    if (['site.nav'].includes(props.type)) {
        return [PublishAction, DiscardChangesAction]
    } else {
        return defaultResolve(props)
    }
}

resolveDocumentActions.isOwn = true
export default resolveDocumentActions
