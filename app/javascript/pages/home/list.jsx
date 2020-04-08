import React, { Component } from 'react'

import { observer } from 'mobx-react'

import './list.scss'

@observer
export default class List extends Component {
  render() {
    return <ul>
      {this.props.items.map(item => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  }
}
