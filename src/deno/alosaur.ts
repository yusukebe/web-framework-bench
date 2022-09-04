import {
  App,
  Area,
  Body,
  Controller,
  Get,
  Param,
  Post,
  QueryParam,
} from 'https://deno.land/x/alosaur/mod.ts'

@Controller()
class HomeController {
  @Get('/')
  get() {
    return 'Bench'
  }

  @Get('/top')
  top() {
    return 'Top'
  }
}

@Controller('/about')
class AboutController {
  @Get()
  get() {
    return 'About'
  }

  @Get('/maps')
  maps() {
    return 'About Maps'
  }

  @Get('/contact')
  contact() {
    return 'About Contact'
  }
}

@Controller('/authors')
class AuthorController {
  @Get()
  get() {
    return 'Authors'
  }

  @Get('/:name')
  name() {
    return 'Authors Name'
  }
}

@Controller('/posts')
class PostController {
  @Get()
  get() {
    return 'Posts'
  }

  @Get('/:id')
  permalink() {
    return 'Posts Permalink'
  }

  @Get('/:id/comments/:commentId')
  commentPermalink() {
    return 'Posts Comments Permalink'
  }

  @Get('/:id/comments')
  comment(@QueryParam('query') query: string, @Param('id') id: number) {
    return new Response(`${query},${id}`, {
      headers: { 'x-powered-by': 'benchmark' },
    })
  }

  @Post()
  post(@Body() body: any) {
    return body
  }
}

@Area({
  controllers: [HomeController, AboutController, AuthorController, PostController],
})
class HomeArea {}

const app = new App({
  areas: [HomeArea],
  logging: false,
})

app.listen({ port: 3001 })
