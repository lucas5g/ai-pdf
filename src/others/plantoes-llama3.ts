/**
 * Não é um boa opção fazer via llama3
 */

import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";


async function load() {

  const loader = new DirectoryLoader(
    `${__dirname}/../tmp`,
    {
      '.pdf': path => new PDFLoader(path)
    }
  )

  const docs = await loader.load()
  const diaries = docs.map(doc => doc.pageContent).toString()

  let match: RegExpExecArray | null
  const occurrences: string[] = []
  const regex = /ANTÔNIO LOPES JÚNIOR/gi

  while ((match = regex.exec(diaries))) {
    const find = match.index
    // console.log(diaries.slice(find - 400, find + 100))
    occurrences.push(diaries.slice(find - 400, find + 100))
  }

  return occurrences
}




// return
const model = new ChatOllama({
  // baseUrl: "http://localhost:11434", // Default value
  // baseUrl: 'https://3c37-34-19-75-206.ngrok-free.app',
  baseUrl:'https://0e1c-34-139-124-114.ngrok-free.app/',
  model: "llama3", // Default value
});

async function main() {
  console.time()
  const diary = await load()

  console.log(diary)

  const prompt = `Baseado nesse texto ${diary.toString()}, busque todos 
    os plantões do servidor Antônio Lopes Júnior entre os anos 2021, 2022, 2023 e 2024.
    Retorne as informações dos plantões com um objeto que tem os atributos os anos.
    Sendo anos o ano encontrado do plantão.
    Dentro do atributo ano, adicione mais dois atributos: dates (array com dia / mês),  count (somente o número de plantões) e não informa o turno
    Vejo esse exemplo
    {
      "2022": {
        dates: ["06/04"] //faça o flat array e caso possua data repetida, retirar do array,
        count: 1
      }
    },
    Caso não encontre os plantões em algum ano especifico, não adicione esse atributo no objeto.
    Retorne somente o objeto por favor sem nenhum outra descrição e não informa o texto "Aqui está o resultado da busca:"
  
  `
  console.log(prompt.length)

  const res = await model.invoke(prompt)
  console.log(res.content)
  console.timeEnd()
}


main()