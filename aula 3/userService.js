const User = require("./user")
const path = require("path") //modulo para manipular caminhos
const fs = require("fs")// modulo para manipular arquivos file system
const bcrypt = require("bcryptjs")// modulo para criptografar senha
const mysql = require("./mysql")// importando funções de conexão com o mysql

class userService {
    async addUser(nome, email, senha, cpf, endereco, telefone) {
        try {
            const senhaCripto = await bcrypt.hash(senha, 10)
            const resultados = await mysql.execute(
                `INSERT INTO usuarios (nome, email, senha, cpf, endereco, telefone)
	                  VALUES (?, ?, ?, ?, ?, ?);`,
                [nome, email, senhaCripto, cpf, endereco, telefone]
            )
            return resultados
        } catch (erro) {
            console.log("Erro ao adicionar usuário", erro)
            throw erro
        }
    }
    getUsers() {
        try {
            return this.users
        } catch (erro) {
            console.log("Erro ao buscar usuários", erro)
        }
    }

    async deleteUser(id) {
        try {
            const resultados = await mysql.execute(
                `DELETE FROM usuarios
                	   WHERE idusuario = ?;`,
                [id]
            )
            return resultados;
        } catch (erro) {
            console.log("Erro ao deletar usuário", erro)
        }
    }

    async updateUser(id, nome, email, senha, cpf, endereco, telefone) {
        try {
            const senhaCriptografada = await bcrypt.hash(senha, 10);
            const resultados = await mysql.execute(
                `UPDATE usuarios
                    SET nome = ?, email = ?, senha = ?, cpf = ?, endereco = ?, telefone = ?
                  WHERE idusuario = ?;`,
                [nome, email, senhaCriptografada, cpf, endereco, telefone, id]
            )
            return resultados;
        } catch (erro) {
            console.log("Erro", erro)
            throw erro
        }
    }
}

module.exports = new userService
