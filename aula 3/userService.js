const User = require("./user")
const path = require("path") //modulo para manipular caminhos
const fs = require("fs")// modulo para manipular arquivos file system

class userService{
    constructor(){ //quando não passa parâmetro traz um valor fixo, que não muda
        this.filePath = path.join(__dirname, 'user.json')
        this.users = this.loadUsers()
        this.nextID = this.getNextId()
    }

    loadUsers(){
        try{
            if(fs.existsSync(this.filePath)){
                const data = fs.readFileSync(this.filePath)
                return JSON.parse(data)
            }
        }catch(erro){
            console.log("Erro ao carregar arquivo", erro)
        }
        return [] //retorna um array vazio
    }

    getNextId(users){ //função para buscar próximo id
        try{
        if(this.users.length === 0) return 1
        return Math.max(...this.users.map(user => user.id))+1
        }catch (erro){
            console.log("Erro ao buscar próximo id", erro)
        }
    }

    saveUsers(){ //função para salvar os usuários
        try{
            fs.writeFileSync(this.filePath, JSON.stringify(this.users))
        }catch(erro){
            console.log("Erro ao salvar arquivo", erro)
        }
    }
    
    addUser(nome, email, senha, endereco, telefone, cpf){
        try{
            const user = new User(this.nextID++, nome, email, senha, endereco, telefone, cpf)  //cria novo user, e o novoid++ é pra toda vez aumentar um no id
            this.users.push(user) //da um push pra armazenar esse user no array de usuarios
            this.saveUsers()
            return user
        }catch(erro){
            console.log("Erro ao adicionar usuário", erro)
        }
    }
    getUsers(){
        try{
            return this.users
        }catch(erro){
            console.log("Erro ao buscar usuários", erro)
        }
    }
}

module.exports = new userService
