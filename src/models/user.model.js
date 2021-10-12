export default class UserModel {
    constructor(
        uid,
        nome,
        email,
        createdAt,
        updatedAt
    ) {
        this.uid = uid
        this.nome = nome
        this.email = email
        this.seenTutorial = false,
        this.altura = 0.0,
        this.dataDeNascimento = 0,
        this.peso = 0.0,
        this.createdAt = createdAt ? createdAt : Date.now().toString()
        this.updatedAt = updatedAt ? updatedAt : Date.now().toString()
    }
}