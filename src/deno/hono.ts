import { serve } from 'https://deno.land/std/http/server.ts'
import { Hono, RegExpRouter } from 'https://deno.land/x/hono/mod.ts'
import { parse } from 'https://deno.land/std@0.136.0/flags/mod.ts'
import { routes } from '../../routes.js'

const parsedArgs = parse(Deno.args)

let app: Hono

if (parsedArgs['reg-exp-router']) {
  app = new Hono({ router: new RegExpRouter() })
} else {
  app = new Hono()
}

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

serve(app.fetch, {
  port: 3001,
})
