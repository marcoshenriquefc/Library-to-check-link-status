import {pegaArquivo} from './index.js'
import fs from 'fs'
import chalk from 'chalk'
import validaLinks from './http-valida.js';

const argumentos = process.argv;


processaTexto(argumentos)

async function imprimeLista(valida, listaResultado, identificador = ''){

    if(valida){
        console.log(chalk.yellow('\nLista validada: '),
                    chalk.blue(identificador)
                    )
        console.log(await validaLinks(listaResultado))
    }
    else{
        console.log(chalk.yellow('\n\n\n\nLista de links: '),
                    chalk.blue(identificador)
                    )
                    console.log(await validaLinks(listaResultado))
    }
}

async function processaTexto(argumentosArquivo){
    const caminho = argumentosArquivo[2]
    const valida = argumentosArquivo[3] == '--valida'

    try{
        fs.lstatSync(caminho);
    }
    catch(erro){
        if(erro.code === 'ENOENT'){
            console.log(chalk.red('Arquivo ou diretório não encontrado ou não existe'))
            return
        }
    }


    if(fs.lstatSync(caminho).isFile()){

        const resultado = await pegaArquivo(caminho);

        imprimeLista(valida, resultado);
    }
    else if(fs.lstatSync(caminho).isDirectory()){
        const arquivos = await (fs.promises.readdir(caminho))

        arquivos.forEach(async (arquivoIndividual) =>{
            const lista = await pegaArquivo(`${caminho}/${arquivoIndividual}`);

            imprimeLista(valida, lista, `${arquivoIndividual}`);
        })
    }
}