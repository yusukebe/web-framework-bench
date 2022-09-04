import { Context } from '@kapsonfire/bun-bakery'

export function GET(ctx: Context) {
  ctx.sendResponse(
    new Response(`${ctx.url.searchParams.get('query')},${ctx.params.id}`, {
      headers: {
        'x-powered-by': 'benchmark',
      },
    })
  )
}
