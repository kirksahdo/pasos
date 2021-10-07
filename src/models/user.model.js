export default class UserModel {
    constructor(
        id,
        name,
        email,
        created_at,
        udpated_at,
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.created_at = created_at;
        this.udpated_at = udpated_at;
    }
}