import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";

async function main() {
  const sessionId = 'example-session-id';
  const chatHistory = new InMemoryChatMessageHistory();

  // Adiciona mensagens ao histórico de chat
  await chatHistory.addMessage({ user: 'user1', message: 'Hello!' });
  await chatHistory.addMessage({ user: 'bot', message: 'Hi there!' });

  // Recupera o histórico de mensagens
  const messageHistories = await chatHistory.getMessages();
  console.log('Chat Message Histories:', messageHistories);

  // Verifica se o valor foi armazenado corretamente
  if (messageHistories) {
    console.log('Retrieved from memory:', messageHistories);
  } else {
    console.log('No value found in memory for session:', sessionId);
  }
}

main().catch(console.error);
