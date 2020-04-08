import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { find, map } from 'lodash'

import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { Select, List, Icon } from 'semantic-ui-react'
import { observable, action, toJS } from 'mobx'
import { observer } from 'mobx-react'

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
  @observable internalValue = []

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
    return this.props.typeahead ? Typeahead : Select
  }

  change() {
    const { onChange } = this.props
    onChange(map(this.internalValue, 'value'))
  }

  @action addItem = (_, data) => {
    const option = toJS(data.options.find(({ value }) => value === data.value)) || { value: data.value, text: data.value }
    if(find(this.internalValue, { value: option.value })) { return }

    this.internalValue.push(option)
    this.change()
  }

  @action removeItem = index => {
    this.internalValue.splice(index, 1)
    this.change()
  }

  @action changeOrder = ({ oldIndex, newIndex }) => {
    const item = this.internalValue[oldIndex]
    this.internalValue.splice(oldIndex, 1)
    this.internalValue.splice(newIndex, 0, item)
    this.change()
  }

  render() {
    const { onChange, value, typeahead, ...rest } = this.props
    if(typeahead) { rest.source = typeahead }

    return <Fragment>
      <this.component
        value=""
        className="sortable-field"
        onChange={this.addItem}
        {...rest}
      />

      <SortableList
        items={this.internalValue}
        pressDelay={200}
        onSortEnd={this.changeOrder}
        onRemove={this.removeItem}
      />
    </Fragment>
  }
}
