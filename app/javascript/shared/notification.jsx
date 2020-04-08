import React, { Component } from 'react'

import { Message } from 'semantic-ui-react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import './notification.scss'

@observer
export default class Notification extends Component {
  @observable static current = null

  @action static send(type, title) {
    Notification.current = { type, title }
    setTimeout(action(() => Notification.current = null), 5000)
  }

  render() {
    const current = this.constructor.current
    if(!current) { return null }

    const rest = { [current.type]: true }

    return <Message header={current.title} {...rest} />
  }
}
