let todoListId = 1;

class Task {
    constructor(text) {
        this.text = text;
        this.isDone = false;
        this.id = new Date().getTime();
        this.isExpired = false;
        this.expirationDate = new Date().getTime() + 172800000; // 2 days expired time
    }
}

class TodoList {
    constructor(todoListName, parentHtmlElement) {
        this.id = `todo-list-${todoListId++}`; 
        this.tasks = JSON.parse(localStorage.getItem(this.id)) || [];
        this.todoListName = todoListName;
        this.parentHtmlElement = parentHtmlElement;
        this.taskForEdit = null;
        this.checkExpirationDate();
    }

    addTask(taskName) {
        if(!taskName) return
        const task = new Task(taskName);
        this.tasks.push(task);
        this.update();
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.update();
    }

    clearAllItems() {
        this.tasks = [];
        this.taskForEdit = null;
        this.render();
        localStorage.removeItem(this.id);
    }
    render() {
        this.parentHtmlElement.innerHTML = '';
        this.addTitle();
        this.addInputContainer();
        this.addTodoList();
        this.addClearButton();
    }

    addTitle() {
        const h2 = document.createElement("h2")
        h2.innerHTML = this.todoListName;
        this.parentHtmlElement.appendChild(h2)
    }

    addInputContainer() {
        const inputContainer = document.createElement('div');
        inputContainer.classList.add("input-group", "mb-3");

        const input = document.createElement('input');
        input.classList.add('form-control', 'add-edit-input');
        input.value = this.taskForEdit ? this.taskForEdit.text : '';
        
        const inputButtonContainer = document.createElement('div');
        inputButtonContainer.classList.add('input-group-append');

        const inputButton = document.createElement('button');
        inputButton.classList.add('btn', "btn-outline-secondary", "ml-3", "px-4", 'add-edit-button');
        
        inputButton.innerHTML = this.taskForEdit ? 'Edit': 'Add';
        inputButton.addEventListener('click', () =>  {
            if(this.taskForEdit){
                const {id} = this.taskForEdit;
                this.saveEditTask(id, input.value);
            } else{
                this.addTask(input.value);
            }
            
        })

        inputButtonContainer.appendChild(inputButton);
        inputContainer.appendChild(input);
        inputContainer.appendChild(inputButtonContainer);


        this.parentHtmlElement.appendChild(inputContainer);
    }

    addTodoList() {
        const ul = document.createElement('ul');
        ul.classList.add("todo-list");
        this.tasks.map(task => {
            const { text, id, isDone, isExpired} = task
            const li = document.createElement('li');

            const container = document.createElement('div');
            container.classList.add("todo-list-item", isDone && "done", isExpired && 'expired');
            const textContainer = document.createElement('div');
            textContainer.classList.add("todo-list-item-text")
            textContainer.innerHTML = `${text}${isExpired ? ("(Task is expired)") : ""}`;

            const actionsContainer = document.createElement('div');
            actionsContainer.classList.add("todo-list-item-actions")

            const removeIcon = document.createElement('i');
            removeIcon.classList.add("bi", "bi-trash");
            removeIcon.style.color = "red"
            removeIcon.addEventListener('click', () => this.removeTask(id));


            const isDoneCheckBox = document.createElement('input');
            isDoneCheckBox.type = 'checkbox';
            isDoneCheckBox.checked = isDone;
            isDoneCheckBox.classList.add('form-check-input', 'mx-3');
            isDoneCheckBox.addEventListener('change', () => this.toggleIsDone(id))


            const editIcon = document.createElement('i');
            editIcon.classList.add("bi", "bi-pen");
            editIcon.style.color = "green"
            editIcon.addEventListener('click', () => this.setEditTask(task));


            actionsContainer.appendChild(editIcon);
            actionsContainer.appendChild(isDoneCheckBox);
            actionsContainer.appendChild(removeIcon);
            container.appendChild(textContainer);
            container.appendChild(actionsContainer);

            li.appendChild(container)
            ul.appendChild(li);
        })
        this.parentHtmlElement.appendChild(ul);
    }

    addClearButton() {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('clear-button-container');
        const button = document.createElement('button');
        button.classList.add("btn", 'clear-button');
        button.innerHTML = 'Clear Items';
        button.addEventListener('click', () => this.clearAllItems())

        buttonContainer.appendChild(button);

        this.parentHtmlElement.appendChild(buttonContainer);
    }

    toggleIsDone(taskId) {
        this.tasks = this.tasks.map(task => {
            if(task.id === taskId){
                return {...task, isDone: !task.isDone} 
            }
            return task;
        })
        this.update();
        
    }

    setEditTask(task) {
        this.taskForEdit = task;
        this.render();
    }

    saveEditTask(id, text) {
        this.tasks = this.tasks.map(( task ) => {
            if(task.id === id){
                return { ...task, text: text }
            }
            return task
        })
        this.taskForEdit = null;
        this.update()

    }

    saveLocalStorage() {
        localStorage.setItem(this.id, JSON.stringify(this.tasks))
    }

    update() {
        this.render();
        this.saveLocalStorage();
    }

    checkExpirationDate() {
        const date = new Date().getTime()
        this.tasks = this.tasks.map((task) => ({...task, isExpired: date > task.expirationDate}));
        this.update();
    }
    
}

const parentContainer1 = document.querySelector("#todo-list1");
new TodoList("Grocery Bud", parentContainer1);
const parentContainer2 = document.querySelector("#todo-list2");
new TodoList("Grocery Bud", parentContainer2);
