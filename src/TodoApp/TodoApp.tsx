import { useEffect, useState, type FormEvent } from "react"

//TODO: modularizar
//usa modals para el boton de modificar

interface Task {
    id: string;
    text: string;
    completed: boolean;
}
function TodoApp() {
    const [task, setTask] = useState<Task>({
        completed: false,
        text: "",
        id: ""
    });


    const [tasks, setTasks] = useState<Task[]>(() => {
        const stored = localStorage.getItem("tasks")
        return stored ? JSON.parse(stored) : [];
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!task.text.trim()) return;

        const newTask = {
            ...task,
            id: crypto.randomUUID()
        }
        setTasks([...tasks, newTask]);
        setTask({
            id: "",
            text: "",
            completed: false
        });
    }

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <section>
            <h2>Todo App</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="input-tarea">Agrega tu tarea:</label>
                <input
                    placeholder="Estudiar hoisting de JS..."
                    type="text"
                    value={task.text}
                    required
                    onChange={(e) => setTask({...task, text: e.target.value})}
                    id="input-tarea"
                />
                <button type="submit">Agregar</button>
            </form>
            <h3>Lista de tareas</h3>
            <ul>
                {
                    tasks.map(({text, id}) =>
                        <li style={{
                            marginBottom: "1rem",
                            display : "flex", 
                            flexDirection: "column",
                            alignItems: "flex-start",
                            }} 
                            key={id}>
                            <span>{text}</span>
                            <button>hacer</button>
                            <button>completar</button>
                            <button>modificar</button>
                        </li>
                    )
                }
            </ul>
        </section>
    )
}

export default TodoApp