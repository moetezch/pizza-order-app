import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Routes from '../routes'
import Navbar from '../common/Navbar'

function App() {
  const [pizzaList, setPizzaList] = useState([])
  const [costumerDetails, setCosutmerDetails] = useState({})
  const [selectedPizzas, setSelectedPizzas] = useState([])

  useEffect(() => {
    axios
      .get('/api/pizzas')
      .then(function(response) {
        setPizzaList(response.data)
      })
      .catch(function(error) {
        console.log(error)
      })
  }, [])

  function addPizzaOrder(addedPizza) {
    setSelectedPizzas([...selectedPizzas, addedPizza])
  }

  function removePizzaOrder(deletedPizzaUuid) {
    const pizzas = selectedPizzas.filter(
      pizza => pizza.uuid !== deletedPizzaUuid
    )
    setSelectedPizzas(pizzas)
  }

  function addCostumerDetails(costumer) {
    setCosutmerDetails(costumer)
  }

  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes
          selectedPizzas={selectedPizzas}
          addPizzaOrder={addPizzaOrder}
          removePizzaOrder={removePizzaOrder}
          addCostumerDetails={addCostumerDetails}
          costumerDetails={costumerDetails}
          pizzaList={pizzaList}
        />
      </div>
    </>
  )
}

export default App
