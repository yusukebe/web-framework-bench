import { createServer } from 'hyperbun'
import { routes } from '../routes'

const app = createServer()

app.get('/', () => 'Bench')

for (const route of routes) {
  app.get(route.path, () => route.text)
}

app.get('/posts/:id/comments', (_, ctx) => {
  const id = ctx.params.id
  const query = ctx.query.query

  return new Response(`${query},${id}`, {
    headers: {
      'x-powered-by': 'benchmark',
    },
  })
})
app.post('/posts', async (request) => {
  const json = await request.json()
  return json
})

app.listen({
  port: 3001,
})
