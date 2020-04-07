import React from 'react'
import { render } from 'react-dom'

import 'semantic-ui-css/semantic.min.css'
import '@shared/application.scss'

document.addEventListener('DOMContentLoaded', () => {
  render(
    <div>Hello from React!</div>,
    document.getElementById('layout')
  )
})
