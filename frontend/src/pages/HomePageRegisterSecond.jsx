import HomePageBar from "../components/HomePageBar";
import InitialRegisterForm from "../components/InitialRegisterForm";
import HomePageLanding from "../components/HomePageLanding";

import { Link } from "react-router-dom";

const HomePageRegister = () => {
    return (
        <div className="bg-[#858585] text-white  items-center">
            <HomePageBar />
            <div className="flex">
                <div className="flex-1">
                    <HomePageLanding />
                </div>
                <div className="flex-1 place-self-center text-center p-4 rounded-3xl bg-[#858585] text-white">
                    <h1 className="mb-4 text-2xl">CREA TU CUENTA</h1>
                    <h2 className="mb-4">Ya tienes una cuenta? <Link className="underline decoration-solid decoration-1" to="/">Iniciar sesión</Link></h2>
                    <InitialRegisterForm />
                </div>
            </div>
        </div>
    )
}

export default HomePageRegister;