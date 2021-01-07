let regExp = new RegExp(/^[a-zA-Z]+$/);

console.log(regExp.test('test'));

var str = "acb123..//_---!";
console.log(str.match(/^[a-zA-Z]+$/));
