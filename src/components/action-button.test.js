/* eslint-disable */
import React from 'react'
import renderer from 'react-test-renderer'
import ActionButton from './action-button'

describe('action button', () => {
  it('renders', () => {
    const component = renderer.create(<ActionButton onClick={() => console.log('clicked')}>do this</ActionButton>)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
