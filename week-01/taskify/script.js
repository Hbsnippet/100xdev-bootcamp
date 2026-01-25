const tasks = [
    {id: 1, date:new Date().toLocaleDateString('en-US',{month : 'long', day: 'numeric', year: 'numeric'}), title: "Design", desc: "Cards banana hai", status: "ToDo", priority: "Medium"},
    {id: 2, date:new Date().toLocaleDateString('en-US',{month : 'long', day: 'numeric', year: 'numeric'}), title: "Review", desc: "Code check karo", status: "UnderReview", priority: "Urgent"},
    {id: 3, date:new Date().toLocaleDateString('en-US',{month : 'long', day: 'numeric', year: 'numeric'}), title: "Coding", desc: "Logic likho", status: "InProgress", priority: "Low"},
    {id: 4, date:new Date().toLocaleDateString('en-US',{month : 'long', day: 'numeric', year: 'numeric'}), title: "Launch", desc: "Done!", status: "Finished", priority: "Low"}
];

const renderTask = function () {

    const todoList = document.querySelector('#todo-column .task-list');
    const progressList = document.querySelector('#inprogress-column .task-list');
    const underList = document.querySelector('#review-column .task-list');
    const finishedList = document.querySelector('#finished-column .task-list');

    todoList.innerHTML = '';
    progressList.innerHTML = '';
    underList.innerHTML = '';
    finishedList.innerHTML = '';

    tasks.forEach((t) => {
        const card = document.createElement('div');
        card.className = 'task-card';

        card.setAttribute('draggable', 'true'); 
        card.setAttribute('data-id', t.id);

        const priorClass = `prior-${t.priority.toLowerCase()}`
        card.innerHTML = `
            <div class="kotha">
            <h3>${t.title}</h3>
            <p class='colorpill'>${t.desc}</p>
            </div>
            <div class='potha'>
            <p class = 'prior ${priorClass}'>${t.priority}</p>
            <p class = 'datewa'>${t.date}</p>
            </div>
        `;

        if (t.status === 'ToDo') {
            todoList.appendChild(card);
        } else if (t.status === 'UnderReview') {
            underList.appendChild(card);
        } else if (t.status === 'InProgress') {
            progressList.appendChild(card);
        } else if (t.status === 'Finished') {
            finishedList.appendChild(card);
        }
    });
}

renderTask();


const addTask = () => {
    const titleInput = document.getElementById('task-title');
    const taskDesc = document.getElementById('task-desc')
    const taskStatus = document.getElementById('task-status')
    const taskPrior = document.getElementById('task-prior')

    if (titleInput.value.trim() === "") return alert("Title toh daal bhai!");

    const newTask = {
            id: Date.now(), date:new Date().toLocaleDateString('en-US',{month : 'long', day: 'numeric', year: 'numeric'}), title: titleInput.value, desc: taskDesc.value, status: taskStatus.value, priority: taskPrior.value
    }

    tasks.push(newTask);
    renderTask();

    titleInput.value = '';
    descInput.value = '';
}

document.getElementById('add-task-btn').addEventListener('click', addTask)
renderTask()




document.addEventListener('dragstart', (ev) => {
    const card = ev.target.closest('.task-card'); 
    if (card) {
        ev.dataTransfer.setData("text/plain", card.getAttribute('data-id')); 
        card.classList.add('dragging');
        ev.dataTransfer.effectAllowed = "move";
    }
});



document.addEventListener('dragend', (ev) => {
    const card = ev.target.closest('.task-card');
    if (card) card.classList.remove('dragging');
});


const columns = document.querySelectorAll('.column');
columns.forEach(col => {

    col.addEventListener('dragover', (ev) => {
        ev.preventDefault(); 
        ev.dataTransfer.dropEffect = "move";
    });

    col.addEventListener('drop', (ev) => {
        ev.preventDefault(); 
        
        const taskId = ev.dataTransfer.getData("text/plain"); 
        const colId = ev.currentTarget.id; 

        const statusMap = {
            'todo-column': 'ToDo',
            'inprogress-column': 'InProgress',
            'review-column': 'UnderReview',
            'finished-column': 'Finished'
        };

        const newStatus = statusMap[colId];
        const task = tasks.find(t => t.id == taskId);
        
        if (task && newStatus) {
            task.status = newStatus;
            renderTask(); 
        }
    });
});