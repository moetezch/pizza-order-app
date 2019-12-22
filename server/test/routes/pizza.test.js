// for the sacke of simplicity I am only testing get pizzas routes
// without creating a test database

const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../../app')

chai.use(chaiHttp)

describe('Pizzas route', function() {
  it('should get all pizzas', done => {
    chai
      .request(app)
      .get('/api/pizzas')
      .end((err, res) => {
        expect(err).to.equal(null)
        expect(res).status(200)
        expect(res).to.have.header(
          'content-type',
          'application/json; charset=utf-8'
        )
        expect(res.body).to.deep.equal([
          {
            id: 1,
            type: 'viennese',
            ingredients: 'tomato, mozzarella, German sausage, oregano, oil',
            prices: [
              {
                size_id: 1,
                price: '8.00',
              },
              {
                size_id: 2,
                price: '10.50',
              },
              {
                size_id: 3,
                price: '12.00',
              },
            ],
          },
          {
            id: 2,
            type: 'romana',
            ingredients: 'tomato, mozzarella, anchovies, oregano, oi',
            prices: [
              {
                size_id: 1,
                price: '9.50',
              },
              {
                size_id: 2,
                price: '11.50',
              },
              {
                size_id: 3,
                price: '13.00',
              },
            ],
          },
          {
            id: 3,
            type: 'capricciosa',
            ingredients:
              'mozzarella, tomato, mushrooms, artichokes, cooked ham, olives, oil',
            prices: [
              {
                size_id: 1,
                price: '10.00',
              },
              {
                size_id: 2,
                price: '12.00',
              },
              {
                size_id: 3,
                price: '15.00',
              },
            ],
          },
          {
            id: 4,
            type: 'Napolitana',
            ingredients: 'tomato sauce, anchovies, olives, capers',
            prices: [
              {
                size_id: 1,
                price: '7.50',
              },
              {
                size_id: 2,
                price: '9.00',
              },
              {
                size_id: 3,
                price: '11.50',
              },
            ],
          },
        ])
        done()
      })
  })
})
