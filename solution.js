console.log("STARTING PROJECT");
var listDiv = document.querySelector('#todo-list');
var addBtn = document.querySelector('#todo-save');
var taskInput = document.querySelector('#todo-item');
var submitBtn = document.querySelector('#todo-add');
var deleteAll = document.querySelector('#todo-delall');
var delDone = document.querySelector('#todo-delcom');
var Task = /** @class */ (function () {
    function Task(todo) {
        this.todo = todo;
        this.id = Date.now();
        this.classes = 'todo-item';
    }
    return Task;
}());
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
    createNewItem(newItem);
    taskInput.value = "";
});
var createNewItem = function (obj) {
    var para = document.createElement('div');
    para.setAttribute('class', "" + obj.classes);
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
    var sortedArr = [];
    for (var i = 0; i < localStorage.length; i++) {
        var tasking = JSON.parse(localStorage.getItem(localStorage.key(i)));
        sortedArr.push(tasking.id);
    }
    if (sortedArr.length) {
        sortedArr.sort(function (a, b) { return a - b; });
        for (var i_1 in sortedArr) {
            var objects = JSON.parse(localStorage.getItem("Obj_" + sortedArr[i_1]));
            createNewItem(objects);
        }
    }
};
var markTask = function (event) {
    var btnDiv = event.target.parentElement;
    btnDiv.classList.add('done');
    var divId = btnDiv.id;
    var updatedObj = JSON.parse(localStorage.getItem(divId));
    updatedObj.classes += " done";
    localStorage.setItem(divId, JSON.stringify(updatedObj));
};
delDone.addEventListener('click', function () {
    var todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach(function (val) {
        if (val.classList.contains('done')) {
            val.remove();
            localStorage.removeItem("" + val.id);
        }
    });
});
