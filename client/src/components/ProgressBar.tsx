import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  max: number;
  current: number;
  position: "top" | "bottom";
}

export function ProgressBar({ max, current, position }: ProgressBarProps) {
  const percentage = (current / max) * 100;

  return (
    <div
      className={`${styles.progressContainer} ${
        position === "top" ? styles.top : styles.bottom
      }`}
    >
      <progress className={styles.progress} max={max} value={current} />
      <div
        className={styles.progressFill}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
