// LoginComponent.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { login: loginUser, isAuthenticated, errors: loginErrors } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/home");
		}
	}, [isAuthenticated, navigate]);

	const onSubmit = async (data) => {
		await loginUser(data);
	};

	return (
		<div>
			<div>
				{loginErrors.map((error, index) => (
					<div className="mt-4 text-red-500 font-semibold" key={index}>
						{error.message}
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="p-4">
				<div className="mb-4">
					<input
						className="w-full sm:w-5/12 h-12 px-3 sm:px-6 text-black rounded-2xl"
						type="email"
						{...register("email", {
							required: true,
							pattern: /^\S+@\S+$/i,
						})}
						placeholder="*Correo de la U-Tad"
						autoComplete="email"
					/>
					{errors.email && <p className="mb-2 mt-4 text-red-500 font-semibold">Hace falta un email</p>}
				</div>
				<div className="mb-4">
					<input
						className="w-full sm:w-5/12 h-12 px-3 sm:px-6 text-black rounded-2xl"
						type="password"
						{...register("password", {
							required: true,
							minLength: 3,
						})}
						placeholder="*Contraseña"
						autoComplete="current-password"
					/>
					{errors.password && <p className="mb-2 mt-4 text-red-500 font-semibold">Hace falta una contraseña</p>}
				</div>
				<div className="mb-4">
					<button className="w-full sm:w-5/12 h-12 px-3 sm:px-6 rounded-xl bg-blue-600 hover:bg-blue-400 text-white font-bold" type="submit">
						INICIAR SESIÓN
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
