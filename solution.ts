console.log("STARTING PROJECT")

const listDiv:HTMLElement = document.querySelector('#todo-list')
const addBtn:HTMLElement = document.querySelector('#todo-save')
const taskInput:HTMLInputElement = document.querySelector('#todo-item')
const submitBtn:HTMLFormElement = document.querySelector('#todo-add')
const deleteAll:HTMLElement = document.querySelector('#todo-delall')
const delDone:HTMLElement = document.querySelector('#todo-delcom')

class Task {
    public todo:string
    public id:number
    public classes:string

    constructor(todo:string) {
        this.todo = todo
        this.id = Date.now()
        this.classes = 'todo-item'
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

    createNewItem(newItem)

    taskInput.value = ""
})

let createNewItem = (obj:any) => {
    let para:HTMLElement = document.createElement('div')

    para.setAttribute('class',`${obj.classes}`)

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
    let sortedArr:Array<number>=[]
    for (var i = 0; i < localStorage.length; i++){
        let tasking = JSON.parse(localStorage.getItem(localStorage.key(i)))
        sortedArr.push(tasking.id)
    }
    if (sortedArr.length) {
        sortedArr.sort((a,b) => { return a-b})
        for (let i in sortedArr) {
            let objects = JSON.parse(localStorage.getItem(`Obj_${sortedArr[i]}`))
            createNewItem(objects)
        }
    }
}

let markTask = (event:any) => {
    let btnDiv:HTMLElement = event.target.parentElement
    btnDiv.classList.add('done')
    let divId:string = btnDiv.id
    let updatedObj = JSON.parse(localStorage.getItem(divId))
    updatedObj.classes += " done"
    localStorage.setItem(divId,JSON.stringify(updatedObj))
}

delDone.addEventListener('click', () => {
    let todoItems = document.querySelectorAll('.todo-item')
    todoItems.forEach((val) => {
        if (val.classList.contains('done')) {
            val.remove()
            localStorage.removeItem(`${val.id}`)
        }
    })
})