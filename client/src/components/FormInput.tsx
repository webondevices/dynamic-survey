import { Question } from "../../../shared/schemas";
import styles from "./FormInput.module.css";
import { ReactNode } from "react";
import { RadioOptionGroup } from "./RadioOptionGroup";
import { CheckboxGroup } from "./CheckboxGroup";

type FormValue = string | number | boolean | string[] | null;

interface FormInputProps {
  question: Question;
  value: FormValue;
  onChange: (value: FormValue) => void;
  onBlur?: () => void;
  error?: string;
}

const InputWrapper = ({
  children,
  question,
  error,
  isFieldset = false,
}: {
  children: ReactNode;
  question: Question;
  error?: string;
  isFieldset?: boolean;
}) => {
  const Wrapper = isFieldset ? "fieldset" : "div";
  const Label = isFieldset ? "legend" : "label";

  return (
    <Wrapper className={isFieldset ? styles.fieldset : styles.inputGroup}>
      <Label
        htmlFor={!isFieldset ? question.name : undefined}
        className={styles.label}
      >
        {question.label}
      </Label>
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </Wrapper>
  );
};

const useOtherOption = (value: FormValue) => {
  const currentValues = (value as string[]) || [];
  const otherEntry = currentValues.find((v) => v.startsWith("Other: "));

  return {
    values: currentValues,
    hasOther: !!otherEntry || currentValues.includes("Other"),
    otherText: otherEntry ? otherEntry.substring(7) : "",
    otherEntry,
  };
};

export function FormInput({
  question,
  value,
  onChange,
  onBlur,
  error,
}: FormInputProps) {
  switch (question.type) {
    case "text": {
      return (
        <InputWrapper question={question} error={error}>
          <input
            type="text"
            id={question.name}
            name={question.name}
            value={(value as string) || ""}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className={`${styles.input} ${error ? styles.inputError : ""}`}
          />
        </InputWrapper>
      );
    }

    case "textarea": {
      return (
        <InputWrapper question={question} error={error}>
          <textarea
            id={question.name}
            name={question.name}
            value={(value as string) || ""}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className={`${styles.textarea} ${error ? styles.inputError : ""}`}
            rows={4}
          />
        </InputWrapper>
      );
    }

    case "multiple_choice": {
      return (
        <RadioOptionGroup
          name={question.name}
          label={question.label}
          value={value}
          onChange={(val) => onChange(val)}
          onBlur={onBlur}
          options={question.options.map((o) => ({ value: o, label: o }))}
          error={error}
        />
      );
    }

    case "yes_no": {
      return (
        <RadioOptionGroup
          name={question.name}
          label={question.label}
          value={value}
          onChange={(val) => onChange(val)}
          onBlur={onBlur}
          options={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
          error={error}
        />
      );
    }

    case "multiple_select": {
      return (
        <CheckboxGroup
          name={question.name}
          label={question.label}
          options={question.options}
          value={value}
          onChange={(val) => onChange(val)}
          onBlur={onBlur}
          error={error}
        />
      );
    }

    case "rating": {
      return (
        <InputWrapper question={question} error={error}>
          <div className={styles.ratingContainer} onBlur={onBlur}>
            {Array.from({ length: question.scale }, (_, i) => i + 1).map(
              (rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => onChange(rating)}
                  className={`${styles.ratingButton} ${
                    value === rating ? styles.ratingButtonActive : ""
                  }`}
                >
                  {rating}
                </button>
              )
            )}
          </div>
        </InputWrapper>
      );
    }

    case "multiple_select_with_other": {
      const { values, hasOther, otherText } = useOtherOption(value);

      return (
        <div className={styles.inputGroup}>
          <fieldset className={styles.fieldset} onBlur={onBlur}>
            <legend className={styles.label}>{question.label}</legend>
            {question.options.map((option) => (
              <label key={option} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  name={question.name}
                  value={option}
                  checked={
                    values.includes(option) || (option === "Other" && hasOther)
                  }
                  onChange={(e) => {
                    if (option === "Other") {
                      if (e.target.checked) {
                        onChange([
                          ...values.filter((v) => !v.startsWith("Other: ")),
                          "Other",
                        ]);
                      } else {
                        onChange(
                          values.filter(
                            (v) => v !== "Other" && !v.startsWith("Other: ")
                          )
                        );
                      }
                    } else {
                      if (e.target.checked) {
                        onChange([...values, option]);
                      } else {
                        onChange(values.filter((v) => v !== option));
                      }
                    }
                  }}
                />
                {option}
              </label>
            ))}
            {hasOther && (
              <input
                type="text"
                placeholder="Please specify..."
                value={otherText}
                onChange={(e) => {
                  const withoutOther = values.filter(
                    (v) => v !== "Other" && !v.startsWith("Other: ")
                  );
                  onChange(
                    e.target.value
                      ? [...withoutOther, `Other: ${e.target.value}`]
                      : [...withoutOther, "Other"]
                  );
                }}
                className={styles.input}
              />
            )}
          </fieldset>
          {error && <span className={styles.error}>{error}</span>}
        </div>
      );
    }

    default:
      return null;
  }
}
