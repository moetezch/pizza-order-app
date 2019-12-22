# Pizza order project

## Installation

### FrontEnd

```
cd client
yarn
yarn start
```

### Backend

```
docker-compose up --build
```

#### alternative

You should create a new database locally

```
cd server
yarn
npx knex migrate:latest
yarn server POSTGRES_HOST="" POSTGRES_PORT="" POSTGRES_DB="" POSTGRES_USER="" POSTGRES_PASSWORD=""
```

## Documentation

API endpoints

`[GET]/api/pizzas`

returns an array of pizzas with their respective prices

````

[
{
"id": 1,
"type": "viennese",
"ingredients": "tomato, mozzarella, German sausage, oregano, oil",
"prices": [
{
"size_id": 1,
"price": "8.00"
},
{
"size_id": 2,
"price": "10.50"
},
{
"size_id": 3,
"price": "12.00"
}
]
},
{
"id": 2,
"type": "romana",
"ingredients": "tomato, mozzarella, anchovies, oregano, oi",
"prices": [
{
"size_id": 1,
"price": "9.50"
},
{
"size_id": 2,
"price": "11.50"
},
{
"size_id": 3,
"price": "13.00"
}
]
},
{
"id": 3,
"type": "capricciosa",
"ingredients": "mozzarella, tomato, mushrooms, artichokes, cooked ham, olives, oil",
"prices": [
{
"size_id": 1,
"price": "10.00"
},
{
"size_id": 2,
"price": "12.00"
},
{
"size_id": 3,
"price": "15.00"
}
]
},
{
"id": 4,
"type": "Napolitana",
"ingredients": "tomato sauce, anchovies, olives, capers",
"prices": [
{
"size_id": 1,
"price": "7.50"
},
{
"size_id": 2,
"price": "9.00"
},
{
"size_id": 3,
"price": "11.50"
}
]
}
]

```

`[POST]/api/orders`
create an order

```

{
"customer_name":"ahmed",
"customer_address":"rue hedi chaker",
"customer_city":"tunis",
"customer_zip_code":2456,
"customer_phone":"24565655",
"pizzas":[
{
"pizza_id":1,
"size_id":2,
"quantity":5
},
{
"pizza_id":2,
"size_id":1,
"quantity":1
}
]
}

```

`[GET]/api/orders/:id`
create an order by id

```

{
"id": 1,
"customer_id": 2,
"status": "new",
"total_price": "62.00",
"created_at": "2019-12-17T21:42:54.819Z",
"updated_at": "2019-12-17T21:42:54.860Z",
"costumer": {
"address": "rue hedi chaker",
"zip_code": 2456,
"city": "24565655",
"phone": "24565655",
"name": "ahmed"
},
"orderItems": [
{
"type": "romana",
"id": 2,
"size": "small",
"quantity": 1,
"total_price": "9.50",
"created_at": "2019-12-17T21:42:54.850Z",
"updated_at": "2019-12-17T21:42:54.850Z"
},
{
"type": "viennese",
"id": 1,
"size": "medium",
"quantity": 5,
"total_price": "52.50",
"created_at": "2019-12-17T21:42:54.841Z",
"updated_at": "2019-12-17T21:42:54.841Z"
}
]
}

```

`[GET]/api/orders`
Get all orders

```

