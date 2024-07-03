import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { model } from "./utils/model"
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

async function main(){
  console.time()
  const res = await chatbot('meu nome é naruto')
  console.log(res)

  const res2 = await chatbot('qual o meu nome?')
  console.log(res2)

  console.timeEnd()
}
main()


export async function chatbot(message:string) {

  const prompt = ChatPromptTemplate.fromMessages([
    [
      'system', 'Você é um assistente que lembra todos os detalhes que o usuário compartilhou com voce'
    ],
    ["placeholder", "{chat_history}"],
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
    inputMessagesKey: "input",
    historyMessagesKey: "chat_history",
  });

  const config = {
    configurable: {
      sessionId: "abc2",
    },
  };
  
  const res =  await withMessageHistory.invoke(
    {
      input: message,
    },
    config
  );
  
  return res
  // return res.content
}