import expect from 'expect'
import reducer from '../reducers'
import * as types from '../actions'

describe('test reducer', () => {
	
  it('should return the initial state', () => {
    expect(
      reducer(undefined,{type:"@@redux/INIT"})
    ).toEqual({})
  })
  
  it('should handle INVALIDATE_REDDIT', () => {	
    expect(
      reducer({lendiUrlData:{didInvalidate:false,isFetching:false,items:[],lastUpdated:'1490683243749'}},{type:"INVALIDATE_REDDIT",urlData:"lendiUrlData"})
    ).toEqual({lendiUrlData:{didInvalidate:true,isFetching:false,items:[],lastUpdated:'1490683243749'}})
  })
  
  it('should handle REQUEST_POSTS', () => {
    expect(
      reducer({lendiUrlData:{didInvalidate:true,isFetching:false,items:[]}},{type:"REQUEST_POSTS",urlData:"lendiUrlData"})
    ).toEqual({lendiUrlData:{didInvalidate:false,isFetching:true,items:[]}})
  })
  
  it('should handle RECEIVE_POSTS', () => {
    expect(
      reducer({lendiUrlData:{didInvalidate:false,isFetching:true,items:[],lastUpdated:'1490685111111'}},{type:"RECEIVE_POSTS",urlData:"lendiUrlData",posts:[],receivedAt:'1490685615289'})
    ).toEqual({lendiUrlData:{didInvalidate:false,isFetching:false,items:[],lastUpdated:'1490685615289'}})
  })

})