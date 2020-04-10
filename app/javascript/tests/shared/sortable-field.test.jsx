import React from 'react'
import renderer from 'react-test-renderer'

const options = [
  { value: 1, text: 'Option 1' },
  { value: 2, text: 'Option 2' },
  { value: 3, text: 'Option 3' },
]

import SortableField from '../../shared/sortable-field'

test('Can add item from options', () => {
  const mockOnChange = jest.fn()
  const component = renderer.create(<SortableField value={[]} options={[]} onChange={mockOnChange} />)
  expect(component.toJSON()).toMatchSnapshot()

  component.getInstance().addItem(null, { options, value: 2 })
  component.getInstance().forceUpdate()
  expect(component.toJSON()).toMatchSnapshot()
  expect(mockOnChange.mock.calls[0][0]).toStrictEqual([2])
})

test('Can add item from any value', () => {
  const mockOnChange = jest.fn()
  const component = renderer.create(<SortableField value={[]} options={[]} onChange={mockOnChange} />)
  expect(component.toJSON()).toMatchSnapshot()

  component.getInstance().addItem(null, { options, value: 'New Value' })
  component.getInstance().forceUpdate()
  expect(component.toJSON()).toMatchSnapshot()
  expect(mockOnChange.mock.calls[0][0]).toStrictEqual(['New Value'])
})

test('Can remove item', () => {
  const mockOnChange = jest.fn()
  const component = renderer.create(<SortableField value={[]} options={[]} onChange={mockOnChange} />)
  component.getInstance().addItem(null, { options, value: 1 })
  component.getInstance().addItem(null, { options, value: 2 })
  component.getInstance().forceUpdate()
  expect(component.toJSON()).toMatchSnapshot()
  expect(mockOnChange.mock.calls[1][0]).toStrictEqual([1, 2])

  component.getInstance().removeItem(0)
  component.getInstance().forceUpdate()
  expect(component.toJSON()).toMatchSnapshot()
  expect(mockOnChange.mock.calls[2][0]).toStrictEqual([2])
})

test('Can change order of the items', () => {
  const mockOnChange = jest.fn()
  const component = renderer.create(<SortableField value={[]} options={[]} onChange={mockOnChange} />)
  component.getInstance().addItem(null, { options, value: 1 })
  component.getInstance().addItem(null, { options, value: 2 })
  component.getInstance().forceUpdate()
  expect(component.toJSON()).toMatchSnapshot()
  expect(mockOnChange.mock.calls[1][0]).toStrictEqual([1, 2])

  component.getInstance().changeOrder({ oldIndex: 0, newIndex: 1 })
  component.getInstance().forceUpdate()
  expect(component.toJSON()).toMatchSnapshot()
  expect(mockOnChange.mock.calls[2][0]).toStrictEqual([2, 1])
})
