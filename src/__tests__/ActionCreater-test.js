import * as actions from '../actions'

describe('invalidateReddit action', () => {
  it('should create an action to change status.didInvalidate', () => {
    const urlData = 'lendiUrlData'
    const expectedAction = {
      type: actions.INVALIDATE_REDDIT,
	  urlData
    }
    expect(actions.invalidateReddit(urlData)).toEqual(expectedAction)
  })
})

describe('requestPosts action', () => {
  it('should create an action to post request', () => {
    const urlData = 'lendiUrlData'
    const expectedAction = {
      type: actions.REQUEST_POSTS,
      urlData
    }
    expect(actions.requestPosts(urlData)).toEqual(expectedAction)
  })
})

describe('receivePosts action', () => {
  it('should create an action to receive post data', () => {
    const urlData = 'lendiUrlData'
    const expectedAction = {
      type: actions.RECEIVE_POSTS,
	  urlData,
	  posts: {},
	  receivedAt: Date.now()
    }
    expect(actions.receivePosts(urlData, {})).toEqual(expectedAction)
  })
})
