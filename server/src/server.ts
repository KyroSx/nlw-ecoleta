import express from 'express'
import path from 'path'
import routes from './routes'

const app = express()
app.use(express.json())

app.use(routes)

const staticFiles = path.resolve(__dirname, '..', 'uploads')
app.use('/uploads', express.static(staticFiles))

app.listen(3333)
