import generateTodoDOM from "./DOM/generate-todo-DOM";
import mainPageMarkup from './DOM/main-page-DOM'
import loadAddTodoPage from "./add-todo";
import projectStorage from "./project-storage"
import Project from "./todo-projects";


const loadMainPage = () => {
    mainPageMarkup()
    const projectHeaders = document.querySelectorAll('.project-container h2')
    projectHeaders.forEach(header => {
        const project = projectStorage.get(header.innerText)

        // const todosDiv = document.querySelector(`#${header.innerText.replace(/\s/g, "-")}`)
        const projectContainer = header.parentElement.parentElement
        const todosDiv = projectContainer.querySelector('.todos-container')
        project.todos.forEach(todo => {
            todosDiv.append(generateTodoDOM(todo))
        })
    })

    // Button for adding new todo.
    const addTodoButton = document.querySelector('#add-todo-button')
    addTodoButton.addEventListener('click', () => {
        loadAddTodoPage()
    })
    // Button for adding new projects
    const newProjectButton = document.querySelector('#main-new-project-button')
    newProjectButton.addEventListener('click', () => {
        const newProject = prompt("Name your new project:")
        projectStorage.set(newProject, new Project(newProject))
        loadMainPage()
    })

    // Button for deleting project
    const deleteProjectButtons = document.querySelectorAll('.delete-project-button')
    deleteProjectButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', () => {
            const parent = deleteButton.parentElement
            const projectTitle = parent.querySelector('.project-title').innerText
            if (confirm(`Delete ${projectTitle}?`)){
                projectStorage.remove(projectTitle)
                loadMainPage()
            }
        })
    })
    // Loop through projects and delete buttons to delete correct todo.
    const projectContainers = document.querySelectorAll('.project-container')
    projectContainers.forEach(projectContainer => {
        const deleteTodoButtons = projectContainer.querySelectorAll('.todo-delete-button')
        deleteTodoButtons.forEach((deleteButton, i) => {
            deleteButton.addEventListener('click', (e) => {
                const parentProjectContainer = e.target.parentElement.parentElement.parentElement.parentElement
                const parentProjectTitle = parentProjectContainer.querySelector('h2').innerText
                const project = projectStorage.get(parentProjectTitle)
                // Remove from Project object.
                project.removeTodo(i)
                // Save to projectStorage.
                projectStorage.set(project.title, project)
                // Repaint page.
                loadMainPage()
            })
        })
    })

}

export default loadMainPage