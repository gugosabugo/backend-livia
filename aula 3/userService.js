const User = require("user")
const path = require("path") //modulo para manipular caminhos
const fs = require("fs")// modulo para manipular arquivos file system

class userService{
    constructor(){ //quando não passa parâmetro traz um valor fixo, que não muda
        this.filePath = path.join(__dirname, 'user.json')
        this.users = [] //[] é um array, esse array é pra armazenar o user
        this.nextID = 1 //contador para gerar id
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

    getNextId(users){
        try{
        if(this.users.length === 0) return 1
            return Math.max(...this.users.map(user => user.id))+1
        }catch (erro){
            console.log("Erro ao buscar próximo id", erro)
        }
    }
    
    addUser(nome,email){
        const user = new User(this.nextID++, nome, email)  //cria novo user, e o novoid++ é pra toda vez aumentar um no id
        this.users.push(user) //da um push pra armazenar esse user no array de usuarios
        return user
    }
    getUsers(){
        return this.users
    }
}

module.exports = new userService
