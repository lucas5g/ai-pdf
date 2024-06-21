import 'pdf-parse'

import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { ChatFireworks } from '@langchain/community/chat_models/fireworks';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from "@langchain/openai";
import { FireworksEmbeddings } from '@langchain/community/embeddings/fireworks';
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { ChatVertexAI } from '@langchain/google-vertexai';

// const loader = new PDFLoader(`${__dirname}/../tmp/DE-DPMG-20240613.pdf`)
// const loader = new PDFLoader(`${__dirname}/../tmp/DE-DPMG-20220408.pdf`)

const loader = new DirectoryLoader(`${__dirname}/../tmp/`, {
  ".pdf": path => new PDFLoader(path)
})

console.log(loader)

async function load() {
  const docs = await loader.load()

  const model = new ChatFireworks({
    model: "accounts/fireworks/models/firefunction-v1",
    temperature: 0
  });

  // const model = new ChatVertexAI({
  //   model: "gemini-1.5-pro",
  //   temperature: 0
  // });

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 0,
  });

  // return console.log(textSplitter)

  const splits = await textSplitter.splitDocuments(docs);

  return console.log(splits)


  const vectorstore = await MemoryVectorStore.fromDocuments(
    splits,
    new FireworksEmbeddings()
  );

  // console.log(vectorstore)
  // console.log(splits)

  const retriever = vectorstore.asRetriever()

  const systemTemplate = `
    Você deve responder perguntas sobre plantões.
    Para cada usuário solicitado responda fazendo uma lista no formato dd/mm/aaaa de forma ordenada,
    {context}
  `.trim()


  const prompt = ChatPromptTemplate.fromMessages([
    ['system', systemTemplate],
    ['human', "{input}"]
  ])

  const questionAnswerChain = await createStuffDocumentsChain({ llm: model, prompt })

  const ragChain = await createRetrievalChain({
    retriever,
    combineDocsChain: questionAnswerChain
  })

  const result = await ragChain.invoke({
    // input: 'Luiz henrique costa gonçalves'
    // input: ''
    input: 'Plantões do Antonio Lopes Junior'
  })

  console.log(result.answer)
}

// 

load()