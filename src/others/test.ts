const texto = `Aqui está um exemplo de texto que contém o nome Lucas de Sousa Assunção várias vezes. Lucas de Sousa Assunção é mencionado em diferentes contextos. Por exemplo, Lucas de Sousa Assunção pode ser um nome comum em algumas regiões.`;

// Expressão regular para encontrar todas as ocorrências de "Lucas de Sousa Assunção"
const regex = /Lucas de Sousa Assunção/g;

let ocorrencias = [];
let match;

// Usar loop para encontrar todas as ocorrências e suas posições
while ((match = regex.exec(texto)) !== null) {
    ocorrencias.push({
        index: match.index,
        texto: match[0]
    });
}

console.log(`Número de ocorrências: ${ocorrencias.length}`);
console.log(`Ocorrências e posições:`);
ocorrencias.forEach(ocorrencia => {
    console.log(`Posição: ${ocorrencia.index}, Texto: ${ocorrencia.texto}`);
});
