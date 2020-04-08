import React, { Suspense, lazy } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { configure } from 'mobx'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'

import Header from '@shared/header'

const HomePage = lazy(() => import('@pages/home'));
const CreateEventPage = lazy(() => import('@pages/create-event'));

import 'semantic-ui-css/semantic.min.css'
import '@shared/application.scss'

configure({ enforceActions: 'observed' })
document.addEventListener('DOMContentLoaded', () => {
  const loading = <Segment>
    <Dimmer active>
      <Loader size="huge" />
    </Dimmer>
  </Segment>

  render(
    <Router>
      <Header />
      <Suspense fallback={loading}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/create" component={CreateEventPage} />
          <Route path="/:genreSlug" component={HomePage} />
        </Switch>
      </Suspense>
    </Router>,
    document.getElementById('layout')
  )
})
