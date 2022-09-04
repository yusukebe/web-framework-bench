import { Application, Router } from 'https://deno.land/x/oak/mod.ts'
import { routes } from '../../routes.js'

const router = new Router()

router.get('/', (ctx) => {
  ctx.response.body = 'Bench'
})

for (const route of routes) {
  router.get(route.path, (ctx) => {
    ctx.response.body = route.text
  })
}

router.get('/posts/:id/comments', (ctx) => {
  ctx.response.headers.set('x-powered-by', 'benchmark')
  ctx.response.body = `${ctx.request.url.searchParams.get('query')},${ctx.params.id}`
})
router.post('/posts', async (ctx) => {
  const results = ctx.request.body({ type: 'json' })
  ctx.response.body = await results.value
})

const app = new Application({ logErrors: false })
app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 3001 })
