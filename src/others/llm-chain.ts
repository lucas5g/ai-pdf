// process.env.LANGCHAIN_TRACING_V2 = "true"
// process.env.LANGCHAIN_API_KEY
// process.env.OPENAI_KEY

import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { ChatOpenAI } from '@langchain/openai'
import {env} from '../env'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'

const model = new ChatOpenAI({
  model: 'gpt-3.5-turbo',
  apiKey: env.OPENAI_KEY
})

const parser = new StringOutputParser()

async function main() {
  // const messages = [
  //   new SystemMessage('Translate the following from English into portuguese'),
  //   new HumanMessage('Hi!')
  // ]

  // const res = await model.invoke(messages)
  // console.log(res)

  // const resParser = await parser.invoke(res)
  // console.log({resParser})

  // const chain = model.pipe(parser) 

  // console.log(await chain.invoke(messages))

  const systemTemplate = 'Translate the following into {language}'

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ['system', systemTemplate],
    ['user', '{text}']
  ])

  // const res = await promptTemplate.invoke({language: 'portugues', text: 'Bom dia'})

  // console.log(res) 
  // console.log(res.toChatMessages())

  const chain = promptTemplate.pipe(model).pipe(parser) 

  const res = await chain.invoke({language: 'portuguese', text: 'Good night'})

  console.log(res)

}

main()