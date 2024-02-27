import { createContext, useContext, useState, useEffect, useRef } from "react";
import { getRequests, getRequestsByStatus } from "../api/requests";
import { useAuth } from "./AuthContext";

const RequestsContext = createContext();

export const useRequests = () => {
	const context = useContext(RequestsContext);
	if (!context) {
		throw new Error("useRequests must be used within an RequestsProvider");
	}
	return context;
};

export const RequestsProvider = ({ children }) => {
	const [requests, setRequests] = useState([]);
	const [requestedRequest, setRequestedRequest] = useState({});

	const { isAuthenticated } = useAuth();

	const getRequestsData = async () => {
		try {
			const res = await getRequests();
			setRequests(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getRequestsByStatusData = async (status) => {
		try {
			const res = await getRequestsByStatus(status);
			setRequests(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	// Cambiado para que solo haga la peticion si esta autenticado
	useEffect(() => {
		if (isAuthenticated) {
			getRequestsData();
		}
	}, [isAuthenticated]);

	const requestsData = { requests, setRequests, requestedRequest, setRequestedRequest, getRequestsData, getRequestsByStatusData };

	return <RequestsContext.Provider value={requestsData}>{children}</RequestsContext.Provider>;
};
