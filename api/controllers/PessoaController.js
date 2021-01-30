const database = require('../models')

class PessoaController{
    static async pegaPessoasAtivas(req, res){
        try {
            const pessoasAtivas = await database.Pessoas.findAll()
            return res.status(200).json(pessoasAtivas) 
        } catch (erro) {
            return res.status(500).json(erro.message)
        }

    }

    static async pegaTodasAsPessoas(req, res){
        try {
            const todasAsPessoas = await database.Pessoas.scope('todos').findAll()
            return res.status(200).json(todasAsPessoas) 
        } catch (erro) {
            return res.status(500).json(erro.message)
        }

    }

    static async pegaUmaPessoa(req, res){
        const { id } = req.params

        try {
            const umaPessoa = await database.Pessoas.findOne({
                where: { id: Number(id)
                }
            })
            return res.status(200).json(umaPessoa)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async criaPessoa(req, res){
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(201).json(novaPessoaCriada)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async atualizaPessoa(req, res){
        const { id } = req.params
        const novasInfos = req.body
        try {
            await database.Pessoas.update(novasInfos, { where: {
                id: Number(id)
            }})

            const pessoaAtualizada =  await database.Pessoas.findOne({
                where: { id: Number(id)}})
            return res.status(200).json(pessoaAtualizada)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async apagaPessoa(req, res){
        const { id } = req.params
        try {
            await database.Pessoas.destroy({where: { id: Number(id)}})
            return res.status(200).json({mensagem: `id ${id} foi deletado com sucesso.`})
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async pegaUmaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params

        try {
            const umaMatricula = await database.Matriculas.findOne({
                where: { id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json(umaMatricula)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async criaMatricula(req, res){
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId)}
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(201).json(novaMatriculaCriada)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async atualizaMatricula(req, res){

        const { estudanteId, matriculaId } = req.params
        const novasInfos = req.body

        try {
            await database.Matriculas.update(novasInfos, { where: {
                id: Number(matriculaId),
                estudante_id: Number(estudanteId)
            }})

            const matriculaAtualizada =  await database.Matriculas.findOne({
                where: { id: Number(matriculaId)}})
            return res.status(200).json(matriculaAtualizada)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async deletaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.destroy({where: { id: Number(matriculaId)}})
            return res.status(200).json({mensagem: `Matrícula ${matriculaId} foi deletada com sucesso.`})
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async restauraPessoa(req, res){
        const { id } = req.params
        try {
            await database.Pessoas.restore({where: {
                id: Number(id)
            }})
            return res.status(200).json({mensagem: `id ${id} restaurado com sucesso.`})
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }

    static async pegaMatricula(req, res){
        const { estudanteId } = req.params
        try {

            const pessoa = await database.Pessoas.findOne({where: {id: Number(estudanteId)}})
            const matriculas = await pessoa.getAulasMatriculadas()
           
            return res.status(200).json(matriculas)
        } catch (erro) {
            return res.status(500).json(erro.message)
        }
    }
}

module.exports = PessoaController
