import KingWorld from 'kingworld'
import { routes } from '../routes'

const app = new KingWorld()

app.get('/', () => 'Bench')

for (const route of routes) {
  app.get(route.path, () => route.text)
}

app.get('/posts/:id/comments', ({ params: { id }, query: { query }, responseHeaders }) => {
  responseHeaders.set('x-powered-by', 'benchmark')
  return `${query},${id}`
})

app.post('/posts', ({ body }) => body)

app.listen(3001)
