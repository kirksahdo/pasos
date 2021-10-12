export default class ContatoModel {
    constructor(
        id,
        uid,
        nome,
        contato,
        observacao,
        createdAt,
        updatedAt
    ) {
        this.id = id
        this.uid = uid
        this.nome = nome
        this.contato = contato
        this.observacao = observacao
        this.createdAt = createdAt ? createdAt : Date.now().toString()
        this.updatedAt = updatedAt ? updatedAt : Date.now().toString()
    }
}