[
{
"id": 1,
"customer_id": 2,
"status": "preparing",
"total_price": "62.00",
"created_at": "2019-12-17T21:42:54.819Z",
"updated_at": "2019-12-18T21:44:20.757Z",
"costumer": {
"address": "rue hedi chaker",
"zip_code": 2456,
"city": "24565655",
"phone": "24565655",
"name": "ahmed"
},
"orderItems": [
{
"type": "romana",
"id": 2,
"size": "small",
"quantity": 1,
"total_price": "9.50",
"created_at": "2019-12-17T21:42:54.850Z",
"updated_at": "2019-12-17T21:42:54.850Z"
},
{
"type": "viennese",
"id": 1,
"size": "medium",
"quantity": 5,
"total_price": "52.50",
"created_at": "2019-12-17T21:42:54.841Z",
"updated_at": "2019-12-17T21:42:54.841Z"
}
]
},
{
"id": 3,
"customer_id": 4,
"status": "new",
"total_price": "62.00",
"created_at": "2019-12-19T17:54:52.230Z",
"updated_at": "2019-12-19T17:54:52.290Z",
"costumer": {
"address": "rue hedi chaker",
"zip_code": 2456,
"city": "24565655",
"phone": "24565655",
"name": "ahmed"
},
"orderItems": [
{
"type": "romana",
"id": 6,
"size": "small",
"quantity": 1,
"total_price": "9.50",
"created_at": "2019-12-19T17:54:52.272Z",
"updated_at": "2019-12-19T17:54:52.272Z"
},
{
"type": "viennese",
"id": 5,
"size": "medium",
"quantity": 5,
"total_price": "52.50",
"created_at": "2019-12-19T17:54:52.256Z",
"updated_at": "2019-12-19T17:54:52.256Z"
}
]
},
{
"id": 4,
"customer_id": 5,
"status": "new",
"total_price": "0.00",
"created_at": "2019-12-19T18:26:27.418Z",
"updated_at": "2019-12-19T18:26:27.418Z",
"costumer": {
"address": "rue hedi chaker",
"zip_code": 2456,
"city": "24565655",
"phone": "24565655",
"name": "ahmed"
},
"orderItems": [
{
"type": "romana",
"id": 9,
"size": "small",
"quantity": 1,
"total_price": "9.50",
"created_at": "2019-12-19T18:26:27.449Z",
"updated_at": "2019-12-19T18:26:27.449Z"
},
{
"type": "viennese",
"id": 8,
"size": "medium",
"quantity": 5,
"total_price": "52.50",
"created_at": "2019-12-19T18:26:27.437Z",
"updated_at": "2019-12-19T18:26:27.437Z"
}
]
},
{
"id": 5,
"customer_id": 6,
"status": "new",
"total_price": "0.00",
"created_at": "2019-12-19T18:26:46.205Z",
"updated_at": "2019-12-19T18:26:46.205Z",
"costumer": {
"address": "rue hedi chaker",
"zip_code": 2456,
"city": "24565655",
"phone": "24565655",
"name": "ahmed"
},
"orderItems": [
{
"type": "romana",
"id": 11,
"size": "small",
"quantity": 1,
"total_price": "9.50",
"created_at": "2019-12-19T18:26:46.233Z",
"updated_at": "2019-12-19T18:26:46.233Z"
},
{
"type": "viennese",
"id": 10,
"size": "medium",
"quantity": 5,
"total_price": "52.50",
"created_at": "2019-12-19T18:26:46.224Z",
"updated_at": "2019-12-19T18:26:46.224Z"
}
]
},
{
"id": 6,
"customer_id": 7,
"status": "new",
"total_price": "62.00",
"created_at": "2019-12-19T18:27:08.510Z",
"updated_at": "2019-12-19T18:27:08.558Z",
"costumer": {
"address": "rue hedi chaker",
"zip_code": 2456,
"city": "24565655",
"phone": "24565655",
"name": "ahmed"
},
"orderItems": [
{
"type": "romana",
"id": 13,
"size": "small",
"quantity": 1,
"total_price": "9.50",
"created_at": "2019-12-19T18:27:08.546Z",
"updated_at": "2019-12-19T18:27:08.546Z"
},
{
"type": "viennese",
"id": 12,
"size": "medium",
"quantity": 5,
"total_price": "52.50",
"created_at": "2019-12-19T18:27:08.534Z",
"updated_at": "2019-12-19T18:27:08.534Z"
}
]
},
{
"id": 2,
"customer_id": 3,
"status": "delivering",
"total_price": "129.00",
"created_at": "2019-12-18T21:39:40.072Z",
"updated_at": "2019-12-19T18:37:56.621Z",
"costumer": {
"address": "rue hedi chaker",
"zip_code": 2456,
"city": "24565655",
"phone": "24565655",
"name": "ahmed"
},
"orderItems": [
{
"type": "romana",
"id": 19,
"size": "small",
"quantity": 2,
"total_price": "19.00",
"created_at": "2019-12-19T18:33:17.545Z",
"updated_at": "2019-12-19T18:33:17.545Z"
},
{
"type": "romana",
"id": 20,
"size": "large",
"quantity": 2,
"total_price": "26.00",
"created_at": "2019-12-19T18:34:04.757Z",
"updated_at": "2019-12-19T18:34:04.757Z"
},
{
"type": "viennese",
"id": 18,
"size": "large",
"quantity": 7,
"total_price": "84.00",
"created_at": "2019-12-19T18:33:17.541Z",
"updated_at": "2019-12-19T18:33:17.541Z"
}
]
}
]

```

`[DELETE]/api/orders/:id`
delete an order by id

`[PUT]/api/orders/:id`
update an order by id

```

{
"status":"delivering",
"pizzas":[
{
"pizza_id":1,
"size_id":3,
"quantity":2
},
{
"pizza_id":2,
"size_id":3,
"quantity":2
}
]
}

```

```
````
