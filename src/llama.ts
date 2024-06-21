process.env.FIREWORKS_API_KEY='aRrzB7L6rFHpvAfaQbBPilwwbMNkPEp5cxuokpuXetclEjRS'

import { FireworksEmbeddings } from "@langchain/community/embeddings/fireworks";

async function main() {

  /* Embed queries */
  const fireworksEmbeddings = new FireworksEmbeddings();
  const res = await fireworksEmbeddings.embedQuery("Hello world");

  // console.log(res);

  /* Embed documents */
  const documentRes = await fireworksEmbeddings.embedDocuments([
    "Hello world",
    "Bye bye",
  ]);

  console.log(documentRes);
}

main()