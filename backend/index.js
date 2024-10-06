const { blog } = require('./db')
const { blogSchema } = require('./db/schemas/schema')
const fastify = require('fastify')({ logger: true })
const cors = require("@fastify/cors")
const path = require("path")

// Registro de arquivos estáticos para o frontend
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, '../frontend/'),
  prefix: '/', // Prefixo para servir arquivos do frontend
})

// Habilita CORS para requisições externas
fastify.register(cors)

// Servindo o arquivo estático "index.html" na rota raiz "/"
fastify.get("/", function handler(request, reply) {
  reply.sendFile("index.html")  // Certifique-se de que o "index.html" existe no diretório frontend
})

// Endpoint para recuperar todos os blogs
fastify.get('/blog', function handler(request, reply) {
  blog.find({}).then(d => {
    reply.send(d)
  }).catch(err => {
    reply.status(500).send({ error: 'Erro ao buscar blogs', details: err })
  })
})

// Endpoint para criar um novo post no blog
fastify.post('/postblog', function handler(request, reply) {
  const body = request.body
  console.log(body)

  // Verifica se a senha está correta
  if (body.password === "projetoparanafazciencia") {
    reply.status(200)
    reply.send(1)

    let newBlog = new blog({
      title: body.data.title,
      body: body.data.body,
      subBody: body.data.subbody,
      image: body.data.image,
      author: body.data.author
    })

    // Salva o novo blog no banco de dados
    newBlog.save().then(() => {
      console.log("Novo post salvo com sucesso")
    }).catch(err => {
      console.log("Erro ao salvar post", err)
    })
  } else {
    // Senha incorreta
    reply.status(401)
    reply.send("Error: Password Incorrect")
  }
})

fastify.listen({ port: process.env.PORT || 1000, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`Server listening on port ${process.env.PORT || 1000}`)
})
