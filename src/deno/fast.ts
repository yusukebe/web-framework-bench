import fast from 'https://deno.land/x/fast/mod.ts'
import { routes } from '../../routes.js'

const app = fast()

app.get('/', () => 'Bench')

for (const route of routes) {
  app.get(route.path, () => route.text)
}

app.get('/posts/:id/comments', (ctx) => {
  return new Response(`${ctx.query('query')},${ctx.params['id']}`, {
    headers: { 'x-powered-by': 'benchmark' },
  })
})
app.post('/posts', async (ctx) => {
  const json = await ctx.json()
  return json
})

await app.serve({ port: 3001 })
