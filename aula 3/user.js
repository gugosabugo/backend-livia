class User{
    constructor(id,nome,email){
        this.id = id;
        this.nome = nome;
        this.email = email;
    }
}
class Admin extends User{
    constructor(id,nome,email,nivelAcesso){
        super(id,nome,email)
        this.nivelAcesso = nivelAcesso
    }
}

module.export = User //Exporta a classe User