import { z } from "zod";
import {
  Question,
  TextQuestion,
  TextareaQuestion,
  MultipleSelectQuestion,
  MultipleSelectWithOtherQuestion,
} from "../../../shared/schemas";

export function createValidationSchema(question: Question): z.ZodSchema {
  switch (question.type) {
    case "text":
    case "textarea":
      return createStringSchema(question as TextQuestion | TextareaQuestion);

    case "multiple_choice":
      return createChoiceSchema(question);

    case "rating":
      return createRatingSchema(question);

    case "multiple_select":
    case "multiple_select_with_other":
      return createMultiSelectSchema(
        question as MultipleSelectQuestion | MultipleSelectWithOtherQuestion
      );

    case "yes_no":
      return createBooleanSchema(question);

    default:
      return z.unknown();
  }
}

function createStringSchema(
  question: TextQuestion | TextareaQuestion
): z.ZodSchema {
  const { required, minLength, maxLength } = question.validation ?? {};
  let schema = z.string();

  if (required) {
    schema = schema.min(1, "This field is required");
  }

  if (minLength) {
    schema = schema.min(minLength, `Minimum ${minLength} characters required`);
  }

  if (maxLength) {
    schema = schema.max(maxLength, `Maximum ${maxLength} characters allowed`);
  }

  return schema;
}

function createChoiceSchema(question: Question): z.ZodSchema {
  const isRequired = question.validation?.required ?? false;

  if (isRequired) {
    return z.string().min(1, "Please select an option");
  }
  return z.string();
}

function createRatingSchema(question: Question): z.ZodSchema {
  const isRequired = question.validation?.required ?? false;

  if (isRequired) {
    return z.number({ message: "Please select a rating" });
  }
  return z.number().optional();
}

function createMultiSelectSchema(
  question: MultipleSelectQuestion | MultipleSelectWithOtherQuestion
): z.ZodSchema {
  const { required, minChoices, maxChoices } = question.validation ?? {};
  let schema = z.array(z.string());

  if (minChoices) {
    schema = schema.min(
      minChoices,
      `Please select at least ${minChoices} option(s)`
    );
  } else if (required) {
    schema = schema.min(1, "Please select at least one option");
  }

  if (maxChoices) {
    schema = schema.max(
      maxChoices,
      `Please select at most ${maxChoices} option(s)`
    );
  }

  return schema;
}

function createBooleanSchema(question: Question): z.ZodSchema {
  const isRequired = question.validation?.required ?? false;

  if (isRequired) {
    return z.boolean({ message: "Please answer this question" });
  }
  return z.boolean().optional();
}
