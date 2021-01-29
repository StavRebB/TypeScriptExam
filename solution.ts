console.log("STARTING PROJECT")

const listDiv:HTMLElement = document.querySelector('#todo-list')
const addBtn:HTMLElement = document.querySelector('#todo-save')
const taskInput:HTMLInputElement = document.querySelector('#todo-item')
const submitBtn:HTMLFormElement = document.querySelector('#todo-add')
const deleteAll:HTMLElement = document.querySelector('#todo-delall')

class Task {
    public todo:string
    public id:number

    constructor(todo:string) {
        this.todo = todo
        this.id = Date.now()
    }
}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault()
})

deleteAll.addEventListener('click', () => {
    localStorage.clear()
    listDiv.innerHTML = ""
})

addBtn.addEventListener('click', () => {
    let newItem:Task = new Task(taskInput.value)

    let newName:string = `Obj_${newItem.id}`

    localStorage.setItem(newName,JSON.stringify(newItem))

    console.log(newItem)

    createNewItem(newItem)
})

let createNewItem = (obj:any) => {
    let para:HTMLElement = document.createElement('div')

    para.classList.add('todo-item')

    para.innerText = obj.todo;

    para.setAttribute('id',`Obj_${obj.id}`)

    let newBtn:HTMLElement = document.createElement('input')

    newBtn.classList.add('todo-ok')

    newBtn.setAttribute('type','button')

    newBtn.setAttribute('value','✓')

    newBtn.setAttribute('onclick','markTask(event)')

    para.append(newBtn)
    listDiv.append(para)
}

window.onload = () => {
    for (var i = 0; i < localStorage.length; i++){
        let tasking = JSON.parse(localStorage.getItem(localStorage.key(i)));
        createNewItem(tasking)
    }
}

let markTask = (event:any) => {
    let btnDiv:HTMLElement = event.target.parentElement
    btnDiv.classList.add('done')
}