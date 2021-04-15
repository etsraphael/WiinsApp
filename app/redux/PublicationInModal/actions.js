import * as ActionTypes from './constants'

export function putPublicationInModal(payload, space) {
    return { type: ActionTypes.PUT_PUBLICATION_IN_MODAL, payload, space }
}

export function resetPublicationInModal() {
    return { type: ActionTypes.RESET_PUBLICATIONS_IN_MODAL }
}

export function getFeedPublicationByIdStart() {
    return { type: ActionTypes.GET_FEED_PUBLICATION_BY_ID_START }
}

export function getFeedPublicationByIdSuccess(payload, space) {
    return { type: ActionTypes.GET_FEED_PUBLICATION_BY_ID_SUCCESS, payload, space }
}

export function getFeedPublicationByIdFail(payload) {
    return { type: ActionTypes.GET_FEED_PUBLICATION_BY_ID_FAIL, payload }
}

export function putPublicationInModalActions(publication, space) {
    return (dispatch) => dispatch(putPublicationInModal(publication, space))
}

export function resetPublicationInModalActions() {
    return (dispatch) => dispatch(resetPublicationInModal())
}