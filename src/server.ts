import fastify from 'fastify'
import { z } from 'zod'
import { Chatbot } from './chatbot'

export const app = fastify()

app.get('/', async (req, res) => {
  console.log(req.query)
  return res.send('')
})

app.post('/chatbot', async (req) => {

  const { message } = z.object({
    message: z.string()
  }).parse(req.body)

  return new Chatbot().sendMessage('abc2', message)

})


app.listen({
  port: 3000
}, () => console.log('SERVER RUN http://localhost:3000'))
