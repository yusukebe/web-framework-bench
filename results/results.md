
  |  Framework     |  Runtime       |  GET /    | GET /posts/123/comments?query=foo | POST /posts  |
  | ----------- | ----------- | -----------  | -----------  | ----------- |
  | Hono | Bun | 47,119 | 34,172 | 24,306 |
| HyperBun | Bun | 45,471 | 33,558 | 28,746 |
| Bun Bakery | Bun | 45,053 | 34,632 | 29,685 |
| KingWorld | Bun | 44,542 | 37,148 | 38,694 |
| Hono - RegExpRouter | Bun | 43,428 | 39,210 | 39,273 |
| Hono - RegExpRouter | Deno - Flash | 28,115 | 15,708 | 7,336 |
| Hono | Deno | 27,996 | 17,749 | 6,645 |
| Hono - RegExpRouter | Deno | 27,867 | 17,806 | 8,834 |
| Hono | Deno - Flash | 25,773 | 16,132 | 6,809 |
| Fastify | Node | 14,109 | 11,147 | 7,997 |
| Oak | Deno | 12,155 | 10,971 | 5,409 |
| Express | Bun | 9,626 | 8,791 | 8,421 |
| Express | Node | 4,501 | 4,367 | 4,111 |
| Fast | Deno | NaN | 8,332 | 8,568 |
| Alosaur | Deno | NaN | 3,691 | 16,899 |
