import { ChatOpenAI } from "@langchain/openai";
import { Ollama } from '@langchain/community/llms/ollama'
import { env } from "./env";

// export const model = new Ollama({
//   model: 'llama3'
// })


export const model = new ChatOpenAI({
  model: 'gpt-3.5-turbo',
  apiKey: env.OPENAI_API_KEY,
  temperature:0
})