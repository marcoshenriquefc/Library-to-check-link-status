function extraiLinks(arrLinks){
    return arrLinks.map( (objLinks) => {
        return Object.values(objLinks).join()
    })
}

async function checaStatus(listaURLs){
    const arrStatus = await Promise.all(
        listaURLs.map( async individualURL => {
            try{
                const response = await fetch(individualURL);
                return response.status;
            }
            catch(erro){
                return tratandoErro(erro)
            }
        })
    )

    return arrStatus
}

function tratandoErro(erro){
    if(erro.cause.code === 'ENOTFOUND'){
        return 'Link não encontrado'
    }
    else{
        return 'Ocorreu algum erro na requisição'
    }
}

export default async function validaLinks(links){
    const linkLista = extraiLinks(links)
    const listaStatus= await checaStatus(linkLista)

    return links.map((objetoLink, index )=> {
        return ({
            ...objetoLink,
            status: listaStatus[index]
        })
    })
}


// [gatinho salsicha](http://gatinhosalsicha.com.br/)