import { Context } from '@kapsonfire/bun-bakery'

export function GET(ctx: Context) {
  ctx.sendResponse(new Response('Posts'))
}

export async function POST(ctx: Context) {
  ctx.sendAsJson(await ctx.request.json())
}
