import styles from "./FormInput.module.css";

type FormValue = string | number | boolean | string[] | null;

interface RadioOption {
  value: string | boolean;
  label: string;
}

interface RadioOptionGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  value: FormValue;
  onChange: (val: string | boolean) => void;
  onBlur?: () => void;
  error?: string;
}

export const RadioOptionGroup = ({
  name,
  label,
  options,
  value,
  onChange,
  onBlur,
  error,
}: RadioOptionGroupProps) => (
  <div className={styles.inputGroup}>
    <fieldset className={styles.fieldset} onBlur={onBlur}>
      <legend className={styles.label}>{label}</legend>
      {options.map((opt) => (
        <label key={String(opt.value)} className={styles.radioLabel}>
          <input
            type="radio"
            name={name}
            value={String(opt.value)}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className={styles.radio}
          />
          {opt.label}
        </label>
      ))}
    </fieldset>
    {error && <span className={styles.error}>{error}</span>}
  </div>
);
