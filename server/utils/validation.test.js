const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {

    it('should reject non-string values', () => {
        var input = 123;
        var target = isRealString(input);
        expect(target).toBeFalsy();
    });
    it('should reject string with only spaces', () => {
        var input = '     ';
        var target = isRealString(input);
        expect(target).toBeFalsy();        
    });
    it('should allow string with non-space characters', () => {
        var input = "Hello";
        var target = isRealString(input);
        expect(target).toBeTruthy();        
    });
});
