import styles from "./FormInput.module.css";

type FormValue = string | number | boolean | string[] | null;

interface CheckboxGroupProps {
  name: string;
  label: string;
  options: string[];
  value: FormValue;
  onChange: (val: string[]) => void;
  onBlur?: () => void;
  error?: string;
}

export const CheckboxGroup = ({
  name,
  label,
  options,
  value,
  onChange,
  onBlur,
  error,
}: CheckboxGroupProps) => {
  const currentValue = (value as string[]) || [];

  return (
    <div className={styles.inputGroup}>
      <fieldset className={styles.fieldset} onBlur={onBlur}>
        <legend className={styles.label}>{label}</legend>
        {options.map((option) => (
          <label key={option} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name={name}
              value={option}
              checked={currentValue.includes(option)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...currentValue, option]);
                } else {
                  onChange(currentValue.filter((v) => v !== option));
                }
              }}
              className={styles.checkbox}
            />
            {option}
          </label>
        ))}
      </fieldset>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
