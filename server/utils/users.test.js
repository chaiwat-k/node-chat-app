const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users;    
    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'Mike',
                room: 'Node Course'
            },
            {
                id: '2',
                name: 'Jen',
                room: 'React Course'
            },
            {
                id: '3',
                name: 'Julie',
                room: 'Node Course'
            }
        ];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Andrew',
            room: 'The Office Fans'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(typeof resUser).toBe('object');
        expect(resUser).toMatchObject(user);
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');
        expect(typeof userList).toBe('object');
        expect(userList.length).toBe(2);
    });

    it('should return names for react course', () => {
        var userList = users.getUserList('React Course');
        expect(typeof userList).toBe('object');
        expect(userList.length).toBe(1);        
    });

    it('should remove a user', () => {
        var removedUser = users.removeUser('3');
        expect(users.users.length).toBe(2);
        expect(removedUser.name).toBe('Julie');
    });

    it('should not remove any user', () => {
        var removedUser = users.removeUser('100');
        expect(users.users.length).toBe(3);
        expect(removedUser).toBeNull();
    });

    it('should find user', () => {
        var user = users.getUser('3');
        expect(user).not.toBeNull();
        expect(user.name).toBe('Julie');
    });

    it('should not find any user', () => {
        var user = users.getUser('100');
        expect(user).toBeNull();       
    });     
});