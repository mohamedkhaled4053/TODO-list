//### variables
let input = document.querySelector('.input')
let add = document.querySelector('.add')
let tasksDiv = document.querySelector('.tasks')

// get tasks from local storage if any
let tasks = JSON.parse(window.localStorage.getItem('tasks')) || []

//### helper functions
function addTask() {
    // make a task object
    let task = {
        id: Date.now(),
        done: false,
        title: input.value
    }

    tasks.push(task)
    addToPage()

    // add tasks array to local storage
    window.localStorage.setItem('tasks', JSON.stringify(tasks))
}

function addToPage() {
    // clear taskDiv
    tasksDiv.innerHTML = ''

    // add the tasks
    tasks.forEach((task, index) => {
        // make task div
        let newTask = document.createElement('div')
        newTask.classList.add('task')
        newTask.setAttribute('data-id', task.id)
        newTask.textContent = task.title;
        //check if task is done
        if (task.done) {
            newTask.classList.add('done')
        }

        //make delete button
        let deleteButton = document.createElement('span')
        deleteButton.textContent = 'delete'
        deleteButton.classList.add('del')
        // delete task if "delete" is clicked
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1)
            // update the page after deleting
            addToPage()
            // update local storage after deleting
            window.localStorage.setItem('tasks', JSON.stringify(tasks))
        })
        newTask.appendChild(deleteButton)

        //make done button
        let doneButton = document.createElement('span')
        //make its class depend on the done value
        if (task.done == false) {
            doneButton.textContent = 'done'
            doneButton.classList.add('done')
        } else {
            doneButton.textContent = 'undone'
            doneButton.classList.add('undone')
        }

        // change the done value and the button onclick
        doneButton.addEventListener('click', () => {
            if (doneButton.className == 'done') {
                task.done = true
                doneButton.textContent = 'undone'
                doneButton.className = 'undone'
            } else {
                task.done = false
                doneButton.textContent = 'done'
                doneButton.className = 'done'
            }

            // update the page after done
            addToPage()
            // update local storage after done
            window.localStorage.setItem('tasks', JSON.stringify(tasks))
        })

        let buttons = document.createElement('div')
        buttons.className = 'buttons'
        buttons.append(doneButton, deleteButton)
        newTask.appendChild(buttons)
        tasksDiv.appendChild(newTask)
    });
    // // limit taskDiv height
    // if (tasksDiv.clientHeight >= 500) {
    //     tasksDiv.style.overflowY = 'scroll'
    // }else{
    //     tasksDiv.style.overflowY = 'visible'
    // }
}


// ### run functions
addToPage()

//### EventListerners

// add task to the page
add.onclick = () => {
    // reset
    input.placeholder = 'Add task here'
    input.classList.remove('needed')

    // check if the input is empty
    if (input.value) {
        addTask()
        input.value = ''
    } else {
        input.placeholder = 'please add a task first'
        input.classList.add('needed')
    }
}

// make enter key click add button
input.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        add.click()
    }
})
