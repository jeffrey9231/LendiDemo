export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

//action creater
export const invalidateReddit = urlData => ({
  type: INVALIDATE_REDDIT,
  urlData
})

export const requestPosts = urlData => ({
  type: REQUEST_POSTS,
  urlData
})

export const receivePosts = (urlData, json) => ({
  type: RECEIVE_POSTS,
  urlData,
  posts: json,
  receivedAt: Date.now()
})


export const fetchPosts = (urlData, urlPath) => dispatch => {
  dispatch(requestPosts(urlData))
  return fetch(urlPath)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(urlData, json)))
}

const shouldFetchPosts = (state, urlData) => {
	
  const posts = state[urlData]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

// Thunk middleware lets me dispatch thunk async actions
// Return a function that accepts `dispatch` so we can dispatch later.
// Thunk middleware knows how to turn thunk async actions into actions.
export const fetchPostsIfNeeded = (urlData, urlPath) => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), urlData)) {
    return dispatch(fetchPosts(urlData, urlPath))
  }
}
