import { initialState } from './state';
import * as ActionTypes from './constants'

export default PublicationsProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PUT_PUBLICATION_IN_MODAL: return { publication: action.payload }
    case ActionTypes.error: return { ...initialState }
    default: return { ...state }
  }
}
