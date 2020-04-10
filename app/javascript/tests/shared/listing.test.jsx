import React from 'react'
import renderer from 'react-test-renderer'

import Listing from '../../shared/listing'

const itemRenderer = (item) => item
const dateRenderer = ({ text }) => text

test('Simple listing result', () => {
  const data = ['Item 1', 'Item 2', 'Item 3']
  const fetcher = () => Promise.resolve({ data: [], headers: { 'x-chunks': 2 }, update: () => {} })
  const component = renderer.create(
    <Listing
      items={data}
      fetcher={fetcher}
      renderer={itemRenderer}
    />,
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('Can load new records', () => {
  let data = []
  let promise = null
  const fetcher = () => promise = Promise.resolve({
    data: ['Item 1', 'Item 2'],
    headers: { 'x-chunks': 2 },
    update: (items) => data = items,
  })

  const component = renderer.create(<Listing items={data} fetcher={fetcher} renderer={itemRenderer} />)
  expect(component.toJSON()).toMatchSnapshot()

  promise.then(() => {
    renderer.update(<Listing items={data} fetcher={fetcher} renderer={itemRenderer} />)
    expect(component.toJSON()).toMatchSnapshot()
  })
})

test('Can have a fallback', () => {
  const data = []
  const fetcher = () => Promise.resolve({ data: [], headers: {}, update: () => {} })
  const component = renderer.create(
    <Listing
      items={data}
      fetcher={fetcher}
      fallback='No records'
      renderer={itemRenderer}
    />,
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('Can be divided by day', () => {
  const data = [
    { text: 'Item 1', date: '2020-01-01' },
    { text: 'Item 2', date: '2020-01-01' },
    { text: 'Item 3', date: '2020-01-02' },
  ]

  const fetcher = () => Promise.resolve({ data: [], headers: {}, update: () => {} })
  const component = renderer.create(
    <Listing
      items={data}
      fetcher={fetcher}
      renderer={dateRenderer}
      dividedBy="day"
      dividedProp="date"
    />,
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('Can be divided by month', () => {
  const data = [
    { text: 'Item 1', date: '2020-01-01' },
    { text: 'Item 2', date: '2020-02-01' },
    { text: 'Item 3', date: '2020-03-01' },
  ]

  const fetcher = () => Promise.resolve({ data: [], headers: {}, update: () => {} })
  const component = renderer.create(
    <Listing
      items={data}
      fetcher={fetcher}
      renderer={dateRenderer}
      dividedBy="month"
      dividedProp="date"
    />,
  )

  expect(component.toJSON()).toMatchSnapshot()
})
