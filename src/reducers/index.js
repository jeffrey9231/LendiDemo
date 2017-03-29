import {
  INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS,
  SHOW_IMG, HIDE_IMG
} from '../actions'


const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  isImgShowing: false
}, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false		
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
	case SHOW_IMG:
      return {
        ...state,
        isImgShowing: true,
		imgUrl: action.imgUrl
      }
	case HIDE_IMG:
      return {
        ...state,
        isImgShowing: false
      }
    default:
      return state
  }
}

//Reducer
const postsRequest = (state = {}, action) => {

  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
	case SHOW_IMG:
	case HIDE_IMG:

      return {
        ...state,
		//create data by urlDate name
        [action.urlData]: posts(state[action.urlData], action)
      }
    default:
      return state
  }
}

export default postsRequest
