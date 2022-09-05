# Web Framework Bench

For web frameworks on Node, on Deno, and on Bun.

> Fast is not everything, but fast is everything.

## Motivation

There are some benchmark projects for JavaScript web frameworks, but none of them satisfy me.
Because one is just measuring "Hello World" and another is for routing.
I think we need to measure both "Hello World" and routing and the handling of Responses and Requests.

In this sense, [SaltyAom's benchmarks](https://github.com/SaltyAom/bun-http-framework-benchmark) are good.
However I wanted to add to that the Deno and Node frameworks.
I also thought we should use more complex routing.

Above all, I wanted to make sure that [Hono](https://github.com/honojs/hono) I'm making is fast.

## Frameworks

Which frameworks used for this benchmarks, see [frameworks.js](./frameworks.js)

## End-points

* `GET /` - Just returns "Bench" as plain text.
* `GET /posts/123/comments?query=foo` - Handles to get path parameters and query parameters, and add `x-powered-by` to Response headers.
* `POST /posts` - Returns the received JSON string into an object, again into a string.

In addition to the above, the following routing is added:

```ts
export const routes = [
  { path: '/top', text: 'Top' },
  { path: '/about', text: 'About' },
  { path: '/about/maps', text: 'About Maps' },
  { path: '/about/contact', text: 'About Contact' },
  { path: '/authors', text: 'Authors' },
  { path: '/authors/:name', text: 'Author Name' },
  { path: '/posts', text: 'Posts' },
  { path: '/posts/:id', text: 'Posts Permalink' },
  { path: '/posts/:id/comments/:commentId', text: 'Posts Comment Permalink' },
]
```

## Prerequisites

* [oha](https://github.com/hatoo/oha)
* Node.js
* Deno
* Bun

You should use Deno and Bun as latest possible. For Bun, to upgrade as latest canary release, run the below:

```
bun upgrade --canary
```

## Run

```
yarn install
yarn start
```

It is possible that the version of the framework has been upgraded.
If you want to bump up the framework version, run this:

```
yarn add hono
```

## Results

See the results in the generated [results/results.md](./results/results.md).

## Related Projects

* [SaltyAom/bun-http-framework-benchmark](https://github.com/SaltyAom/bun-http-framework-benchmark) - Heavily inspired.
* [delvedor/router-benchmark](https://github.com/delvedor/router-benchmark) - Node routing benchmarks.
* [denosaurs/bench](https://github.com/denosaurs/bench) - Deno framework benchmarks.

## Author

Yusuke Wada <https://github.com/yusukebe>

## License

MIT