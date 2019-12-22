import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Customer from './components/Customer'
import Pizza from './components/Pizza'
import Checkout from './components/Checkout'
import NotFound from './components/NotFound'
import OrderSent from './components/OrderSent'

export default function Routes(props) {
  return (
    <Router>
      <Switch>
        <Route exact path='/' render={() => <Customer {...props} />} />
        <Route path='/pizzas' render={() => <Pizza {...props} />} />
        <Route path='/checkout' render={() => <Checkout {...props} />} />
        <Route path='/success' component={OrderSent}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </Router>
  )
}
