const database = require('../models')

class Services {
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async pegaTodosOsRegistros(){
        return database[this.nomeDoModelo].findAll();
    }

    async pegaUmRegistro(id){

    }

    async criaRegistro(dados){

    }

    async atualizaRegistro(dadosAtualizados, id){

    }

    async apagaRegistro(){
        
    }
}

module.exports = Services