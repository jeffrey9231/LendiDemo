import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions'
import nock from 'nock'
import expect from 'expect' 
require('isomorphic-fetch')

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  const urlData = 'lendiUrlData'
  const urlPath = 'https://jsonplaceholder.typicode.com/photos'
  
  it('creates RECEIVE_POSTS when fetching data has been done', () => {
    nock('https://jsonplaceholder.typicode.com/')
      .get('/photos')
      .reply(200, [])

    const expectedActions = [
      { type: actions.REQUEST_POSTS, urlData: 'lendiUrlData' },
	  //because receivedAt be new in the async callback function so can't get accurate time in test 
	  //there will get error in test 
      { type: actions.RECEIVE_POSTS, urlData: 'lendiUrlData' , posts: [], receivedAt: Date.now() }
    ]
    const store = mockStore({ posts: [] })

    return store.dispatch(actions.fetchPosts(urlData, urlPath))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})