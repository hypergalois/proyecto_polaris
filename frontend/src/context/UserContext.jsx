import { createContext, useState, useContext, useEffect } from "react";
import { checkEmailRequest, getProfileRequest } from "../api/user";
import Cookies from "js-cookie";

export const UserContext = createContext();

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within an UserProvider");
	}
	return context;
};

export const UserProvider = ({ children }) => {
	const [existEmail, setExistEmail] = useState(true);
	const [profil, setProfile] = useState([]);
	const [errors, setErrors] = useState([]);

	const getExistEmail = async (email) => {
		try {
			const response = await checkEmailRequest(email);
			console.log(response.data.userExists)
			setExistEmail(!response.data.userExists)
		} catch (error) {
			if (Array.isArray(error.response.data)) {
				setErrors(error.response.data);
			} else {
				setErrors([error.response.data]);
			}
		}
	};

	const getProfile = async () => {
		try {
			const response = await getProfileRequest();
			setProfile(response.data);
		} catch (error) {
			if (Array.isArray(error.response.data)) {
				setErrors(error.response.data);
			} else {
				setErrors([error.response.data]);
			}
		}
	};

	useEffect(() => {
		if (errors.length > 0) {
			const timer = setTimeout(() => {
				setErrors([]);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [errors]);

	return <UserContext.Provider value={{ existEmail, getExistEmail, profil, getProfile, errors }}>{children}</UserContext.Provider>;
};
