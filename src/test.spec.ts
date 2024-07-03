import { describe, it } from 'vitest'
import request from 'supertest'

const api = 'http://localhost:3000'
describe('llm', () => {

  it.only('chatbot', async() => {
    const {text} = await request(api)
      .post('/')
      .send({
        sessionId: 'meu-id',
        message: 'Meu nome é lucas'
        // message: 'Qual o meu nome?'
      })

    console.log(text)
  })
})