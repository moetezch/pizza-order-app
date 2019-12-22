import React from 'react'
import { Link } from 'react-router-dom'
import { sizes } from '../constants/pizzaSize'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function Checkout({ selectedPizzas, costumerDetails }) {
  const history = useHistory()
  const onCheckoutButtonClick = () => {
    const pizzas = selectedPizzas.map(pizza => {
      return {
        pizza_id: pizza.pizza_id,
        size_id: pizza.pizza_size,
        quantity: pizza.quantity,
      }
    })
    const body = {
      customer_name: costumerDetails.name,
      customer_phone: costumerDetails.mobileNumber,
      customer_address: costumerDetails.address,
      customer_city: costumerDetails.city,
      customer_zip_code: Number(costumerDetails.zipCode),
      pizzas,
    }
    axios
      .post('/api/orders', body)
      .then(function() {
        history.push('/success')
      })
      .catch(function(error) {
        console.log(error)
      })
  }
  let totalOrderPrice = 0
  function renderPizzaOrders() {
    return selectedPizzas.map(selectedPizza => {
      totalOrderPrice += selectedPizza.price
      return (
        <tr key={selectedPizza.uuid}>
          <td>{selectedPizza.type}</td>
          <td>{sizes[selectedPizza.pizza_size]}</td>
          <td>{selectedPizza.quantity}</td>
          <td>{selectedPizza.price} €</td>
        </tr>
      )
    })
  }

  function renderCostumerDetails() {
    return (
      <div>
        <p>
          <span className='has-text-weight-semibold'>Name: </span>
          {costumerDetails.name}
        </p>
        <p>
          <span className='has-text-weight-semibold'>Address: </span>
          {costumerDetails.address}
        </p>
        <p>
          <span className='has-text-weight-semibold'>City: </span>
          {costumerDetails.city}
        </p>
        <p>
          <span className='has-text-weight-semibold'>Zip code: </span>
          {costumerDetails.zipCode}
        </p>
        <p>
          <span className='has-text-weight-semibold'>Phone: </span>
          {costumerDetails.mobileNumber}
        </p>
      </div>
    )
  }

  return selectedPizzas.length ? (
    <div>
      {renderCostumerDetails()}
      <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>{renderPizzaOrders()}</tbody>
      </table>
      <div>
        <span className='has-text-weight-semibold'>Total Price: </span>{' '}
        {totalOrderPrice} €
      </div>
      <div className='field is-grouped is-pulled-right'>
        <p className='control'>
          <Link className='button is-link' to='/pizzas'>
            {' '}
            Back
          </Link>
        </p>
        <p className='control'>
          <button className='button is-link' onClick={onCheckoutButtonClick}>
            Checkout
          </button>
        </p>
      </div>
    </div>
  ) : (
    <div className='has-text-centered'>
      <p>You need select one pizza at least</p>
      <Link to='/pizzas' className='button is-link'>
        Return to pizza list
      </Link>
    </div>
  )
}

export default Checkout
