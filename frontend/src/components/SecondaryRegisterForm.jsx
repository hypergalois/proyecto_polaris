import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const SecondaryRegisterForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    // Pongo registerUser para evitar colisiones con el hook register
    const { register: registerUser, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const { email } = location.state || {};

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        }
    }, [isAuthenticated, navigate])

    const onSubmit = handleSubmit(async (data) => {
        await registerUser(data);
    });

    return (
        <div className="text-black">
            <div>
                {
                    registerErrors.map((error, index) =>
                    (
                        <div key={index}>{error.message}</div>

                    )
                    )}
            </div>
            <form onSubmit={onSubmit}>
                <input
                    type="hidden"
                    value={email}
                    name="email"
                />
                <div className="mb-4">
                    <input
                        className="w-full p-4 rounded-2xl"
                        type="text" {
                        ...register("username", {
                            required: true,
                            minLength: 3,
                            maxLength: 20
                        })}
                        placeholder="Nombre"
                    />
                    {
                        errors.username && (
                            <p className="mb-2">Hace falta un nombre de usuario</p>
                        )
                    }
                </div>
                <div className="mb-4">
                    <input
                        className="w-full p-4 rounded-2xl"
                        type="text" {
                        ...register("usersecondname", {
                            required: true,
                            minLength: 3,
                            maxLength: 20
                        })}
                        placeholder="Apellidos"
                    />
                    {
                        errors.username && (
                            <p className="mb-2">Hace falta los apellidos</p>
                        )
                    }
                </div>
                <div className="mb-4">
                    <input 
                        className="w-full p-4 rounded-2xl"
                        type="email" {
                        ...register("user", {
                            required: false,
                            minLength: 3,
                            maxLength: 20
                        })}
                        placeholder="Usuario (opcional)"
                    />
                </div>
                <div className="mb-4">
                    <select className="w3-select w-full p-4 rounded-2xl" name="job">
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                    </select>
                    {
                        errors.job && (
                            <p className="mb-2">Hace falta un cargo</p>
                        )
                    }
                </div>
                <div className="mb-4">
                    <select className="w3-select text-black w-full p-4 rounded-2xl" name="grade">
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                    </select>
                    {
                        errors.grade && (
                            <p className="mb-2">Hace falta un grado</p>
                        )
                    }
                </div>
                <div className="mb-4">
                    <button  className="w-full p-4 rounded-xl bg-[#333333] text-white" type="submit">
                        Registrarse
                    </button>
                </div>
            </form>

        </div>
    )
}

export default SecondaryRegisterForm;