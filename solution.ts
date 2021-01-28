console.log("STARTING PROJECT")

class Task {
    public todo:string
    public id:number

    constructor(todo:string) {
        this.todo = todo
        this.id = randKey()
    }
}

let randKey = ():number => {
    return Math.ceil(Math.random() * 100000)
}

const submitBtn = document.getElementById('todo-add')

submitBtn.addEventListener('click', (event) => {
    event.preventDefault()
})