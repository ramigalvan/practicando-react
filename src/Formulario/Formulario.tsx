import { useState, type ChangeEvent, type ChangeEventHandler, type FormEvent } from "react"

interface User {
    name: string
    email: string
    dob: string //date of birth
}
function Formulario() {
    const [user, setUser] = useState<User>({ dob: "", email: "", name: "" })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(user);
    }

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, name: e.target.value });
    }

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, email: e.target.value });
    }

    const handleChangeDob = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, dob: e.target.value });
    }

    return (
        <section>
            <h2>App formulario</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={user.name}
                    onChange={handleChangeName}
                    required
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={handleChangeEmail}
                    required
                />
                <label htmlFor="dob">dob</label>
                <input
                    type="date"
                    id="dob"
                    value={user.dob}
                    onChange={handleChangeDob}
                    required
                />
                <button type="submit">Registrar usuario</button>
            </form>
        </section>
    )
}

export default Formulario