export default class UserModel {
    constructor(
        uid,
        nome,
        email,
        altura,
        dataDeNascimento,
        peso,
        createdAt,
        updatedAt
    ) {
        this.uid = uid
        this.nome = nome
        this.email = email
        this.seenTutorial = false
        this.altura = altura
        this.dataDeNascimento = dataDeNascimento
        this.peso = peso
        this.lastChallenge=-1
        this.lastQuestionary=-1
        this.createdAt = createdAt ? createdAt : Date.now().toString()
        this.updatedAt = updatedAt ? updatedAt : Date.now().toString()
    }
}