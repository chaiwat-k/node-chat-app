var moment = require('moment');

// Jan 1st 1970 00:00:00 UTC - zero - the Epoch
// -1000 => 1 second before the Epoch
// 3200 => 32 second after the Epoch

// var d = moment();
// d.add(100,'year').subtract(9, 'month');
// console.log(d.format('MMM Do, YYYY h:mm a'));

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('MMM Do, YYYY h:mm a'));
console.log('Timestamp: ', date.valueOf());
console.log('Timestamp: ', moment().valueOf());