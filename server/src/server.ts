import express from 'express'

const app = express()

app.get('/hello-word', (request, response) => {
  response.json({ msg: 'hello-word' })
})

app.listen(3333)
