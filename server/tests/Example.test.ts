const axios = require('axios')

test('should insert a Points object in database ', async () => {
  const point = {
    name: 'Point Name',
    email: 'email@mail.com',
    whatsapp: '42020334',
    latitude: -33.98233,
    longitude: -45.3435,
    city: 'MyCity',
    uf: 'UF',
    items: [1, 2, 3]
  }

  const { data } = await axios
    .post('http://127.0.0.1:3333/points', point)

  delete point.items
  delete data.pointId
  delete data.image

  expect(data)
    .toEqual(point)
})
