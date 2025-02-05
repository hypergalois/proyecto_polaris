// HomePage.js
import { useState, useEffect } from "react";
import { useProjects } from "../context/ProjectsContext.jsx";
import { useAreas } from "../context/AreasContext.jsx";
import SearchForms from "../components/HomeSearchComponents/SearchForms.jsx";
import SearchResults from "../components/HomeSearchComponents/SearchResults.jsx";
import { useParams } from "react-router-dom";

import CircularProgress from "@mui/joy/CircularProgress";

function HomePage() {
	var { area } = useParams();
	area = area || "all";
	//console.log("Has seleccionado el area: ", area);

	const { projects, getProjectsHome } = useProjects();
	const { degrees, getDegrees, awards, getAwards, subjects, getSubjects } = useAreas();
	const [loading, setLoading] = useState(true);
	const [degreeFilter, setDegreeFilter] = useState({ label: "Todos los Grados", value: "All" });
	const [subjectFilter, setSubjectFilter] = useState({ label: "Todas las Asignaturas", value: "All" });
	const [courseFilter, setCourseFilter] = useState({ label: "Cursos (Todos)", value: "All" });
	const [awardFilter, setAwardFilter] = useState({ label: "Todos los Premios", value: "All" });
	const [searchQuery, setSearchQuery] = useState("");

	// @gonibix23 Aquí estableces el filtro basado en el parámetro area
	// useEffect(() => {
	// 	if (area) {
	// 		const foundArea = areas.find((a) => a.name.toLowerCase() === area.replace("-", " "));
	// 		if (foundArea) {
	// 			setAreaFilter({ label: foundArea.name, value: foundArea.id });
	// 		}
	// 	}

	// 	Promise.all([getProjectsHome(), getDegrees(), getAwards(), getSubjects()]).then(() => setLoading(false));
	// }, [area]);

	useEffect(() => {
		Promise.all([getProjectsHome(), getDegrees(), getAwards(), getSubjects()]).then(() => setLoading(false));
	}, []);

	if (projects.length === 0) {
		return <p>No hay proyectos para mostrar</p>;
	}

	const filteredProjects = projects.filter((project) => {
		const degreeMatch = degreeFilter.value == "All" || (project.degree && project.degree.id === degreeFilter.value);
		const subjetcMatch = subjectFilter.value == "All" || (project.subject && project.subject.id === subjectFilter.value);
		const courseMatch = courseFilter.value == "All" || project.course === courseFilter.value;
		const awardMatch = awardFilter.value === "All" || project.awardsId === awardFilter.value;
		const searchMatch = project.title.toLowerCase().includes(searchQuery.toLowerCase());

		return degreeMatch && subjetcMatch && courseMatch && awardMatch && searchMatch;
	});

	const degreeOptions = degrees
		? [
				{ label: "Todos los Grados", value: "All" },
				...degrees.map((degree) => ({
					label: degree.name,
					value: degree.id,
				})),
		  ]
		: [];

	const subjectOptions = subjects
		? [
				{ label: "Todas las Asignaturas", value: "All" },
				...subjects.map((subject) => ({
					label: subject.name,
					value: subject.id,
				})),
		  ]
		: [];

	const courseOptions = [
		{ label: "Todos los Cursos", value: "All" },
		{ label: "1", value: "1" },
		{ label: "2", value: "2" },
		{ label: "3", value: "3" },
		{ label: "4", value: "4" },
		{ label: "5", value: "5" },
	];

	const awardOptions = awards
		? [
				{ label: "Todos los Premios", value: "All" },
				...awards.map((award) => ({
					label: award.name,
					value: award.id,
				})),
		  ]
		: [];

	//console.log(degreeFilter.value, subjectFilter.value, courseFilter.value, awardFilter.value, searchQuery);

	return (
		<>
			<SearchForms
				degreeOptions={degreeOptions}
				subjectOptions={subjectOptions}
				courseOptions={courseOptions}
				awardOptions={awardOptions}
				degreeFilter={degreeFilter}
				subjectFilter={subjectFilter}
				courseFilter={courseFilter}
				awardFilter={awardFilter}
				setDegreeFilter={setDegreeFilter}
				setSubjectFilter={setSubjectFilter}
				setCourseFilter={setCourseFilter}
				setAwardFilter={setAwardFilter}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>
			{loading ? (
				<div className="flex justify-center items-center h-screen">
					<CircularProgress color="primary" variant="soft" />
				</div>
			) : (
				<SearchResults filteredProjects={filteredProjects} />
			)}
		</>
	);
}

export default HomePage;
