import { Ollama } from "@langchain/community/llms/ollama";

const ollama = new Ollama({
  baseUrl: "https://6522-34-23-120-101.ngrok-free.app/", // Default value
  model: "llama3", // Default value
});

async function main() {


  const stream = await ollama.stream(
    `Translate "I love programming" into German.`
  );

  const chunks = [];
  console.log('rodou')

  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  console.log(chunks.join(""));
}
main()