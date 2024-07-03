import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { model } from "./utils/model";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { z } from 'zod'
import type { BaseMessage } from "@langchain/core/messages";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import fastify from 'fastify'
const app = fastify()
/**
 * Exemplo 1
 */
// model.invoke([
//   new HumanMessage({content: 'Ola! Eu sou o lucas'}),
//   new AIMessage({content: 'Olá lucas, como posso te ajudar?'}),
//   new HumanMessage({content: 'Qual o meu nome?'})
// ])
//   .then(res => console.log('Exemplo 1 => ', res.content))


/**
 * Exemplo 2
 */
// const prompt = ChatPromptTemplate.fromMessages([
//   ['system', 'Você é um assistente prestativo que se lembra de todos os detalhes que o usuário compartilha com você.'],
//   ['placeholder', '{chat_history}'],
//   ['human', '{input}']
// ])


// const messageHistories: Record<string, InMemoryChatMessageHistory> = {}

// const chain = prompt.pipe(model)

// const withMessageHistory = new RunnableWithMessageHistory({
//   runnable: chain,
//   getMessageHistory: async (sessionId) => {
//     console.log(messageHistories[sessionId])
//     console.log(new InMemoryChatMessageHistory())
//     if (messageHistories[sessionId] === undefined) {
//       messageHistories[sessionId] = new InMemoryChatMessageHistory();
//     }
//     return messageHistories[sessionId];
//   },
//   inputMessagesKey: 'input',
//   historyMessagesKey: 'chat_history'
// })
// const config = {
//   configurable: {
//     sessionId: 'abc1'
//   }
// }


// withMessageHistory.invoke(
//   { input: 'Meu nome é lucas' },
//   config
// ).then(res => console.log(res))


/**
 * Exemplo 3
 */
// const prompt = ChatPromptTemplate.fromMessages([
//   ['system', 'Você é um assistente prestativo que se lembra de todos os detalhes que o usuário compartilha com você.'],
//   ['placeholder', '{chat_history}'],
//   ['human', '{input}']
// ])

// const filterMessages = ({ chat_history }: { chat_history: BaseMessage[] }) => {
//   return chat_history.slice(-10);
// };

// const chain = RunnableSequence.from([
//   RunnablePassthrough.assign({
//     chat_history: filterMessages,
//   }),
//   prompt,
//   model,
// ]);

// const messages = [
//   new HumanMessage({ content: "hi! I'm bob" }),
//   new AIMessage({ content: "hi!" }),
//   new HumanMessage({ content: "I like vanilla ice cream" }),
//   new AIMessage({ content: "nice" }),
//   new HumanMessage({ content: "whats 2 + 2" }),
//   new AIMessage({ content: "4" }),
//   new HumanMessage({ content: "thanks" }),
//   new AIMessage({ content: "No problem!" }),
//   new HumanMessage({ content: "having fun?" }),
//   new AIMessage({ content: "yes!" }),
//   new HumanMessage({ content: "That's great!" }),
//   new AIMessage({ content: "yes it is!" }),
// ];

// chain.invoke({
//   chat_history: messages,
//   // input: "what's my name?",
//   input: 'whats my fav ice cream'
// }).then(res => console.log(res.content))

/**
 * Exemplo 4
 */
// const prompt = ChatPromptTemplate.fromMessages([
//   ['system', 'Você é um assistente prestativo que se lembra de todos os detalhes que o usuário compartilha com você.'],
//   ['placeholder', '{chat_history}'],
//   ['human', '{input}']
// ])
// const filterMessages = ({ chat_history }: { chat_history: BaseMessage[] }) => {
//   return chat_history.slice(-10);
// };

// const chain = RunnableSequence.from([
//   RunnablePassthrough.assign({
//     chat_history: filterMessages,
//   }),
//   prompt,
//   model,
// ]);

// const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

// const messages = [
//   new HumanMessage({ content: "hi! I'm bob" }),
//   new AIMessage({ content: "hi!" }),
//   new HumanMessage({ content: "I like vanilla ice cream" }),
//   new AIMessage({ content: "nice" }),
//   new HumanMessage({ content: "whats 2 + 2" }),
//   new AIMessage({ content: "4" }),
//   new HumanMessage({ content: "thanks" }),
//   new AIMessage({ content: "No problem!" }),
//   new HumanMessage({ content: "having fun?" }),
//   new AIMessage({ content: "yes!" }),
//   new HumanMessage({ content: "That's great!" }),
//   new AIMessage({ content: "yes it is!" }),
// ];

// const withMessageHistory = new RunnableWithMessageHistory({
//   runnable: chain,
//   getMessageHistory: async (sessionId) => {
//     if (messageHistories[sessionId] === undefined) {
//       const messageHistory = new InMemoryChatMessageHistory();
//       await messageHistory.addMessages(messages);
//       messageHistories[sessionId] = messageHistory;
//     }
//     return messageHistories[sessionId];
//   },
//   inputMessagesKey: "input",
//   historyMessagesKey: "chat_history",
// });

// const config = {
//   configurable: {
//     sessionId: "abc4",
//   },
// };

// withMessageHistory.invoke(
//   {
//     input: "whats my name?",
//   },
//   config
// ).then(res => console.log(res.content))

/**
 * Exemplo 5
 */

const config = {
  configurable: {
    sessionId: "abc6",
  },
};

const messageHistories: Record<string, InMemoryChatMessageHistory> = {}
const prompt = ChatPromptTemplate.fromMessages([
  ['system', 'Você é um assistente prestativo que se lembra de todos os detalhes que o usuário compartilha com você.'],
  ['placeholder', '{chat_history}'],
  ['human', '{input}']
])

const chain = prompt.pipe(model)

const withMessageHistory = new RunnableWithMessageHistory({
  runnable: chain,
  getMessageHistory: async (sessionId) => {
    
    if (messageHistories[sessionId] === undefined) {
      messageHistories[sessionId] = new InMemoryChatMessageHistory();
    }
    return messageHistories[sessionId];
  },
  inputMessagesKey: 'input',
  historyMessagesKey: 'chat_history'
})

withMessageHistory.stream(
  {
    input: "Ola! Sou o Lucas. Conte uma piada",
  },
  config
).then(async (res) => {

  for await (const chunk of res) {
    console.log("|", chunk.content);
  }
})