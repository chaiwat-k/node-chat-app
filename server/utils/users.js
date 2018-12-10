[
    {
        id: '/#erslfjdlfdl',
        name: 'Andrew',
        room: 'The Office Fans'
    }
]

class Users{
    constructor(){
        this.users = [];
    }
    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        var index = this.users.findIndex(u => u.id === id);
        if(index < 0) return null;
        var removedUser = this.users[index];      
        this.users.splice(index, 1);
        return removedUser;
    }
    getUser(id){
        var user = this.users.find(u => u.id === id);
        if(!user) return null;
        return user;
    }
    getUserList(room){
        var users = this.users.filter(u=>u.room === room);
        var nameArr = users.map(u => u.name);
        return nameArr;
    }
}

module.exports = {
    Users
};

/*
class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    getUserDescription(){
        return `${this.name} is ${this.age} years old.`;
    }
}

var me = new Person('Andrew',25);
console.log('Description: ', me.getUserDescription());*/