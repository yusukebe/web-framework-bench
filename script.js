import { mkdirSync, existsSync, writeFileSync, appendFileSync } from 'fs'
import rimraf from 'rimraf'

import { $ } from 'zx'
import { frameworks } from './frameworks.js'

const seconds = process.env.BENCH_SECONDS || 2

const format = (n) => Intl.NumberFormat('en-US').format(Math.trunc(n))
const sleep = (s = 1) => new Promise((resolve) => setTimeout(resolve, s * 1000))

const commands = [
  `oha -z ${seconds}s -c 50 -j http://localhost:3001/`,
  `oha -z ${seconds}s -c 50 -j http://localhost:3001/posts/123/comments?query=foo`,
  `oha -z ${seconds}s -c 50 -j -m POST -D body.json http://localhost:3001/posts`,
]

const results = []

for (const framework of frameworks) {
  console.log(`${framework.name} on ${framework.runtime}`)

  let server

  if (framework.runtime === 'Bun') {
    server = $`bun run ${framework.path}`
  }

  if (framework.runtime === 'Node') {
    server = $`node ${framework.path}`
  }

  if (framework.runtime === 'Deno') {
    server = $`deno run --allow-net ${framework.path} ${framework.args || ''}`
  }

  if (framework.runtime === 'Deno - Flash') {
    server = $`deno run --unstable --allow-net ${framework.path} ${framework.args || ''}`
  }

  await sleep()

  const scores = []

  for (const command of commands) {
    const output = await $([command])
    const data = JSON.parse(output)
    const error = Object.keys(data['errorDistribution']).length
    const rps = error ? 'Error!!' : data['summary']['requestsPerSec']
    scores.push(rps)
  }

  results.push({
    framework: framework,
    scores: scores,
  })

  await server.kill()
  await sleep()
}

results.sort((a, b) => {
  return b['scores'][0] - a['scores'][0]
})

if (existsSync('./results')) rimraf.sync('./results')
mkdirSync('./results')

writeFileSync(
  'results/results.md',
  `
  |  Framework     |  Runtime       |  GET /    | GET /posts/123/comments?query=foo | POST /posts  |
  | ----------- | ----------- | -----------  | -----------  | ----------- |
  `
)

for (const res of results) {
  const framework = res.framework
  const scores = res.scores
  const line = `| ${framework.name} | ${framework.runtime} | ${format(scores[0])} | ${format(
    scores[1]
  )} | ${format(scores[2])}`
  appendFileSync('./results/results.md', `${line} |\n`)
}
