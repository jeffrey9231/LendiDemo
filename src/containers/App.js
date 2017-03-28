import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPostsIfNeeded, invalidateReddit } from '../actions'
import Posts from '../components/Posts'

class App extends Component {
  static propTypes = {
    urlData: PropTypes.string.isRequired,
	urlPath: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
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

  render() {
    const { posts, isFetching, lastUpdated } = this.props
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
              <Posts posts={posts} />
            </div>
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
    items: posts
  } = postsRequest[urlData] || {
    isFetching: true,
    items: []
  }

  return {
    urlData,
	urlPath,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
