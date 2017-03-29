import React, { PropTypes } from 'react'

const Img = ({imgUrl, thumbnailUrl, onClick}) => (
	
  <span className={'myImg'} onClick={e => onClick(imgUrl)} ><img src={thumbnailUrl}/></span>
)

Img.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Img
