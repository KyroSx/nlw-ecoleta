import express from 'express'
import path from 'path'
import routes from './routes'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)

const staticFiles = path.resolve(__dirname, '..', 'uploads')
app.use('/uploads', express.static(staticFiles))

app.listen(3333)
