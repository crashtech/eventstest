import React from 'react'
import { NavLink } from 'react-router-dom'

import { Menu, Icon } from 'semantic-ui-react'

export default function() {
  return <Menu inverted borderless icon="labeled" fixed="top">
    <Menu.Item exact as={NavLink} to="/">
      <Icon name="home" />
      Home
    </Menu.Item>
    <Menu.Item as={NavLink} to="/create">
      <Icon name="plus" />
      Create Event
    </Menu.Item>
  </Menu>
}
