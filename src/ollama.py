from langchain_community.llms import Ollama
print("TEST")
llm = Ollama(
    model="llama3"
)
res = llm.invoke("conte um piada")
print(res)