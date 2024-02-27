"use strict";
const process = require("process");
const opentelemetry = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");
const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");

const exporterOptions = {
	url: "http://localhost:4318/v1/traces",
};

const traceExporter = new OTLPTraceExporter(exporterOptions);
const sdk = new opentelemetry.NodeSDK({
	traceExporter,
	instrumentations: [getNodeAutoInstrumentations()],
	resource: new Resource({
		[SemanticResourceAttributes.SERVICE_NAME]: "proyecto-polaris-backend",
	}),
});

sdk.start();
console.log("Tracing initialized");

process.on("SIGTERM", () => {
	sdk.shutdown()
		.then(() => console.log("Tracing terminated"))
		.catch((error) => console.log("Error terminating tracing", error))
		.finally(() => process.exit(0));
});
