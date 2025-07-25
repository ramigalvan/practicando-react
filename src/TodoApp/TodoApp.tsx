import { useEffect, useState, type FormEvent } from "react"

function TodoApp() {
    const [task, setTask] = useState<string>("");
    const [tasks, setTasks] = useState<string[]>(() => {
        const stored = localStorage.getItem("tasks")
        return stored ? JSON.parse(stored) : [];
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!task.trim()) return;
        setTasks([...tasks, task]);
        setTask("");
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
                    value={task}
                    required
                    onChange={(e) => setTask(e.target.value)}
                    id="input-tarea"
                />
                <button type="submit">Agregar</button>
            </form>
            <h3>Lista de tareas</h3>
            <ul>
                {
                    tasks.map((value, index) =>
                        <li key={index}>{value}</li>
                    )
                }
            </ul>
        </section>
    )
}

export default TodoApp