import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { find } from 'lodash'

import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Select, List, Icon } from 'semantic-ui-react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'

import Typeahead from '@shared/typeahead'

import './sortable-field.scss'

const SortableItem = SortableElement(({value, onRemove}) => (
  <List.Item>
    {value}
    <Icon name="close" onClick={onRemove} />
  </List.Item>
))

const SortableList = SortableContainer(({items, onRemove}) => (
  <List ordered divided>
    {items.map((value, index) => (
      <SortableItem
        key={index}
        index={index}
        value={value.text}
        onRemove={() => onRemove(index)}
      />
    ))}
  </List>
))

@observer
export default class SortableField extends Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    typeahead: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  }

  static defaultProps = {
    typeahead: false,
  }

  get component() {
    return !!this.props.typeahead ? Typeahead : Select
  }

  change(newValue) {
    const { onChange } = this.props
    onChange(newValue)
  }

  addItem = (_, data) => {
    const option = toJS(data.options.find(({ value }) => value === data.value)) || { value: data.value, text: data.value }
    const newValue = toJS(this.props.value)

    if(!!find(newValue, { value: option.value })) { return }
    newValue.push(option)
    this.change(newValue)
  }

  removeItem = (index) => {
    const newValue = toJS(this.props.value)

    newValue.splice(index, 1)
    this.change(newValue)
  }

  changeOrder = ({ oldIndex, newIndex }) => {
    const newValue = toJS(this.props.value)
    const item = newValue[oldIndex]

    newValue.splice(oldIndex, 1)
    newValue.splice(newIndex, 0, item)
    this.change(newValue)
  }

  render() {
    const { onChange, value, typeahead, ...rest } = this.props
    if(!!typeahead) { rest.source = typeahead }

    return <Fragment>
      <this.component
        value=""
        className="sortable-field"
        onChange={this.addItem}
        {...rest}
      />

      <SortableList
        items={value}
        pressDelay={200}
        onSortEnd={this.changeOrder}
        onRemove={this.removeItem}
      />
    </Fragment>
  }
}
