import { Hono } from 'hono'
import { setRoutes } from './honoUtils'

const app = setRoutes(new Hono())

export default {
  port: 3001,
  fetch: app.fetch,
}
