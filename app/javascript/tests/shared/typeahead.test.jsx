import React from 'react'
import renderer from 'react-test-renderer'

let promise = null

jest.mock('@api')
import { TypeaheadApi } from '@api'
TypeaheadApi.mockReturnValue(() => (
  promise = Promise.resolve({ data: [{ value: 1, text: 'Option 1' }] })
))

import Typeahead from '../../shared/typeahead'

jest.useFakeTimers()
test('Can load options', () => {
  const component = renderer.create(<Typeahead source="test" />)
  expect(component.toJSON()).toMatchSnapshot()

  component.getInstance().loadOptions(null, { searchQuery: 'Query' })
  jest.runAllTimers()

  promise.then(() => {
    component.getInstance().forceUpdate()
    expect(component.toJSON()).toMatchSnapshot()
  })
})

test('Can add new options', () => {
  const component = renderer.create(<Typeahead source="test" />)
  expect(component.toJSON()).toMatchSnapshot()

  component.getInstance().addItem(null, { value: 'New Option' })
  component.getInstance().forceUpdate()
  expect(component.toJSON()).toMatchSnapshot()
})
