import { initialState } from './state';
import * as ActionTypes from './constants'

export default PendingPublicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PUBLICATIONS_PENDING: {
      return {
        ...state,
        publications: state.publication.concat(action.payload)
      }
    }
    case ActionTypes.CANCEL_publications:
    case ActionTypes.PUBLICATION_ADDED: {
      return {
        ...state,
        publications: state.publication.filter(x => x.savingDate !== action.date)
      }
    }
    default: return state
  }
}
