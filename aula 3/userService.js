const User = require('./user');

class userService {
    constructor(){
        this.users = [];//Array para armazenar user
        this.nextid = 1;//icontador para gerar id
    }

    addUser(nome, email){
        const user = new User(this.nextid++, nome, email);
        this.users.push(user);
        return user;
    }
    getUsers(){
        return this.users
    }
}

module.exports = new userService;