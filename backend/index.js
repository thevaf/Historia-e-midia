const { blog } = require('./db')
const { blogSchema } = require('./db/schemas/schema')
const fastify = require('fastify')({ logger: true })
const cors = require("@fastify/cors")

fastify.register(cors)
fastify.get('/blog', function handler (request, reply) {
    blog.find({}).then(d => {
        reply.send(d)
    })
})
fastify.post('/postblog', function handler (request, reply) {
   const body = request.body
   console.log(body)
   if(body.password == "projetoparanafazciencia") {
    reply.status(200)
    reply.send(1)
    let newBlog = new blog({
        title: body.data.title,
        body: body.data.body,
        subBody: body.data.subbody,
        image: body.data.image,
        author: body.data.author
    })
    newBlog.save()
   } else {
    reply.status(401)
    replu.send("Error: Password Incorrect")
   }
})

fastify.listen({ port: process.env.PORT || 4000, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
