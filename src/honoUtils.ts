import { routes } from '../routes.js'

export const setRoutes = (app) => {
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

  return app
}
