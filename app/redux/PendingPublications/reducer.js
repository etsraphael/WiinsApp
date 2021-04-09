import { initialState } from './state';
import * as ActionTypes from './constants'

export default PendingPublicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PUBLICATIONS_PENDING: {
      return {
        ...state,
        publications: state.publications.concat(action.payload)
      }
    }
    case ActionTypes.CANCEL_PUBLICATION:
    case ActionTypes.DELETE_ITEM_IN_PENDING_LIST: {
      return {
        ...state,
        publications: state.publications.filter(x => x.savingDate !== action.date)
      }
    }
    default: return { ...state }
  }
}
