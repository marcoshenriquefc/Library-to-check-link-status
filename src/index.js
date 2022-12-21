import fs from 'fs'
import chalk from 'chalk'


function extrairLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const captura = [...texto.matchAll(regex)];

    const resultados = captura.map(captura => {
        return ({ [captura[1]]: captura[2] })
    })

    return resultados.length !== 0 ? resultados : 'Não há links no arquivo selecionado';
}


function trataErro(erro) {
    throw new Error(chalk.red(erro.code, ': Erro ao encontrar o diretório'))
}

async function pegaArquivo(caminhoArquivo) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoArquivo, encoding)
        return extrairLinks(texto);
    } catch (erro) {
        trataErro(erro)
    }
}

export { pegaArquivo }