import React, { PropTypes } from 'react'
import Img from '../components/Img'

const Posts = ({posts, onClick}) => (
	
  <table className={'table table-striped'}>
    <thead>
      <tr>
	    <th></th>
        <th>Title</th>
        <th>AlbumId</th>
      </tr>
    </thead>
    <tbody>
	
	  {posts.map((post) =>  
	  
		  <tr key={post.id}>		  
			
			<td><Img imgUrl={post.url} thumbnailUrl={post.thumbnailUrl} onClick={(e) => onClick(e)} /></td>
			<td>{post.title}</td>
			<td>{post.albumId}</td>
		  </tr>
	  )}
    </tbody>
  </table>
)

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Posts
