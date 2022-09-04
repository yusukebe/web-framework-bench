import { Hono } from 'hono'
import { RegExpRouter } from 'hono/router/reg-exp-router'
import { setRoutes } from './honoUtils'

const app = setRoutes(new Hono({ router: new RegExpRouter() }))

export default {
  port: 3001,
  fetch: app.fetch,
}
