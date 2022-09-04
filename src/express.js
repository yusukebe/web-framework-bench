import express from 'express'
import { routes } from '../routes.js'

const app = express()
app.set('etag', false)
app.set('x-powered-by', false)
app.use(express.json())

app.get('/', (_, res) => res.send('Bench'))

for (const route of routes) {
  // It will be `text/html`
  app.get(route.path, (_, res) => res.send(route.text))
}

app.get('/posts/:id/comments', (req, res) => {
  res.set('x-powered-by', 'benchmark')
  res.send(`${req.query.query},${req.params.id}`)
})

app.post('/posts', (req, res) => {
  res.json(req.body)
})

app.listen(3001)
