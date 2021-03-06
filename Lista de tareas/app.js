const formulario = document.getElementById('formulario')
const input = document.getElementById('input')
const listaTareas = document.getElementById('lista-tareas')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()
const c = console.log
/*let tareas = {
        1605990682337:{
        id: 1605990682337,
        texto: 'Tarea 1',
        estado: false
        }
}
*/

let tareas = {}

document.addEventListener('DOMContentLoaded', ()=>{
    //listaTareas.innerHTML = ''
    if (localStorage.getItem('tareas')) {
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    
    pintarTareas()
})

listaTareas.addEventListener('click', (e) =>{
    btnAccion(e)
  
})

formulario.addEventListener('submit', e =>{
    e.preventDefault()
    //c(input.value)

    setTarea()
})

const setTarea = e =>{
    if (input.value.trim() === '') {
        alert('Debe agregar una tarea')
        return
    }
    
    const tarea = {
        id: Date.now(),
        texto: input.value,
        estado: false
    }

   tareas[tarea.id] = tarea
    formulario.reset()
    input.focus()

    pintarTareas()
}

const pintarTareas = () =>{
    localStorage.setItem('tareas',JSON.stringify(tareas))


    if (Object.values(tareas).length === 0) {
        listaTareas.innerHTML = `
        <div class="alert alert-dark text-center">
                <h2>No hay tareas pendientes 👍</h2>   
            </div>
        `
        return
    }


   listaTareas.innerHTML = ''
    Object.values(tareas).forEach(tarea =>{
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto

        if (tarea.estado) {
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle','fa-undo-alt')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }

        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
        fragment.appendChild(clone)
    })

    listaTareas.appendChild(fragment)
}

const btnAccion = e =>{
   // c(e.target.classList.contains('fa-check-circle'))
if (e.target.classList.contains('fa-check-circle')) {
    tareas[e.target.dataset.id].estado = true
    pintarTareas()
}

if (e.target.classList.contains('fa-minus-circle')) {
    delete tareas[e.target.dataset.id]
    pintarTareas()
}

if (e.target.classList.contains('fa-undo-alt')) {
     tareas[e.target.dataset.id].estado = false
     pintarTareas()
 }

    e.stopPropagation()
}