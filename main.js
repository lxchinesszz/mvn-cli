function MyError(msg) {
    this.name = "MyError";
    this.message = msg || "自定义异常的默认消息";
}

MyError.prototype = Object.create(Error.prototype);

MyError.prototype.constructor = MyError


function b() {
    try {
        a()
    } catch (e) {
        console.log(e)
    }
}


function a() {
    try {
        throw new MyError("xiaol")
    } catch (e) {
        throw new Error('12')
    }
}

b()
