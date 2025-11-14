import { useQuery, useMutation } from "@tanstack/react-query";
import { SurveyConfig, SurveySubmission } from "../../../shared/schemas";

const API_BASE = "/api/survey";

// Fetch survey config
export const useSurveyConfig = () => {
  return useQuery<SurveyConfig>({
    queryKey: ["surveyConfig"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/config`);
      if (!response.ok) {
        throw new Error("Failed to fetch survey config");
      }
      return response.json();
    },
    staleTime: Infinity,
  });
};

// Submit survey responses
export const useSubmitSurvey = () => {
  return useMutation({
    mutationFn: async (submission: SurveySubmission) => {
      const response = await fetch(`${API_BASE}/responses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit survey");
      }

      return response.json();
    },
  });
};
