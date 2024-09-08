let projects = [];
let selectedProjectIndex = -1;

function addProject() {
    const projectName = document.getElementById('new-project').value;
    if (projectName) {
        projects.push({ name: projectName, tasks: [], completedTasks: [] });
        renderProjects();
        document.getElementById('new-project').value = '';
    }
}

function renderProjects() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';
    projects.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <span>${project.name}</span>
        `;
        projectItem.onclick = () => selectProject(index);
        projectList.appendChild(projectItem);
    });
}

function selectProject(index) {
    selectedProjectIndex = index;
    const project = projects[selectedProjectIndex];
    document.getElementById('selected-project').textContent = project.name;
    renderTasks();
    updateProgressBar();
}

function addTask() {
    const taskName = document.getElementById('new-task').value;
    const taskLink = document.getElementById('task-link').value;
    if (taskName && taskLink && selectedProjectIndex !== -1) {
        projects[selectedProjectIndex].tasks.push({ name: taskName, link: taskLink });
        renderTasks();
        updateProgressBar();
        document.getElementById('new-task').value = '';
        document.getElementById('task-link').value = '';
    }
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    const completedTasksList = document.getElementById('completed-tasks');
    taskList.innerHTML = '';
    completedTasksList.innerHTML = '<h3>Completed Tasks</h3>';
    
    const project = projects[selectedProjectIndex];
    
    project.tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <span>${task.name}</span>
            <a href="${task.link}" target="_blank">Link</a>
            <button onclick="completeTask(${index})">Complete</button>
        `;
        taskList.appendChild(taskItem);
    });

    project.completedTasks.forEach((task) => {
        const completedTaskItem = document.createElement('div');
        completedTaskItem.className = 'completed-task-item';
        completedTaskItem.innerHTML = `
            <span>${task.name}</span>
            <a href="${task.link}" target="_blank">Link</a>
        `;
        completedTasksList.appendChild(completedTaskItem);
    });
}

function completeTask(index) {
    const project = projects[selectedProjectIndex];
    const completedTask = project.tasks.splice(index, 1)[0];
    project.completedTasks.push(completedTask);
    renderTasks();
    updateProgressBar();
}

function toggleCompletedTasks() {
    const completedTasksDiv = document.getElementById('completed-tasks');
    completedTasksDiv.style.display = completedTasksDiv.style.display === 'none' ? 'block' : 'none';
}

function updateProgressBar() {
    const project = projects[selectedProjectIndex];
    const totalTasks = project.tasks.length + project.completedTasks.length;
    const completedTasks = project.completedTasks.length;
    
    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function editProjectName() {
    const newProjectName = prompt('Enter new project name:');
    if (newProjectName && selectedProjectIndex !== -1) {
        projects[selectedProjectIndex].name = newProjectName;
        renderProjects();
        document.getElementById('selected-project').textContent = newProjectName;
    }
}

function deleteProject() {
    if (selectedProjectIndex !== -1) {
        projects.splice(selectedProjectIndex, 1);
        selectedProjectIndex = -1;
        renderProjects();
        document.getElementById('selected-project').textContent = 'Select a Project';
        document.getElementById('task-list').innerHTML = '';
        document.getElementById('completed-tasks').innerHTML = '<h3>Completed Tasks</h3>';
        updateProgressBar();
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

function toggleCompletedTasks() {
    const completedTasksDiv = document.getElementById('completed-tasks');
    const taskListDiv = document.getElementById('task-list');
    
    if (completedTasksDiv.style.display === 'none') {
        completedTasksDiv.style.display = 'block';
        taskListDiv.style.display = 'none';
    } else {
        completedTasksDiv.style.display = 'none';
        taskListDiv.style.display = 'block';
    }
}

// Load projects from localStorage when the page loads
window.onload = function() {
    loadProjects();
    renderProjects();
};

// Function to save projects to localStorage
function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Function to load projects from localStorage
function loadProjects() {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
        projects = JSON.parse(savedProjects);
    }
}

// Add a project and save the updated list to localStorage
function addProject() {
    const projectName = document.getElementById('new-project').value;
    if (projectName) {
        projects.push({ name: projectName, tasks: [], completedTasks: [] });
        renderProjects();
        saveProjects(); // Save the updated projects to localStorage
        document.getElementById('new-project').value = '';
    }
}

// Select a project and render tasks
function selectProject(index) {
    selectedProjectIndex = index;
    const project = projects[selectedProjectIndex];
    document.getElementById('selected-project').textContent = project.name;
    renderTasks();
    updateProgressBar();
}

// Add a task to the selected project and save the updated list to localStorage
function addTask() {
    const taskName = document.getElementById('new-task').value;
    const taskLink = document.getElementById('task-link').value;
    if (taskName && taskLink && selectedProjectIndex !== -1) {
        projects[selectedProjectIndex].tasks.push({ name: taskName, link: taskLink });
        renderTasks();
        updateProgressBar();
        saveProjects(); // Save the updated projects to localStorage
        document.getElementById('new-task').value = '';
        document.getElementById('task-link').value = '';
    }
}

// Complete a task, move it to completed tasks, and save the updated list to localStorage
function completeTask(index) {
    const project = projects[selectedProjectIndex];
    const completedTask = project.tasks.splice(index, 1)[0];
    project.completedTasks.push(completedTask);
    renderTasks();
    updateProgressBar();
    saveProjects(); // Save the updated projects to localStorage
}



