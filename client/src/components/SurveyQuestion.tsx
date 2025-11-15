import { useState, useEffect } from "react";
import { Question } from "../../../shared/schemas";
import { FormInput } from "./FormInput";
import { z } from "zod";
import { createValidationSchema } from "../utils/validation";

export type FormValue = string | number | boolean | string[] | null;

interface SurveyQuestionProps {
  question: Question;
  initialValue?: FormValue;
  onValidChange: (isValid: boolean, value: FormValue) => void;
}

interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

export function SurveyQuestion({
  question,
  initialValue,
  onValidChange,
}: SurveyQuestionProps) {
  const getInitialValue = (): FormValue => {
    if (initialValue !== undefined) return initialValue;
    switch (question.type) {
      case "multiple_select":
      case "multiple_select_with_other":
        return [];
      case "text":
      case "textarea":
      case "multiple_choice":
        return "";
      default:
        return null;
    }
  };

  const [value, setValue] = useState<FormValue>(getInitialValue);
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState(false);

  const validate = (val: FormValue): ValidationResult => {
    try {
      const schema = createValidationSchema(question);
      schema.parse(val);
      return { isValid: true, error: null };
    } catch (err) {
      if (err instanceof z.ZodError) {
        const firstError = err.issues[0];
        return {
          isValid: false,
          error: firstError?.message || "Invalid input",
        };
      }
      return { isValid: false, error: "Invalid input" };
    }
  };

  useEffect(() => {
    const { isValid, error: validationError } = validate(value);

    // Only show errors after the field has been touched
    if (touched) {
      setError(validationError ?? "");
    }

    // Always notify parent of current validity
    onValidChange(isValid, value);
  }, [value, touched, question]);

  return (
    <FormInput
      question={question}
      value={value}
      onChange={(newValue: FormValue) => setValue(newValue)}
      onBlur={() => setTouched(true)}
      error={touched ? error : undefined}
    />
  );
}
