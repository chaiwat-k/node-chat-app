var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    
    it('should generate context message object', () => {
        // store res in a variable
        var from = "Jen";
        var text = "Some messages";
        var res = generateMessage(from, text);
        expect(typeof res).toBe('object');
        // assert from match
        expect(res.from).toBe(from);
        // assert text match
        expect(res.text).toBe(text);
    });
});

describe('generateLocationMessage', () => {

    it('should generate location message', () => {
        var from = "Admin";
        var lat = 1, lng = 1;
        var res = generateLocationMessage(from,lat,lng);
        expect(typeof res).toBe('object');
        expect(res.from).toBe(from);
        expect(res.url).toBeTruthy();
        expect(res.url.endsWith('1,1')).toBeTruthy();
    });
});