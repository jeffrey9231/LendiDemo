import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPostsIfNeeded, invalidateReddit, showImg, hideImg } from '../actions'
import Posts from '../components/Posts'

class App extends Component {
  static propTypes = {
    urlData: PropTypes.string.isRequired,
	urlPath: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
	isImgShowing: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, urlData, urlPath } = this.props
    dispatch(fetchPostsIfNeeded(urlData, urlPath))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.postsRequest !== this.props.urlData) {
      const { dispatch, urlData } = nextProps
      dispatch(fetchPostsIfNeeded(urlData, this.props.urlPath))
    }
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, urlData, urlPath } = this.props
    dispatch(invalidateReddit(urlData))
    dispatch(fetchPostsIfNeeded(urlData, urlPath))
  }
  
   handleImgShowClick = (imgUrl) => {

    const { dispatch, urlData } = this.props
    dispatch(showImg(urlData, imgUrl))
  }
  
   handleImgHideClick = (e) => {
    e.preventDefault()

    const { dispatch, urlData } = this.props
    dispatch(hideImg(urlData))
  }

  render() {
    const { posts, isFetching, lastUpdated, isImgShowing, imgUrl } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
	    <h2>Data List</h2>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} onClick={(e) => this.handleImgShowClick(e)}/>
            </div>
        }
			
		{isImgShowing
			?<div  className={'modal'} style={{display: 'block'}}>
			  <span className={'close'} onClick={this.handleImgHideClick} >×</span>
			  <img className={'modal-content'} src={imgUrl}/>
			  <div id="caption"></div>
			 </div>
			:<div className={'modal'} style={{display: 'none'}}></div>
		}
		  	
      </div>
	    
    )
  }
}

const mapStateToProps = state => {
  const postsRequest = state
  
  //set default value
  const urlData = 'lendiUrlData'
  const urlPath = 'https://jsonplaceholder.typicode.com/photos'
 
  const {
    isFetching,
    lastUpdated,
    items: posts,
	isImgShowing,
	imgUrl
  } = postsRequest[urlData] || {
    isFetching: true,
    items: [],
	isImgShowing: false
  }

  return {
    urlData,
	urlPath,
    posts,
    isFetching,
    lastUpdated,
	isImgShowing,
	imgUrl
  }
}

export default connect(mapStateToProps)(App)
