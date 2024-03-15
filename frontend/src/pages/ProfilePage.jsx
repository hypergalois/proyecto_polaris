import React from "react";
import ProfileDetails from "../components/ProfileDetails";
import ProfileProjects from "../components/ProfileProjects";
import ProfileUserManagement from "../components/ProfileUserManagement";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

function ProjectHomePage() {
	const { userRole, getUserRole } = useAuth();

	useEffect(() => {
		getUserRole();
	}, []);

	return (
		<>
			<div className="items-center">
				<div className="flex justify-center h-screen">
					<div className="mx-auto text-center">
						<div className="text-4xl mb-4">
							<h1>PerfilePage</h1>
						</div>
						<div className="mb-4">
							<ProfileDetails />
						</div>
						<div className="mb-4">
							<ProfileProjects />
						</div>
						{userRole == "ADMIN" && (
							<div className="mb-4">
								<ProfileUserManagement />
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default ProjectHomePage;
