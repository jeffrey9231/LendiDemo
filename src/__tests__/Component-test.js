import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import Posts from '../components/Posts'


function setup() {

  const props = {
    posts: [{
		"albumId": 99,
		"id": 1,
		"title": "accusamus beatae ad facilis cum similique qui sunt",
		"url": "http://placehold.it/22222/9fiv893mhjdfk42c952",
		"thumbnailUrl": "http://placehold.it/150/92c952"
    }],
	onClick:()=>{}
  }

  const enzymeWrapper = shallow(<Posts {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('Posts', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup()

      expect(enzymeWrapper.find('table').length).toBe(1)
	  
	  expect(enzymeWrapper.find('table').hasClass('table')).toBe(true)
	  
	  expect(enzymeWrapper.find('table').hasClass('table-striped')).toBe(true)
     
    })
	
	it('should have one data row', () => {
      const { enzymeWrapper } = setup()
      
      expect(enzymeWrapper.find('tr').length).toBe(2)

	  expect(enzymeWrapper.find('[src="http://placehold.it/150/92c952"]').length).toBe(1)
	  
	  expect(enzymeWrapper.find('tbody td').at(1).text()).toBe('accusamus beatae ad facilis cum similique qui sunt')
	  
	  expect(enzymeWrapper.find('tbody td').at(2).text()).toBe('99')

    })
   
  })
})