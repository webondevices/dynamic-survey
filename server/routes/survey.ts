import { FastifyInstance } from "fastify";
import { surveyConfig } from "../../shared/surveyConfig.js";
import {
  SurveyConfigSchema,
  SurveySubmissionSchema,
} from "../../shared/schemas.js";
import { prisma } from "../db.js";

export async function surveyRoutes(server: FastifyInstance) {
  // Returns survey config
  server.get("/api/survey/config", async () => {
    const validatedConfig = SurveyConfigSchema.parse(surveyConfig);
    return validatedConfig;
  });

  // Stores survey answers
  server.post("/api/survey/responses", async (request) => {
    const submission = SurveySubmissionSchema.parse(request.body);
    const response = await prisma.response.create({
      data: {
        answers: JSON.stringify(submission.answers),
      },
    });
    return {
      success: true,
      id: response.id,
    };
  });
}
