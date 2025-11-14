import { z } from "zod";

// Base validation schema
const BaseValidationSchema = z.object({
  required: z.boolean().optional(),
});

// Question type schemas
export const TextQuestionSchema = z.object({
  type: z.literal("text"),
  label: z.string(),
  name: z.string(),
  validation: BaseValidationSchema.extend({
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
  }).optional(),
  condition: z
    .object({
      name: z.string(),
      value: z.union([z.string(), z.number(), z.boolean()]),
    })
    .optional(),
});

export const TextareaQuestionSchema = z.object({
  type: z.literal("textarea"),
  label: z.string(),
  name: z.string(),
  validation: BaseValidationSchema.extend({
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
  }).optional(),
  condition: z
    .object({
      name: z.string(),
      value: z.union([z.string(), z.number(), z.boolean()]),
    })
    .optional(),
});

export const MultipleChoiceQuestionSchema = z.object({
  type: z.literal("multiple_choice"),
  label: z.string(),
  name: z.string(),
  options: z.array(z.string()),
  validation: BaseValidationSchema.optional(),
  condition: z
    .object({
      name: z.string(),
      value: z.union([z.string(), z.number(), z.boolean()]),
    })
    .optional(),
});

export const RatingQuestionSchema = z.object({
  type: z.literal("rating"),
  label: z.string(),
  name: z.string(),
  scale: z.number(),
  validation: BaseValidationSchema.optional(),
  condition: z
    .object({
      name: z.string(),
      value: z.union([z.string(), z.number(), z.boolean()]),
    })
    .optional(),
});

export const MultipleSelectQuestionSchema = z.object({
  type: z.literal("multiple_select"),
  label: z.string(),
  name: z.string(),
  options: z.array(z.string()),
  validation: BaseValidationSchema.extend({
    minChoices: z.number().optional(),
    maxChoices: z.number().optional(),
  }).optional(),
  condition: z
    .object({
      name: z.string(),
      value: z.union([z.string(), z.number(), z.boolean()]),
    })
    .optional(),
});

export const MultipleSelectWithOtherQuestionSchema = z.object({
  type: z.literal("multiple_select_with_other"),
  label: z.string(),
  name: z.string(),
  options: z.array(z.string()),
  validation: BaseValidationSchema.extend({
    minChoices: z.number().optional(),
    maxChoices: z.number().optional(),
  }).optional(),
  condition: z
    .object({
      name: z.string(),
      value: z.union([z.string(), z.number(), z.boolean()]),
    })
    .optional(),
});

export const YesNoQuestionSchema = z.object({
  type: z.literal("yes_no"),
  label: z.string(),
  name: z.string(),
  validation: BaseValidationSchema.optional(),
  condition: z
    .object({
      name: z.string(),
      value: z.union([z.string(), z.number(), z.boolean()]),
    })
    .optional(),
});

// Union of all question types
export const QuestionSchema = z.discriminatedUnion("type", [
  TextQuestionSchema,
  TextareaQuestionSchema,
  MultipleChoiceQuestionSchema,
  RatingQuestionSchema,
  MultipleSelectQuestionSchema,
  MultipleSelectWithOtherQuestionSchema,
  YesNoQuestionSchema,
]);

// Survey config schema
export const SurveyConfigSchema = z.object({
  title: z.string(),
  questions: z.array(QuestionSchema),
});

// Submission payload schema
export const SurveySubmissionSchema = z.object({
  answers: z.record(
    z.string(),
    z.union([z.string(), z.number(), z.boolean(), z.array(z.string())])
  ),
});

// TypeScript types inferred from schemas
export type TextQuestion = z.infer<typeof TextQuestionSchema>;
export type TextareaQuestion = z.infer<typeof TextareaQuestionSchema>;
export type MultipleChoiceQuestion = z.infer<
  typeof MultipleChoiceQuestionSchema
>;
export type RatingQuestion = z.infer<typeof RatingQuestionSchema>;
export type MultipleSelectQuestion = z.infer<
  typeof MultipleSelectQuestionSchema
>;
export type MultipleSelectWithOtherQuestion = z.infer<
  typeof MultipleSelectWithOtherQuestionSchema
>;
export type YesNoQuestion = z.infer<typeof YesNoQuestionSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type SurveyConfig = z.infer<typeof SurveyConfigSchema>;
export type SurveySubmission = z.infer<typeof SurveySubmissionSchema>;
