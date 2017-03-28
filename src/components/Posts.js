import React, { PropTypes } from 'react'

const Posts = ({posts}) => (
 
  <table className={'table table-striped'}>
    <thead>
      <tr>
        <th>Title</th>
        <th>AlbumId</th>
        <th>Url</th>
        <th>ThumbnailUrl</th>
      </tr>
    </thead>
    <tbody>
	  {posts.map((post) =>
		  <tr key={post.id}>
			<td>{post.title}</td>
			<td>{post.albumId}</td>
			<td>{post.url}</td>
			<td>{post.thumbnailUrl}</td>
		  </tr>
	  )}
    </tbody>
  </table>
)

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts
