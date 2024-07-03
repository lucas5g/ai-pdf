import fastify from 'fastify'
import { chatbot } from './chatbot'

export const app = fastify()


app.get('/', async (req, res) => {
  console.log(req.query)
  return res.send('')
})

app.post('/', async(req) => {
  const res = await chatbot(req.body.sessionId, req.body.message)
  console.log(res)
  return 'ok'
})


app.listen({
  port: 3000
}, () => console.log('SERVER RUN http://localhost:3000'))
