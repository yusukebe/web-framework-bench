import { Hono } from 'hono'
import { RegExpRouter } from 'hono/router/reg-exp-router'
import { routes } from '../routes'

const app = new Hono({ router: new RegExpRouter() })

app.get('/', (c) => c.text('Bench'))
for (const route of routes) {
  app.get(route.path, (c) => c.text(route.text))
}

app.get('/posts/:id/comments', (c) => {
  c.header('x-powered-by', 'benchmark')
  return c.text(`${c.req.query('query')},${c.req.param('id')}`)
})
app.post('/posts', async (c) => {
  const json = await c.req.json()
  return c.json(json)
})

export default {
  port: 3001,
  fetch: app.fetch,
}
