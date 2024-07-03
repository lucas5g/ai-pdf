import 'dotenv/config'
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TokenTextSplitter } from "langchain/text_splitter";
import { createClient } from "redis";
import { RedisVectorStore } from "@langchain/redis";
import { OpenAIEmbeddings } from "@langchain/openai";
import { redis, redisVectoreStore } from './redis-store';

const loader = new DirectoryLoader(
  `${__dirname}/../tmp`,
  {
    '.pdf': path => new PDFLoader(path)
  }
)

async function load() {
  const docs = await loader.load()

  // console.log(docs)
  const splitter = new TokenTextSplitter({
    chunkSize: 600,
    chunkOverlap: 0,
    encodingName: 'cl100k_base'
  })

  const splittedDocuments = await splitter.splitDocuments(docs)

  await redis.connect()

  await redis.flushAll()

  await redisVectoreStore.addDocuments(splittedDocuments)

  await redis.disconnect()

}

load()