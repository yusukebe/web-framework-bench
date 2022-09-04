import { Hono, RegExpRouter } from 'https://deno.land/x/hono/mod.ts'
import { parse } from 'https://deno.land/std@0.136.0/flags/mod.ts'
import { setRoutes } from '../honoUtils.ts'

const parsedArgs = parse(Deno.args)

let app: Hono

if (parsedArgs['reg-exp-router']) {
  app = new Hono({ router: new RegExpRouter() })
} else {
  app = new Hono()
}

app = setRoutes(app)

Deno.serve(app.fetch, {
  port: 3001,
})
