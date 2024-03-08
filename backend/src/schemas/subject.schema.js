import { z } from "zod";

export const degreeSchema = z.object({
	name: z.string({
		required_error: "Name is required",
	}),
});