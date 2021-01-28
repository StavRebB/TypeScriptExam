console.log("STARTING PROJECT");
var Task = /** @class */ (function () {
    function Task(todo) {
        this.todo = todo;
        this.id = randKey();
    }
    return Task;
}());
var randKey = function () {
    return Math.ceil(Math.random() * 100000);
};
var submitBtn = document.getElementById('todo-add');
submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
});
