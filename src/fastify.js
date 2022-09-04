import fastify from 'fastify'
import { routes } from '../routes.js'

const app = fastify({ logger: false })

app.get('/', (_, reply) => reply.send('Bench'))
for (const route of routes) {
  app.get(route.path, (_, reply) => reply.send(route.text))
}

app.get('/posts/:id/comments', (req, reply) => {
  reply.header('x-powered-by', 'benchmark')
  reply.send(`${req.query.query},${req.params.id}`)
})

app.post('/posts', (req, reply) => {
  reply.send(req.body)
})

app.listen({ port: 3001 })
