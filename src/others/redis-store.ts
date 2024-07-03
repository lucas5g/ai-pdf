import { OpenAIEmbeddings } from "@langchain/openai"
import { RedisVectorStore } from "@langchain/redis"
import { createClient } from "redis"

export const redis = createClient({
  url: 'redis://127.0.0.1:6379'
})

export const redisVectoreStore = new RedisVectorStore(
  new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_KEY
  }),
  {
    indexName: 'shifts',
    redisClient: redis,
    keyPrefix: 'shifts:'
  }
)

