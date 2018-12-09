var expect = require('expect');

var {generateMessage} = require('./message');

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