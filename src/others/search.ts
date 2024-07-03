import 'dotenv/config'
import { redis, redisVectoreStore } from "./redis-store"

async function search(){

  await redis.connect()

  const res = await redisVectoreStore.similaritySearchWithScore(
    'Quais os plantões do Lucas de Sousa Assunção?',
    
  )

  console.log(res)
}


search()