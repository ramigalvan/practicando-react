import { useEffect, useState, useRef, type FormEvent } from "react"
import './TodoApp.css'
//TODO: modularizar
//TODO: usa modals para el boton de modificar
//TODO: aplicar css y responsive

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

function TodoApp() {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [task, setTask] = useState<Task>({
        completed: false,
        text: "",
        id: ""
    });

    const [taskToEdit, setTaskToEdit] = useState<Task | null>();

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

    const saveTaskChanges = () => {
        if (!taskToEdit || !taskToEdit.text.trim()) return;

        const updatedTasks = tasks.map((t) =>
            t.id === taskToEdit.id ? taskToEdit : t
        );

        setTasks(updatedTasks);
        modalRef.current?.close();
        setTaskToEdit(null);
    };

    const openEditModal = (task: Task) => {
        setTaskToEdit(task)
        modalRef.current?.showModal();
    }

    const cancelEdit = () => {
        modalRef.current?.close();
        setTaskToEdit(null)
    }
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
                    onChange={(e) => setTask({ ...task, text: e.target.value })}
                    id="input-tarea"
                />
                <button type="submit">Agregar</button>
            </form>
            <h3>Lista de tareas</h3>
            <ul className="listTasks">
                {
                    tasks.map(({ text, id, completed }) =>
                        <li className="taskItem"
                            key={id}>
                            <span
                                style={{ textDecoration: completed ? "line-through" : "none" }}>{text}</span>

                            <div className="buttons">
                                <button
                                    onClick={() =>
                                        setTasks((prev) =>
                                            prev.map((t) =>
                                                t.id === id ? { ...t, completed: !t.completed } : t))
                                    }
                                >{completed ? "Deshacer" : "Completar"}
                                </button>
                                <button
                                    onClick={() => openEditModal({ completed, id, text })}>modificar
                                </button>
                                <button
                                onClick={() => setTasks((prev) => prev.filter((t) => t.id !== id))}>
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    )
                }
            </ul>

            <dialog ref={modalRef}>
                <h4>Editar task</h4>
                <input
                    type="text"
                    value={taskToEdit?.text || ""}
                    onChange={(e) =>
                        setTaskToEdit((prev) =>
                            prev ? { ...prev, text: e.target.value } : null
                        )
                    }
                />
                <div style={{ marginTop: "1rem" }}>
                    <button onClick={saveTaskChanges}>Guardar</button>
                    <button onClick={cancelEdit} style={{ marginLeft: "1rem" }}>Cancelar</button>
                </div>
            </dialog>

        </section>
    )
}

export default TodoApp