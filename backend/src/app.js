import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./config/prisma.client.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./docs/swagger.js";

dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/projects.routes.js";
import degreeRoutes from "./routes/degrees.routes.js";
import areaRoutes from "./routes/areas.routes.js";
import requestRoutes from "./routes/requests.routes.js";
import testRoutes from "./routes/test.routes.js";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
console.log("Client URL is:", CLIENT_URL);

const app = express();

app.use(
	cors({
		origin: CLIENT_URL,
		credentials: true,
	})
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", authRequired, express.static("uploads"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { explorer: true }));

app.use("/api", authRoutes);
app.use("/api", projectRoutes);
app.use("/api", degreeRoutes);
app.use("/api", areaRoutes);
app.use("/api", requestRoutes);
app.use("/api", testRoutes);

process.on("unhandledRejection", (reason, promise) => {
	console.error("Unhandled Rejection at:", promise, "reason:", reason);
	// Mandarlo a Slack o sistema de monitoreo
	// Aquí puedes integrar tu código para enviar el log a un sistema externo
	// Ejemplo: sendErrorToMonitoringSystem(reason, promise);
});

process.on("uncaughtException", (error) => {
	console.error("Uncaught Exception thrown", error);
	// Mandarlo a Slack o sistema de monitoreo
	// Aquí puedes integrar tu código para enviar el log a un sistema externo
	// Ejemplo: sendErrorToMonitoringSystem(error);
	// Considera la posibilidad de realizar una limpieza suave aquí si es necesario
});

app.on("close", () => {
	prisma.$disconnect();
});

export default app;
