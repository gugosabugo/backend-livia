//classe base usuario
class usuario{
    constructor(nome, email, senha){
        this.nome = nome
        this.email = email
        this._senha = senha
    }

    autenticar(senha) {
        return senha === this._senha;
    }

    alterarSenha(novaSenha){
        this._senha = novaSenha
        console.log("Senha alterada com sucesso!")
    }
}

//classe admin que herda de usuário

class admin extends usuario{
    constructor(nome, email, senha, nivelAcesso){
        super(nome, email, senha)
        this.nivelAcesso = nivelAcesso
    }

    banirUsuario(usuario){
        console.log(`${usuario.nome} foi banido pelo admin ${this.nome}`)
    }

    //Polimorfismo sobrepondo o método autenticar

    autenticar(senha){
        return senha === this._senha && this.nivelAcesso === "alto"
    }
}

//exemplo de uso

const usuario1 = new usuario("Luiz", "luiz@gmail.com", "1234")
const usuario2 = new admin("Maria", "luiz@gmail.com", "1234", "Alto")

console.log(usuario1.autenticar("bunda")) //false
console.log(usuario1.autenticar("1234")) //true

console.log(usuario1.alterarSenha("macacoprego"))
console.log(usuario1.autenticar("macacoprego"))

usuario2.banirUsuario(usuario1)