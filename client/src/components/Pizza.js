import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { sizes } from '../constants/pizzaSize'

function Pizza({
  selectedPizzas,
  addPizzaOrder,
  removePizzaOrder,
  costumerDetails,
  pizzaList,
}) {
  const [selectedSize, setSelectedSize] = useState({})
  const [selectedQuantity, setSelectedQuantity] = useState({})

  function renderPizzas() {
    return pizzaList.map(pizza => {
      const { id, type, ingredients, prices } = pizza
      const actualSize = selectedSize[id] || 1
      const actualQuantity = selectedQuantity[id] || 1
      const pizzaPrice = prices.find(price => price.size_id === actualSize)
      const totalPrice = pizzaPrice.price * actualQuantity
      return (
        <div style={{ paddingBottom: '1%' }} key={id}>
          <div className='box'>
            <article className='media'>
              <div className='media-content'>
                <div className='content'>
                  <p>
                    <strong>{type.toUpperCase()}</strong> <br />
                    {ingredients}
                  </p>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-evenly' }}
                >
                  <div className='field is-horizontal'>
                    <div className='field-label is-small'>
                      <label className='label'>Size</label>
                    </div>
                    <div className='field-body'>
                      <div className='control'>
                        <div className='select is-small'>
                          <select
                            onChange={e =>
                              setSelectedSize({
                                ...selectedSize,
                                [id]: Number(e.target.value),
                              })
                            }
                          >
                            <option value='1'>small</option>
                            <option value='2'>medium</option>
                            <option value='3'>large</option>
                          </select>
                        </div>{' '}
                      </div>
                    </div>
                  </div>
                  <div className='field is-horizontal'>
                    <div className='field-label is-small'>
                      <label className='label'>Quantity</label>
                    </div>
                    <div className='field-body'>
                      <div className='field'>
                        <div className='control'>
                          <input
                            className='input is-small'
                            type='number'
                            min='1'
                            value={selectedQuantity[id] || 1}
                            style={{ width: '33%' }}
                            onChange={e =>
                              setSelectedQuantity({
                                ...selectedQuantity,
                                [id]: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      className='control button is-link is-light is-small is-outlined'
                      onClick={() => addPizza(id, type, totalPrice)}
                    >
                      {totalPrice} €
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      )
    })
  }

  function renderBasket() {
    return (
      <div className='box'>
        <article className='media'>
          <div className='media-content'>
            <div className='content has-text-centered'>
              <p>
                <strong>Basket</strong> <br />
              </p>
              {selectedPizzas.map(pizza => {
                return (
                  <div
                    key={pizza.uuid}
                    style={{ display: 'flex', justifyContent: 'space-evenly' }}
                  >
                    <div>
                      {pizza.quantity}x {sizes[pizza.pizza_size]} {pizza.type}
                    </div>
                    <div>
                      {pizza.price + '€ '}
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        onClick={() => removePizzaOrder(pizza.uuid)}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </article>
      </div>
    )
  }

  function addPizza(id, type, totalPrice) {
    const quantity = Number(selectedQuantity[id]) || 1
    const size = Number(selectedSize[id]) || 1
    const addedPizza = {
      uuid: Math.random()
        .toString(16)
        .slice(2),
      pizza_id: id,
      type,
      pizza_size: size,
      price: totalPrice,
      quantity,
    }
    addPizzaOrder(addedPizza)
  }

  return costumerDetails.name ? (
    <Fragment>
      <div className='tile is-ancestor'>
        <div className='tile is-8 is-vertical is-parent'>{renderPizzas()}</div>
        <div className='tile is-vertical is-4 is-parent'>{renderBasket()}</div>
      </div>
      <div className='field is-grouped is-pulled-right'>
        <p className='control'>
          <Link to='/' className='button is-link'>
            Back
          </Link>
        </p>
        <p className='control'>
          <Link to='/checkout' className='button is-link'>
            Next
          </Link>
        </p>
      </div>
    </Fragment>
  ) : (
    <div className='has-text-centered'>
      <p>You need to enter your details first</p>
      <Link to='/' className='button is-link'>
        Back to homepage
      </Link>
    </div>
  )
}

export default Pizza
