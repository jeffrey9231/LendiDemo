import React, { PropTypes } from 'react'

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
			<td><span className={'myImg'} onClick={e => onClick(post.url)} ><img src={post.thumbnailUrl} alt={post.title} /></span></td>
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
