import { Router } from '@kapsonfire/bun-bakery'

new Router({
  port: 3001,
  routesPath: import.meta.dir + '/routes/',
})
