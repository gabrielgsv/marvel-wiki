import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Heroes from './components/heroes'
import Comics from './components/comics'

export default function Router() {
  return(
    <Switch>
      <Route exact path='/' component={Heroes} />
      <Route path='/comics' component={Comics} />
    </Switch>
  )
}