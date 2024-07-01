import { ChatOpenAI } from "@langchain/openai";
import { env } from "./env";
import { PromptTemplate } from "@langchain/core/prompts";
import { RetrievalQAChain } from "langchain/chains";
import { redis, redisVectoreStore } from "./redis-store";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

const openAiChat = new ChatOpenAI({
  apiKey: env.OPENAI_KEY,
  modelName: 'gpt-3.5-turbo',
  temperature: 0.3
})

const prompt = new PromptTemplate({
  // Se não for encontrado a pessoal que fez o plantão, responda não encontrado e não tente inventar uma resposta.
  template: `
  Você deve encontrar todos o plantões do servidor,
  Ordernar as datas.
  Não invente datas.
  Deve retornar os plantões nesse padrão  
  
    "ano":
      "datas":["dd/mm"],
      "count": "Aqui coloque o total de plantões no mesmo ano."
    
  

  Transcrições:
  {context}

  Pergunta:
  {question}
  `.trim(),
  inputVariables:['context', 'question']
})

const chain = RetrievalQAChain.fromLLM(openAiChat, redisVectoreStore.asRetriever(2), {
  prompt,
  // verbose: true
})


async function main(){
  await redis.connect() 

  const res = await chain.call({
    // query: 'Lucas de Sousa Assunção',
    query: 'Antônio Lopes Júnior'
    
  })

  console.log(res.text)

  await redis.disconnect()
}

main()