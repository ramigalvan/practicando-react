import { useState, type ChangeEvent, type ChangeEventHandler, type FormEvent } from "react"

interface User {
    name: string
    email: string
    dob: string //date of birth
}
function Formulario() {
    const [user, setUser] = useState<User>({ dob: "", email: "", name: "" })
    const [errors, setErrors] = useState<Partial<User>>({});
    const [message, setMessage] = useState<string>("");

    const validateUser = (user: User) => {
        const newErrors: Partial<User> = {}
        const { name, email, dob } = user;

        if (!name.trim()) {
            newErrors.name = "El nombre es obligatorio."
        }

        if (!email.includes("@")) {
            newErrors.email = "El email debe ser valido."
        }

        if (!dob) {
            newErrors.name = "La fecha de nacimiento es obligatoria."
        }
        return newErrors;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const validationErrors = validateUser(user);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            setMessage("");
            return;
        }

        console.log(user);
        setErrors({})
        setMessage("Usuario registrado con extio");
        setUser({ name: "", email: "", dob: "" })

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
            <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={user.name}
                    onChange={handleChangeName}
                    required
                />
                {errors.name && <p className="error">{errors.name}</p>}
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={handleChangeEmail}
                    required
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <label htmlFor="dob">dob</label>
                <input
                    type="date"
                    id="dob"
                    value={user.dob}
                    onChange={handleChangeDob}
                    required
                />
                {errors.dob && <p className="error">{errors.dob}</p>}
                <button type="submit">Registrar usuario</button>
            </form>
            {message && <p className="success">{message}</p>}
        </section>
    )
}

export default Formulario