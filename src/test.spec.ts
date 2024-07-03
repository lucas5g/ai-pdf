import { describe, it } from 'vitest'
import request from 'supertest'

const api = 'http://localhost:3000'
describe('llm', () => {

  it.only('chatbot', async () => {
    console.time()

    const { text } = await request(api)
      .post('/chatbot')
      .send({
        message: 'Meu nome é lucas'
        // message: 'O que eu gosto de fazer?'
        // message: 'O meu nome não é joão, qual é?'
      })

    console.log(text)

    const res = await request(api)
      .post('/chatbot')
      .send({
        // message: 'Meu nome é lucas'
        // message: 'O que eu gosto de fazer?'
        message: 'Qual é meu nome?'
      })

    console.log(res.text)
    console.timeEnd()
  }, 13000)
})