console.log("STARTING PROJECT");
var listDiv = document.querySelector('#todo-list');
var addBtn = document.querySelector('#todo-save');
var taskInput = document.querySelector('#todo-item');
var submitBtn = document.querySelector('#todo-add');
var deleteAll = document.querySelector('#todo-delall');
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
submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
});
deleteAll.addEventListener('click', function () {
    localStorage.clear();
    listDiv.innerHTML = "";
});
addBtn.addEventListener('click', function () {
    var newItem = new Task(taskInput.value);
    var newName = "Obj_" + newItem.id;
    localStorage.setItem(newName, JSON.stringify(newItem));
    console.log(newItem);
    createNewItem(newItem);
});
var createNewItem = function (obj) {
    var para = document.createElement('div');
    para.classList.add('todo-item');
    para.innerText = obj.todo;
    para.setAttribute('id', "Obj_" + obj.id);
    var newBtn = document.createElement('input');
    newBtn.classList.add('todo-ok');
    newBtn.setAttribute('type', 'button');
    newBtn.setAttribute('value', '✓');
    newBtn.setAttribute('onclick', 'markTask(event)');
    para.append(newBtn);
    listDiv.append(para);
};
window.onload = function () {
    for (var i = 0; i < localStorage.length; i++) {
        var tasking = JSON.parse(localStorage.getItem(localStorage.key(i)));
        createNewItem(tasking);
    }
};
var markTask = function (event) {
    var btnDiv = event.target.parentElement;
    btnDiv.classList.add('done');
};
